import { useState, useContext } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { WarrantyCardContext } from "../context/WarrantyCardContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { validateBigInt } from "./Validation";
import { Bars } from "react-loader-spinner";
import ViewNFT from "./ViewNFT";
const GetNFT = () => {
  const { getTokenUri } = useContext(WarrantyCardContext);
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
      let res = await getTokenUri(tokenID);
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
      } else {
        console.log(res);
        setRes(res);
        settokenID("");
      }
      setLoading(false);
    }
  };
  return (
    <>
      <div className="container1">
        <h1>Get Warranty Card</h1>
        <Form>
          <Form.Group className="mb-3 ctrl">
            <Form.Label>TokenID</Form.Label>
            <Form.Control
              type="text"
              placeholder="TokenID"
              value={tokenID}
              onChange={(e) => settokenID(e.target.value)}
            />
          </Form.Group>
          {loading ? (
            <div className="text-center">
              <Bars color="#00BFFF" width={273} wrapperStyle wrapperClass />
            </div>
          ) : (
            <Button variant="primary" type="submit" onClick={handleSubmit}>
            Get
            </Button>
          )}
          
        </Form>
      </div>
      <br />
      {res &&  <ViewNFT url={res} />}
    </>
  );
};

export default GetNFT;
