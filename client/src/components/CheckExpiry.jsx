import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

const CheckExpiry = () => {
  const [tokenID, setTokenId] = useState ("");

    const handleSubmit = (e) => {
        e.preventDefault();
    console.log(tokenID);
  };
  return (
    <div className="container1">
      <h1>Check Expiry</h1>
      <Form>
        <Form.Group className="mb-3 ctrl">
          <Form.Label>TokenURI</Form.Label>
          <Form.Control
            type="text"
            placeholder="TokenID"
            value={tokenID}
            onChange={(e) => setTokenId(e.target.value)}
          />
        </Form.Group>
        <Button variant="primary" type="submit" onClick={handleSubmit}>
          Check
        </Button>
      </Form>
    </div>
  );
};

export default CheckExpiry