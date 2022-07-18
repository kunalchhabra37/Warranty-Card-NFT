import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Button from './Button';
function NavBar() {
  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container>
        <Navbar.Brand href="/">Warranty Card</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav>
            <Nav.Link href="/issue-warranty">Issue Warranty</Nav.Link>
            <Nav.Link href="/check-authenticity">Check Authenticity</Nav.Link>
            <Nav.Link href="/approve">Approve</Nav.Link>
            <Nav.Link href="/grant-role">Grant Role</Nav.Link>
            <Nav.Link href="/revoke-role">Revoke Role</Nav.Link>
            <Nav.Link href="/check-expiry">Check Expiry</Nav.Link>
            <Nav.Link href="/transfer">Transfer</Nav.Link>
            <Nav.Link href="/get-warranty-card">Get Warranty Card</Nav.Link>
          </Nav>
            <Button text="Conntect to Wallet" className="btn-primary text-white"/>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;