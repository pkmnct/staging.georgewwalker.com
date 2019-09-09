import React from "react";
import styled from "styled-components";
import {
  Link,
  withRouter,
  RouteComponentProps,
  LinkProps
} from "react-router-dom";
import classnames from "classnames";
import { gradientCss } from "./Backgrounds/Gradient";

interface NavigationLinkProps extends RouteComponentProps, LinkProps {}

const StyledLink = styled(Link)`
  color: #fff;
  text-decoration: none;
  text-align: center;
  font-family: "Cousine", monospace;
  font-weight: bold;
  background: transparent;
  transition: background ease-in-out 0.3s, color ease-in-out 0.3s;
  padding: 0.25em 0.5em;
  margin: 0 0.5em;
  position: relative;
  &:hover,
  &.current {
    transition: background ease-in-out 0.3s 0.4s, color ease-in-out 0.3s 0.4s;
    color: transparent;
    ${gradientCss}
    -webkit-background-clip: text;
  }
  &:after {
    content: "";
    z-index: -1;
    position: absolute;
    left: 0;
    bottom: 0;
    height: 0.25em;
    background: #fff;
    transition: width ease-in-out 0.3s, height ease-in-out 0.3s 0.4s;
    width: 0;
  }
  &:hover:after,
  &.current:after {
    width: 100%;
    height: 100%;
    z-index: -1;
    transition: width ease-in-out 0.3s, height ease-in-out 0.3s 0.4s;
  }
`;

const NavigationLink = (props: NavigationLinkProps) => {
  const {
    location,
    className,
    history,
    match,
    staticContext,
    ...otherProps
  } = props;

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
