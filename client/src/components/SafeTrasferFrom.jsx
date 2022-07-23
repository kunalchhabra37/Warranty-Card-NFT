import { useState, useContext } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { WarrantyCardContext } from "../context/WarrantyCardContext";

const SafeTrasferFrom = () => {
  const { transferWarrantyCard } = useContext(WarrantyCardContext);

  const [to, setTo] = useState("");
  const [tokenID, setTokenID] = useState("");
  const [from, setFrom] = useState("");
  const [res, setRes] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    let res = await transferWarrantyCard(from, to, tokenID);
    if (res.hasOwnProperty("error")) {
      console.log(res.error);
    } else {
      console.log(res);
      setRes(res);
    }
  };
  return (
    <>
      <div className="container1">
        <h1>Transfer</h1>
        <Form>
          <Form.Group className="mb-3 ctrl">
            <Form.Label>From</Form.Label>
            <Form.Control
              type="text"
              placeholder="From"
              value={from}
              onChange={(e) => setFrom(e.target.value)}
            />
          </Form.Group>
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
            <Form.Label>TokenID</Form.Label>
            <Form.Control
              type="text"
              placeholder="TokenID"
              value={tokenID}
              onChange={(e) => setTokenID(e.target.value)}
            />
          </Form.Group>

          <Button variant="primary" type="submit" onClick={handleSubmit}>
            Transfer
          </Button>
        </Form>
      </div>
      {res && <p className="text-white">{`${res.msg} at hash: ${res.hash}`}</p>}
    </>
  );
};

export default SafeTrasferFrom;
