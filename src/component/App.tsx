import { useEffect, useState } from "react";
import { HomePage } from "../screen/HomePage";
import { CategoryPage } from "../screen/CategoryPage";
import { ProductPage } from "../screen/ProductPage";
import { TransactionPage } from "../screen/TransactionPage";

export function App() {
  const [path, setPath] = useState(window.location.pathname);
  useEffect(() => {
    history.pushState(null, "", path);
  }, [path]);

  const onClickHome = () => setPath("/home");
  const onClickProduct = () => setPath("/product");
  const onClickCategory = () => setPath("/category");
  const onClickTransaction = () => setPath("/transaction");

  if (path === "/home") {
    return (
      <HomePage
        HomeClick={onClickHome}
        CategoryClick={onClickCategory}
        ProductClick={onClickProduct}
        TransactionClick={onClickTransaction}
      />
    );
  } else if (path === "/category") {
    return (
      <CategoryPage
        HomeClick={onClickHome}
        CategoryClick={onClickCategory}
        ProductClick={onClickProduct}
        TransactionClick={onClickTransaction}
      />
    );
  } else if (path === "/product") {
    return (
      <ProductPage
        HomeClick={onClickHome}
        CategoryClick={onClickCategory}
        ProductClick={onClickProduct}
        TransactionClick={onClickTransaction}
      />
    );
  } else if (path === "/transaction" || path === "/") {
    return (
      <TransactionPage
        HomeClick={onClickHome}
        CategoryClick={onClickCategory}
        ProductClick={onClickProduct}
        TransactionClick={onClickTransaction}
      />
    );
  } else return <p>Page not found</p>;
}
