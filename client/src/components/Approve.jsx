import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

const Approve = () => {
  const [to, setTo] = useState ("");
  const [tokenURI, setTokenURI] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
    console.log(to, tokenURI);
  };
  return (
    <div className="container1">
      <h1>Approve</h1>
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
        <Button variant="primary" type="submit" onClick={handleSubmit}>
          Approve
        </Button>
      </Form>
    </div>
  );
};
export default Approve;