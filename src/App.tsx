import { Route, withRouter, RouteComponentProps } from "react-router-dom";
import Software from "./views/Software";
import Photo from "./views/Photo";
import Tech from "./views/Tech";
import Web from "./views/Web";
import Header from "./components/Header";
import React, { useEffect, useState } from "react";
import NavigationLink from "./components/NavigationLink";
import Navigation from "./components/Navigation";
import BackgroundHolder from "./components/Backgrounds/Holder";
import ParticlesBackground from "./components/Backgrounds/Particles";
import GradientBackground from "./components/Backgrounds/Gradient";
import Slideshow from "./components/Slideshow";

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
      <GradientBackground showing={!photoHover} />
      <ParticlesBackground showing={webHover} />
      <BackgroundHolder showing={photoHover}>
        <Slideshow
          isPlaying={photoHover}
          images={[
            "/images/05.03.15.BSFSLightning.01.jpg",
            "/images/03.08.15.Birds.GW.01.jpg"
          ]}
        />
      </BackgroundHolder>
      <Header>
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
      </Header>
      <Route exact path="/Software" component={Software} />
      <Route exact path="/Tech" component={Tech} />
      <Route exact path="/Photo" component={Photo} />
      <Route exact path="/Web" component={Web} />
    </>
  );
};

export default withRouter(App);
