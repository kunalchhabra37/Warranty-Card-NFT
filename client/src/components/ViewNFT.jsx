import React from "react";
import "./nft.css";
const ViewNFT = (props) => {
  const url = props.url;
  async function getapi(url) {
    const response = await fetch(url);
    var data = await response.json();
    console.log(data.name);
}
// Calling that async function
getapi(url);
  return (
    <div className="nft-container">
      <div className="container2">
        <article className="main-image">
          <img src="" alt="hi" />
        </article>

        <article>
          <h2>{data.name}</h2>
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
