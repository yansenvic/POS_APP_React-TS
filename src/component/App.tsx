import { useEffect, useState } from "react";
import { HomePage } from "../screen/HomePage";
import { CategoryPage } from "../screen/CategoryPage";
import { ProductPage } from "../screen/ProductPage";

export function App() {
  const [path, setPath] = useState(window.location.pathname);
  useEffect(() => {
    history.pushState(null, "", path);
  }, [path]);

  const onClickHome = () => setPath("/home");
  const onClickProduct = () => setPath("/product");
  const onClickCategory = () => setPath("/category");

  // const homePage = HomePage({
  //   HomeClick: onClickHome,
  //   CategoryClick: onClickCategory,
  //   ProductClick: onClickProduct,
  // });
  // const categoryPage = CategoryPage({
  //   HomeClick: onClickHome,
  //   CategoryClick: onClickCategory,
  //   ProductClick: onClickProduct,
  // });
  // const productPage = ProductPage({
  //   HomeClick: onClickHome,
  //   CategoryClick: onClickCategory,
  //   ProductClick: onClickProduct,
  // });

  if (path === "/home" || path === "/") {
    return (
      <HomePage
        HomeClick={onClickHome}
        CategoryClick={onClickCategory}
        ProductClick={onClickProduct}
      />
    );
  } else if (path === "/category") {
    return (
      <CategoryPage
        HomeClick={onClickHome}
        CategoryClick={onClickCategory}
        ProductClick={onClickProduct}
      />
    );
  } else if (path === "/product") {
    return (
      <ProductPage
        HomeClick={onClickHome}
        CategoryClick={onClickCategory}
        ProductClick={onClickProduct}
      />
    );
  } else return <p>Page not found</p>;
}
