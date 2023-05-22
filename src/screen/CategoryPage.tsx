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

export type FetchCategories = {
  categories: Category[];
  errorMessage: string;
  isLoading: boolean;
  reFetch: () => void;
};

type CreateCategory = {
  isLoading: boolean;
  errorMessage: string;
  submit: (props: CategoryRequest) => Promise<void>;
};

type DeleteCategory = {
  isLoading: boolean;
  errorMessage: string;
  delCategory: (props: Category) => Promise<void>;
};

type EditCategory = {
  isLoading: boolean;
  errorMessage: string;
  updateCategory: (props: Category) => Promise<void>;
};

export function CategoryPage(props: CategoryPageProps) {
  const [input, setInput] = useState("");
  const [inputType, setInputType] = useState<InputType>("input");
  const [idEdit, setIdEdit] = useState<number | null>(null);
  const fetchCategories: FetchCategories = useFetchCategories();
  const createCategory: CreateCategory = useCreateCategory();
  const deleteCategory: DeleteCategory = useDeleteCategory();
  const editCategory: EditCategory = useEditCategory();

  function onAddCategory(props: CategoryRequest) {
    createCategory.submit({ title: props.title }).then(() => {
      setInput("");
      fetchCategories.reFetch();
    });
  }
  function onEditCategory(props: Category) {
    editCategory
      .updateCategory({ id: props.id, title: props.title })
      .then(() => {
        setInputType("input");
        setInput("");
        setIdEdit(null);
        fetchCategories.reFetch();
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
        disabled={createCategory.isLoading ? true : false}
        onClick={() => {
          inputType === "input"
            ? onAddCategory({ title: input })
            : !idEdit
            ? console.log("asd") //perlu di cari penggantinya
            : onEditCategory({ id: idEdit, title: input });
        }}
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
                {fetchCategories.categories.map((category) => {
                  return (
                    <tr key={category.id}>
                      <td>{category.id}</td>
                      <td>{category.title}</td>
                      <td>
                        <input
                          type="button"
                          value="Delete"
                          disabled={deleteCategory.isLoading ? true : false}
                          onClick={() =>
                            deleteCategory
                              .delCategory({
                                id: category.id,
                                title: category.title,
                              })
                              .then(() => {
                                fetchCategories.reFetch();
                              })
                          }
                        ></input>
                        <input
                          type="button"
                          value="Edit"
                          disabled={editCategory.isLoading ? true : false}
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
