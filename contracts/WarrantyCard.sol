// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Burnable.sol";

contract WarrantyCard is
    ERC721,
    ERC721Enumerable,
    ERC721URIStorage,
    Ownable,
    AccessControl,
    ERC721Burnable
{
    struct warrantyCards {
        string serialNo;
        uint256 warrantyEnd;
        uint serviceCount;
    }
    // counters for Assigning IDS
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIdCounter;

    // mapping to store customers warranty cards
    mapping(address => mapping(uint256 => warrantyCards)) public customerToWarrantyCards;

    // Stores TokenIds of all active/notExpired Tokens
    uint256[] public activeTokenIds;

    // Stores mapping of serial number to tokenId for unique Serial Numbers and fetching tokenID
    mapping(string => uint256) serialNoToTokenId;

    // Roles
    bytes32 public constant MINTER_ROLE = keccak256("MINTER_ROLE");
    bytes32 public constant MINTER_ADMIN = keccak256("MINTER_ADMIN");
    bytes32 public constant SERVICE_PROVIDER = keccak256("SERVICE_PROVIDER");
    bytes32 public constant SERVICE_PROVIDER_ADMIN = keccak256("SERVICE_PROVIDER_ADMIN");

    // Modifiers
    modifier onlyMinters {
        require(hasRole(MINTER_ROLE, msg.sender), "Caller is not a minter");
        _;
    }

    modifier onlyServiceProviders {
        require(hasRole(SERVICE_PROVIDER, msg.sender));
        _;
    }

    //Constructor assigns owner to Contract
    constructor() ERC721("WarrantyCard", "WRC") {
        _setupRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _setupRole(MINTER_ROLE, msg.sender);
        _setRoleAdmin(MINTER_ROLE, MINTER_ADMIN);
        _setupRole(MINTER_ADMIN, msg.sender);
        _setupRole(SERVICE_PROVIDER, msg.sender);
        _setRoleAdmin(SERVICE_PROVIDER, SERVICE_PROVIDER_ADMIN);
        _setupRole(SERVICE_PROVIDER_ADMIN, msg.sender);
    }

    function _baseURI() internal pure override returns (string memory) {
        return "https://ipfs.io/ipfs/";
    }

    // Issue warranty Card to an address
    function issueWarrantyCard(
        address to,
        string memory _tokenUri,
        string memory _serialNo,
        uint64 _warrantyEnd
    ) public onlyMinters  {
        require(!(serialNoToTokenId[_serialNo] > 0), "Serial Number Already Exists");
        uint256 tokenId = genrateId();
        safeMint(to, tokenId, _tokenUri);

        customerToWarrantyCards[to][tokenId] = warrantyCards( _serialNo, _warrantyEnd, 0);

        activeTokenIds.push(tokenId);
        serialNoToTokenId[_serialNo] = tokenId;
    }

    // Gets TokenId for particular Serial Number
    function getTokenIdBySerialNo(string memory _serialNo) public view returns(uint256){
        return serialNoToTokenId[_serialNo];
    }

    // Check Authenticity and ownership of Product
    function checkAuthenticity(
        address to,
        uint256 _tokenId,
        string memory _serialNo
    ) public view returns (string memory) {
        require(
            checkOwnership(to, _tokenId),
            "Address is not the Owner of token"
        );
        
        require(getExpiryDate(_tokenId) >= block.timestamp, "Token is expired");// Extra Validation

        if (checkSerialNo(to, _tokenId, _serialNo)) {
            return "User and Product Verified, Warranty valid";
        } else {
            return "Serial Number Don't match";
        }
    }

   // Fetches Expiry Date of Warranty Card
    function getExpiryDate(uint256 tokenId) public view returns (uint256) {
        return customerToWarrantyCards[ownerOf(tokenId)][tokenId].warrantyEnd;
    }

    // returns length of activeTokenIds array
    function getActiveTokenIdsCount() public view returns (uint256){
        return activeTokenIds.length;
    }

    // returns tokenId by index fro array activeTokenIds
    function getTokenId(uint256 index) public view returns(uint256){
        return activeTokenIds[index];
    }

    // Increases Service count on service
    function incServiceCount(uint256 tokenId) public onlyServiceProviders {
        customerToWarrantyCards[ownerOf(tokenId)][tokenId].serviceCount += 1;
    }

    // Burns the Token on Expiration
    function burn(uint256 tokenId) public override {
        require(_isApprovedOrOwner(_msgSender(), tokenId), "ERC721: caller is not token owner nor approved");
        
        require(getExpiryDate(tokenId) < block.timestamp, "Token is not expired");// Checks for Invalid Burn Requests

        delete customerToWarrantyCards[ownerOf(tokenId)][tokenId];
        for(uint256 i = 0; i < activeTokenIds.length; i++){

            if(activeTokenIds[i] == tokenId){
                activeTokenIds[i] = activeTokenIds[activeTokenIds.length-1];
                activeTokenIds.pop();
            }
        }
        _burn(tokenId);
    }

    // Override ERC721 transferFrom method
    function transferFrom(
        address from,
        address to,
        uint256 tokenId
    ) public override {
        require(
            _isApprovedOrOwner(_msgSender(), tokenId),
            "ERC721: caller is not token owner nor approved"
        );
        require(getExpiryDate(tokenId) >= block.timestamp, "Token is required");// Extra Validation
        
        _transfer(from, to, tokenId);

        // update customerToWarrantyCards
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
        require(
            _isApprovedOrOwner(_msgSender(), tokenId),
            "ERC721: caller is not token owner nor approved"
        );
        require(getExpiryDate(tokenId) >= block.timestamp, "Token is required");// Extra Validation
        
        _safeTransfer(from, to, tokenId, data);

        // Updates customerToWarrantyCards
        customerToWarrantyCards[to][tokenId] = customerToWarrantyCards[from][tokenId];
        delete customerToWarrantyCards[from][tokenId];
    }

    // Override ERC 721 Function for approving all tokens to owner for burning 
    function setApprovalForAll(address tokenOwner,  bool approved) public override{
        _setApprovalForAll(tokenOwner, owner() , approved);
    }

    // Verify Serial Number of Product
    function checkSerialNo(
        address to,
        uint256 tokenId,
        string memory serialNo
    ) internal view returns (bool) {
        return
            keccak256(
                abi.encodePacked(customerToWarrantyCards[to][tokenId].serialNo)) 
                == keccak256(abi.encodePacked(serialNo));
    }

    // Check Ownership of Warranty Card
    function checkOwnership(address tokenOwner, uint256 tokenId)
        internal
        view
        returns (bool)
    {
        return tokenOwner == ownerOf(tokenId);
    }

    // genrate Unique ID for minting new tokens
    function genrateId() internal returns (uint256) {
        _tokenIdCounter.increment();
        return _tokenIdCounter.current();
    }

    // Actual Minting fucntion
    function safeMint(
        address to,
        uint256 tokenId,
        string memory uri
    ) internal {
        if(!isApprovedForAll(to, owner()) && to != owner()){
            setApprovalForAll(to, true);
        }
        _safeMint(to, tokenId);
        _setTokenURI(tokenId, uri);
    }
    

    // The following functions are overrides required by Solidity.

    function _beforeTokenTransfer(
        address from,
        address to,
        uint256 tokenId
    ) internal override(ERC721, ERC721Enumerable) {
        super._beforeTokenTransfer(from, to, tokenId);
    }

    function _burn(uint256 tokenId)
        internal
        override(ERC721, ERC721URIStorage)
    {
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
