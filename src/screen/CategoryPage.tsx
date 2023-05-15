import { useEffect, useState } from "react";
import { NavBar } from "../component/NavBar";
import { fetchData, useFetchCategories } from "../domain/categories";

type CategoryPageProps = {
  HomeClick: () => void;
  CategoryClick: () => void;
  ProductClick: () => void;
};

export function CategoryPage(props: CategoryPageProps) {
  const [input, setInput] = useState("");
  // const [categories,setCategories] = useState<Category[]>()
  // useEffect(()=> {
  //     fetchData()
  //     .then((categories)=>{
  //         setCategories(categories)
  //     })
  // },[])
  const { categories } = useFetchCategories();
  // const navBar = NavBar({
  //     onClickHome : props.HomeClick,
  //     onClickCategory: props.CategoryClick,
  //     onClickProduct : props.ProductClick
  // })

  return (
    <div>
      <NavBar
        onClickHome={props.HomeClick}
        onClickCategory={props.CategoryClick}
        onClickProduct={props.ProductClick}
      />
      {/* {navBar} */}
      <p>Welcome to Category Page</p>
      <span>Input New Category : </span>
      <input
        type="text"
        id="inputCategory"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      ></input>
      <input type="button" value="Add" onClick={() => console.log("a")}></input>
    </div>
  );
}
