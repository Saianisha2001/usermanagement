// import React from 'react';

// function LandingPage() {
//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-green-100 to-green-500">
//       <div className="text-center text-black">
//         <h1 className="text-4xl font-bold mb-4">Welcome</h1>
//         <p className="text-lg mb-8"></p>
//         <a
//           href="/login"
//           className="bg-white text-green-500 hover:bg-blue-600 py-2 px-6 rounded-full text-lg font-semibold transition duration-300 ease-in-out transform hover:scale-105"
//         >
//           Get Started
//         </a>
//       </div>
//     </div>
//   );
// }

// export default LandingPage;

// src/components/LandingPage.tsx
import React from "react";
import { Link, useHistory } from "react-router-dom";
import { useAuthenticationContext } from "../../context/AuthenticationContext";

const LandingPage = () => {
  const history = useHistory();
  const authenticationContext = useAuthenticationContext();
  if (!authenticationContext.isAuthenticated) {
    history.push('/login')
  }
  return (

      <div className="h-screen flex flex-col justify-top items-center">
        <div className="h-1/2 w-full bg-gradient-to-r from-slate-100 via-slate-400 relative flex flex-col justify-center items-center text-center">
        <h1 className="text-4xl text-black">Welcome!!</h1>
        </div>
        <div className="justify-center items-center w-full h-screen">
        <Link to="/dashboard" >
          <button className="bg-gradient-to-r from-slate-100 via-slate-400 hover:bg-green-700 text-black py-2 px-4 rounded-none border border-green-600 w-1/3 h-full">
            Button 1
          </button>
        </Link>
        <Link to="/dashboard">
          <button className="bg-gradient-to-r from-slate-100 via-slate-400 hover:bg-green-700 text-black py-2 px-4 rounded-none border border-red-600 w-1/3 h-full">
            Button 2
          </button>
        </Link>
        <Link to="/dashboard">
          <button className="bg-gradient-to-r from-slate-100 via-slate-400 hover:bg-green-700 text-black py-2 px-4 rounded-none border border-yellow-600 w-1/3 h-full">
            Button 3
          </button>
        </Link>
      </div>
      </div>
  );
};

export default LandingPage;
