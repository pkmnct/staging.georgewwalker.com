import styled from "styled-components";
import { HTMLAttributes, ReactNode } from "react";
import classnames from "classnames";
import React from "react";

const Holder = styled.figure`
  position: absolute;
  z-index: -1;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  pointer-events: none;
  opacity: 0;
  transition: opacity ease-in-out 0.3s;
  margin: 0;
  &.showing {
    opacity: 1;
  }
`;

interface BackgroundHolderProps extends HTMLAttributes<HTMLElement> {
  gradient?: Boolean;
  showing?: Boolean;
  children?: ReactNode;
}

const BackgroundHolder = (props: BackgroundHolderProps) => {
  const { showing, className, ...otherProps } = props;
  return (
    <Holder
      aria-hidden="true"
      className={classnames(className, { showing })}
      {...otherProps}
    />
  );
};

BackgroundHolder.defaultProps = {
  showing: false
};

export default BackgroundHolder;
