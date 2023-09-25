import React from 'react';
import { Link, useHistory } from "react-router-dom";
import { useAuthenticationContext } from "../../context/AuthenticationContext";
import RoleSection from '../role/RoleSection';
import UserSection from '../user/UserSection';

const Dashboard: React.FC = () => {

  const history = useHistory();
  const authenticationContext = useAuthenticationContext();
  if (!authenticationContext.isAuthenticated) {
    history.push('/login')
  }
  return (
    <div className='flex gap-3 h-full w-full min-h-screen p-5 flex-wrap'>
      <RoleSection />
      <UserSection />
    </div>
  );
};

export default Dashboard;