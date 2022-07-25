import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { validateBigInt } from "./Validation";
import { useContext } from "react";
import { WarrantyCardContext } from "../context/WarrantyCardContext";
import { Bars } from "react-loader-spinner";
const Approve = () => {
  const { incServiceCount } = useContext(WarrantyCardContext);
  const [tokenID, settokenID] = useState("");
  const [res, setRes] = useState(false);
  const [loading, setLoading] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setRes(false);
    setLoading(true);
    if (!validateBigInt(tokenID)) {
      toast.warning("Not a valid TokenId", {
        position: "top-right",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      setLoading(false);
    } else {
      let res = await incServiceCount(tokenID);
      if (res.hasOwnProperty("error")) {
        console.log(res.error);
        toast.warning(res.error, {
          position: "top-right",
          autoClose: 4000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        setLoading(false);
      } else {
        console.log(res);
        setRes(res);
        settokenID("");
        setLoading(false);
      }
      
    }
  };
  return (
    <>
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
          {loading ? (
            <div className="text-center">
              <Bars color="#00BFFF" width={344} wrapperStyle wrapperClass />
            </div>
          ) : (
            <Button variant="primary" type="submit" onClick={handleSubmit}>
              Increase Service Count
            </Button>
          )}
        </Form>
      </div>
      {res && <p className="text-white text-center result">{`${res.msg} at ${res.hash}`}</p>}
    </>
  );
};
export default Approve;
