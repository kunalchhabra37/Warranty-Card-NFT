import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const Approve = () => {
  const [tokenID, settokenID] = useState("");

  const validateAddress = (address) => {
    const regex = new RegExp("^0x[a-fA-F0-9]{40}$");
    return regex.test(address);
  };
  const validateBigInt = (bigInt) => {
    const regex = new RegExp("^[1-9][0-9]*$");
    return regex.test(bigInt);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateBigInt(tokenID)) {
      toast.warning("Not a valid address", {
        position: "top-right",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else {
      console.log(tokenID);
    }
  };
  return (
    <div className="container1">
      <h1>Increase Service Count</h1>
      <Form>
        <Form.Group className="mb-3 ctrl">
          <Form.Label>tokenID</Form.Label>
          <Form.Control
            type="text"
            placeholder="tokenID"
            value={tokenID}
            onChange={(e) => settokenID(e.target.value)}
          />
        </Form.Group>
        <Button variant="primary" type="submit" onClick={handleSubmit}>
          Increase Service Count
        </Button>
      </Form>
    </div>
  );
};
export default Approve;
