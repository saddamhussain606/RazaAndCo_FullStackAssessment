import { useContext, useState } from "react";
import {
  Container,
  Form,
  Button,
  Alert,
  Card,
  Spinner,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import { authService } from "../services/auth";
import { parseJwtUser } from "../utils/jwtUtils";

export default function Login() {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const token = await authService.login({
        username,
        password,
      });

      const user = parseJwtUser(token);
      login(user, token);
      navigate("/dashboard");
    } catch {
      setError("Invalid username or password");
      setPassword(""); // clear only password
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container
      fluid
      className="d-flex justify-content-center align-items-center vh-100 bg-light"
    >
      <Card className="shadow-lg" style={{ maxWidth: 420, width: "100%" }}>
        <Card.Body className="p-4">
          <h3 className="text-center mb-4">Login</h3>

          {error && <Alert variant="danger">{error}</Alert>}

          <Form onSubmit={onSubmit} autoComplete="off">
            <Form.Group className="mb-3">
              <Form.Label>Username</Form.Label>
              <Form.Control
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                disabled={loading}
                required
              />
            </Form.Group>

            <Form.Group className="mb-4">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={loading}
                required
              />
            </Form.Group>

            <Button
              type="submit"
              className="w-100"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Spinner size="sm" className="me-2" />
                  Checking...
                </>
              ) : (
                "Login"
              )}
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
}
