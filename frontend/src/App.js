import React from "react";
import "./App.css";
import Uploader from "./pages/Uploader";
import Home from "./pages/Home";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

const App = () => {
  return (
    <div>
      <Router>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/upload" component={Uploader} />
        </Switch>
      </Router>
    </div>
  );
};

export default App;
