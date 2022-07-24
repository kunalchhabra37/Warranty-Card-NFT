import { useState, useContext } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { WarrantyCardContext } from "../context/WarrantyCardContext";
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { validateBigInt,validateAddress } from "./Validation";
const IssueWarranty = () => {
  const { issueWarrantyCard,pinFile } = useContext(WarrantyCardContext);
  const [to, setTo] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [serialNo, setSerialNo] = useState("");
  const [product_Id, setProduct_Id] = useState("");
  const [invoice_no, setInvoice_no] = useState("");
  const [payment_gateway, setPayment_gateway] = useState("");
  const [platform, setPlatform] = useState("");
  const [purchase_date, setPurchase_date] = useState(new Date());
  const [transaction_id, setTransaction_id] = useState("");
  const [transaction_method, setTransaction_method] = useState("");
  const [warranty_period, setWarranty_period] = useState(new Date());
  const [attributes, setAttributes] = useState([]);
  const [res, setRes] = useState(false);
  const convertTime = (date) => {
    return Math.floor(new Date(warranty_period) / 1000);
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateAddress(to)) {
      toast.warning("Not a valid Address", {
        position: "top-right",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
    else {
      let hash = await pinFile(
        to,
        name,
        description,
        serialNo,
        product_Id,
        invoice_no,
        payment_gateway,
        platform,
        convertTime(purchase_date),
        transaction_id,
        transaction_method,
        convertTime(warranty_period),
        attributes
      );
      console.log(hash);

      let res = await issueWarrantyCard(
        to,
        hash,
        serialNo,
        convertTime(warranty_period)
      );
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
        setRes(res)
        setTo('');
        setName('');
        setDescription('');
        setSerialNo('');
        setProduct_Id('');
        setInvoice_no('');
        setPayment_gateway('');
        setPlatform('');
        setPurchase_date('');
        setTransaction_id('');
        setTransaction_method('');
        setWarranty_period('');
        setAttributes([]);
      }
    }
    // console.log(convertTime(purchase_date),convertTime(warranty_period));
  };
  return (
    <>
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
          <DatePicker
            selected={purchase_date}
            onChange={(date) => setPurchase_date(date)}
            dateFormat="MM/dd/yyyy"
            placeholderText="Enter purchase_date"
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
            <DatePicker
            selected={warranty_period}
            onChange={(date) => setWarranty_period(date)}
            dateFormat="MM/dd/yyyy"
            placeholderText="Enter warranty_period"
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
    {res && <><p className="text-white">
        {`${res.msg} at hash: ${res.hash}`}
      </p></>}
    </>
  );
};

export default IssueWarranty;
