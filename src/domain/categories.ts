import { useState, useEffect } from "react";

export type Category = {
  id: number;
  title: string;
};

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

export function fetchData() {
  return fetch(`http://localhost:3000/category`)
    .then((result) => {
      return result.json();
    })
    .then((data: Category[]) => {
      const categoryData = [...data];
      console.log(categoryData);
      return categoryData;
    });
}
