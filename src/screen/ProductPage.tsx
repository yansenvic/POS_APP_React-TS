import { SideBar } from "../component/SideBar";
import { useState } from "react";
import { useFetchCategories } from "../domain/categories";
import {
  Product,
  useCreateProduct,
  useFetchProduct,
  useDeleteProduct,
  useEditProduct,
} from "../domain/product";
import styled from "styled-components";
import { Navbar } from "../component/NavBar";
import { Header } from "./HomePage";

type ProductPageProps = {};

const Div = styled.div`
  display: grid;
  grid-template-columns: 15% 85%;
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-flow: column;
  padding: 1em 3em 2em 3em;
  border-radius: 5px;
  box-shadow: 0px 3px 10px -2px rgba(0, 0, 0, 0.5);
`;

const Container = styled.div`
  display: flex;
  flex-flow: column;
  padding: 1em 3em 2em 3em;
  border-radius: 5px;
  box-shadow: 0px 3px 10px -2px rgba(0, 0, 0, 0.5);
  width: 25%;
  margin-bottom: 2em;
`;

const Table = styled.table`
   {
    font-family: sans-serif;
    border-collapse: collapse;
    width: 100%;
    border: 1px solid #f2f5f7;
  }
  .tr th {
    background: #35a9db;
    font-weight: normal;
  }
  .tr td {
    padding: 8px 20px;
    text-align: center;
    background: pink;
  }
`;

type ProductForm =
  | {
      type: "add";
      selectedId: null;
      values: Omit<Product, "id">;
    }
  | {
      type: "edit";
      selectedId: number;
      values: Omit<Product, "id">;
    };

const defaultInputProduct: ProductForm = {
  type: "add",
  selectedId: null,
  values: {
    categoryId: 1,
    title: "",
    price: 0,
  },
};

export function ProductPage(_props: ProductPageProps) {
  const [inputProduct, setInputProduct] =
    useState<ProductForm>(defaultInputProduct);
  const fetchProduct = useFetchProduct("");
  const fetchCategories = useFetchCategories();
  const createProduct = useCreateProduct();
  const deleteProduct = useDeleteProduct();
  const editProduct = useEditProduct();

  function onInputProduct(props: ProductForm) {
    if (props.type === "add") {
      createProduct.submit(props.values).then(() => {
        setInputProduct(defaultInputProduct);
        fetchProduct.reFetch();
      });
    } else if (props.type === "edit") {
      editProduct
        .updateProduct({
          id: props.selectedId,
          title: props.values.title,
          price: props.values.price,
          categoryId: props.values.categoryId,
        })
        .then(() => {
          setInputProduct(defaultInputProduct);
          fetchProduct.reFetch();
        });
    } else return;
  }

  function getCategoryTitle(categoryId: number) {
    return fetchCategories.categories.find(
      (category) => category.id === categoryId
    )?.title;
  }
  return (
    <div>
      <Navbar></Navbar>
      <Div>
        <SideBar />
        <ContentWrapper>
          <Header>Welcome to Product Page</Header>
          <Container>
            <h3>Product</h3>
            <div>
              <span>Product Name : </span>
              <input
                type="text"
                id="inputProduct"
                value={inputProduct.values.title}
                onChange={(e) => {
                  const newTitle = {
                    ...inputProduct,
                    values: { ...inputProduct.values, title: e.target.value },
                  };
                  setInputProduct(newTitle);
                }}
              ></input>
            </div>
            <div>
              <span>Product Price : </span>
              <input
                type="number"
                id="inputProduct"
                value={
                  inputProduct.values.price === 0
                    ? ""
                    : inputProduct.values.price
                }
                onChange={(e) => {
                  const newPrice = {
                    ...inputProduct,
                    values: {
                      ...inputProduct.values,
                      price: Number(e.target.value),
                    },
                  };
                  setInputProduct(newPrice);
                }}
              ></input>
            </div>
            <div>
              <label htmlFor="inputCategoryProduct">Category Product : </label>
              <select
                value={inputProduct.values.categoryId}
                id="inputCategoryProduct"
                onChange={(e) => {
                  const newCategoryId = {
                    ...inputProduct,
                    values: {
                      ...inputProduct.values,
                      categoryId: Number(e.target.value),
                    },
                  };
                  setInputProduct(newCategoryId);
                }}
              >
                {fetchCategories.categories.map((category) => {
                  return (
                    <option key={category.id} value={category.id}>
                      {category.title}
                    </option>
                  );
                })}
              </select>
            </div>
            <div>
              <input
                type="button"
                value={inputProduct.type === "add" ? "Add" : "Update"}
                disabled={createProduct.isLoading}
                onClick={() => onInputProduct(inputProduct)}
              ></input>
              <input
                type="button"
                value={
                  inputProduct.type === "add" ? "Clear Form" : "Cancel Update"
                }
                disabled={createProduct.isLoading}
                onClick={() => setInputProduct(defaultInputProduct)}
              ></input>
            </div>
          </Container>
          {(function () {
            if (fetchProduct.isLoading || fetchCategories.isLoading) {
              return <p>Data is Loading</p>;
            } else if (
              createProduct.errorMessage ||
              deleteProduct.errorMessage ||
              editProduct.errorMessage ||
              fetchProduct.errorMassage ||
              fetchCategories.errorMessage
            ) {
              return (
                <p>
                  {createProduct.errorMessage ||
                    deleteProduct.errorMessage ||
                    editProduct.errorMessage ||
                    fetchProduct.errorMassage ||
                    fetchCategories.errorMessage}
                </p>
              );
            } else if (fetchProduct.products.length === 0) {
              return <p>Data is Empty</p>;
            } else {
              return (
                <Table>
                  <thead>
                    <tr className="tr th">
                      <th>ID Product</th>
                      <th>Title</th>
                      <th>Price</th>
                      <th>Category</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {fetchProduct.products.map((product) => {
                      return (
                        <tr key={product.id} className="tr td">
                          <td>{product.id}</td>
                          <td>{product.title}</td>
                          <td>{product.price}</td>
                          <td>{getCategoryTitle(product.categoryId)}</td>
                          <td>
                            <input
                              type="button"
                              value="Delete"
                              disabled={
                                deleteProduct.isLoading ||
                                inputProduct.type === "edit"
                              }
                              onClick={() =>
                                deleteProduct
                                  .submit(product.id)
                                  .then(fetchProduct.reFetch)
                              }
                            ></input>
                            <input
                              type="button"
                              value="Edit"
                              disabled={
                                editProduct.isLoading ||
                                inputProduct.type === "edit"
                              }
                              onClick={() => {
                                setInputProduct({
                                  type: "edit",
                                  selectedId: product.id,
                                  values: {
                                    categoryId: product.categoryId,
                                    title: product.title,
                                    price: product.price,
                                  },
                                });
                              }}
                            ></input>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </Table>
              );
            }
          })()}
        </ContentWrapper>
      </Div>
    </div>
  );
}
