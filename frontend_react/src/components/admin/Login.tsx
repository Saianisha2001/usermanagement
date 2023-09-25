import React, { useEffect, useState, useContext } from "react";
import {
  CognitoUserPool,
  AuthenticationDetails,
  CognitoUser,
  CognitoUserSession,
  ICognitoUserPoolData,
} from "amazon-cognito-identity-js";
import { useHistory } from "react-router-dom";
import { Redirect } from "react-router-dom";
import { useTokenContext } from "../../context/TokenContext";
import { useAuthenticationContext } from "../../context/AuthenticationContext";

const Login: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const history = useHistory();
  const tokenContext = useTokenContext();
  const authenticationContext = useAuthenticationContext();
  const poolData: ICognitoUserPoolData = {
    UserPoolId: "ap-south-1_L96udvssK",
    ClientId: "3nsumaou7qo1ip079ametnl8fh",
  };

  const userPool = new CognitoUserPool(poolData);

  const authenticationData = {
    Username: username,
    Password: password,
  };

  const authenticationDetails = new AuthenticationDetails(authenticationData);

  const userData = {
    Username: username,
    Pool: userPool,
  };

  useEffect(() => {
    if (authenticationContext.isAuthenticated && tokenContext.token) {
      console.log("redirect to dashboard");
      history.push("/landingpage");
    }
  }, [tokenContext.token, authenticationContext.isAuthenticated]);


  const cognitoUser = new CognitoUser(userData);
  const handleLogin = (event) => {
    event.preventDefault();
    cognitoUser.authenticateUser(authenticationDetails, {
      onSuccess: (session: CognitoUserSession) => {
        console.log("Authentication successful:", session);
        const jwtToken = session.getAccessToken().getJwtToken();
        tokenContext.setToken(String(jwtToken));
        authenticationContext.setIsAuthenticated(true);
      },
      onFailure: (err) => {
        console.error("Authentication error:", err);
        setError(
          "Authentication failed. Please check your credentials and try again."
        );
        authenticationContext.setIsAuthenticated(false);
        tokenContext.setToken("");
      },
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="max-w-md w-full space-y-8 p-4 border-2 border-black rounded-lg">
        <div>
          <h2 className="text-3xl font-extrabold text-center text-black">
            Login
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={(e) => handleLogin(e)}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="username" className="sr-only">
                Username
              </label>
              <input
                id="username"
                name="username"
                type="text"
                autoComplete="username"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-gray-500 focus:border-gray-500 focus:z-10 sm:text-sm"
                placeholder="Username"
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-gray-500 focus:border-gray-500 focus:z-10 sm:text-sm"
                placeholder="Password"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-green-500 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            >
              Sign in
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;

