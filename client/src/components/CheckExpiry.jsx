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
    <Form>
      <Form.Group className="mb-3">
        <Form.Label>To</Form.Label>
        <Form.Control
            type="text"
          placeholder="To"
          value={tokenID}
          onChange={(e) => setTokenId(e.target.value)}
        />
      </Form.Group>
      <Button variant="primary" type="submit" onClick={handleSubmit}>
        Submit
      </Button>
    </Form>
  );
};

export default CheckExpiry