import {
  useQuery,
  UseQueryOptions,
  UseQueryResult,
} from "@tanstack/react-query";
import { signOut } from "../../context/AuthContext";
import { api } from "../api";
import { Category } from "./useCategories";

type Transaction = {
  id: number;
  date: string;
  type: string;
  amount: number;
  description: string;
  name: string;
  categoryId: number;
  userId: number;
  createdAt: string;
  Category: Category;
};

export type TransactionFiltered = Omit<Transaction, "amount"> & {
  amount: string;
};

export type getTransactionsResponse = {
  transactions: TransactionFiltered[];
  totalExpenses: string;
  totalIncomes: string;
  net: string;
};

export async function getTransactions(): Promise<getTransactionsResponse | void> {
  const token = window.localStorage.getItem("@Expenseless:token");
  const config = {
    headers: {
      Authorization: `Bearer "${token}"`,
    },
  };

  try {
    const { data } = await api.get<Transaction[]>("transactions", config);

    const transactions = data.map((transaction) => {
      return {
        ...transaction,
        date: new Date(transaction.date).toLocaleDateString("en-US", {
          day: "2-digit",
          month: "long",
          year: "numeric",
          formatMatcher: "best fit",
          hour: "2-digit",
          minute: "2-digit",
        }),
        amount: new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
        }).format(transaction.amount / 100),
      };
    });

    const totalExpensesAmount = data.reduce((acc, transaction) => {
      if (transaction.type === "expense") {
        return acc + transaction.amount;
      }
      return acc;
    }, 0);

    const totalExpenses = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(totalExpensesAmount / 100);

    const totalIncomesAmount = data.reduce((acc, transaction) => {
      if (transaction.type === "income") {
        return acc + transaction.amount;
      }
      return acc;
    }, 0);

    const totalIncomes = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(totalIncomesAmount / 100);

    const netAmount = totalIncomesAmount - totalExpensesAmount;

    const net = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(netAmount / 100);

    return { transactions, totalExpenses, totalIncomes, net };
  } catch (error: any) {
    if (error.response.status === 401) {
      window.localStorage.removeItem("@Expenseless:token");

      signOut();
    }
  }
}

export function useTransactions(options?: UseQueryOptions) {
  return useQuery(["transactions"], () => getTransactions(), {
    staleTime: 1000 * 60 * 60, // 1 hour
  }) as UseQueryResult<getTransactionsResponse, unknown>;
}
