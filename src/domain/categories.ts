import { useState, useEffect } from "react";

export type Category = {
  id: number;
  title: string;
};

export type CategoryRequest = Omit<Category, "id">;

export function fetchData() {
  return fetch(`http://localhost:3000/category`)
    .then((result) => result.json())
    .then((data: Category[]) => data);
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
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    setIsLoading(true);
    fetchData()
      .then((data) => {
        setCategories(data);
        setErrorMessage("");
      })
      .catch((err) => {
        setCategories([]);
        setErrorMessage(`${err.message} + error in get data`);
      })
      .finally(() => setIsLoading(false));
  }, []);
  function reFetch() {
    setIsLoading(true);
    fetchData()
      .then((data) => {
        setCategories(data);
        setErrorMessage("");
      })
      .catch((err) => {
        setCategories([]);
        setErrorMessage(`${err.message} + error in get data`);
      })
      .finally(() => setIsLoading(false));
  }
  return { categories, errorMessage, reFetch, isLoading };
}

export function useCreateCategory() {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  function submit(props: CategoryRequest) {
    setIsLoading(true);
    return postCategory(props)
      .then(() => setErrorMessage(""))
      .catch((err) => setErrorMessage(`${err.message} + error in create`))
      .finally(() => setIsLoading(false));
  }
  return { isLoading, errorMessage, submit };
}

export function useDeleteCategory() {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  function delCategory(props: Category) {
    setIsLoading(true);
    return deleteCategory(props)
      .then(() => setErrorMessage(""))
      .catch((err) => setErrorMessage(`${err.message} + error in delete`))
      .finally(() => setIsLoading(false));
  }
  return { isLoading, errorMessage, delCategory };
}

export function useEditCategory() {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  function updateCategory(props: Category) {
    setIsLoading(true);
    return editCategory(props)
      .then(() => setErrorMessage(""))
      .catch((err) => setErrorMessage(`${err.message} + error in edit`))
      .finally(() => setIsLoading(false));
  }
  return { isLoading, errorMessage, updateCategory };
}
