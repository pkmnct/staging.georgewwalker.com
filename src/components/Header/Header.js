import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Logo from "../Logo";

const StyledLink = styled(Link)`
  text-decoration: none;
  color: #fff;
`;

const StyledHeader = styled.header`
  flex-grow: 1;
`;

const Header = () => {
  return (
    <StyledHeader>
      <StyledLink to="/">
        <Logo />
      </StyledLink>
    </StyledHeader>
  );
};

export default Header;
