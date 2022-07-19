import { useState, useContext } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { WarrantyCardContext } from "../context/WarrantyCardContext";

const CheckExpiry = () => {
  const [tokenID, setTokenId] = useState("");

  const { checkExpiry } = useContext(WarrantyCardContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    let res = await checkExpiry(tokenID);
    console.log(res);
  };
  return (
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
  );
};

export default CheckExpiry;
