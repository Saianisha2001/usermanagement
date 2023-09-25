import { createContext, useState, useContext, Children  } from 'react';

type TokenContextType = {
    token:  string;
    setToken: React.Dispatch<React.SetStateAction<string>>
  };
  export const TokenContext = createContext<null | TokenContextType>(null);

  type Props = {
    children: React.ReactNode;
  };
  export const TokenContextProvider = ({ children }: Props ) => {
    const [token, setToken] = useState('');
    return <TokenContext.Provider value={{ token, setToken}}>
                {children}
            </TokenContext.Provider>
  };

  export const useTokenContext = () => {
    const tokenContext = useContext(TokenContext);
    if(!tokenContext) throw new Error(" use the context inside context provider");
    return tokenContext;
  }
