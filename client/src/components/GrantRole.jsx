import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

const GrantRole = () => {
  const [to, setTo] = useState ("");
  const [role, setRole] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
    console.log(to, role);
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
        <Form.Label>Role</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter Role"
          value={role}
          onChange={(e) => setRole(e.target.value)}
        />
      </Form.Group>
      <Button variant="primary" type="submit" onClick={handleSubmit}>
        Submit
      </Button>
    </Form>
  );
};

export default GrantRole