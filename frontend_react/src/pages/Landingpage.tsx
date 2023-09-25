// src/pages/PageWithComponents.tsx
import React from 'react';
import { useLocation } from 'react-router-dom';
import RoleSection from '../components/role';
import UserSection from '../components/user';

const Landingpage: React.FC = () => {
  const location = useLocation();
  const accessToken = location.state?.accessToken;

  return (
    <div>
      <h1>Page with Components</h1>
      {/* <RoleComponent accessToken={accessToken} />
      <UserComponent accessToken={accessToken} /> */}
    </div>
  );
};

export default Landingpage;
