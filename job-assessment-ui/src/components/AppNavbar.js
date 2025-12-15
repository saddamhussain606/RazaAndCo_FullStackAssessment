import { Navbar, Nav, Container, Button } from "react-bootstrap";
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

export default function AppNavbar() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  if (!user) return null;
  console.log(user)
  return (
    <Navbar bg="dark" variant="dark">
      <Container>
        <Navbar.Brand>Job Assessment</Navbar.Brand>

        <Nav className="me-auto">
          <Nav.Link onClick={() => navigate("/dashboard")}>Dashboard</Nav.Link>

          {user.role === "Admin" && (
            <Nav.Link onClick={() => navigate("/users")}>Users</Nav.Link>
          )}
        </Nav>

        <Navbar.Text className="me-3">
          Signed in as: <b>{user.username}</b>
        </Navbar.Text>

        <Button variant="outline-light" onClick={logout}>
          Logout
        </Button>
      </Container>
    </Navbar>
  );
}
