import { NavBar } from "../component/NavBar";
import { useState } from "react";
import { Category, useFetchCategories } from "../domain/categories";
import {
  Product,
  useCreateProduct,
  useFetchProduct,
  useDeleteProduct,
  useEditProduct,
  ProductRequest,
} from "../domain/product";
import { FetchCategories } from "./CategoryPage";

type ProductPageProps = {
  HomeClick: () => void;
  CategoryClick: () => void;
  ProductClick: () => void;
};

type ProductForm = Omit<Product, "id">;

type InputType = "add" | "edit";

type FetchProduct = {
  products: Product[];
  reFetch: () => void;
  errorMassage: string;
  isLoading: boolean;
};

type CreateProduct = {
  isLoading: boolean;
  errorMessage: string;
  submit: (props: ProductRequest) => Promise<void>;
};

type DeleteProduct = {
  isLoading: boolean;
  errorMessage: string;
  delProduct: (props: Product) => Promise<void>;
};

type EditProduct = {
  isLoading: boolean;
  errorMessage: string;
  updateProduct: (props: Product) => Promise<void>;
};

export function ProductPage(props: ProductPageProps) {
  const [inputProduct, setInputProduct] = useState<ProductForm>({
    title: "",
    categoryId: 1,
    price: 0,
  });
  // const [product, setProduct] = useState<Product | null>(null); // contoh
  const [inputType, setInputType] = useState<InputType>("add");
  const [idEditProduct, setIdEditProduct] = useState<number | null>(null);
  const fetchProduct: FetchProduct = useFetchProduct();
  const fetchCategories: FetchCategories = useFetchCategories();
  const createProduct: CreateProduct = useCreateProduct();
  const deleteProduct: DeleteProduct = useDeleteProduct();
  const editProduct: EditProduct = useEditProduct();

  function onAddProduct(props: ProductForm) {
    const newProduct = { ...props };
    createProduct.submit(newProduct).then(() => {
      setInputProduct({
        title: "",
        categoryId: 1,
        price: 0,
      });
      fetchProduct.reFetch();
    });
  }

  function onEditProduct(props: ProductForm) {
    // if (idEditProduct) {
    if (!idEditProduct) return;
    editProduct
      .updateProduct({
        id: idEditProduct,
        title: props.title,
        price: props.price,
        categoryId: props.categoryId,
      })
      .then(() => {
        setInputType("add");
        setInputProduct({
          title: "",
          categoryId: 1,
          price: 0,
        });
        setIdEditProduct(null);
        fetchProduct.reFetch();
      });
    // }
  }

  function categoryTitle(categoryId: number) {
    const nameCategory = fetchCategories.categories.find(
      (category: Category) => category.id === categoryId
    );
    if (nameCategory) return nameCategory.title;
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
        value={inputProduct.title}
        onChange={(e) => {
          const newTitle = { ...inputProduct, title: e.target.value };
          setInputProduct(newTitle);
        }}
      ></input>
      <br />
      <span>Product Price : </span>
      <input
        type="number"
        id="inputProduct"
        value={inputProduct.price === 0 ? "" : inputProduct.price}
        onChange={(e) => {
          const newPrice = { ...inputProduct, price: Number(e.target.value) };
          setInputProduct(newPrice);
        }}
      ></input>
      <br />
      <label htmlFor="inputCategoryProduct">Category Product : </label>
      <select
        value={inputProduct.categoryId}
        id="inputCategoryProduct"
        onChange={(e) => {
          const newCategoryId = {
            ...inputProduct,
            categoryId: Number(e.target.value),
          };
          setInputProduct(newCategoryId);
        }}
      >
        {fetchCategories.categories.map((category: Category) => {
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
        value={inputType === "add" ? "Add" : "Update"}
        disabled={createProduct.isLoading ? true : false}
        onClick={() => {
          inputType === "add"
            ? onAddProduct(inputProduct)
            : onEditProduct(inputProduct);
        }}
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
                      <td>{categoryTitle(product.categoryId)}</td>
                      <td>
                        <input
                          type="button"
                          value="Delete"
                          disabled={
                            deleteProduct.isLoading
                              ? true
                              : inputType === "edit"
                              ? true
                              : false
                          }
                          onClick={() =>
                            deleteProduct
                              .delProduct({
                                id: product.id,
                                title: product.title,
                                price: product.price,
                                categoryId: product.categoryId,
                              })
                              .then(() => {
                                fetchProduct.reFetch();
                              })
                          }
                        ></input>
                        <input
                          type="button"
                          value="Edit"
                          disabled={
                            editProduct.isLoading
                              ? true
                              : inputType === "edit"
                              ? true
                              : false
                          }
                          onClick={() => {
                            setIdEditProduct(product.id);
                            setInputType("edit");
                            setInputProduct({
                              title: product.title,
                              price: product.price,
                              categoryId: product.categoryId,
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
