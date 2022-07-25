import { useState, useContext } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { WarrantyCardContext } from "../context/WarrantyCardContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { validateBigInt } from "./Validation";
const GetTokenId = () => {
  const [serialNo, setserialNo] = useState("");
  const [res, setRes] = useState(false);
  const { getTokenId } = useContext(WarrantyCardContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
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
    } else {
      let res = await getTokenId(serialNo);
      if (res.hasOwnProperty('error')) {
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
        setserialNo('')
      }
    }
  };

  return (
    <>
    <div className="container1">
      <h1>Check Expiry</h1>
      <Form>
        <Form.Group className="mb-3 ctrl">
          <Form.Label>serialNo</Form.Label>
          <Form.Control
            type="text"
            placeholder="serialNo"
            value={serialNo}
            onChange={(e) => setserialNo(e.target.value)}
          />
        </Form.Group>
        <Button variant="primary" type="submit" onClick={handleSubmit}>
          Check
        </Button>
      </Form>
    </div>
    {res && <p className="text-white"> {res} </p>}
    </>
  );
};

export default GetTokenId;
