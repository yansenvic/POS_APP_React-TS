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
  const { setPath } = usePathContext();
  return (
    <Div>
      <Link pathname="/home" onClick={() => setPath("/home")} label="Home" />
      <Link
        pathname="/category"
        onClick={() => setPath("/category")}
        label="Category"
      />
      <Link
        pathname="/product"
        onClick={() => setPath("/product")}
        label="Product"
      />
      <Link
        pathname="/transaction"
        onClick={() => setPath("/transaction")}
        label="Transaction"
      />
    </Div>
  );
}
