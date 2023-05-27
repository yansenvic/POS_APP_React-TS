import { SideBar } from "../component/SideBar";
import { Navbar } from "../component/NavBar";
import styled from "styled-components";
import { useState } from "react";
import { onAddTransaction, useFetchTransaction } from "../domain/transaction";
import { useFetchProduct } from "../domain/product";
import { Transaction } from "../domain/transaction";

type TransactionPageProps = {
  HomeClick: () => void;
  CategoryClick: () => void;
  ProductClick: () => void;
  TransactionClick: () => void;
};

const Wrapper = styled.div`
  display: flex;
  }
`;

export type DetailTransaction = {
  idProduct: number;
  productName: string;
  price: number;
  qty: number;
};

export type DetailTransactionForm =
  | { type: "add"; selectedId: null; values: DetailTransaction }
  | {
      type: "edit";
      selectedId: number;
      values: DetailTransaction;
    };

export type TransactionForm2 =
  | {
      type: "home";
      values: Omit<Transaction, "id">;
    }
  | {
      type: "add";
      values: Omit<Transaction, "id">;
    };

type TransactionForm = Omit<Transaction, "id">;

const defaultAddTransaction: TransactionForm = {
  payment: 0,
  return: 0,
  total: 0,
  items: [],
};

const defaultDetailTransaction: DetailTransactionForm = {
  type: "add",
  selectedId: null,
  values: {
    idProduct: 0,
    productName: "",
    price: 0,
    qty: 0,
  },
};

export function TransactionPage(props: TransactionPageProps) {
  const [addTransaction, setAddTransaction] = useState<TransactionForm>(
    defaultAddTransaction
  );
  const [detailTransaction, setDetailTransaction] =
    useState<DetailTransactionForm>(defaultDetailTransaction);
  const fetchTransaction = useFetchTransaction();
  const fetchProduct = useFetchProduct(detailTransaction.values.productName);
  const createTransaction = onAddTransaction();
  function onInputTransaction() {
    if (detailTransaction.type === "add") {
      const prevTotal = addTransaction.total;
      const prevItems = [...addTransaction.items];
      setAddTransaction({
        ...addTransaction,
        total:
          prevTotal +
          detailTransaction.values.price * detailTransaction.values.qty,
        items: [
          ...prevItems,
          {
            idProduct: detailTransaction.values.idProduct,
            price: detailTransaction.values.price,
            productName: detailTransaction.values.productName,
            qty: detailTransaction.values.qty,
          },
        ],
      });
      setDetailTransaction(defaultDetailTransaction);
    } else if (detailTransaction.type === "edit") {
      const newValues = [...addTransaction.items];
      newValues[detailTransaction.selectedId].idProduct =
        detailTransaction.values.idProduct;
      newValues[detailTransaction.selectedId].price =
        detailTransaction.values.price;
      newValues[detailTransaction.selectedId].productName =
        detailTransaction.values.productName;
      newValues[detailTransaction.selectedId].qty =
        detailTransaction.values.qty;
      setAddTransaction({
        ...addTransaction,
        items: newValues,
        total:
          addTransaction.total +
          detailTransaction.values.price * detailTransaction.values.qty,
      });
      setDetailTransaction(defaultDetailTransaction);
    }
  }
  return (
    <div>
      <Navbar />
      <Wrapper>
        <div>
          <SideBar
            onClickHome={props.HomeClick}
            onClickCategory={props.CategoryClick}
            onClickProduct={props.ProductClick}
            onClickTransaction={props.TransactionClick}
          />
        </div>
        <div>
          <h2>Welcome to Home Transaction Page</h2>
          <div>
            <div>
              <datalist id="listProduct">
                {fetchProduct.products.map((product) => {
                  return (
                    <option
                      key={product.id}
                      value={product.title}
                      data-id={product.id}
                    >
                      {product.title}
                    </option>
                  );
                })}
              </datalist>
              <span>Product Name : </span>
              <input
                type="text"
                list="listProduct"
                value={detailTransaction.values.productName}
                onChange={(e) => {
                  const idProduct = fetchProduct.products.find(
                    (product) => product.title === e.target.value
                  );
                  if (idProduct === undefined) {
                    setDetailTransaction({
                      ...detailTransaction,
                      values: {
                        ...detailTransaction.values,
                        productName: e.target.value,
                        idProduct: 0,
                        price: 0,
                      },
                    });
                  } else {
                    setDetailTransaction({
                      ...detailTransaction,
                      values: {
                        ...detailTransaction.values,
                        productName: e.target.value,
                        idProduct: idProduct.id,
                        price: idProduct.price,
                      },
                    });
                  }
                }}
              ></input>
            </div>
            <div>
              <span>Qty Order : </span>
              <input
                type="number"
                value={
                  detailTransaction.values.qty === 0
                    ? ""
                    : detailTransaction.values.qty
                }
                onChange={(e) =>
                  setDetailTransaction({
                    ...detailTransaction,
                    values: {
                      ...detailTransaction.values,
                      qty: Number(e.target.value),
                    },
                  })
                }
              ></input>
            </div>
            <div>
              <span>Price/pcs : </span>
              <input
                type="number"
                disabled
                value={
                  detailTransaction.values.price === 0
                    ? ""
                    : detailTransaction.values.price
                }
              ></input>
            </div>
            <div>
              <input
                type="button"
                value={detailTransaction.type === "add" ? "Add" : "Update"}
                disabled={
                  detailTransaction.values.qty === 0 ||
                  detailTransaction.values.price === 0
                }
                onClick={() => {
                  onInputTransaction();
                }}
              ></input>
              <input
                type="button"
                value="Submit"
                disabled={
                  addTransaction.items.length === 0 ||
                  detailTransaction.type === "edit"
                }
                onClick={() => {
                  createTransaction.submit(addTransaction).then(() => {
                    setDetailTransaction(defaultDetailTransaction);
                    setAddTransaction(defaultAddTransaction);
                  });
                }}
              ></input>
            </div>
          </div>
          <div>
            {(function () {
              if (addTransaction.items.length <= 0) return;
              else {
                return (
                  <table>
                    <thead>
                      <tr>
                        <th>No</th>
                        <th>Product Name</th>
                        <th>Price</th>
                        <th>Qty</th>
                        <th>Subtotal</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {addTransaction.items.map(
                        (item: DetailTransaction, index: number) => {
                          return (
                            <tr key={index}>
                              <td>{index + 1}</td>
                              <td>{item.productName}</td>
                              <td>{item.price}</td>
                              <td>{item.qty}</td>
                              <td>{item.qty * item.price}</td>
                              <td>
                                <div>
                                  <input
                                    type="button"
                                    value="Delete"
                                    onClick={() => {
                                      const newValue =
                                        addTransaction.items.filter(
                                          (product, indexfilter) => {
                                            return index !== indexfilter;
                                          }
                                        );
                                      setAddTransaction({
                                        ...addTransaction,
                                        items: newValue,
                                        total:
                                          addTransaction.total -
                                          addTransaction.items[index].price *
                                            addTransaction.items[index].qty,
                                      });
                                    }}
                                  ></input>
                                  <input
                                    type="button"
                                    value="Edit"
                                    onClick={() => {
                                      setAddTransaction({
                                        ...addTransaction,
                                        total:
                                          addTransaction.total -
                                          item.qty * item.price,
                                      });
                                      setDetailTransaction({
                                        selectedId: index,
                                        type: "edit",
                                        values: {
                                          productName: item.productName,
                                          idProduct: item.idProduct,
                                          price: item.price,
                                          qty: item.qty,
                                        },
                                      });
                                    }}
                                  ></input>
                                </div>
                              </td>
                            </tr>
                          );
                        }
                      )}
                    </tbody>
                  </table>
                );
              }
            })()}
          </div>
        </div>
      </Wrapper>
    </div>
  );
}
