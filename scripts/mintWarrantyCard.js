require('dotenv').config();
const { ethers } = require("ethers");

const { CONTRACT_ADDRESS, WALLET_PRIVATE_KEY, PROVIDER_URL } = process.env;

const contract = require("../artifacts/contracts/WarrantyCard.sol/WarrantyCard.json");
const abi = contract.abi;

const provider = new ethers.providers.JsonRpcProvider(PROVIDER_URL);
const contractInstance = new ethers.Contract(CONTRACT_ADDRESS, abi, provider);

const wallet = new ethers.Wallet(WALLET_PRIVATE_KEY, provider);

const issueWarrantyCard = async (address, tokenUri, serialNo, warrantyEnd) => {
  try {
    const nonce = await provider.getTransactionCount(wallet.address, "latest");
    console.log(nonce)
    let gasFee = await provider.getFeeData();
    gasFee = gasFee.gasPrice;
    console.log(gasFee);
    let rawTxn = await contractInstance.populateTransaction.issueWarrantyCard(
      address,
      tokenUri,
      serialNo,
      warrantyEnd,
      {
        nonce: nonce,
        gasLimit: 500000,
        gasPrice: gasFee
        // maxFeePerGas: 1000,
        // maxPriorityFeePerGas: 1000,
      }
    );
    console.log(rawTxn);
    let signedTxn = (await wallet).sendTransaction(rawTxn);
    console.log(signedTxn);
    let reciept = (await signedTxn).wait();
    if (reciept) {
      console.log(
        "Transaction is successful!!!" + "\n" + "Transaction Hash:",
        (await signedTxn).hash +
          "\n" +
          "Block Number:" +
          (await reciept).blockNumber +
          "\n" +
          "Navigate to https://mumbai.polygonscan.com/tx/" +
          (await signedTxn).hash,
        "to see your transaction"
      );
    } else {
      console.log("Error submitting transaction");
    }
  } catch (err) {
    console.log("err \n\n\n");
    console.log(err);
  }
};

const main = async () => {
  try {
    await issueWarrantyCard(
      wallet.address,
      "QmXx3Uq1v6ukb73yi3oL51UJ88xeGdVp4zZy4dBAKTN6yt",
      111,
      1658140598
    );
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

main();
