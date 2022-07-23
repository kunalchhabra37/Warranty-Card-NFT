import { useState, useContext } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { WarrantyCardContext } from "../context/WarrantyCardContext";

const CheckExpiry = () => {
  const [tokenID, setTokenId] = useState("");
  const [res, setRes] = useState(false);
  const { getExpiry } = useContext(WarrantyCardContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    let res = await getExpiry(tokenID);
    if(res.hasOwnProperty('error')){
      console.log(res.error);
    }else{
      res = (new Date(res*1000)).toString();
      console.log(res);
      setRes(res);
    }
  };

  return (
    <>
    <div className="container1">
      <h1>Check Expiry</h1>
      <Form>
        <Form.Group className="mb-3 ctrl">
          <Form.Label>TokenID</Form.Label>
          <Form.Control
            type="text"
            placeholder="TokenID"
            value={tokenID}
            onChange={(e) => setTokenId(e.target.value)}
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

export default CheckExpiry;
