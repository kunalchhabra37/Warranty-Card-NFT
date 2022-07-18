const express = require("express");
// import issueWarrantyCard from "./scripts/mintWarrantyCard";
const issueWarrantyCard = require("./scripts/mintWarrantyCard");
const app = express();

// Body Parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post("/api/mint/warrantyCard", async (req, res) => {
  // console.log(req.headers["Wallet-Authentication"]);
  let walletVerify =
    req.get("Wallet-Authorization") == process.env.WALLET_PRIVATE_KEY;
  if (!walletVerify) {
    return res.status(401).send("Unauthorized");
  }
  try {
    let mint = await issueWarrantyCard(
      req.body.address,
      req.body.tokenUri,
      req.body.serialNo,
      req.body.warrantyEnd
    );
    res.json({ result: mint });
    return process.exit(0);
  } catch (err) {
    res.status(500).send("Internal Server error");
    return process.exit(1);
  }
});

// ENV
const PORT = process.env.PORT || 5000;

// Making Server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
