import { SideBar } from "../component/SideBar";
import { Navbar } from "../component/NavBar";
import styled from "styled-components";

type HomePageProps = {};

export const Header = styled.h2`
  text-align: center;
`;

const Div = styled.div`
  display: grid;
  grid-template-columns: 15% 85%;
  height: 500px;
`;

export function HomePage(_props: HomePageProps) {
  return (
    <div>
      <Navbar />
      <Div>
        <div>
          <SideBar />
        </div>
        <div>
          <Header>Welcome to Home Page</Header>
        </div>
      </Div>
    </div>
  );
}
