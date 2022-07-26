import { useContext,useState } from "react";
import { WarrantyCardContext } from "../context/WarrantyCardContext";
import Button from "./Button";

const Welcome = () => {
  const { connectWallet, connectedWallet, totalSupply } =
    useContext(WarrantyCardContext);
  const [res, setRes] = useState(false);
  const getTotalSupply = async() => {
    console.log(totalSupply);
    setRes(totalSupply);
  } 
  return (
    <div className="container text-center">
      <h1 className="text-white">Warranty Card NFT App</h1>
      <br />
      <p className="text-white">
        Your Only Place to Check your Product Authencticity, warranty expiry and
        get your warranty card.
      </p>
      {!connectedWallet && (
        <Button
          text="Conntect to Wallet"
          className="btn-primary text-white btn-style"
          onClick={connectWallet}
        />
      )}
      {connectedWallet && (
        <>
        <p className="text-muted">
          Connected Wallet Address is: {connectedWallet}
          </p>
          <br />
          <Button
            text="Get Total Supply"
            className="btn-primary text-white btn-style"
            onClick={getTotalSupply}
          />
        </>
      )}
      {res && <p className="text-white result">Total Supply is: {res}</p>}
    </div>
  );
};

export default Welcome;
