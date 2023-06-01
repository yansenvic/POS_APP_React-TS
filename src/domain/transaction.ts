import { useEffect, useState } from "react";
import { DetailTransaction } from "../screen/DetailTransactionPage";

export type Transaction = {
  id: number;
  total: number;
  payment: number;
  return: number;
  items: DetailTransaction[];
};

type TransactionRequest = Omit<Transaction, "id">;

export function fetchTransaction(filterTransaction: string) {
  return fetch(`http://localhost:3000/transaction${filterTransaction}`)
    .then((result) => {
      return result.json();
    })
    .then((data: Transaction[]) => {
      return data;
    });
}

export function postTransaction(props: TransactionRequest) {
  return fetch(`http://localhost:3000/transaction`, {
    method: "POST",
    body: JSON.stringify({
      payment: props.payment,
      return: props.return,
      total: props.total,
      items: props.items,
    }),
    headers: { "Content-type": "application/json; charset=UTF-8" },
  });
}

export function useFetchTransaction(filterTransaction: string) {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  useEffect(() => {
    setIsLoading(true);
    fetchTransaction(filterTransaction)
      .then((data) => {
        setTransactions(data);
        setErrorMessage("");
      })
      .catch((err) => {
        setTransactions([]);
        setErrorMessage(err.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);
  function reFetch() {
    setIsLoading(true);
    fetchTransaction(filterTransaction)
      .then((data) => {
        setTransactions(data);
        setErrorMessage("");
      })
      .catch((err) => {
        setTransactions([]);
        setErrorMessage(err.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }
  return { transactions, isLoading, errorMessage, reFetch };
}

export function onAddTransaction() {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  function submit(props: TransactionRequest) {
    setIsLoading(true);
    return postTransaction(props)
      .then(() => setErrorMessage(""))
      .catch((e) => setErrorMessage(e))
      .finally(() => setIsLoading(false));
  }
  return { isLoading, submit, errorMessage };
}
