import { styled } from "styled-components";
import { Link } from "./Link";
import { usePathContext } from "../context/PathContext";

type SideBarProps = {};

const Div = styled.div`
  & {
    display: flex;
    flex-flow: column;
  }
`;

export function SideBar(_props: SideBarProps) {
  // const { setPath } = useContext(PathContext);
  const { setPath } = usePathContext(); // custom hook usecontext
  const linkHome = Link({
    pathname: "/home",
    label: "Home",
    onClick: () => setPath("/home"),
  });
  const linkCategory = Link({
    pathname: "/category",
    label: "Category",
    onClick: () => setPath("/category"),
  });
  const linkProduct = Link({
    pathname: "/product",
    label: "Product",
    onClick: () => setPath("/product"),
  });
  const linkTransaction = Link({
    pathname: "/transaction",
    label: "Transaction",
    onClick: () => setPath("/transaction"),
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
