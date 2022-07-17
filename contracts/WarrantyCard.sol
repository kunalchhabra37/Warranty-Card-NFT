// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";

contract WarrantyCard is ERC721, ERC721Enumerable, ERC721URIStorage, Ownable, AccessControl {
    
    struct warrantyCards{
        string serialNo;
        uint256 warrantyEnd;
    }
    // For Assigning IDS
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIdCounter;

    // mapping to store customers warranty cards
    mapping(address => mapping(uint256 => warrantyCards)) public customerToWarrantyCards;

    // mapping to issue warranty card to an address
    mapping(address => mapping(uint256 => bool)) private issuedWarrantyCard;   
    
    bytes32 public constant MINTER_ROLE = keccak256("MINTER_ROLE");
    bytes32 public constant MINTER_ADMIN = keccak256("MINTER_ADMIN");

    modifier onlyMinters{
        require(hasRole(MINTER_ROLE, msg.sender), "Caller is not a minter");
        _;
    }
    

    //Constructor assigns owner to Contract
    constructor() ERC721("WarrantyCard", "WRC") {
        _setupRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _setupRole(MINTER_ROLE, msg.sender);
        _setRoleAdmin(MINTER_ROLE, MINTER_ADMIN);
        _setupRole(MINTER_ADMIN, msg.sender);
    }

    function _baseURI() internal pure override returns(string memory) {
        return "https://gateway.pinata.cloud/ipfs/";
    }

    // Issue warranty Card to an address
    function issueWarrantyCard(address to, string memory _tokenUri, string memory _serialNo, uint64 _warrantyEnd) public onlyMinters returns(string memory){
        uint256 tokenId = genrateId();
        safeMint(to, tokenId, _tokenUri);
        customerToWarrantyCards[to][tokenId] = warrantyCards(_serialNo, _warrantyEnd);
        issuedWarrantyCard[to][tokenId] = true;
        return tokenURI(tokenId);
    }

    // Recive Warranty Card
    function recievedWarrantyCard(uint256 _tokenId) public returns(string memory){
        // require(checkOwnership(msg.sender, _tokenId),"You are not the owner of token");
        require(_isApprovedOrOwner(_msgSender(), _tokenId), "ERC721: caller is not token owner nor approved");
        require(checkExpiryInternal(_tokenId), "Token is Expired");
        require(issuedWarrantyCard[msg.sender][_tokenId], "New Warranty Card Not Issued");
        issuedWarrantyCard[msg.sender][_tokenId] = false;
        return tokenURI(_tokenId);

    }

    // Check Authenticity and ownership of Product
    function checkAuthenticity(address to, uint256 _tokenId, string memory _serialNo) public view returns(string memory){
        require(checkOwnership(to, _tokenId),"Address is not the Owner of token");
        require(checkExpiryInternal(_tokenId), "Token is Expired");
        if(checkSerialNo(to, _tokenId, _serialNo)){
            return "Product Verified";
        } else{
            return "Serial Number Don't match";
        }
    }
    
    // Check warranty Validity 
    function checkExpiry(uint256 _tokenId) public view returns(string memory){
        require(checkExpiryInternal(_tokenId), "Token is Expired");
        return "Warranty Valid";
    }

    // Override ERC721 approve method
    function approve(address to, uint256 tokenId) public override {
        address owner = ownerOf(tokenId);
        // require(to != owner, "ERC721: approval to current owner");
        require(checkOwnership(to, tokenId),"You are not the owner of token");
        require(checkExpiryInternal(tokenId), "Token is Expired"); // Check Token Expiry
        require(
            _msgSender() == owner || isApprovedForAll(owner, _msgSender()),
            "ERC721: approve caller is not token owner nor approved for all"
        );

        _approve(to, tokenId);
    }

    // Override ERC721 transferFrom method
    function transferFrom(
        address from,
        address to,
        uint256 tokenId
    ) public override {

        require(_isApprovedOrOwner(_msgSender(), tokenId), "ERC721: caller is not token owner nor approved");
        require(checkExpiryInternal(tokenId), "Token is Expired"); // Check Token Expiry

        _transfer(from, to, tokenId);

        // ChangesToWarrantyCards
        customerToWarrantyCards[to][tokenId] = customerToWarrantyCards[from][tokenId];
        delete customerToWarrantyCards[from][tokenId];
    }

    // Overrides ERC721  safeTransferFrom method
    function safeTransferFrom(
        address from,
        address to,
        uint256 tokenId,
        bytes memory data
    ) public override {
        require(_isApprovedOrOwner(_msgSender(), tokenId), "ERC721: caller is not token owner nor approved");
        require(checkExpiryInternal(tokenId), "Token is Expired"); // Check Token Expiry

        _safeTransfer(from, to, tokenId, data);

        // ChangesToWarrantyCards
        customerToWarrantyCards[to][tokenId] = customerToWarrantyCards[from][tokenId];
        delete customerToWarrantyCards[from][tokenId];
    }

    // Verify Serial Number of Product
    function checkSerialNo(address to,uint tokenId, string memory serialNo) internal view returns(bool){
        return keccak256(abi.encodePacked(customerToWarrantyCards[to][tokenId].serialNo)) == keccak256(abi.encodePacked(serialNo));
    }

    // Checks if warranty is valid(true) or expired(false)
    function checkExpiryInternal(uint256 tokenId) internal view returns(bool){
        uint256 expiryDate = getExpiryDate(tokenId);
        return block.timestamp <= expiryDate;
    }

    // Fetches Expiry Date of Warranty Card
    function getExpiryDate(uint256 tokenId) internal view returns(uint256){
        return customerToWarrantyCards[ownerOf(tokenId)][tokenId].warrantyEnd;
    }

    // Check Ownership of Warranty Card
    function checkOwnership(address tokenOwner,uint256 tokenId) internal view returns(bool){
        return tokenOwner == ownerOf(tokenId);
    }

    // genrate Unique ID 
    function genrateId() internal returns(uint256){
        _tokenIdCounter.increment();
        return _tokenIdCounter.current();
    }

    // Actual Minting fucntion
    function safeMint(address to, uint256 tokenId, string memory uri)
        internal
    {
        _safeMint(to, tokenId);
        _setTokenURI(tokenId, uri);
    }
    
    // The following functions are overrides required by Solidity.

    function _beforeTokenTransfer(address from, address to, uint256 tokenId)
        internal
        override(ERC721, ERC721Enumerable)
    {
        super._beforeTokenTransfer(from, to, tokenId);
    }

    function _burn(uint256 tokenId) internal override(ERC721, ERC721URIStorage) {
        super._burn(tokenId);
    }

    function tokenURI(uint256 tokenId)
        public
        view
        override(ERC721, ERC721URIStorage)
        returns (string memory)
    {
        return super.tokenURI(tokenId);
    }

    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC721, ERC721Enumerable, AccessControl)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }
}