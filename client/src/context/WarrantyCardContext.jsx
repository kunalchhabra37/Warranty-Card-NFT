import { createContext, useEffect, useState } from "react";
import { BigNumber, ethers } from "ethers";

import { contractAbi, contractAddress } from "../utils/constants";

export const WarrantyCardContext = createContext();

const { ethereum } = window;

const getContract = async () => {
  const provider = new ethers.providers.Web3Provider(ethereum);
  const wallet = provider.getSigner();
  const contract = new ethers.Contract(contractAddress, contractAbi, wallet);
  console.log({
    provider,
    wallet,
    contract,
  });
  return {contract, wallet, provider};
};

export const WarrantyCardProvider = ({ children }) => {
  const [connectedWallet, setConnectedWallet] = useState("");
  const [minterRole, setMinterRole] = useState(false);
  const [minterRoleAdmin, setMinterRoleAdmin] = useState(false);
  const [totalSupply, setTotalSupply] = useState(0);
  let addressConnect = "";
  useEffect(() => {
    checkWalletConnected();
    getTotalSupply();
    hasMinterRole();
    hasMinterRoleAdmin();
  }, []);

  // Runs on page load to check if connected wallet is present
  const checkWalletConnected = async () => {
    try {
      if (!ethereum) return alert("Please Install to MetaMask");

      const accounts = await ethereum.request({ method: "eth_accounts" });
      if (accounts.length) {
        setConnectedWallet(accounts[0]);
        addressConnect = accounts[0];
        console.log(addressConnect);
        await getTotalSupply();
        await hasMinterRole();
        await hasMinterRoleAdmin();
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
      addressConnect = accounts[0];
      await getTotalSupply();
      await hasMinterRole();
      await hasMinterRoleAdmin();
    } catch (err) {
      console.log(err);
      throw "No ethereum object found or metamask not installed";
    }
  };

  // Check Expiry of Warranty Card
  const checkExpiry = async (tokenID) => {
    try {
      if (!ethereum) return alert("Please Install to MetaMask");
      let {contract, wallet, provider } = await getContract();
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
      let {contract, wallet, provider} = await getContract();
      let supply = await (await contract.totalSupply()).toNumber();
      setTotalSupply(supply);
    } catch (err) {
      throw "No ethereum object found or metamask not installed";
    }
  };

  const checkAuthenticity = async (address, tokenID, serialNo) => {
    try {
      if (!ethereum) return alert("Please Install to MetaMask");
      let {contract, wallet, provider} = await getContract();
      console.log(address, tokenID, serialNo);
      return await contract.checkAuthenticity(address, tokenID, serialNo);
    } catch (err) {
      if (err.reason == "Address is not the Owner of token") {
        return "Address is not the Owner of token";
      } else if (err.reason == "Token is Expired") {
        return "Token is Expired";
      }
      throw "No ethereum object found or metamask not installed";
    }
  };

  const getTokenUri = async (tokenID) => {
    try {
      if (!ethereum) return alert("Please Install to MetaMask");
      let {contract, wallet, provider} = await getContract();
      return await contract.tokenURI(tokenID);
    } catch (err) {
      throw "No ethereum object found or metamask not installed";
    }
  };

  const hasMinterRole = async () => {
    try {
      if (!ethereum) return alert("Please Install to MetaMask");
      let {contract, wallet, provider} = await getContract();
      let minterRole = await contract.MINTER_ROLE();
      if (await contract.hasRole(minterRole, addressConnect)) {
        setMinterRole(true);
      }
    } catch (err) {
      throw "No ethereum object found or metamask not installed";
    }
  };

  const hasMinterRoleAdmin = async () => {
    try {
      if (!ethereum) return alert("Please Install to MetaMask");
      let {contract, wallet, provider} = await getContract();
      let minterRoleAdmin = await contract.MINTER_ADMIN();
      if (await contract.hasRole(minterRoleAdmin, addressConnect)) {
        setMinterRoleAdmin(true);
      }
    } catch (err) {
      throw "No ethereum object found or metamask not installed";
    }
  };

  const grantRoles = async (role, address) => {
    try{
        if(!ethereum) return alert('Please install Metamask');
        let {contract, wallet, provider} = await getContract();
        let contractWithSigner = await contract.connect(wallet);
        if(role == 'MINTER_ROLE'){
          role = await contract.MINTER_ROLE();
          console.log(1);
        }else if(role == 'MINTER_ADMIN'){
          role = await contract.MINTER_ADMIN();
          console.log(2)
        }else{
          console.log(3)
          return "Role Not Found";
        }
      console.log(role, address);
      let res = await contractWithSigner.grantRole(role, address);
      return res;
    }catch(err){
      console.log(err);
      throw "No ethereum object found or metamask not installed";
    }
  }

  const revokeRoles = async (role, address) => {
    try{
        if(!ethereum) return alert('Please install Metamask');
        let {contract, wallet, provider} = await getContract();
        let contractWithSigner = await contract.connect(wallet);
        if(role == 'MINTER_ROLE'){
          role = await contract.MINTER_ROLE();
          console.log(1);
        }else if(role == 'MINTER_ADMIN'){
          role = await contract.MINTER_ADMIN();
          console.log(2)
        }else{
          console.log(3)
          return "Role Not found";
        }
      console.log(role, address);
      let res = await contractWithSigner.revokeRole(role, address);
      return res;
    }catch(err){
      console.log(err);
      throw "No ethereum object found or metamask not installed";
    }
  }

  return (
    <WarrantyCardContext.Provider
      value={{
        connectWallet,
        connectedWallet,
        minterRole,
        minterRoleAdmin,
        checkExpiry,
        totalSupply,
        checkAuthenticity,
        getTokenUri,
        grantRoles,
        revokeRoles
      }}
    >
      {children}
    </WarrantyCardContext.Provider>
  );
};
