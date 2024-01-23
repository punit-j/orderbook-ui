import { createContext, useEffect, useState } from "react";
import {
  getNativeTokenBalance,
  getSignerAddress,
  isValidAddress,
} from "../utils/etherUtils";

export const WalletContext = createContext();

export const WalletProvider = ({ children }) => {
  const [address, setAddress] = useState(null);
  const [balance, setBalance] = useState(null);

  useEffect(() => {
    const init = async () => {
      try {
        if (window.ethereum && window.ethereum.isMetaMask) {
          const addr = await getSignerAddress();
          setAddress(addr);
          fetchBalances();
        }
      } catch (err) {
        console.log(err);
      }

      if (window.ethereum) {
        window.ethereum.on("accountsChanged", connectWallet);
      }
    };
    init();
  }, []);

  const fetchBalances = async () => {
    const bal = await getNativeTokenBalance();
    setBalance(bal);
  };

  const connectWallet = async () => {
    try {
      if (window.ethereum && window.ethereum.isMetaMask) {
        const addr = await getSignerAddress();
        setAddress(addr);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const disconnectWallet = async () => {
    try {
      setAddress(null);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <WalletContext.Provider
      value={{
        address,
        connectWallet,
        disconnectWallet,
        fetchBalances,
        balance,
      }}
    >
      {children}
    </WalletContext.Provider>
  );
};
