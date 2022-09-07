const express = require("express");
const WarrantyCard2 = require("./config/WarrantyCard2.json");
const issueWarrantyCard = require("./scripts/mintWarrantyCard");
const burnBot = require("./scripts/burnBot");
const pinFile = require("./scripts/pinJson");
const app = express();

// Body Parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

setInterval(burnBot, 20000);

app.post("/api/mint/warrantyCard", async (req, res) => {
  // console.log(req.headers["Wallet-Authentication"]);
  let walletVerify =
    req.get("Wallet-Authorization") == process.env.WALLET_PRIVATE_KEY;
  if (!walletVerify) {
    return res.status(401).send("Unauthorized");
  }
  try {
    WarrantyCard2.name = req.body.name;
    WarrantyCard2.description = req.body.description;
    WarrantyCard2.serial_no = req.body.serialNo;
    WarrantyCard2.product_Id = req.body.product_Id;
    WarrantyCard2.history.invoice_no = req.body.invoice_no;
    WarrantyCard2.history.payment_gateway = req.body.payment_gateway;
    WarrantyCard2.history.platform = req.body.platform;
    WarrantyCard2.history.purchase_date = req.body.purchase_date;
    WarrantyCard2.history.transaction_id = req.body.transaction_id;
    WarrantyCard2.history.transaction_method = req.body.transaction_method;
    WarrantyCard2.warranty_period = req.body.warrantyEnd;
    let ipfsHash = await pinFile(WarrantyCard2);

    let mint = await issueWarrantyCard(
      req.body.address,
      ipfsHash,
      req.body.serialNo,
      req.body.warrantyEnd
    );
    if (res.hasOwnProperty("error")) {
      res.status(400).json(mint);
    }
    return res.json(mint);
    // return process.exit(0);
  } catch (err) {
    return res.status(500).send("Internal Server error");
    // return process.exit(1);
  }
});

// ENV
const PORT = process.env.PORT || 5000;

// Making Server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
