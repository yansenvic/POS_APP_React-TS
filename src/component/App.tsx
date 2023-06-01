import { HomePage } from "../screen/HomePage";
import { CategoryPage } from "../screen/CategoryPage";
import { ProductPage } from "../screen/ProductPage";
import { TransactionPage } from "../screen/TransactionPage";
import { PathProvider, Route } from "../context/PathContext";
import { ProfilePage } from "../screen/ProfilePage";
import { ProfileProvider } from "../context/ProfileContext";
import { ModePage, PageModeProvider } from "../context/PageModeContext";

export function App() {
  return (
    <PathProvider>
      <PageModeProvider>
        <ModePage>
          <ProfileProvider>
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
            <Route targetPath="/profile">
              <ProfilePage />
            </Route>
          </ProfileProvider>
        </ModePage>
      </PageModeProvider>
    </PathProvider>
  );
}
