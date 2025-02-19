import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

function Header() {
  return (
    <Navbar fixed="top" expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="/" style={{ fontSize: "2rem", fontWeight: "bold" }}>
          SansStore
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
          <Nav>
            <Nav.Link href="/" style={{ fontSize: "1.7rem" }}>
              Belanja
            </Nav.Link>
            <Nav.Link href="./Cart" style={{ fontSize: "1.7rem" }}>
              Keranjang
            </Nav.Link>
            <Nav.Link href="./Register" style={{ fontSize: "1.7rem" }}>
              Buat Akun
            </Nav.Link>
            <Nav.Link href="./Login" style={{ fontSize: "1.7rem" }}>
              Masuk
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
