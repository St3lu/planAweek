import React, { Component } from "react";
import { BrowserRouter, Route, Redirect, Switch } from "react-router-dom";
import Home from "./Pages/Home/Home";
import RegisterController from "./Pages/Register/RegisterController";
import LoginController from "./Pages/Login/LoginController";
import "./App.css";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route path="/home" component={Home} />
          <Route path="/register" component={RegisterController} />
          <Route path="/login" component={LoginController} />
          <Redirect from="/" to="/home" />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
