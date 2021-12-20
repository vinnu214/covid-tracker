import React from "react";
import { Switch, Route } from "react-router-dom";
import DetailedView from "./components/DetailedView/DetailedView";
import Home from "./components/Home/Home";
import StateCard from "./components/StateCard/StateCard";

function Routes() {
  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/state" component={StateCard} />
      <Route path="/detailed" component={DetailedView} />
    </Switch>
  );
}

export default Routes;
