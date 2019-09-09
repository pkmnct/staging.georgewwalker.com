import React, { HTMLAttributes, useEffect, useState } from "react";
import "particles.js/particles";
import Holder from "./Holder";

interface WindowWithParticles extends Window {
  particlesJS(id: string, settings: object, callback: Function): void;
}
declare var window: WindowWithParticles;

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

interface ParticlesProps extends HTMLAttributes<HTMLElement> {
  id: string;
  showing: Boolean;
}

const Particles = (props: ParticlesProps) => {
  const { id, showing, ...otherProps } = props;
  const [renderedParticles, setRenderedParticles] = useState(false);
  useEffect(() => {
    if (showing && !renderedParticles) {
      setRenderedParticles(true);
      window.particlesJS(id, particleSettings, () => {});
    }
  }, [showing, renderedParticles, id]);
  return <Holder id={id} showing={showing} {...otherProps} />;
};

Particles.defaultProps = {
  id: "particles"
};

export default Particles;
