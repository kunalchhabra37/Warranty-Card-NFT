import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

const CheckAuthenticity = () => {
  const [to, setTo] = useState ("");
  const [tokenURI, setTokenURI] = useState("");
  const [serialNo, setSerialNo] = useState("");

    const handleSubmit = (e) => {
        
        e.preventDefault();
        
    console.log(to, tokenURI, serialNo);
  };
  return (
    <div className="container1">
      <h1>Check Authenticity</h1>
      <Form>
        <Form.Group className="mb-3 ctrl">
          <Form.Label>To</Form.Label>
          <Form.Control
            type="text"
            placeholder="To"
            value={to}
            onChange={(e) => setTo(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3 ctrl">
          <Form.Label>TokenURI</Form.Label>
          <Form.Control
            type="text"
            placeholder="TokenURI"
            value={tokenURI}
            onChange={(e) => setTokenURI(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3 ctrl">
          <Form.Label>SerialNo</Form.Label>
          <Form.Control
            type="text"
            placeholder="SerialNo"
            value={serialNo}
            onChange={(e) => setSerialNo(e.target.value)}
          />
        </Form.Group>
        <Button variant="primary" type="submit" onClick={handleSubmit}>
          Check
        </Button>
      </Form>
    </div>
  );
};
export default CheckAuthenticity