import { createContext, useContext, useState } from 'react';

// Create a context
const WalletContext = createContext();

// Create a provider component
export const WalletProvider = ({ children }) => {
  const [walletAddress, setWalletAddress] = useState('');

  return (
    <WalletContext.Provider value={{ walletAddress, setWalletAddress }}>
      {children}
    </WalletContext.Provider>
  );
};

// Create a custom hook to access the context
export const useWallet = () => {
  return useContext(WalletContext);
};
