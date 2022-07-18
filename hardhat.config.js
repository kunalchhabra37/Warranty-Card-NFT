require('dotenv').config();
require("@nomicfoundation/hardhat-toolbox");

const { PROVIDER_URL, WALLET_PRIVATE_KEY } = process.env;

module.exports = {
  solidity: "0.8.7",
  defaultNetwork: "polygon_mumbai",
  networks: {
    hardhat:{},
    polygon_mumbai: {
      url: PROVIDER_URL,
      accounts: [WALLET_PRIVATE_KEY]
    }
  }
}

