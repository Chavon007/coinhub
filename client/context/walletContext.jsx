"use client";
import { useState, useContext, createContext } from "react";

const WalletContext = createContext(null);

function WalletProvider({ children }) {
  const [wallet, setWallet] = useState(null);

  const newCreateWallet = async (payload) => {
    try {
      const newWallet = await fetch("http://localhost:4000/api/create-wallet", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await newWallet.json();
      if (!newWallet.ok) throw new Error(data.message);

      setWallet(data.wallet);
      return data.wallet;
    } catch (err) {
      console.error(err);
      throw err;
    }
  };

  const getWallet = async () => {
    try {
      const getWallet = await fetch("http://localhost:4000/api/get-wallet", {
        credentials: "include",
      });
      const data = await getWallet.json();
      if (!getWallet.ok) throw new Error(data.message);

      setWallet(data.wallet);
      return data.wallet;
    } catch (err) {
      console.error(err);
      throw err;
    }
  };

  return (
    <WalletContext.Provider value={{ wallet, newCreateWallet, getWallet }}>
      {children}
    </WalletContext.Provider>
  );
}

export default WalletProvider;

export const useWallet = () => useContext(WalletContext);
