import { SideBar } from "../component/SideBar";
import { Navbar } from "../component/NavBar";
import styled from "styled-components";

type HomePageProps = {
  HomeClick: () => void;
  CategoryClick: () => void;
  ProductClick: () => void;
  TransactionClick: () => void;
};

export const Header = styled.h2`
  color: black;
  text-align: center;
`;

const Div = styled.div`
  display: grid;
  grid-template-columns: 15% 85%;
  height: 500px;
`;

export function HomePage(props: HomePageProps) {
  return (
    <div>
      <Navbar />
      <Div>
        <div>
          <SideBar
            onClickHome={props.HomeClick}
            onClickCategory={props.CategoryClick}
            onClickProduct={props.ProductClick}
            onClickTransaction={props.TransactionClick}
          />
        </div>
        <div>
          <Header>Welcome to Home Page</Header>
        </div>
      </Div>
    </div>
  );
}
