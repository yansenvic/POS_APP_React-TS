import { Navbar } from "../component/NavBar";
import { SideBar } from "../component/SideBar";
import { styled } from "styled-components";
import { useProfileContext } from "../context/ProfileContext";
import { useState } from "react";

export const Header = styled.h2`
  text-align: center;
`;

const Div = styled.div`
  display: grid;
  grid-template-columns: 15% 85%;
  height: 500px;
`;

export function ProfilePage() {
  const [inputProfile, setInputProfile] = useState({ name: "" });
  const { name, setName } = useProfileContext();
  return (
    <div>
      <Navbar />
      <Div>
        <SideBar />
        <div>
          <Header>Welcome to Profile Page</Header>
          <span>Input your name : </span>
          <input
            type="text"
            value={inputProfile.name === name ? "" : inputProfile.name}
            onChange={(e) => {
              e.preventDefault(), setInputProfile({ name: e.target.value });
            }}
          />
          <input
            type="button"
            value="Submit"
            onClick={(e) => {
              e.preventDefault(), setName(inputProfile.name);
            }}
          />
        </div>
      </Div>
    </div>
  );
}
