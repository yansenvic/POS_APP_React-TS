import { useState, useEffect } from "react";

export type Category = {
  id: number;
  title: string;
};

export type CategoryRequest = Omit<Category, "id">;

export function fetchData() {
  return fetch(`http://localhost:3000/category`).then((result) => {
    return result.json();
  });
}

export function postCategory(props: CategoryRequest) {
  return fetch(`http://localhost:3000/category`, {
    method: "POST",
    body: JSON.stringify({
      title: props.title,
    }),
    headers: { "Content-type": "application/json; charset=UTF-8" },
  });
}

export function deleteCategory(props: Category) {
  return fetch(`http://localhost:3000/category/` + props.id, {
    method: "DELETE",
  });
}

export function editCategory(props: Category) {
  return fetch(`http://localhost:3000/category/` + props.id, {
    method: "PUT",
    body: JSON.stringify({
      id: props.id,
      title: props.title,
    }),
    headers: { "Content-type": "application/json; charset=UTF-8" },
  });
}

//ini namanya custom hooks
export function useFetchCategories() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [errorMessageFetch, seterrorMessageFetch] = useState<string>("");
  const [isLoadingFetch, setIsLoadingFetch] = useState(false);
  useEffect(() => {
    setIsLoadingFetch(true);
    fetchData()
      .then((data: Category[]) => {
        setCategories([...data]);
        setIsLoadingFetch(false);
      })
      .catch((err) => {
        setCategories([]);
        seterrorMessageFetch(`${err.message} + error in get data`);
        setIsLoadingFetch(false);
      });
  }, []);
  function reFetch() {
    setIsLoadingFetch(true);
    fetchData()
      .then((data: Category[]) => {
        setCategories([...data]);
        setIsLoadingFetch(false);
      })
      .catch((err) => {
        setCategories([]);
        seterrorMessageFetch(`${err.message} + error in get data`);
        setIsLoadingFetch(false);
      });
  }
  return { categories, errorMessageFetch, reFetch, isLoadingFetch };
}

export function useCreateCategory() {
  const [isLoadingCreate, setIsLoadingCreate] = useState(false);
  const [errorMessageCreate, seterrorMessageCreate] = useState("");
  function submit(props: CategoryRequest) {
    setIsLoadingCreate(true);
    return postCategory(props)
      .then(() => {
        setIsLoadingCreate(false);
      })
      .catch((err) => {
        seterrorMessageCreate(`${err.message} + error in create`);
        setIsLoadingCreate(false);
      });
  }
  return { isLoadingCreate, errorMessageCreate, submit };
}

export function useDeleteCategory() {
  const [isLoadingDelete, setIsLoadingDelete] = useState(false);
  const [errorMessageDelete, setErrorMessageDelete] = useState("");
  function delCategory(props: Category) {
    setIsLoadingDelete(true);
    return deleteCategory(props)
      .then(() => setIsLoadingDelete(false))
      .catch((err) => {
        setErrorMessageDelete(`${err.message} + error in delete`);
        setIsLoadingDelete(false);
      });
  }
  return { isLoadingDelete, errorMessageDelete, delCategory };
}

export function useEditCategory() {
  const [isLoadingEdit, setIsLoadingEdit] = useState(false);
  const [errorMessageEdit, setErrorMessageEdit] = useState("");
  function updateCategory(props: Category) {
    setIsLoadingEdit(true);
    return editCategory(props)
      .then(() => setIsLoadingEdit(false))
      .catch((err) => {
        setErrorMessageEdit(`${err.message} + error in edit`);
        setIsLoadingEdit(false);
      });
  }
  return { isLoadingEdit, errorMessageEdit, updateCategory };
}
