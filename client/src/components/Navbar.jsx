import { useContext } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom"
import NavDropdown from "react-bootstrap/NavDropdown";
import Button from "./Button";
import { WarrantyCardContext } from "../context/WarrantyCardContext";

function NavBar() {
  const {
    connectWallet,
    connectedWallet,
    minterRole,
    minterRoleAdmin,
    serviceProvider,
    serviceProviderAdmin,
  } = useContext(WarrantyCardContext);

  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" sticky="top">
      <Container>
        <Link to="/" className="brand-logo">Warranty Card</Link>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          {connectedWallet && (
            <Nav>
              {/* Open to all Connected Wallet  */}
              <Link to="/check-authenticity" className="links">Check Authenticity</Link>
              <Link to="/check-expiry" className="links">Check Expiry</Link>
              <Link to="/get-token-id" className="links">Get Token Id</Link>
              <Link to="/get-warranty-card" className="links">Get Warranty Card</Link>
              <Link to="/transfer" className="links">Transfer</Link>
              {/* Service Provider Only */}
              {serviceProvider && <Link to="/service" className="links">Service</Link>}
              {/* Minter Only */}
              {minterRole && (
                <Link to="/issue-warranty" className="links">Issue Warranty</Link>
              )}
              {/* Roles Admin Only */}
              {(minterRoleAdmin || serviceProviderAdmin) && (
                <>
                  {" "}
                  <Link to="/grant-role" className="links">Grant Role</Link>
                  <Link to="/revoke-role" className="links">Revoke Role</Link>
                </>
              )}
            </Nav>
          )}
          {!connectedWallet && (
            <Button
              text="Conntect to Wallet"
              className="btn-primary text-white btn-style"
              onClick={connectWallet}
            />
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;