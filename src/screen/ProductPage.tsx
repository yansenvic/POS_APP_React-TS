import { NavBar } from "../component/NavBar";
import { useState } from "react";
import { useFetchCategories } from "../domain/categories";
import {
  Product,
  useCreateProduct,
  useFetchProduct,
  useDeleteProduct,
  useEditProduct,
  ProductRequest,
} from "../domain/product";

type ProductPageProps = {
  HomeClick: () => void;
  CategoryClick: () => void;
  ProductClick: () => void;
};

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

export function ProductPage(props: ProductPageProps) {
  const [inputProduct, setInputProduct] =
    useState<ProductForm>(defaultInputProduct);
  const fetchProduct = useFetchProduct();
  const fetchCategories = useFetchCategories();
  const createProduct = useCreateProduct();
  const deleteProduct = useDeleteProduct();
  const editProduct = useEditProduct();

  // function onAddProduct(props: ProductRequest) {
  //   const newProduct = { ...props };
  //   createProduct.submit(newProduct).then(() => {
  //     setInputProduct(defaultInputProduct);
  //     fetchProduct.reFetch();
  //   });
  // }

  // function onEditProduct(props: ProductForm) {
  //   if (!props.selectedId) return;
  //   editProduct
  //     .updateProduct({
  //       id: props.selectedId,
  //       title: props.values.title,
  //       price: props.values.price,
  //       categoryId: props.values.categoryId,
  //     })
  //     .then(() => {
  //       setInputProduct(defaultInputProduct);
  //       fetchProduct.reFetch();
  //     });
  // }

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
      <NavBar
        onClickHome={props.HomeClick}
        onClickCategory={props.CategoryClick}
        onClickProduct={props.ProductClick}
      />
      <p>Welcome to Product Page</p>
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
      <br />
      <span>Product Price : </span>
      <input
        type="number"
        id="inputProduct"
        value={inputProduct.values.price === 0 ? "" : inputProduct.values.price}
        onChange={(e) => {
          const newPrice = {
            ...inputProduct,
            values: { ...inputProduct.values, price: Number(e.target.value) },
          };
          setInputProduct(newPrice);
        }}
      ></input>
      <br />
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
      <br />
      <input
        type="button"
        value={inputProduct.type === "add" ? "Add" : "Update"}
        disabled={createProduct.isLoading}
        onClick={() => onInputProduct(inputProduct)}
      ></input>
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
            <table>
              <thead>
                <tr>
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
                    <tr key={product.id}>
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
            </table>
          );
        }
      })()}
    </div>
  );
}
