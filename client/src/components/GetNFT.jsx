import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

const GetNFT = () => {
  const [tokenURI, setTokenURI] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
    console.log(tokenURI);
  };
  return (
    <div className="container1">
      <h1>Get Card</h1>
      <Form>
        <Form.Group className="mb-3 ctrl">
          <Form.Label>TokenURI</Form.Label>
          <Form.Control
            type="text"
            placeholder="TokenID"
            value={tokenURI}
            onChange={(e) => setTokenURI(e.target.value)}
          />
        </Form.Group>
        <Button variant="primary" type="submit" onClick={handleSubmit}>
          Get
        </Button>
      </Form>
    </div>
  );
};

export default GetNFT