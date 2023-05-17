import { NavBar } from "../component/NavBar";
import { useState } from "react";
import { useFetchCategories } from "../domain/categories";
import {
  Product,
  useCreateProduct,
  useFetchProduct,
  useDeleteProduct,
} from "../domain/product";

type ProductPageProps = {
  HomeClick: () => void;
  CategoryClick: () => void;
  ProductClick: () => void;
};

export function ProductPage(props: ProductPageProps) {
  const [inputProduct, setInputProduct] = useState<Product>({} as Product);
  const [inputCategoryProduct, setInputCategoryProduct] = useState<number>();
  const { categories, reFetch, isLoadingFetch } = useFetchCategories();
  const { products, reFetchProduct, isLoadingFetchProduct } = useFetchProduct();
  const { isLoadingCreate, submit } = useCreateProduct();
  const { delProduct, isLoadingDelete } = useDeleteProduct();
  function onAddProduct(props: Product) {
    const id = products ? products[products.length - 1].id + 1 : 1;
    const newProduct = { ...props, id: id };
    submit(newProduct).then(() => {
      reFetchProduct();
    });
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
        value={inputProduct?.title}
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
        value={inputProduct?.price}
        onChange={(e) => {
          const newPrice = { ...inputProduct, price: Number(e.target.value) };
          setInputProduct(newPrice);
        }}
      ></input>
      <br />
      <label htmlFor="inputCategoryProduct">Category Product : </label>
      <select
        id="inputCategoryProduct"
        onChange={(e) => {
          const newCategoryId = {
            ...inputProduct,
            categoryId: Number(e.target.value),
          };
          setInputProduct(newCategoryId);
        }}
      >
        {categories?.map((category) => {
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
        value="Add"
        onClick={() => {
          onAddProduct(inputProduct);
        }}
      ></input>
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
          {products?.map((product) => {
            return (
              <tr key={product.id}>
                <td>{product.id}</td>
                <td>{product.title}</td>
                <td>{product.price}</td>
                <td>{product.categoryId}</td>
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
                    // onClick={() => {
                    //   setIdEdit(category.id);
                    //   setInput(category.title);
                    //   setInputType("edit");
                    // }}
                  ></input>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
