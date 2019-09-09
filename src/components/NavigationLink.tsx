import React from "react";
import styled from "styled-components";
import {
  Link,
  withRouter,
  RouteComponentProps,
  LinkProps
} from "react-router-dom";
import classnames from "classnames";

interface NavigationLinkProps extends RouteComponentProps, LinkProps {}

const StyledLink = styled(Link)`
  color: #fff;
  text-decoration: none;
  text-align: center;
  font-family: "Cousine", monospace;
  font-weight: bold;
  margin: 1em;
  position: relative;
  &:after {
    content: "";
    position: absolute;
    left: 0;
    top: calc(100% + 0.25em);
    height: 8px;
    width: 0;
    background-color: #fff;
    transition: width ease-in-out 0.3s;
  }
  &:hover:after,
  &.current:after {
    width: 100%;
  }
`;

const NavigationLink = (props: NavigationLinkProps) => {
  const { location, className, history, match, ...otherProps } = props;

  return (
    <StyledLink
      {...otherProps}
      className={classnames(className, {
        current: props.to === location.pathname
      })}
    >
      {props.children}
    </StyledLink>
  );
};

export default withRouter(NavigationLink);
