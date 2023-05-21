import { useState } from "react";
import { NavBar } from "../component/NavBar";
import {
  Category,
  CategoryRequest,
  useCreateCategory,
  useDeleteCategory,
  useEditCategory,
  useFetchCategories,
} from "../domain/categories";

type CategoryPageProps = {
  HomeClick: () => void;
  CategoryClick: () => void;
  ProductClick: () => void;
};

type InputType = "input" | "edit";

export function CategoryPage(props: CategoryPageProps) {
  const [input, setInput] = useState("");
  const [inputType, setInputType] = useState<InputType>("input");
  const [idEdit, setIdEdit] = useState<number>(0);
  const { categories, errorMessageFetch, reFetch, isLoadingFetch } =
    useFetchCategories();
  const { isLoadingCreate, errorMessageCreate, submit } = useCreateCategory();
  const { isLoadingDelete, errorMessageDelete, delCategory } =
    useDeleteCategory();
  const { isLoadingEdit, errorMessageEdit, updateCategory } = useEditCategory();

  function onAddCategory(props: CategoryRequest) {
    submit({ title: props.title }).then(() => {
      setInput("");
      reFetch();
    });
  }
  function onEditCategory(props: Category) {
    updateCategory({ id: props.id, title: props.title }).then(() => {
      setInputType("input");
      setInput("");
      setIdEdit(0);
      reFetch();
    });
  }
  return (
    <div>
      <NavBar
        onClickHome={props.HomeClick}
        onClickCategory={props.CategoryClick}
        onClickProduct={props.ProductClick}
      />
      <p>Welcome to Category Page</p>
      <span>Category Name : </span>
      <input
        type="text"
        id="inputCategory"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      ></input>
      <input
        type="button"
        value={inputType === "input" ? "Add" : "Update"}
        onClick={() => {
          inputType === "input"
            ? onAddCategory({ title: input })
            : onEditCategory({ id: idEdit, title: input });
        }}
      ></input>
      {(function () {
        if (
          isLoadingFetch ||
          isLoadingCreate ||
          isLoadingDelete ||
          isLoadingEdit
        ) {
          return <p>Data is Loading</p>;
        } else if (
          errorMessageCreate ||
          errorMessageDelete ||
          errorMessageEdit ||
          errorMessageFetch
        ) {
          return (
            <p>
              {errorMessageCreate ||
                errorMessageDelete ||
                errorMessageEdit ||
                errorMessageFetch}
            </p>
          );
        } else if (categories.length === 0) {
          return <p>Data Empty</p>;
        } else {
          return (
            <table
              style={
                inputType === "edit"
                  ? { display: "none" }
                  : { display: "table" }
              }
            >
              <thead>
                <tr>
                  <th>ID Category</th>
                  <th>Title</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {categories.map((category) => {
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
                          onClick={() => {
                            setIdEdit(category.id);
                            setInput(category.title);
                            setInputType("edit");
                          }}
                        ></input>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          );
        }
      })()}
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
