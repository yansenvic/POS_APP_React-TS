import { HomePage } from "../screen/HomePage";
import { CategoryPage } from "../screen/CategoryPage";
import { ProductPage } from "../screen/ProductPage";
import { TransactionPage } from "../screen/TransactionPage";
import { PathProvider, Route } from "../context/PathContext";

export function App() {
  return (
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
    </PathProvider>
  );
}
