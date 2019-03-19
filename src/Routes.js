import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./containers/Home";
import NotFound from "./containers/NotFound";
import Login from "./containers/Login";
import AppliedRoute from "./components/AppliedRoute";
import ResetPassword from "./containers/ResetPassword";
import AuthenticatedRoute from "./components/AuthenticatedRoute";
import UnauthenticatedRoute from "./components/UnauthenticatedRoute";
import Settings from "./containers/Settings";
import ChangePassword from "./containers/ChangePassword";
import ChangeEmail from "./containers/ChangeEmail";
import Signup from "./containers/Signup";
import NewDoor from "./containers/NewDoor";
import Doors from "./containers/Doors";



export default ({ childProps }) =>
  <Switch>
    <AppliedRoute path="/" exact component={Home} props={childProps} />
    <AppliedRoute path="/login" exact component={Login} props={childProps} />
    <UnauthenticatedRoute path="/login/reset" exact component={ResetPassword} props={childProps} />
    <AuthenticatedRoute path="/settings" exact component={Settings} props={childProps} />
    <AuthenticatedRoute path="/settings/password" exact component={ChangePassword} props={childProps} />
    <AuthenticatedRoute path="/settings/email" exact component={ChangeEmail} props={childProps} />
    <AppliedRoute path="/signup" exact component={Signup} props={childProps} />
    <AppliedRoute path="/doors/new" exact component={NewDoor} props={childProps} />
    <AppliedRoute path="/doors/:id" exact component={Doors} props={childProps} />

    { /* Finally, catch all unmatched routes */ }
    <Route component={NotFound} />
  </Switch>;
