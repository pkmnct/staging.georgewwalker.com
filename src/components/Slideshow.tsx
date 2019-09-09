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

interface SliderProps extends HTMLAttributes<HTMLElement> {
  images: Array<string>;
  isPlaying?: Boolean;
  transitionTime: number;
}

// TODO: ${transitionTime - 500}ms not working due to different generated classnames
const Progress = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  z-index: 2;
  height: 8px;
  background-color: rgb(179, 46, 136);
  width: 0;
  transition: width linear 7500ms;
  &.isPlaying {
    width: 100%;
  }
  &.reset {
    transition: none;
    width: 0;
  }
`;

const Slider = (props: SliderProps) => {
  const { images, isPlaying, transitionTime } = props;
  const [reset, setReset] = useState(false);
  const slider = useRef({ clickNext: () => {} });

  useEffect(() => {
    let interval: number, timeout: number;
    const doReset = () => {
      interval && clearInterval(interval);
      timeout && clearTimeout(timeout);
      setReset(true);
    };
    if (slider.current && isPlaying) {
      timeout = setTimeout(() => setReset(false), 300);
      interval = setInterval(() => {
        slider.current.clickNext();
        setReset(true);
        timeout = setTimeout(() => setReset(false), 300);
      }, transitionTime);
    } else {
      doReset();
    }
    return doReset;
  }, [isPlaying, transitionTime]);

  return (
    <>
      <StyledSlider organicArrows={false} fillParent ref={slider}>
        {images.map(image => (
          <div data-src={image} />
        ))}
      </StyledSlider>
      <Progress
        className={classnames({ isPlaying: isPlaying }, { reset: reset })}
      />
    </>
  );
};

Slider.defaultProps = {
  isPlaying: true,
  transitionTime: 8000,
  images: []
};

export default Slider;
