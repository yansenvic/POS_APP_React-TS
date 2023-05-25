import { styled } from "styled-components";
import { Link } from "./Link";

type SideBarProps = {
  onClickHome: () => void;
  onClickCategory: () => void;
  onClickProduct: () => void;
};

const Div = styled.div`
  & {
    display: flex;
    flex-flow: column;
  }
`;

export function SideBar(props: SideBarProps) {
  const linkHome = Link({
    pathname: "/home",
    label: "Home",
    onClick: props.onClickHome,
  });
  const linkCategory = Link({
    pathname: "/category",
    label: "Category",
    onClick: props.onClickCategory,
  });
  const linkProduct = Link({
    pathname: "/product",
    label: "Product",
    onClick: props.onClickProduct,
  });
  return (
    <Div>
      {linkHome}
      {linkCategory}
      {linkProduct}
    </Div>
  );
}
