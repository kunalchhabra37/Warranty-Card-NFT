import { useState, useContext } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { WarrantyCardContext } from "../context/WarrantyCardContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {validateAddress } from "./Validation";
const GrantRole = () => {
  const { grantRoles } = useContext(WarrantyCardContext);
  const [to, setTo] = useState("");
  const [role, setRole] = useState("");
  const [res, setRes] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateAddress(to)) {
      toast.warning("Not a valid address", {
        position: "top-right",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else {
      console.log(to, role);
      let res = await grantRoles(role, to);
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
        setRole("");
        setTo('');
      }
    }
  };
  return (
    <>
    <div className="container1">
      <h1>Grant Role</h1>
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
          <Form.Label>Role</Form.Label>
          <Form.Control
            as="select"
            value={role}
            custom
            onChange={(e) => setRole(e.target.value)}
          >
            <option value="" disabled>Select Role</option>
            <option value="MINTER_ROLE">Minter Role</option>
            <option value="MINTER_ADMIN">Minter Admin</option>
            <option value="SERVICE_PROVIDER">Service Provider</option>
            <option value="SERVICE_PROVIDER_ADMIN">Service Provider Admin</option>
          </Form.Control>

        </Form.Group>
        <Button variant="primary" type="submit" onClick={handleSubmit}>
          Submit
        </Button>
      </Form>
    </div>
    {res && <p className="text-white"> {`${res.msg} at hash: ${res.hash}`} </p>}
    </>
  );
};

export default GrantRole;
