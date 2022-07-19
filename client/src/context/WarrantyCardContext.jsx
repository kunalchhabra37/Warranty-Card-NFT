import { createContext, useEffect, useState } from "react";
import { ethers } from "ethers";

import { abi, contractAddress } from "../utils/constants";

export const WarrantyCardContext = createContext();

const { ethereum } = window;

const getContract = async () => {
  const provider = new ethers.providers.Web3Provider(ethereum);
  const wallet = provider.getSigner();
  const contract = new ethers.Contract(contractAddress, abi, wallet);

  console.log({
    provider,
    wallet,
    contract,
  });
};

export const WarrantyCardProvider = ({ children }) => {
  const [connectedWallet, setConnectedWallet] = useState("");
  const [minterRole, setMinterRole] = useState(false);
  const [minterRoleAdmin, setMinterRoleAdmin] = useState(false);

  // Runs on page load to check if connected wallet is present
  const checkWalletConnected = async () => {
    try {
      if (!ethereum) return alert("Please connect to MetaMask");

      const accounts = await ethereum.request({ method: "eth_accounts" });
      if (accounts.length) {
        setConnectedWallet(accounts[0]);
      } else {
        console.log("No account found");
      }
      console.log(accounts);
    } catch (err) {
      console.log(err);
      throw "No ethereum object found or metamask not installed";
    }
  };

  // Connects the metamask wallet to the dapp
  const connectWallet = async () => {
    try {
      if (!ethereum) return alert("Please Install MetaMask");

      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });
      setConnectedWallet(accounts[0]);
    } catch (err) {
      console.log(err);
      throw "No ethereum object found or metamask not installed";
    }
  };

  useEffect(() => {
    checkWalletConnected();
  }, []);

  return (
    <WarrantyCardContext.Provider
      value={{ connectWallet, connectedWallet, minterRole, minterRoleAdmin }}
    >
      {children}
    </WarrantyCardContext.Provider>
  );
};
