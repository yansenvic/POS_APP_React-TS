import { useEffect, useState } from "react";
import { HomePage } from "../screen/HomePage";
import { CategoryPage } from "../screen/CategoryPage";
import { ProductPage } from "../screen/ProductPage";
import { TransactionPage } from "../screen/TransactionPage";
import { PathProvider, Route } from "../context/PathContext";
import { usePathContext } from "../context/PathContext";

export function App() {
  // const [path, setPath] = useState(window.location.pathname);
  // useEffect(() => {
  //   history.pushState(null, "", path);
  // }, [path]);

  return (
    // <PathContext.Provider value={{ path, setPath }}>
    <PathProvider>
      <Route targetPath="/">
        <HomePage />
      </Route>
      <Route targetPath="/home">
        <HomePage />
      </Route>
      <Route targetPath="/category">
        <CategoryPage />
      </Route>
      <Route targetPath="/product">
        <ProductPage />
      </Route>
      <Route targetPath="/transaction">
        <TransactionPage />
      </Route>
      {/* {(function () {
        if (path === "/home" || path === "/") {
          return <HomePage />;
        } else if (path === "/category") {
          return <CategoryPage />;
        } else if (path === "/product") {
          return <ProductPage />;
        } else if (path === "/transaction") {
          return <TransactionPage />;
        } else return <p>Page not found</p>;
      })()} */}
    </PathProvider>
    // </PathContext.Provider>
  );
  // return (function () {
  //   if (path === "/home" || path === "/") {
  //     return (
  //       <div>
  //         <HomePage
  //           HomeClick={onClickHome}
  //           CategoryClick={onClickCategory}
  //           ProductClick={onClickProduct}
  //           TransactionClick={onClickTransaction}
  //         />
  //       </div>
  //     );
  //   } else if (path === "/category") {
  //     return (
  //       <CategoryPage
  //         HomeClick={onClickHome}
  //         CategoryClick={onClickCategory}
  //         ProductClick={onClickProduct}
  //         TransactionClick={onClickTransaction}
  //       />
  //     );
  //   } else if (path === "/product") {
  //     return (
  //       <ProductPage
  //         HomeClick={onClickHome}
  //         CategoryClick={onClickCategory}
  //         ProductClick={onClickProduct}
  //         TransactionClick={onClickTransaction}
  //       />
  //     );
  //   } else if (path === "/transaction") {
  //     return (
  //       <TransactionPage
  //         HomeClick={onClickHome}
  //         CategoryClick={onClickCategory}
  //         ProductClick={onClickProduct}
  //         TransactionClick={onClickTransaction}
  //       />
  //     );
  //   } else return <p>Page not found</p>;
  // })();
}
