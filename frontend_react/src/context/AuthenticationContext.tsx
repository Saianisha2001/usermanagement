import { createContext, useState, useContext, Children  } from 'react';

type AuthenticationContextType = {
    isAuthenticated:  boolean;
    setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>
  };
  export const AuthenticationContext = createContext<null | AuthenticationContextType>(null);

  type Props = {
    children: React.ReactNode;
  };
  export const AuthenticationContextProvider = ({ children }: Props ) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    return <AuthenticationContext.Provider value={{ isAuthenticated, setIsAuthenticated}}>
                {children}
            </AuthenticationContext.Provider>
  };

  export const useAuthenticationContext = () => {
    const authenticationContext = useContext(AuthenticationContext);
    if(!authenticationContext) throw new Error(" use the context inside context provider");
    return authenticationContext;
  }
