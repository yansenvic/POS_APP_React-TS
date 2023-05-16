import { useState, useEffect } from "react";
import { CategoryPage } from "../screen/CategoryPage";

export type Category = {
  id: number;
  title: string;
};

export function fetchData() {
  return fetch(`http://localhost:3000/category`)
    .then((result) => {
      return result.json();
    })
    .then((data: Category[]) => {
      return [...data];
    });
}

export function postCategory(props: Category) {
  return fetch(`http://localhost:3000/category`, {
    method: "POST",
    body: JSON.stringify({
      id: props.id,
      title: props.title,
    }),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  });
}

export function deleteCategory(props: Category) {
  return fetch(`http://localhost:3000/category/` + props.id, {
    method: "DELETE",
  });
}

//ini namanya custom hooks
export function useFetchCategories() {
  const [categories, setCategories] = useState<Category[]>();
  const [isLoadingFetch, setIsLoadingFetch] = useState(false);
  useEffect(() => {
    fetchData().then((categories) => {
      setCategories(categories);
    });
  }, []);
  function reFetch() {
    fetchData().then((categories) => {
      setCategories(categories);
    });
  }
  return { categories, reFetch, isLoadingFetch };
}

export function useCreateCategory() {
  const [isLoadingCreate, setIsLoadingCreate] = useState(false);
  function submit(props: Category) {
    setIsLoadingCreate(true);
    return postCategory(props).then(() => {
      setIsLoadingCreate(false);
    });
  }
  return { isLoadingCreate, submit };
}

export function useDeleteCategory() {
  const [isLoadingDelete, setIsLoadingDelete] = useState(false);
  function delCategory(props: Category) {
    setIsLoadingDelete(true);
    return deleteCategory(props).then(() => setIsLoadingDelete(false));
  }
  return { isLoadingDelete, delCategory };
}
