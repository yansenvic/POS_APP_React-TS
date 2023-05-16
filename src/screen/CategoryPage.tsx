import { useState } from "react";
import { NavBar } from "../component/NavBar";
import {
  useCreateCategory,
  useDeleteCategory,
  useFetchCategories,
} from "../domain/categories";

type CategoryPageProps = {
  HomeClick: () => void;
  CategoryClick: () => void;
  ProductClick: () => void;
};

export function CategoryPage(props: CategoryPageProps) {
  const [input, setInput] = useState("");
  const { categories, reFetch, isLoadingFetch } = useFetchCategories();
  const { isLoadingCreate, submit } = useCreateCategory();
  const { isLoadingDelete, delCategory } = useDeleteCategory();
  return (
    <div>
      <NavBar
        onClickHome={props.HomeClick}
        onClickCategory={props.CategoryClick}
        onClickProduct={props.ProductClick}
      />
      <p>Welcome to Category Page</p>
      <span>Input New Category : </span>
      <input
        type="text"
        id="inputCategory"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      ></input>
      <input
        type="button"
        value="Add"
        onClick={() => {
          const id = categories ? categories[categories?.length - 1].id + 1 : 1;
          submit({ id: id, title: input }).then(() => {
            setInput("");
            reFetch();
          });
        }}
      ></input>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {categories?.map((category) => {
            return (
              <tr key={category.id}>
                <td>{category.id}</td>
                <td>{category.title}</td>
                <td>
                  <input
                    type="button"
                    value="Delete"
                    onClick={() =>
                      delCategory({
                        id: category.id,
                        title: category.title,
                      }).then(() => {
                        reFetch();
                      })
                    }
                  ></input>
                  <input
                    type="button"
                    value="Edit"
                    onClick={() =>
                      console.log(`${category.id} + ${category.title} `)
                    }
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

// const [categories,setCategories] = useState<Category[]>()
// useEffect(()=> {
//     fetchData()
//     .then((categories)=>{
//         setCategories(categories)
//     })
// },[])
// const navBar = NavBar({
//     onClickHome : props.HomeClick,
//     onClickCategory: props.CategoryClick,
//     onClickProduct : props.ProductClick
// })
// function postNewCategories(value: string) {
//   const id = categories ? categories[categories?.length - 1].id + 1 : 1;
//   postData({ id: id, title: value });
// }
