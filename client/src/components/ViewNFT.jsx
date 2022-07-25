import React from "react";
import "./nft.css";
const ViewNFT = (props) => {
  const url=props.url;
  console.log(1);
  console.log(url);
  console.log(2);
  return (
    <div className="nft-container">
      <div className="container2">
        <article className="main-image">
          <img src="" alt="hi" />
        </article>

        <article>
          <h2>Dragon Box #1000</h2>
          <p>Power to Create New Power to Balance The Universe.</p>

          <ul>
            <li>1 ETH</li>
            <li>2 days left</li>
          </ul>
          <ul>
            <li> hi</li>
          </ul>
        </article>
      </div>
    </div>
  );
};

export default ViewNFT;
