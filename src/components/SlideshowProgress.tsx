import React, { HTMLAttributes, useRef, useState, useEffect } from "react";
import styled from "styled-components";
import "react-awesome-slider/dist/styles.css";
import classnames from "classnames";
const AwesomeSlider = require("react-awesome-slider").default;

const StyledSlider = styled(AwesomeSlider)`
  &.aws-sld {
    --loader-bar-color: transparent;
  }
`;

interface SlideshowProgressProps extends HTMLAttributes<HTMLElement> {
  transitionTime: number;
}

const SlideshowProgress = (props: SlideshowProgressProps) => {
  const { transitionTime, ...otherProps } = props;
  const [RenderedElement, setRenderedElement] = useState(null);

  useEffect(() => {
    setRenderedElement(styled.div`
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      z-index: 2;
      height: 8px;
      background-color: rgb(179, 46, 136);
      width: 0;
      transition: width linear ${transitionTime - 500}ms;
      &.isPlaying {
        width: 100%;
      }
      &.reset {
        transition: none;
        width: 0;
      }
    `);
  }, [transitionTime]);

  return <RenderedElement {...otherProps} />;
};

Slider.defaultProps = {
  isPlaying: true,
  transitionTime: 8000,
  images: []
};

export default Slider;
