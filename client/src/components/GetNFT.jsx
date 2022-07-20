import { useState, useContext } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { WarrantyCardContext } from "../context/WarrantyCardContext";

const GetNFT = () => {
  const { getTokenUri } = useContext(WarrantyCardContext);
  const [tokenID, settokenID] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        let res = await getTokenUri(tokenID);
        console.log(res)
  };
  return (
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
        <Button variant="primary" type="submit" onClick={handleSubmit}>
          Get
        </Button>
      </Form>
    </div>
  );
};

export default GetNFT