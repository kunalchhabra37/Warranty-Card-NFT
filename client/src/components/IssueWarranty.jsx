import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

const IssueWarranty = () => {
  const [to, setTo] = useState("");
  const [tokenURI, setTokenURI] = useState("");
  const [serialNo, setSerialNo] = useState("");
  const [warrantyPeriod, setWarrantyPeriod] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(to, tokenURI, serialNo, warrantyPeriod);
  };
  return (
    <div className="container1">
      <h1>Issue Warranty</h1>
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
          <Form.Label>serialNo</Form.Label>
          <Form.Control
            type="text"
            placeholder="SerialNo"
            value={serialNo}
            onChange={(e) => setSerialNo(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3 ctrl">
          <Form.Label>Warranty End</Form.Label>
          <Form.Control
            type="text"
            pattern="^[0-9]{1,}$"
            title="Only numbers are allowed"
            placeholder="Warranty End"
            value={warrantyPeriod}
            onChange={(e) => setWarrantyPeriod(e.target.value)}
          />
        </Form.Group>
        <Button variant="primary" type="submit" onClick={handleSubmit}>
          Issue
        </Button>
      </Form>
    </div>
  );
};

export default IssueWarranty;
