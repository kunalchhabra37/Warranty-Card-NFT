import { useContext } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Button from "./Button";
import { WarrantyCardContext } from "../context/WarrantyCardContext";

function NavBar() {
  const { connectWallet, connectedWallet, minterRole, minterRoleAdmin } =
    useContext(WarrantyCardContext);

  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" sticky="top">
      <Container>
        <Navbar.Brand href="/">Warranty Card</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          {connectedWallet && (
            <Nav>
              {/* all  */}
              <Nav.Link href="/check-authenticity">Check Authenticity</Nav.Link>
              <Nav.Link href="/check-expiry">Check Expiry</Nav.Link>
              <Nav.Link href="/get-warranty-card">Get Warranty Card</Nav.Link>
              <Nav.Link href="/approve">Approve</Nav.Link>
              <Nav.Link href="/transfer">Transfer</Nav.Link>
              {/* minter only */}
              {minterRole && (
                <Nav.Link href="/issue-warranty">Issue Warranty</Nav.Link>
              )}
              {/* minter admin only */}
              {minterRoleAdmin && (
                <>
                  {" "}
                  <Nav.Link href="/grant-role">Grant Role</Nav.Link>
                  <Nav.Link href="/revoke-role">Revoke Role</Nav.Link>
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
