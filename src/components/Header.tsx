import React, { useState, useEffect } from "react";
import { Link, RouteComponentProps, withRouter } from "react-router-dom";
import styled from "styled-components";
import Logo from "./Logo";
import NavigationLink from "../components/NavigationLink";
import Navigation from "../components/Navigation";
import BackgroundHolder from "../components/Backgrounds/Holder";
import ParticlesBackground from "../components/Backgrounds/Particles";
import GradientBackground from "../components/Backgrounds/Gradient";
import Slideshow from "../components/Slideshow";

const StyledLink = styled(Link)`
  text-decoration: none;
  color: #fff;
`;

const StyledHeader = styled.header`
  text-align: center;
`;

const Header = (props: RouteComponentProps) => {
  // Hover handlers
  const [photoHover, setPhotoHover] = useState(false);
  const [webHover, setWebHover] = useState(false);
  const handleWebMouseEnter = () => setWebHover(true);
  const handleWebMouseLeave = () =>
    props.location.pathname !== "/web" && setWebHover(false);
  const handlePhotoMouseEnter = () => setPhotoHover(true);
  const handlePhotoMouseLeave = () =>
    props.location.pathname !== "/photo" && setPhotoHover(false);

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
      <GradientBackground showing={!photoHover || webHover} />
      <ParticlesBackground showing={webHover} />
      <BackgroundHolder showing={photoHover && !webHover}>
        <Slideshow
          isPlaying={photoHover}
          images={[
            "/images/05.03.15.BSFSLightning.01.jpg",
            "/images/03.08.15.Birds.GW.01.jpg"
          ]}
        />
      </BackgroundHolder>
      <StyledHeader>
        <StyledLink to="/">
          <Logo />
        </StyledLink>
        <Navigation>
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
        </Navigation>
      </StyledHeader>
    </>
  );
};

export default withRouter(Header);
