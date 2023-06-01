import { styled } from "styled-components";
import { useProfileContext } from "../context/ProfileContext";

const Div = styled.div`
  display: flex;
  justify-content: space-between;
  background: #0000ff;
  color: white;
`;

export function Navbar() {
  const { name } = useProfileContext();
  return (
    <Div>
      <span>{name === "" ? "" : `Your name : ${name}`}</span>
      <span>login</span>
    </Div>
  );
}
