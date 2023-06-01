import { SideBar } from "../component/SideBar";
import { Navbar } from "../component/NavBar";
import styled from "styled-components";
import { useState } from "react";
import { useFetchTransaction } from "../domain/transaction";
import { Transaction } from "../domain/transaction";
import { DetailTransactionPage } from "./DetailTransactionPage";
import { AddTransactionPage } from "./AddTransactionPage";

type TransactionPageProps = {};

const Wrapper = styled.div`
  display: flex;
  }
`;

export type TransactionForm =
  | {
      type: "home";
      values: Omit<Transaction, "id">;
    }
  | {
      type: "add";
      values: Omit<Transaction, "id">;
    }
  | {
      type: "detail";
      values: Omit<Transaction, "id">;
    };

export const defaultAddTransaction: TransactionForm = {
  type: "home",
  values: {
    payment: 0,
    return: 0,
    total: 0,
    items: [],
  },
};

export function TransactionPage(_props: TransactionPageProps) {
  const [addTransaction, setAddTransaction] = useState<TransactionForm>(
    defaultAddTransaction
  );
  const fetchTransaction = useFetchTransaction("");
  const addTransactionPage = AddTransactionPage(returnHomeTransaction);
  const detailTransactionPage = DetailTransactionPage(
    addTransaction.values,
    returnHomeTransaction
  );
  function returnHomeTransaction() {
    setAddTransaction(defaultAddTransaction);
    fetchTransaction.reFetch();
  }

  return (
    <div>
      <Navbar />
      <Wrapper>
        <div>
          <SideBar />
        </div>
        <div>
          <h2>Welcome to Transaction Page</h2>
          <div>
            {(function () {
              if (fetchTransaction.isLoading) {
                return <p>Data is Loading</p>;
              } else if (fetchTransaction.errorMessage) {
                return <p>{fetchTransaction.errorMessage}</p>;
              } else
                return (function () {
                  if (addTransaction.type === "home") {
                    return (
                      <div>
                        <input
                          type="button"
                          value="Add Transaction"
                          onClick={() => {
                            setAddTransaction({
                              ...addTransaction,
                              type: "add",
                            });
                          }}
                        />
                        <table>
                          <thead>
                            <tr>
                              <th>No</th>
                              <th>ID Transaction</th>
                              <th>Total</th>
                              <th>Payment</th>
                              <th>Return</th>
                              <th>Action</th>
                            </tr>
                          </thead>
                          <tbody>
                            {fetchTransaction.transactions.map(
                              (transaction: Transaction, index: number) => {
                                return (
                                  <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{transaction.id}</td>
                                    <td>{transaction.total}</td>
                                    <td>{transaction.payment}</td>
                                    <td>{transaction.return}</td>
                                    <td>
                                      <input
                                        type="button"
                                        value="Detail Transaction"
                                        onClick={() =>
                                          setAddTransaction({
                                            values: transaction,
                                            type: "detail",
                                          })
                                        }
                                      />
                                    </td>
                                  </tr>
                                );
                              }
                            )}
                          </tbody>
                        </table>
                      </div>
                    );
                  } else if (addTransaction.type === "detail") {
                    return <div>{detailTransactionPage}</div>;
                  } else if (addTransaction.type === "add") {
                    return <div>{addTransactionPage}</div>;
                  }
                })();
            })()}
          </div>
        </div>
      </Wrapper>
    </div>
  );
}
