# E-commerce Warranty Card NFT System
## Project Introduction
Many products come with Warranty Cards. Currently Warranty is determined by some physical Warranty Cards which posses several issues: -
- Warranty Document can be easily falsified
- A bad acting seller could create duplicate warranty cards or warranty Cards of expired products.
- Product Ownership and authenticity cannot be proven through physical warranty Cards.

This project tokenized the Warranty Cards in Blockchain world which eradicates the above problems.
Features of the Project :- 
- Warranty Cards are converted to Decaying NFTs.
- It proves authenticity and ownership of product.
- It eradicates the possibility of false or duplicate Warranty Cards.
- Warranty Card decays after the warranty period is over.
- Warranty Cards can be transaferred on resale of the product.

The Project consists of 3 Elements:
1. [ERC721 Solidity Contract for Warranty Card](#erc721-solidity-contract)
2. [GUI to interact with Contract](#graphical-user-interface)
3. [Node Server for minting API and Burn Bot](#node-server)

### Libraries and Open Source projects used
- openzeppelin ERC21 for ERC721 standard contract
- openzeppelin ERC721URIStrorage for tokenURI storage of Warranty Card
- openzeppelin E721Enumerable for Enumerability of Warranty Card.
- openzeppelin ERC721Burnable for burnable compatible Warranty Card.
- openzeppelin Ownable for Ownable Warranty Cards.
- openzeppelin Counters for genrating token ids for Minting Warranty Cards.
- openzeppelin AccessControl for Roles in contract.
- ethers.js for interacting with contract thorough javascript.
- react.js for UI
- Hardhat for devlopment and deployment of contract.
- Node.js and Express.js for Node server for catering minting API and Burn Bot.

---
### ERC721 Solidity Contract
- Contract can be used to mint Warranty Card.
- We cannot mint multiple warranty Cards with same SerialNo.
- By default, the owner of contract is approved for all Warranty Cards.
- Contract can check authenticity and ownership of the Warranty Card.
- Contract can burn the warranty Cards.
#### Roles in contract
- MINTER_ROLE - Address with this role can mint Warranty Card.
- SERVICE_PROVIDER - Address with this role can increase service count of Warrnty Card.
- MINTER_ROLE_ADMIN - Address with this role can assign or revoke MINTER_ROLE and MINTER_ROLE_ADMIN.
- SERVICE_PROVIDER_ADMIN - Address with this role can assign or revoke SERVICE_PROVIDER and SERVICE_PROVIDER_ADMIN.
#### Payable functionalities
- Any address with MINTER_ROLE can mint Warranty Card with serial number, warranty end and tokenUri.
- Warranty Card can burn after expiry by the owner of contract or by owner of Warranty Card.
- Warranty Card can be transferred to any address by the owner of Contract or ower of Warranty Card.
- Warranty Card's Service count can be increased by address with SERVICE_PROVODER role.
#### Non Payable functionalitites
- Contract can check ownership and authenticity of Warranty Card.
- Contract can return expiry date of Warranty Card
- Contract can return tokenId by the serial No of Warranty Card.
- We can get total number of active Warranty Cards.
- Contract can return Warranty Card tokenUri by it's tokenId.
#### Access Modifiers
- onlyMinters - Checks for MINTER_ROLE
- onlyServiceProviders - Checks for SERVICE_PROVIDER_ROLE
---

### Graphical User Interface
- We can interact with Contract with Web Based UI.
- UI connects with Metamask wallet using metamask extension.
#### Non Payable Functions
- We can get total active number of the Warranty Cards.
- It can use to check the authenticity and ownership of Warranty Card and thereby proving authenticity of the product using tokenID, serialNo and owner wallet address.
- It can be used to check expiry of the Warranty Card using token ID.
- We can also view our Warranty Card.
- We can also get our tokenID with serialNo of product.
#### Payable Functions
- Address with MINTER_ROLE can issue warranty card with necessary required information.
- Owner of contract or Owner of Warranty Card can transfer warranty card.
- Address with SERVICE_PROVIDER can increase service count of warranty card.
- Address with MINTER_ROLE_ADMIN and SERVICE_PROVIDER_ADMIN can grant or revoke their respective roles.
---

### Node Server
- It runs Minting API that can help to mint the Warranty Card.
- It runs Burn Bot that checks for expired tokens and burns them.
- Node server connects with owner's wallet address from metamask private key.
- It connects with the Blockchain network Provider with Provider URL.
#### Minting API
- Endpoint: POST /api/mint/warrantyCard
- Mint Warranty Card with requires headers and body.
- headers: Wallet-Authorization : metamask private key
- body: address, serialNo, warrantyEnd, name, description, product_id, inovice_no, payment_gateway, platform, purchase_date, transaction_id, transaction_method
#### Burn Bot
- Everyday bot checks for expired warranty cards off-chain.
- Bot burns the expired Warranty Cards if present.
---

## Setup Project
1. Perform `npm install` in main folder and client folder.
2. Rename .env.example to .env
3. Put values in .env
4. Perform above steps for /client/src/utils/constants.example.js
5. To deploy contract run:
```
npx hardhat run scripts/deploy.js --network fuji/polygon_mumbai
```
6. Paste contract address in env and constants.js
7. Start Node server
```
npm run start
```
8. Start React Server
```
npm run build
npm run preview
```