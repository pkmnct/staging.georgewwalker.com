import React, { HTMLProps } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Logo from "./Logo";

const StyledLink = styled(Link)`
  text-decoration: none;
  color: #fff;
`;

const StyledHeader = styled.header`
  text-align: center;
`;

const Header = (props: HTMLProps<HTMLElement>) => {
  return (
    <StyledHeader>
      <StyledLink to="/">
        <Logo />
      </StyledLink>
      {props.children}
    </StyledHeader>
  );
};

export default Header;
