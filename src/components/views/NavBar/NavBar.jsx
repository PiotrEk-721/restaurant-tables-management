import { Navbar, Container, Nav } from 'react-bootstrap';

const NavBar = () => {
  return (
    <Navbar bg="primary" data-bs-theme="dark">
      <Container>
        <Navbar.Brand href="/">
          <h1 className="fs-3 fw-normal m-0">Waiter.app</h1>
        </Navbar.Brand>
        <Nav className="ms-auto">
          <Nav.Link href="/">Home</Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default NavBar;
