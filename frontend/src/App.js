import React from "react";
import "./App.css";
import Upload from "./pages/Upload";
import Home from "./pages/Home";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

const App = () => {
  return (
    <div>
      <Router>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/upload" component={Upload} />
        </Switch>
      </Router>
    </div>
  );
};

export default App;
