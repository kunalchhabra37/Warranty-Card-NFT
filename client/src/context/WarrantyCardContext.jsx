import { createContext, useEffect, useState } from "react";
import { BigNumber, ethers } from "ethers";
import axios from "axios";
import {
  contractAbi,
  contractAddress,
  PINATA_API_KEY,
  PINATA_SECRET_API_KEY,
} from "../utils/constants";
import pinataConfig from "../utils/pinataConfig.json";
import WarrantyCard2 from "../utils/WarrantyCard2.json";
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
  return { contract, wallet, provider };
};

export const WarrantyCardProvider = ({ children }) => {
  const [connectedWallet, setConnectedWallet] = useState("");
  const [minterRole, setMinterRole] = useState(true);
  const [minterRoleAdmin, setMinterRoleAdmin] = useState(true);
  const [serviceProvider, setServiceProvider] = useState(true);
  const [serviceProviderAdmin, setServiceProviderAdmin] = useState(true);
  const [totalSupply, setTotalSupply] = useState(0);
  let addressConnect = "";
  useEffect(() => {
    checkWalletConnected();
    getTotalSupply();
  }, []);

  // Runs on page load to check if connected wallet is present
  const checkWalletConnected = async () => {
    try {
      if (!ethereum) return alert("Please Install to MetaMask");

      const accounts = await ethereum.request({ method: "eth_accounts" });
      if (accounts.length) {
        setConnectedWallet(accounts[0]);
        addressConnect = accounts[0];
        await getTotalSupply();
        await hasMinterRole();
        await hasMinterRoleAdmin();
        await hasServiceProvider();
        await hasServiceProviderAdmin();
      } else {
        return console.log("No account found");
      }
    } catch (err) {
      console.log(err.Error);
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
      await hasServiceProvider();
      await hasServiceProviderAdmin();
    } catch (err) {
      console.log(err);
      throw "No ethereum object found or metamask not installed";
    }
  };

  // Check Expiry of Warranty Card(non payable)
  const getExpiry = async (tokenID) => {
    try {
      if (!ethereum) return alert("Please Install to MetaMask");
      let { contract, wallet, provider } = await getContract();
      return await (await contract.getExpiryDate(tokenID)).toNumber();
    } catch (err) {
      if (err.reason == "ERC721: invalid token ID") {
        return { error: "Token don't exist: Expired or Id never existed" };
      }
      console.log(err);
      throw "No ethereum object found or metamask not installed";
    }
  };

  // Gets total number of active tokens in contract (non payable)
  const getTotalSupply = async () => {
    try {
      if (!ethereum) return alert("Please Install to MetaMask");
      let { contract, wallet, provider } = await getContract();
      let supply = await (await contract.totalSupply()).toNumber();
      setTotalSupply(supply);
    } catch (err) {
      console.log(err);
      throw "No ethereum object found or metamask not installed";
    }
  };

  // Checks Ownership and serial No. of Product to Prove authenticity and ownership (non Paybale)
  const checkAuthenticity = async (address, tokenID, serialNo) => {
    try {
      if (!ethereum) return alert("Please Install to MetaMask");
      let { contract, wallet, provider } = await getContract();
      // console.log(address, tokenID, serialNo);
      return await contract.checkAuthenticity(address, tokenID, serialNo);
    } catch (err) {
      if (err.reason == "Address is not the Owner of token") {
        return { error: "Address is not the Owner of token" };
      } else if (err.reason == "ERC721: invalid token ID") {
        return { error: "Token don't exist: Expired or Id never existed" };
      }else if(err.reason == "Token is expired"){
        return { error: "Token Expired" }
      }
      console.log(err);
      throw "No ethereum object found or metamask not installed";
    }
  };

  // Gets Token URI (non payable)
  const getTokenUri = async (tokenID) => {
    try {
      if (!ethereum) return alert("Please Install to MetaMask");
      let { contract, wallet, provider } = await getContract();
      return await contract.tokenURI(tokenID);
    } catch (err) {
      if (err.reason == "ERC721: invalid token ID") {
        return { error: "Token don't exist: Expired or Id never existed" };
      }
      console.log(err);
      throw "No ethereum object found or metamask not installed";
    }
  };

  // Checks if connected wallet is MINTER_ROLE  (non payable)
  const hasMinterRole = async () => {
    try {
      if (!ethereum) return alert("Please Install to MetaMask");
      let { contract, wallet, provider } = await getContract();
      let minterRole = await contract.MINTER_ROLE();
      if (await contract.hasRole(minterRole, addressConnect)) {
        setMinterRole(true);
      }
    } catch (err) {
      console.log(err);
      throw "No ethereum object found or metamask not installed";
    }
  };

  // Checks if connected wallet is MINTER_ROLE_ADMIN  (non payable)
  const hasMinterRoleAdmin = async () => {
    try {
      if (!ethereum) return alert("Please Install to MetaMask");
      let { contract, wallet, provider } = await getContract();
      let minterRoleAdmin = await contract.MINTER_ADMIN();
      if (await contract.hasRole(minterRoleAdmin, addressConnect)) {
        setMinterRoleAdmin(true);
      }
    } catch (err) {
      console.log(err);
      throw "No ethereum object found or metamask not installed";
    }
  };

  // Checks if connected wallet is SERVICE_PROVIDER  (non payable)
  const hasServiceProvider = async () => {
    try {
      if (!ethereum) return alert("Please Install to MetaMask");
      let { contract, wallet, provider } = await getContract();
      let serviceProvider = await contract.SERVICE_PROVIDER();
      if (await contract.hasRole(serviceProvider, addressConnect)) {
        setServiceProvider(true);
      }
    } catch (err) {
      console.log(err);
      throw "No ethereum object found or metamask not installed";
    }
  };

  // Checks if connected wallet is SERVICE_PROVIDER_ADMIN  (non payable)
  const hasServiceProviderAdmin = async () => {
    try {
      if (!ethereum) return alert("Please Install to MetaMask");
      let { contract, wallet, provider } = await getContract();
      let serviceProviderAdmin = await contract.SERVICE_PROVIDER_ADMIN();
      if (await contract.hasRole(serviceProviderAdmin, addressConnect)) {
        setServiceProviderAdmin(true);
      }
    } catch (err) {
      console.log(err);
      throw "No ethereum object found or metamask not installed";
    }
  };

  const getTokenId = async (serialNo) => {
    try{
      if(!ethereum) return alert("Please Install Metamask");
      let { contract, wallet, provider } = await getContract();
      return await (await contract.getTokenIdBySerialNo(serialNo)).toNumber();
    }catch(err){
      console.log(err);
      throw "No ethereum object found or metamask not installed";
    }
  }

  // Role admins can grant respective roles (payable)
  const grantRoles = async (role, address) => {
    try {
      if (!ethereum) return alert("Please install Metamask");
      let { contract, wallet, provider } = await getContract();
      let contractWithSigner = await contract.connect(wallet);
      if (role == "MINTER_ROLE") {
        role = await contract.MINTER_ROLE();
      } else if (role == "MINTER_ADMIN") {
        role = await contract.MINTER_ADMIN();
      } else if (role == "SERVICE_PROVIDER") {
        role = await contract.SERVICE_PROVIDER();
      } else if (role == "SERVICE_PROVIDER_ADMIN") {
        role = await contract.SERVICE_PROVIDER_ADMIN();
      } else {
        return "Role Not Found";
      }
      let txn = await contractWithSigner.grantRole(role, address);
      await txn.wait();
      return {
        msg: "Transaction Succesful",
        hash: txn.hash,
      };
    } catch (err) {
      console.log(err);
      throw "No ethereum object found or metamask not installed";
    }
  };

  // Role admin can revoke respective role (payable)
  const revokeRoles = async (role, address) => {
    try {
      if (!ethereum) return alert("Please install Metamask");
      let { contract, wallet, provider } = await getContract();
      let contractWithSigner = await contract.connect(wallet);
      if (role == "MINTER_ROLE") {
        role = await contract.MINTER_ROLE();
      } else if (role == "MINTER_ADMIN") {
        role = await contract.MINTER_ADMIN();
      } else if (role == "SERVICE_PROVIDER") {
        role = await contract.SERVICE_PROVIDER();
      } else if (role == "SERVICE_PROVIDER_ADMIN") {
        role = await contract.SERVICE_PROVIDER_ADMIN();
      } else {
        return "Role Not found";
      }
      let txn = await contractWithSigner.revokeRole(role, address);
      await txn.wait();
      return {
        msg: "Transaction Succesful",
        hash: txn.hash,
      };
    } catch (err) {
      console.log(err);
      throw "No ethereum object found or metamask not installed";
    }
  };

  // Warranty Card owner can transfer their warranty card to any other address (payable)
  const transferWarrantyCard = async (from, to, tokenID) => {
    try {
      if (!ethereum) return alert("Please install Metamask");
      let { contract, wallet, provider } = await getContract();
      let contractWithSigner = await contract.connect(wallet);
      let txn = await contractWithSigner[
        "safeTransferFrom(address,address,uint256,bytes)"
      ](from, to, tokenID, []);
      await txn.wait();
      return {
        msg: "Transaction Succesful",
        hash: txn.hash,
      };
    } catch (err) {
      if (err.reason == "ERC721: invalid token ID") {
        return { error: "Token don't exist: Expired or Id never existed" };
      }
      console.log(err);
      throw "No ethereum object found or metamask not installed";
    }
  };

  // SERVICE_PROVIDER can increase service count of any active token (payable)
  const incServiceCount = async (tokenID) => {
    try {
      if (!ethereum) return alert("Please install Metamask");
      let { contract, wallet, provider } = await getContract();
      let contractWithSigner = await contract.connect(wallet);
      let txn = await contractWithSigner.incServiceCount(tokenID);
      await txn.wait();
      return {
        msg: "Transaction Succesful",
        hash: txn.hash,
      };
    } catch (err) {
      if (err.reason == "ERC721: invalid token ID") {
        return { error: "Token don't exist: Expired or Id never existed" };
      }
      console.log(err);
      throw "No ethereum object found or metamask not installed";
    }
  };

  // MINTER_ROLE address can mint and issue warranty card to any address (payable)
  const issueWarrantyCard = async (
    address,
    tokenURI,
    serialNo,
    warrantyEnd
  ) => {
    try {
      if (!ethereum) return alert("Please install Metamask");
      let { contract, wallet, provider } = await getContract();
      let contractWithSigner = await contract.connect(wallet);
      let txn = await contractWithSigner.issueWarrantyCard(
        address,
        tokenURI,
        serialNo,
        warrantyEnd
      );
      await txn.wait();
      let tokenId = await (await contract.getTokenIdBySerialNo(serialNo)).toNumber();
      return {
        msg: "Transaction Succesful",
        hash: txn.hash,
        tokenId
      };
    } catch (err) {
      if(err.reason == "execution reverted: Serial Number Already Exists"){
        return {error: "Serial Number Already Registered"}
      }
      console.log(err);
      throw "No ethereum object found or metamask not installed";
    }
  };

  // Pin JSON file to ipfs usin PINATA API
  const pinFile = async (
    to,
    name,
    description,
    serialNo,
    product_Id,
    invoice_no,
    payment_gateway,
    platform,
    purchase_date,
    transaction_id,
    transaction_method,
    warranty_period,
  ) => {

    // Configration for the api call
    let config = {
      method: "post",
      url: "https://api.pinata.cloud/pinning/pinJSONToIPFS",
      headers: {
        "Content-Type": "application/json",
        pinata_api_key: PINATA_API_KEY,
        pinata_secret_api_key: PINATA_SECRET_API_KEY,
      },
      data: "",
    };

    // Creating json and calling api to pin json
    try {
      WarrantyCard2.name = name;
      WarrantyCard2.description = description;
      WarrantyCard2.serial_no = serialNo;
      WarrantyCard2.product_Id = product_Id;
      WarrantyCard2.history.invoice_no = invoice_no;
      WarrantyCard2.history.payment_gateway = payment_gateway;
      WarrantyCard2.history.platform = platform;
      WarrantyCard2.history.purchase_date = purchase_date;
      WarrantyCard2.history.transaction_id = transaction_id;
      WarrantyCard2.history.transaction_method = transaction_method;
      WarrantyCard2.warranty_period = warranty_period;
      pinataConfig.pinataContent = WarrantyCard2;

      config.data = JSON.stringify(pinataConfig);
      let response = await axios(config);
      console.log(response.data);
      return response.data.IpfsHash;
    } catch (err) {
      console.log(err);
      throw err;
    }
  };

  // Context Provider
  return (
    <WarrantyCardContext.Provider
      value={{
        connectWallet,
        connectedWallet,
        minterRole,
        minterRoleAdmin,
        getExpiry,
        totalSupply,
        checkAuthenticity,
        getTokenUri,
        grantRoles,
        revokeRoles,
        transferWarrantyCard,
        issueWarrantyCard,
        pinFile,
        serviceProvider,
        serviceProviderAdmin,
        incServiceCount,
        getTokenId
      }}
    >
      {children}
    </WarrantyCardContext.Provider>
  );
};
