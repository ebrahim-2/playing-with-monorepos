import React from "react";
import { Route, Redirect, Switch } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Secret from "./pages/Secret";
import Navbar from "./components/Navbar";
import ForgotPassword from "./pages/ForgotPassword";
import NotFound from "./pages/NotFound";
import ChangePassword from './pages/ChangePassword';

const App = () => {
  return (
    <div>
      <Route component={Navbar} />

      <Switch>
        <Redirect exact from="/" to="/register" />
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/secret" component={Secret} />
        <Route exact path="/forgot-password" component={ForgotPassword} />
        <Route exact path="/reset/:token" component={ChangePassword} />
        <Route component={NotFound} />
      </Switch>
    </div>
  );
};

export default App;
