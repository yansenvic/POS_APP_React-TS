import { useState, useEffect } from "react";

export type Product = {
  id: number;
  title: string;
  price: number;
  categoryId: number;
  name: {
    fName: string;
    LName: string;
  };
};

export function fetchData() {
  return fetch(`http://localhost:3000/product`)
    .then((result) => {
      return result.json();
    })
    .then((data: Product[]) => {
      return [...data];
    });
}

export function postProduct(props: Product) {
  return fetch(`http://localhost:3000/product`, {
    method: "POST",
    body: JSON.stringify({
      id: props.id,
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
  const [products, setProducts] = useState<Product[]>();
  const [isLoadingFetchProduct, setIsLoadingFetchProduct] = useState(false);
  useEffect(() => {
    fetchData().then((products) => {
      setProducts(products);
    });
  }, []);
  function reFetchProduct() {
    fetchData().then((products) => {
      setProducts(products);
    });
  }
  return { products, reFetchProduct, isLoadingFetchProduct };
}

export function useCreateProduct() {
  const [isLoadingCreate, setIsLoadingCreate] = useState(false);
  function submit(props: Product) {
    setIsLoadingCreate(true);
    return postProduct(props).then(() => setIsLoadingCreate(false));
  }
  return { isLoadingCreate, submit };
}

export function useDeleteProduct() {
  const [isLoadingDelete, setIsLoadingDelete] = useState(false);
  function delProduct(props: Product) {
    setIsLoadingDelete(true);
    return deleteProduct(props).then(() => setIsLoadingDelete(false));
  }
  return { isLoadingDelete, delProduct };
}

export function useEditProduct() {
  const [isLoadingEdit, setIsLoadingEdit] = useState(false);
  function updateProduct(props: Product) {
    setIsLoadingEdit(true);
    return editProduct(props).then(() => setIsLoadingEdit(false));
  }
  return { isLoadingEdit, updateProduct };
}
