import React from "react";
import ReactDOM from "react-dom/client";
import { Toaster } from "react-hot-toast";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";

import { Amplify } from "aws-amplify";
import awsconfig from "./aws-exports";
import App from "./App.tsx";
import Login from "./components/admin/Login.tsx";
import "./index.css";
import Dashboard from "./components/admin/Dashboard.tsx";
import {
  CognitoUserPool,
  AuthenticationDetails,
  CognitoUser,
  CognitoUserAttribute,
  CognitoUserSession,
  ICognitoUserPoolData,
} from "amazon-cognito-identity-js";

export const queryClient = new QueryClient();
// ReactDOM.createRoot(document.getElementById("root")!).render(
//   <QueryClientProvider client={queryClient}>
//     <Router>
//       <React.StrictMode>
//         <Toaster position="top-center" toastOptions={{ duration: 5000 }} />
//         {/* <App /> */}
//         {/* <Switch> 
//           <Route path="/" component={Login} />
//           <Route path="/dashboard" component={Dashboard} />
//         </Switch> */}
//         <Switch>
//           <Route path="/login">
//             <Login setToken={setToken} />
//           </Route>
//           <PrivateRoute path="/dashboard">
//             <Dashboard token={token} />
//           </PrivateRoute>
//           <Redirect from="/" to="/login" />
//         </Switch>
//       </React.StrictMode>
//     </Router>
//   </QueryClientProvider>
// );



ReactDOM.createRoot(document.getElementById('root')!).render(
  <QueryClientProvider client={queryClient}>
    <React.StrictMode>
      <Toaster position='top-center' toastOptions={{ duration: 5000 }} />
      <App />
    </React.StrictMode>
  </QueryClientProvider>
);
