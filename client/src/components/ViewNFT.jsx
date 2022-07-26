import React from "react";
import "./nft.css";
const ViewNFT = ({name, image, description, serialNo, warrantyEnd}) => {
// Calling that async function
console.log({name, image, description, serialNo, warrantyEnd})
  return (
    <div className="nft-container">
      <div className="container2">
        <article className="main-image text-center">
          <img src={image} alt="hi" />
        </article>

        <article>
          <h2>{name}</h2>
          <p> {description} </p>

          <ul>
            <li >Serial No: {serialNo}</li>
            <li>Expiry: {new Date(warrantyEnd * 1000).toISOString().split('T')[0]
}</li>
          </ul>
          
        </article>
      </div>
    </div>
  );
};

export default ViewNFT;
