import { createContext, useEffect, useState } from "react";
import { BigNumber, ethers } from "ethers";

import { contractAbi, contractAddress } from "../utils/constants";

export const WarrantyCardContext = createContext();

const { ethereum } = window;

const getContract = async () => {
  const provider = new ethers.providers.Web3Provider(ethereum);
  const wallet = provider.getSigner();
  const contract = new ethers.Contract(contractAddress, contractAbi, provider);
  console.log({
    provider,
    wallet,
    contract,
  });
  return contract;
};

export const WarrantyCardProvider = ({ children }) => {
  const [connectedWallet, setConnectedWallet] = useState("");
  const [minterRole, setMinterRole] = useState(false);
  const [minterRoleAdmin, setMinterRoleAdmin] = useState(false);
  const [totalSupply, setTotalSupply] = useState(0);

  useEffect(() => {
    checkWalletConnected();
  }, []);

  // Runs on page load to check if connected wallet is present
  const checkWalletConnected = async () => {
    try {
      if (!ethereum) return alert("Please Install to MetaMask");

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
  
  // Check Expiry of Warranty Card
  const checkExpiry = async (tokenID) => {
    try {
      if (!ethereum) return alert("Please Install to MetaMask");
      let contract = await getContract();
      return await contract.checkExpiry(tokenID);
    } catch (err) {
      if (err.reason == "Token is Expired") {
        return "Token is Expired";
      }
      throw "No ethereum object found or metamask not installed";
    }
  };

  const getTotalSupply = async () => {
    try {
      if (!ethereum) return alert("Please Install to MetaMask");
      console.log();
      let contract = await getContract();
      let supply = await (await contract.totalSupply()).toNumber();
      setTotalSupply(supply);
      console.log(supply);
    } catch (err) {
      throw "No ethereum object found or metamask not installed";
    }
  };

  const checkAuthenticity = async (address, tokenID, serialNo) => {
    try {
      if (!ethereum) return alert("Please Install to MetaMask");
      let contract = await getContract();
      return await contract.checkAuthenticity(address,tokenID, serialNo);
    } catch (err) {
      if (err.reason == "Address is not the Owner of token") {
        return "Address is not the Owner of token";
      }else if (err.reason == "Token is Expired") {
        return "Token is Expired";
      }
      throw "No ethereum object found or metamask not installed";
    }
  };

  const getTokenUri = async (tokenID) => {
    try {
      if (!ethereum) return alert("Please Install to MetaMask");
      let contract = await getContract();
      return await contract.tokenURI(tokenID);
    } catch (err) {
      throw "No ethereum object found or metamask not installed";
    }
  };

  return (
    <WarrantyCardContext.Provider
      value={{
        connectWallet,
        connectedWallet,
        minterRole,
        minterRoleAdmin,
        checkExpiry,
        getTotalSupply,
        checkAuthenticity,
        getTokenUri
      }}
    >
      {children}
    </WarrantyCardContext.Provider>
  );
};
