import styled from "styled-components";
import React from "react";

const StyledNav = styled.nav`
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  transform-origin: 0 0;
  width: 100%;
`;

interface NavigationProps extends React.HTMLAttributes<HTMLElement> {}

const Navigation = (props: NavigationProps) => {
  return <StyledNav {...props} />;
};

export default Navigation;
