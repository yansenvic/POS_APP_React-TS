import { useState, useEffect } from "react";

export type Product = {
  id: number;
  title: string;
  price: number;
  categoryId: number;
};

export type ProductRequest = Omit<Product, "id">;

export function fetchData(filterTitle: string) {
  return fetch(`http://localhost:3000/product?title_like=${filterTitle}`)
    .then((result) => {
      return result.json();
    })
    .then((data: Product[]) => data);
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

export function deleteProduct(id: number) {
  return fetch(`http://localhost:3000/product/` + id, {
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

export function useFetchProduct(filterTitle: string) {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMassage, setErrorMassage] = useState("");
  useEffect(() => {
    setIsLoading(true);
    fetchData(filterTitle)
      .then((data) => {
        setProducts(data);
        setErrorMassage("");
      })
      .catch((err) => {
        setProducts([]);
        setErrorMassage(err.message);
      })
      .finally(() => setIsLoading(false));
  }, []);
  function reFetch() {
    setIsLoading(true);
    fetchData(filterTitle)
      .then((data) => {
        setProducts(data);
        setErrorMassage("");
      })
      .catch((err) => {
        setProducts([]);
        setErrorMassage(err.message);
      })
      .finally(() => setIsLoading(false));
  }
  return {
    products,
    reFetch,
    errorMassage,
    isLoading,
  };
}

export function useCreateProduct() {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  function submit(props: ProductRequest) {
    setIsLoading(true);
    return postProduct(props)
      .then(() => setErrorMessage(""))
      .catch((err) => setErrorMessage(err.message))
      .finally(() => setIsLoading(false));
  }
  return { isLoading, errorMessage, submit };
}

export function useDeleteProduct() {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  function submit(id: number) {
    setIsLoading(true);
    return deleteProduct(id)
      .then(() => setErrorMessage(""))
      .catch((err) => setErrorMessage(err.message))
      .finally(() => setIsLoading(false));
  }
  return { isLoading, errorMessage, submit };
}

export function useEditProduct() {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  function updateProduct(props: Product) {
    setIsLoading(true);
    return editProduct(props)
      .then(() => setErrorMessage(""))
      .catch((err) => setErrorMessage(err.message))
      .finally(() => setIsLoading(false));
  }
  return { isLoading, errorMessage, updateProduct };
}
