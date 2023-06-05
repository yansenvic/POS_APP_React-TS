import { styled } from "styled-components";
import { useProfileContext } from "../context/ProfileContext";
import { usePageMode } from "../context/PageModeContext";

const Div = styled.div`
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid black;
`;

export function Navbar() {
  const { name } = useProfileContext();
  const { darkMode, setDarkMode } = usePageMode();
  return (
    <Div>
      <span>{name === "" ? `` : `Your name : ${name}`}</span>
      <input
        type="button"
        value={darkMode === false ? "Dark Mode" : "White Mode"}
        onClick={() => setDarkMode(!darkMode)}
      />
    </Div>
  );
}
