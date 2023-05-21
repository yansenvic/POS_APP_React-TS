import { NavBar } from "../component/NavBar";
import { useState } from "react";
import { useFetchCategories } from "../domain/categories";
import {
  Product,
  useCreateProduct,
  useFetchProduct,
  useDeleteProduct,
  useEditProduct,
} from "../domain/product";

type ProductPageProps = {
  HomeClick: () => void;
  CategoryClick: () => void;
  ProductClick: () => void;
};

type ProductForm = Omit<Product, "id"> & { price?: number };

type InputType = "add" | "edit";

export function ProductPage(props: ProductPageProps) {
  const [inputProduct, setInputProduct] = useState<ProductForm>({
    title: "",
    categoryId: 1,
    price: 0,
  });
  // const [product, setProduct] = useState<Product | null>(null); // contoh
  const [inputType, setInputType] = useState<InputType>("add");
  const [idEditProduct, setIdEditProduct] = useState<number>(0);
  const {
    products,
    errorMassageFetchProduct,
    reFetchProduct,
    isLoadingFetchProduct,
  } = useFetchProduct();
  const { categories, errorMessageFetch, isLoadingFetch } =
    useFetchCategories();
  const { isLoadingCreate, errorMessageCreate, submit } = useCreateProduct();
  const { delProduct, errorMessageDelete, isLoadingDelete } =
    useDeleteProduct();
  const { isLoadingEdit, errorMessageEdit, updateProduct } = useEditProduct();

  function onAddProduct(props: ProductForm) {
    const newProduct = { ...props };
    submit(newProduct).then(() => {
      setInputProduct({
        title: "",
        categoryId: 1,
        price: 0,
      });
      reFetchProduct();
    });
  }

  function onEditProduct(props: ProductForm) {
    updateProduct({
      id: idEditProduct,
      title: props.title,
      price: props.price,
      categoryId: props.categoryId,
    }).then(() => {
      setInputProduct({
        title: "",
        categoryId: 1,
        price: 0,
      });
      setIdEditProduct(0);
      reFetchProduct();
    });
  }

  function categoryTitle(categoryId: number) {
    const nameCategory = categories.find(
      (category) => category.id === categoryId
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
        {categories.map((category) => {
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
        onClick={() => {
          inputType === "add"
            ? onAddProduct(inputProduct)
            : onEditProduct(inputProduct);
        }}
      ></input>
      {(function () {
        if (
          isLoadingCreate ||
          isLoadingDelete ||
          isLoadingEdit ||
          isLoadingFetchProduct ||
          isLoadingFetch
        ) {
          return <p>Data is Loading</p>;
        } else if (
          errorMessageCreate ||
          errorMessageDelete ||
          errorMessageEdit ||
          errorMassageFetchProduct ||
          errorMessageFetch
        ) {
          return (
            <p>
              {errorMessageCreate ||
                errorMessageDelete ||
                errorMessageEdit ||
                errorMassageFetchProduct ||
                errorMessageFetch}
            </p>
          );
        } else if (products.length === 0) {
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
                {products.map((product) => {
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
                          onClick={() =>
                            delProduct({
                              id: product.id,
                              title: product.title,
                              price: product.price,
                              categoryId: product.categoryId,
                            }).then(() => {
                              reFetchProduct();
                            })
                          }
                        ></input>
                        <input
                          type="button"
                          value="Edit"
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
