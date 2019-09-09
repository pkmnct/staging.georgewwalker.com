import { Route, withRouter, RouteComponentProps } from "react-router-dom";
import Software from "./views/Software";
import Photo from "./views/Photo";
import Tech from "./views/Tech";
import Web from "./views/Web";
import Header from "./components/Header";
import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import "particles.js/particles";
import "react-awesome-slider/dist/styles.css";
import classnames from "classnames";
import NavigationLink from "./components/NavigationLink";
const AwesomeSlider = require("react-awesome-slider").default;

interface WindowWithParticles extends Window {
  particlesJS(id: string, settings: object, callback: Function): void;
}
declare var window: WindowWithParticles;

const StyledNav = styled.nav`
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  transform-origin: 0 0;
  justify-content: space-evenly;
  width: 100%;
  padding: 1em;
`;

const Holder = styled.div`
  position: fixed;
  z-index: -1;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  pointer-events: none;
  opacity: 0;
  transition: opacity ease-in-out 0.3s;
  &.showing {
    opacity: 1;
  }
`;

const GradientHolder = styled(Holder)`
  background: linear-gradient(225deg, rgb(255, 229, 79), rgb(179, 46, 136));
  animation: background 15s linear infinite;
  background-size: 300% 300%;
`;

const StyledSlider = styled(AwesomeSlider)`
  &.aws-sld {
    --loader-bar-color: transparent;
  }
`;

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
  &.go {
    width: 100%;
  }
  &.newSlide {
    transition: none;
    width: 0;
  }
`;

const particleSettings = {
  particles: {
    number: {
      value: 80,
      density: {
        enable: true,
        value_area: 800
      }
    },
    color: {
      value: "#ffffff"
    },
    shape: {
      type: "circle",
      stroke: {
        width: 0,
        color: "#000000"
      },
      polygon: {
        nb_sides: 5
      }
    },
    opacity: {
      value: 0.5,
      random: false,
      anim: {
        enable: false,
        speed: 1,
        opacity_min: 0.1,
        sync: false
      }
    },
    size: {
      value: 3,
      random: true,
      anim: {
        enable: false,
        speed: 40,
        size_min: 0.1,
        sync: false
      }
    },
    line_linked: {
      enable: true,
      distance: 150,
      color: "#ffffff",
      opacity: 0.4,
      width: 1
    },
    move: {
      enable: true,
      speed: 2,
      direction: "none",
      random: false,
      straight: false,
      out_mode: "out",
      bounce: false,
      attract: {
        enable: false,
        rotateX: 600,
        rotateY: 1200
      }
    }
  },
  interactivity: {
    detect_on: "canvas",
    events: {
      onhover: {
        enable: false
      },
      onclick: {
        enable: false
      },
      resize: true
    }
  },
  retina_detect: true
};

const App = (props: RouteComponentProps) => {
  // Hover handlers
  const [photoHover, setPhotoHover] = useState(false);
  const [webHover, setWebHover] = useState(false);
  const handleWebMouseEnter = () => setWebHover(true);
  const handleWebMouseLeave = () =>
    props.location.pathname !== "/web" && setWebHover(false);
  const handlePhotoMouseEnter = () => setPhotoHover(true);
  const handlePhotoMouseLeave = () =>
    props.location.pathname !== "/photo" && setPhotoHover(false);

  // Don't render particles until first hover
  const [renderedParticles, setRenderedParticles] = useState(false);
  useEffect(() => {
    if (webHover && !renderedParticles) {
      setRenderedParticles(true);
      window.particlesJS!("particleHolder", particleSettings, () => {});
    }
  }, [webHover, renderedParticles]);

  // Start slideshow on hover
  const slider = useRef({ clickNext: () => {} });
  const [resetProgress, setResetProgress] = useState(false);
  useEffect(() => {
    let interval: number, progressTimeout: number;
    const reset = () => {
      interval && clearInterval(interval);
      progressTimeout && clearTimeout(progressTimeout);
      setResetProgress(true);
    };
    if (slider.current && photoHover) {
      setResetProgress(false);
      interval = setInterval(() => {
        slider.current.clickNext();
        setResetProgress(true);
        progressTimeout = setTimeout(() => setResetProgress(false), 300);
      }, 8000);
    } else {
      reset();
    }
    return reset;
  }, [photoHover, slider]);

  // Keep backgrounds for each section
  useEffect(() => {
    setWebHover(false);
    setPhotoHover(false);
    switch (props.location.pathname) {
      case "/web":
        setWebHover(true);
        break;
      case "/photo":
        setPhotoHover(true);
        break;
    }
    if (props.location.pathname === "/web") {
      setWebHover(true);
    } else {
      setWebHover(false);
    }
  }, [props.location.pathname]);

  return (
    <>
      <GradientHolder className={classnames({ showing: !photoHover })} />
      <Holder
        id="particleHolder"
        className={webHover ? "showing" : undefined}
      />
      <Holder className={photoHover ? "showing" : undefined}>
        <StyledSlider organicArrows={false} fillParent ref={slider}>
          <div data-src="/images/05.03.15.BSFSLightning.01.jpg" />
          <div data-src="/images/03.08.15.Birds.GW.01.jpg" />
        </StyledSlider>
        <Progress
          className={classnames(
            { go: photoHover },
            { newSlide: resetProgress }
          )}
        />
      </Holder>
      <Header />
      <Route exact path="/Software" component={Software} />
      <Route exact path="/Tech" component={Tech} />
      <Route exact path="/Photo" component={Photo} />
      <Route exact path="/Web" component={Web} />
      <StyledNav className="Navigation">
        <NavigationLink to="/software">Software Engineer</NavigationLink>
        <NavigationLink
          to="/web"
          onMouseEnter={handleWebMouseEnter}
          onMouseLeave={handleWebMouseLeave}
        >
          Web Developer
        </NavigationLink>
        <NavigationLink
          to="/photo"
          onMouseEnter={handlePhotoMouseEnter}
          onMouseLeave={handlePhotoMouseLeave}
        >
          Photographer
        </NavigationLink>
        <NavigationLink to="/tech">Tech Enthusiast</NavigationLink>
      </StyledNav>
    </>
  );
};

export default withRouter(App);
