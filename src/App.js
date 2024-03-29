import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Home from "./app/Home";

export default function App() {
  return (
    <Router>
      <Switch>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </Router>
  );
}
