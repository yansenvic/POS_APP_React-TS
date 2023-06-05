import { styled } from "styled-components";

export type LinkProps = {
  pathname: string;
  label: string;
  onClick: () => void;
};

const A = styled.a`
  & {
    font-family: arial;
    font-weight: bold;
    text-decoration: none;
    font-size: 20px;
    text-align: center;
    padding: 20px;
    transition: background-color 1s;
    color: inherit;
  }
  &:hover {
    background-color: #004369;
    color: white;
  }
`;

export function Link(props: LinkProps) {
  return (
    <A
      href={props.pathname}
      onClick={(e) => {
        e.preventDefault();
        props.onClick();
      }}
    >
      {props.label}
    </A>
  );
}
