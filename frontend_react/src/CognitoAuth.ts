// CognitoAuth.js or CognitoAuth.ts

import {
    CognitoUserPool,
    AuthenticationDetails,
    CognitoUser,
    CognitoUserAttribute,
    CognitoUserSession,
    ICognitoUserPoolData,
  } from 'amazon-cognito-identity-js';
  
  // Your code will go here
  const poolData: ICognitoUserPoolData = {
    UserPoolId: 'ap-south-1_HjyPcIwgB',
    ClientId: '443d4mc6shngop39uad0p20j0j',
  };
  
  const userPool = new CognitoUserPool(poolData);
  
  const authenticationData = {
    Username: 'username',
    Password: 'password',
  };
  
  const authenticationDetails = new AuthenticationDetails(authenticationData);
  
  const userData = {
    Username: 'username',
    Pool: userPool,
  };
  
  const cognitoUser = new CognitoUser(userData);
  
  cognitoUser.authenticateUser(authenticationDetails, {
    onSuccess: (session: CognitoUserSession) => {
      console.log('Authentication successful:', session);
      // Handle successful authentication
    },
    onFailure: (err) => {
      console.error('Authentication error:', err);
      // Handle authentication failure
    },
  });