import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";
import RoleSection from "./components/role/RoleSection";
import UserSection from "./components/user/UserSection";
import Login from "./components/admin/Login";
import Navbar from "./components/admin/Navbar";
import Dashboard from "./components/admin/Dashboard";
import { createContext, useState, useContext } from "react";
import { TokenContextProvider } from "./context/TokenContext";
import "@aws-amplify/ui-react/styles.css";
import LandingPage from "./components/admin/Landingpage";
import { AuthenticationContextProvider } from "./context/AuthenticationContext";

const App = () => {
  return (
    <Router>
      <TokenContextProvider>
        <AuthenticationContextProvider>
          <Navbar />
          <Switch>
            <Route path="/login">
              <Login />
            </Route>
            <Route path="/dashboard">
              <Dashboard />
            </Route>
            <Route path="/landingpage">
              <LandingPage />
            </Route>
            <Redirect from="/" to="/login" />
          </Switch>
        </AuthenticationContextProvider>
      </TokenContextProvider>
    </Router>
  );
};

export default App;
