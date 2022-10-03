import {
  useQuery,
  UseQueryOptions,
  UseQueryResult,
} from "@tanstack/react-query";
import { api } from "../api";

type Category = {
  id: number;
  name: string;
};

type getCategoriesResponse = {
  categories: Category[];
};

export async function getCategories(): Promise<getCategoriesResponse> {
  const token = window.localStorage.getItem("@Expenseless:token");
  const config = {
    headers: {
      Authorization: `Bearer "${token}"`,
    },
  };
  const { data } = await api.get("category", config);

  return { categories: data };
}

export function useCategories(options?: UseQueryOptions) {
  return useQuery(["categories"], () => getCategories(), {
    staleTime: 1000 * 60 * 60, // 1 hour
  }) as UseQueryResult<getCategoriesResponse, unknown>;
}
