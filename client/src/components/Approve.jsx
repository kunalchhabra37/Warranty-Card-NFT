import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const Approve = () => {
  const [to, setTo] = useState ("");
  const [tokenURI, setTokenURI] = useState("");

  const validateAddress = (address) => {
    const regex = new RegExp('^0x[a-fA-F0-9]{40}$');
    return regex.test(address);
  }
  const validateBigInt = (bigInt) => {
    const regex = new RegExp('^[1-9][0-9]*$');
    return regex.test(bigInt);
  }
    const handleSubmit = (e) => {
      e.preventDefault();
      if (!validateBigInt(to)) {
        toast.warning("Not a valid address", {
          position: "top-right",
          autoClose: 4000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
      else {
        console.log(to, tokenURI);
      }
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