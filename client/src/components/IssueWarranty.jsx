import { useState, useContext } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { WarrantyCardContext } from "../context/WarrantyCardContext";

const IssueWarranty = () => {
  const { issueWarrantyCard } = useContext(WarrantyCardContext);

  const [to, setTo] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [serialNo, setSerialNo] = useState("");
  const [product_Id, setProduct_Id] = useState("");
  const [invoice_no, setInvoice_no] = useState("");
  const [payment_gateway, setPayment_gateway] = useState("");
  const [platform, setPlatform] = useState("");
  const [purchase_date, setPurchase_date] = useState("");
  const [transaction_id, setTransaction_id] = useState("");
  const [transaction_method, setTransaction_method] = useState("");
  const [warranty_period, setWarranty_period] = useState("");
  const [attributes, setAttributes] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    let res = await issueWarrantyCard(
      to,
      "QmXx3Uq1v6ukb73yi3oL51UJ88xeGdVp4zZy4dBAKTN6yt",
      serialNo,
      warranty_period
    );
    console.log(res);
  };
  return (
    <div className="container1 mt-3">
      <h1>Issue Warranty</h1>
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
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3 ctrl">
          <Form.Label>Description</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3 ctrl">
          <Form.Label>Serial No</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter serialNo"
            value={serialNo}
            onChange={(e) => setSerialNo(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3 ctrl">
          <Form.Label>Product Id</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter product_Id"
            value={product_Id}
            onChange={(e) => setProduct_Id(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3 ctrl">
          <Form.Label>Invoice No</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter invoice_no"
            value={invoice_no}
            onChange={(e) => setInvoice_no(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3 ctrl">
          <Form.Label>Payment Gateway</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter payment_gateway"
            value={payment_gateway}
            onChange={(e) => setPayment_gateway(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3 ctrl">
          <Form.Label>Platform</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter platform"
            value={platform}
            onChange={(e) => setPlatform(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3 ctrl">
          <Form.Label>Purchase Date</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter purchase_date"
            value={purchase_date}
            onChange={(e) => setPurchase_date(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3 ctrl">
          <Form.Label>Transaction Id</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter transaction_id"
            value={transaction_id}
            onChange={(e) => setTransaction_id(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3 ctrl">
          <Form.Label>Transaction Method</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter transaction_method"
            value={transaction_method}
            onChange={(e) => setTransaction_method(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3 ctrl">
          <Form.Label>Warranty Period</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter warranty_period"
            value={warranty_period}
            onChange={(e) => setWarranty_period(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3 ctrl">
          <Form.Label>Attributes</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter attributes"
            value={attributes}
            onChange={(e) => setAttributes(e.target.value)}
          />
        </Form.Group>

        <Button variant="primary" type="submit" onClick={handleSubmit}>
          Issue
        </Button>
      </Form>
    </div>
  );
};

export default IssueWarranty;
