import {
  useQuery,
  UseQueryOptions,
  UseQueryResult,
} from "@tanstack/react-query";
import { signOut } from "../../context/AuthContext";
import { api } from "../api";

export type Category = {
  id: number;
  name: string;
};

type getCategoriesResponse = {
  categories: Category[];
};

export async function getCategories(): Promise<
  getCategoriesResponse | unknown
> {
  if (typeof window === "undefined") return;

  const token = window.localStorage.getItem("@Expenseless:token");
  const config = {
    headers: {
      Authorization: `Bearer "${token}"`,
    },
  };
  try {
    const response = await api.get("category", config);
    const { data } = response;

    return { categories: data };
  } catch (error: any) {
    if (error.response.status === 401) {
      window.localStorage.removeItem("@Expenseless:token");

      signOut();
    }
  }
}

export function useCategories(options?: UseQueryOptions) {
  return useQuery(["categories"], () => getCategories(), {
    staleTime: 1000 * 60 * 60, // 1 hour
    refetchOnWindowFocus: false,
  }) as UseQueryResult<getCategoriesResponse, unknown>;
}
