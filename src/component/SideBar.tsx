import { styled } from "styled-components";
import { Link } from "./Link";

type SideBarProps = {
  onClickHome: () => void;
  onClickCategory: () => void;
  onClickProduct: () => void;
  onClickTransaction: () => void;
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
  const linkTransaction = Link({
    pathname: "/transaction",
    label: "Transaction",
    onClick: props.onClickTransaction,
  });
  return (
    <Div>
      {linkHome}
      {linkCategory}
      {linkProduct}
      {linkTransaction}
    </Div>
  );
}
