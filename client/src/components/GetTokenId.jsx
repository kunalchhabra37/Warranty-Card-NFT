import { useState, useContext } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { WarrantyCardContext } from "../context/WarrantyCardContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { validateBigInt } from "./Validation";
import { Bars } from "react-loader-spinner";
const GetTokenId = () => {
  const [serialNo, setserialNo] = useState("");
  const [res, setRes] = useState(false);
  const { getTokenId } = useContext(WarrantyCardContext);
  const [loading, setLoading] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setRes(false);
    setLoading(true);
    if (!validateBigInt(serialNo)) {
      toast.warning("Not a valid serialNo", {
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
      let res = await getTokenId(serialNo);
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
        setserialNo("");
      }
      setLoading(false);
    }
  };

  return (
    <>
      <div className="container1">
        <h1>Get TokenId</h1>
        <Form>
          <Form.Group className="mb-3 ctrl">
            <Form.Label>SerialNo</Form.Label>
            <Form.Control
              type="text"
              placeholder="serialNo"
              value={serialNo}
              onChange={(e) => setserialNo(e.target.value)}
            />
          </Form.Group>
          {loading ? (
            <div className="text-center">
              <Bars color="#00BFFF" width={273} wrapperStyle wrapperClass />
            </div>
          ) : (
            <Button variant="primary" type="submit" onClick={handleSubmit}>
              Check
            </Button>
          )}
        </Form>
      </div>
      {res && <p className="text-white text-center result"> {res} </p>}
    </>
  );
};

export default GetTokenId;
