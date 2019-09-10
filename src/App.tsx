import { Route, withRouter, RouteComponentProps } from "react-router-dom";
import Software from "./views/Software";
import Photo from "./views/Photo";
import Tech from "./views/Tech";
import Web from "./views/Web";
import React from "react";
import Header from "./components/Header";

const App = (props: RouteComponentProps) => {
  return (
    <>
      <Header />
      <Route exact path="/Software" component={Software} />
      <Route exact path="/Tech" component={Tech} />
      <Route exact path="/Photo" component={Photo} />
      <Route exact path="/Web" component={Web} />
    </>
  );
};

export default withRouter(App);
