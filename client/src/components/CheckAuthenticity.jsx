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
    <Form>
      <Form.Group className="mb-3">
        <Form.Label>To</Form.Label>
        <Form.Control
                  type="text"
          placeholder="To"
          value={to}
          onChange={(e) => setTo(e.target.value)}
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>TokenURI</Form.Label>
        <Form.Control
          type="text"
          placeholder="TokenURI"
          value={tokenURI}
          onChange={(e) => setTokenURI(e.target.value)}
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>serialNo</Form.Label>
        <Form.Control
          type="text"
          placeholder="serialNo"
          value={serialNo}
          onChange={(e) => setSerialNo(e.target.value)}
        />
      </Form.Group>
      <Button variant="primary" type="submit" onClick={handleSubmit}>
        Submit
      </Button>
    </Form>
  );
};
export default CheckAuthenticity