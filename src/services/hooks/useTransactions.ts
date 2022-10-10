import {
  useQuery,
  UseQueryOptions,
  UseQueryResult,
} from "@tanstack/react-query";
import { AxiosResponse } from "axios";
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
  monthlyTransactions: TransactionFiltered[];
  totalTransactionsMonthly: string;
};

export type createTransactionData = {
  name: string;
  description: string;
  amount: number;
  type: string;
  categoryId: number;
};

export type createTransactionResponse = {
  id: number;
  date: string;
  type: string;
  amount: number;
  description: string;
  name: string;
  categoryId: number;
  userId: number;
  createdAt: string;
  updatedAt: string;
};

export async function getTransactions(): Promise<getTransactionsResponse | void> {
  if (typeof window === "undefined") return;

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

    const totalTransactionsMonthlyAmount = data.reduce((acc, transaction) => {
      const transactionDate = new Date(transaction.date);
      const currentDate = new Date();

      if (
        transactionDate.getMonth() === currentDate.getMonth() &&
        transactionDate.getFullYear() === currentDate.getFullYear()
      ) {
        if (transaction.type === "income") {
          return acc + transaction.amount;
        }
        return acc - transaction.amount;
      }
      return acc;
    }, 0);

    const totalTransactionsMonthly = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(totalTransactionsMonthlyAmount / 100);

    const monthlyTransactions = transactions.filter((transaction) => {
      const transactionDate = new Date(transaction.createdAt);
      const currentDate = new Date();

      return (
        transactionDate.getMonth() === currentDate.getMonth() &&
        transactionDate.getFullYear() === currentDate.getFullYear()
      );
    });

    return {
      transactions,
      totalExpenses,
      totalIncomes,
      net,
      monthlyTransactions,
      totalTransactionsMonthly,
    };
  } catch (error: any) {
    if (error.response.status === 401) {
      window.localStorage.removeItem("@Expenseless:token");

      signOut();
    }
  }
}

export async function createTransaction(
  data: createTransactionData
): Promise<AxiosResponse | void> {
  const token = window.localStorage.getItem("@Expenseless:token");
  const config = {
    headers: {
      Authorization: `Bearer "${token}"`,
    },
  };

  try {
    const response = await api.post("transaction", data, config);

    return response;
  } catch (error: any) {
    if (error.response.status === 401) {
      window.localStorage.removeItem("@Expenseless:token");

      signOut();
    }

    return error.response;
  }
}

export async function deleteTransaction(
  id: number
): Promise<AxiosResponse | void> {
  if (typeof window === "undefined") return;
  const token = window.localStorage.getItem("@Expenseless:token");
  const config = {
    headers: {
      Authorization: `Bearer "${token}"`,
    },
  };

  try {
    const response = await api.delete(`transaction/${id}`, config);

    return response;
  } catch (error: any) {
    if (error.response.status === 401) {
      window.localStorage.removeItem("@Expenseless:token");

      signOut();
    }

    return error.response;
  }
}
export function useTransactions(options?: UseQueryOptions) {
  return useQuery(["transactions"], () => getTransactions(), {
    staleTime: 1000 * 60 * 60, // 1 hour
    refetchOnWindowFocus: false,
  }) as UseQueryResult<getTransactionsResponse, unknown>;
}
