const axios = require("axios");
let pinataConfig = require("../config/pinataConfig.json");
require("dotenv").config();

let config = {
  method: "post",
  url: "https://api.pinata.cloud/pinning/pinJSONToIPFS",
  headers: {
    "Content-Type": "application/json",
    pinata_api_key: process.env.PINATA_API_KEY,
    pinata_secret_api_key: process.env.PINATA_SECRET_API_KEY,
  },
  data: "",
};

const pinFile = async (WarrantyCard) => {
  try {
    pinataConfig.pinataContent = WarrantyCard;
    config.data = JSON.stringify(pinataConfig);
    let response = await axios(config);
    console.log(response.data);
    return response.data.IpfsHash;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

module.exports = pinFile;
