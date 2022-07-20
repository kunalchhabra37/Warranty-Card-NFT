import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useContext } from "react";
import { WarrantyCardContext } from "../context/WarrantyCardContext";

const GrantRole = () => {
  const { grantRoles } = useContext(WarrantyCardContext);
  const [to, setTo] = useState("");
  const [role, setRole] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(to, role);
    let res = await grantRoles(role, to);
    console.log(to, role);
    console.log(res);
  };
  return (
    <div className="container1">
      <h1>Grant Role</h1>
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
    </div>
  );
};

export default GrantRole;
