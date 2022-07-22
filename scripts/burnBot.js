require("dotenv").config();
const { ethers, Signer } = require("ethers");

const { CONTRACT_ADDRESS, WALLET_PRIVATE_KEY, PROVIDER_URL } = process.env;

const contract = require("../artifacts/contracts/WarrantyCard.sol/WarrantyCard.json");
const abi = contract.abi;

const provider = new ethers.providers.JsonRpcProvider(PROVIDER_URL);
const contractInstance = new ethers.Contract(CONTRACT_ADDRESS, abi, provider);

const wallet = new ethers.Wallet(WALLET_PRIVATE_KEY, provider);

const burnBot = async () => {
  try {
    // let total = await contractInstance.totalSupply();
    let now = Math.floor(new Date() / 1000);
    let burnNeeded = false;
    let expiryTokens = [];
    let activeTokenIdsCount = await (
      await contractInstance.getActiveTokenIdsCount()
    ).toNumber();
    console.log(activeTokenIdsCount);
    for (let i = 0; i < activeTokenIdsCount; i++) {
      let tokenId = await (await contractInstance.getTokenId(i)).toBigInt();
      let tokenExpiry = await await contractInstance.getExpiryDate(tokenId);
      if (now > tokenExpiry) {
        burnNeeded = true;
        expiryTokens.push(tokenId);
      }
    }
    console.log(burnNeeded);
    console.log(expiryTokens);
    if (burnNeeded) {
      await burn(expiryTokens);
      burnNeeded = false;
      expiryTokens = [];
    }
  } catch (err) {
    console.log("err");
    console.log(err);
  }
};

const burn = async (expiryTokens) => {
  try {
    console.log(expiryTokens);
    for (let i = 0; i < expiryTokens.length; i++) {
      const nonce = await provider.getTransactionCount(
        wallet.address,
        "latest"
      );
      console.log(nonce);
      let gasFee = await provider.getFeeData();
      gasFee = gasFee.gasPrice;
      console.log(gasFee);

      let rawTxn = await contractInstance.populateTransaction.burn(
        expiryTokens[i],
        {
          nonce: nonce,
          gasLimit: 500000,
          gasPrice: gasFee,
        }
      );
      console.log(rawTxn);
      let signedTxn = await wallet.sendTransaction(rawTxn);
      let reciept = await signedTxn.wait();
      if (reciept) {
        console.log(
          "Transaction is successful!!!" + "\n" + "Transaction Hash:",
          signedTxn.hash +
            "\n" +
            "Block Number:" +
            reciept.blockNumber +
            "\n" +
            "Navigate to https://testnet.avascan.info/blockchain/c/tx/" +
            signedTxn.hash,
          "to see your transaction"
        );
      } else {
        console.log("err");
      }
    }
  } catch (err) {
    console.log(err);
  }
};


module.exports = burnBot;