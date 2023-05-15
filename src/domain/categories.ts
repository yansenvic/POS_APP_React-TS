import { useState, useEffect } from "react";

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

export function postData(props: Category) {
  fetch(`http://localhost:3000/category`, {
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

//ini namanya custom hooks
export function useFetchCategories() {
  const [categories, setCategories] = useState<Category[]>();
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
  return { categories, reFetch };
}
