import { useState, useContext } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { WarrantyCardContext } from "../context/WarrantyCardContext";

const CheckAuthenticity = () => {
  const { checkAuthenticity } = useContext(WarrantyCardContext);
  const [to, setTo] = useState ("");
  const [tokenID, settokenID] = useState("");
  const [serialNo, setSerialNo] = useState("");

    const handleSubmit = async (e) => {
        
        e.preventDefault();
        let res = await checkAuthenticity(to, tokenID, serialNo);
        console.log(res)        
  };
  return (
    <div className="container1">
      <h1>Check Authenticity</h1>
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
          <Form.Label>tokenID</Form.Label>
          <Form.Control
            type="text"
            placeholder="tokenID"
            value={tokenID}
            onChange={(e) => settokenID(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3 ctrl">
          <Form.Label>SerialNo</Form.Label>
          <Form.Control
            type="text"
            placeholder="SerialNo"
            value={serialNo}
            onChange={(e) => setSerialNo(e.target.value)}
          />
        </Form.Group>
        <Button variant="primary" type="submit" onClick={handleSubmit}>
          Check
        </Button>
      </Form>
    </div>
  );
};
export default CheckAuthenticity