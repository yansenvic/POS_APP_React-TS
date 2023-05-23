import { useState } from "react";
import { NavBar } from "../component/NavBar";
import {
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

type CategoryForm =
  | {
      type: "add";
      selectedId: null;
      title: string;
    }
  | { type: "edit"; selectedId: number; title: string };

const defaultInputCategory: CategoryForm = {
  type: "add",
  selectedId: null,
  title: "",
};

export function CategoryPage(props: CategoryPageProps) {
  const [inputCategory, setInputCategory] =
    useState<CategoryForm>(defaultInputCategory);
  const fetchCategories = useFetchCategories();
  const createCategory = useCreateCategory();
  const deleteCategory = useDeleteCategory();
  const editCategory = useEditCategory();

  function onInputCategory(props: CategoryForm) {
    if (props.type === "add") {
      createCategory.submit({ title: props.title }).then(() => {
        setInputCategory(defaultInputCategory);
        fetchCategories.reFetch();
      });
    } else if (props.type === "edit") {
      editCategory
        .updateCategory({ id: props.selectedId, title: props.title })
        .then(() => {
          setInputCategory(defaultInputCategory);
          fetchCategories.reFetch();
        });
    } else return;
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
        value={inputCategory.title}
        onChange={(e) =>
          setInputCategory({ ...inputCategory, title: e.target.value })
        }
      ></input>
      <input
        type="button"
        value={inputCategory.type === "add" ? "Add" : "Update"}
        disabled={createCategory.isLoading}
        onClick={() => onInputCategory(inputCategory)}
      ></input>
      {(function () {
        if (fetchCategories.isLoading) {
          return <p>Data is Loading</p>;
        } else if (
          createCategory.errorMessage ||
          deleteCategory.errorMessage ||
          editCategory.errorMessage ||
          fetchCategories.errorMessage
        ) {
          return (
            <p>
              {createCategory.errorMessage ||
                deleteCategory.errorMessage ||
                editCategory.errorMessage ||
                fetchCategories.errorMessage}
            </p>
          );
        } else if (fetchCategories.categories.length === 0) {
          return <p>Data Empty</p>;
        } else {
          return (
            <table
              style={
                inputCategory.type === "edit"
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
                {fetchCategories.categories.map((category) => {
                  return (
                    <tr key={category.id}>
                      <td>{category.id}</td>
                      <td>{category.title}</td>
                      <td>
                        <input
                          type="button"
                          value="Delete"
                          disabled={deleteCategory.isLoading}
                          onClick={() =>
                            deleteCategory
                              .delCategory({
                                id: category.id,
                                title: category.title,
                              })
                              .then(fetchCategories.reFetch)
                          }
                        ></input>
                        <input
                          type="button"
                          value="Edit"
                          disabled={editCategory.isLoading}
                          onClick={() => {
                            setInputCategory({
                              selectedId: category.id,
                              title: category.title,
                              type: "edit",
                            });
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
