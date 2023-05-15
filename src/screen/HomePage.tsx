import { NavBar } from "../component/NavBar";

type HomePageProps = {
  HomeClick: () => void;
  CategoryClick: () => void;
  ProductClick: () => void;
};

export function HomePage(props: HomePageProps) {
  return (
    <div>
      <NavBar
        onClickHome={props.HomeClick}
        onClickCategory={props.CategoryClick}
        onClickProduct={props.ProductClick}
      />
      <p>Welcome to Home Page</p>
    </div>
  );
}
