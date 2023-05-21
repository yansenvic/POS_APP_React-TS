import { useState, useEffect } from "react";

export type Product = {
  id: number;
  title: string;
  price: number;
  categoryId: number;
};

export type ProductRequest = Omit<Product, "id">;

export function fetchData() {
  return fetch(`http://localhost:3000/product`).then((result) => {
    return result.json();
  });
}

export function postProduct(props: ProductRequest) {
  return fetch(`http://localhost:3000/product`, {
    method: "POST",
    body: JSON.stringify({
      title: props.title,
      price: props.price,
      categoryId: props.categoryId,
    }),
    headers: { "Content-type": "application/json; charset=UTF-8" },
  });
}

export function deleteProduct(props: Product) {
  return fetch(`http://localhost:3000/product/` + props.id, {
    method: "DELETE",
  });
}

export function editProduct(props: Product) {
  return fetch(`http://localhost:3000/product/` + props.id, {
    method: "PUT",
    body: JSON.stringify({
      id: props.id,
      title: props.title,
      price: props.price,
      categoryId: props.categoryId,
    }),
    headers: { "Content-type": "application/json; charset=UTF-8" },
  });
}

export function useFetchProduct() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoadingFetchProduct, setIsLoadingFetchProduct] = useState(false);
  const [errorMassageFetchProduct, setErrorMassageFetch] = useState("");
  useEffect(() => {
    setIsLoadingFetchProduct(true);
    fetchData()
      .then((data: Product[]) => {
        setProducts([...data]);
        setIsLoadingFetchProduct(false);
      })
      .catch((err) => {
        setProducts([]);
        setErrorMassageFetch(err.message);
        setIsLoadingFetchProduct(false);
      });
  }, []);
  function reFetchProduct() {
    setIsLoadingFetchProduct(true);
    fetchData()
      .then((data: Product[]) => {
        setProducts([...data]);
        setIsLoadingFetchProduct(false);
      })
      .catch((err) => {
        setProducts([]);
        setErrorMassageFetch(err.message);
        setIsLoadingFetchProduct(false);
      });
  }
  return {
    products,
    reFetchProduct,
    errorMassageFetchProduct,
    isLoadingFetchProduct,
  };
}

export function useCreateProduct() {
  const [isLoadingCreate, setIsLoadingCreate] = useState(false);
  const [errorMessageCreate, setErrorMessageCreate] = useState("");
  function submit(props: ProductRequest) {
    setIsLoadingCreate(true);
    return postProduct(props)
      .then(() => setIsLoadingCreate(false))
      .catch((err) => {
        setErrorMessageCreate(err.message);
        setIsLoadingCreate(false);
      });
  }
  return { isLoadingCreate, errorMessageCreate, submit };
}

export function useDeleteProduct() {
  const [isLoadingDelete, setIsLoadingDelete] = useState(false);
  const [errorMessageDelete, setErrorMessageDelete] = useState("");
  function delProduct(props: Product) {
    setIsLoadingDelete(true);
    return deleteProduct(props)
      .then(() => setIsLoadingDelete(false))
      .catch((err) => {
        setErrorMessageDelete(err.message);
        setIsLoadingDelete(false);
      });
  }
  return { isLoadingDelete, errorMessageDelete, delProduct };
}

export function useEditProduct() {
  const [isLoadingEdit, setIsLoadingEdit] = useState(false);
  const [errorMessageEdit, setErrorMessageEdit] = useState("");
  function updateProduct(props: Product) {
    setIsLoadingEdit(true);
    return editProduct(props)
      .then(() => setIsLoadingEdit(false))
      .catch((err) => {
        setErrorMessageEdit(err.message);
        setIsLoadingEdit(false);
      });
  }
  return { isLoadingEdit, errorMessageEdit, updateProduct };
}
