import { useState, useEffect } from "react";
import {
  Container,
  Form,
  Button,
  Alert,
  Card,
  Spinner,
  Row,
  Col,
} from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { userService } from "../../services/user";

export default function UserForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
    role: 0, // 0 = User, 1 = Admin
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Load user if editing
  useEffect(() => {
    if (id) {
      setLoading(true);
      userService
        .getById(id)
        .then((data) =>
          setUser({
            username: data.username,
            email: data.email,
            role: data.role,
            password: "", // blank for edit
          })
        )
        .catch(() => setError("Failed to load user"))
        .finally(() => setLoading(false));
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: name === "role" ? parseInt(value) : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      if (id) {
        const payload = { ...user };
        if (!payload.password) delete payload.password;
        await userService.update(id, payload);
      } else {
        if (!user.password) {
          setError("Password is required");
          setLoading(false);
          return;
        }
        await userService.create(user);
      }
      navigate("/users");
    } catch {
      setError("Failed to save user. Please check all fields.");
    } finally {
      setLoading(false);
    }
  };

  if (loading && id) {
    return (
      <Container className="d-flex justify-content-center mt-5">
        <Spinner animation="border" />
      </Container>
    );
  }

  return (
    <Container
      fluid
      className="d-flex justify-content-center align-items-start py-5 bg-light min-vh-100"
    >
      <Card className="shadow-sm w-100" style={{ maxWidth: 500 }}>
        <Card.Body>
          <h3 className="mb-4">{id ? "Edit User" : "Create User"}</h3>

          {error && <Alert variant="danger">{error}</Alert>}

          <Form onSubmit={handleSubmit} autoComplete="off">
            <Form.Group className="mb-3">
              <Form.Label>Username</Form.Label>
              <Form.Control
                name="username"
                value={user.username}
                onChange={handleChange}
                placeholder="Enter username"
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={user.email}
                onChange={handleChange}
                placeholder="Enter email"
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>
                Password {id && <span className="text-muted">(leave blank to keep)</span>}
              </Form.Label>
              <Form.Control
                type="password"
                name="password"
                value={user.password}
                onChange={handleChange}
                placeholder={id ? "Leave blank to keep password" : "Enter password"}
                required={!id}
              />
            </Form.Group>

            <Form.Group className="mb-4">
              <Form.Label>Role</Form.Label>
              <Form.Select name="role" value={user.role} onChange={handleChange}>
                <option value={0}>User</option>
                <option value={1}>Admin</option>
              </Form.Select>
            </Form.Group>

            <Row className="g-2">
              <Col>
                <Button type="submit" disabled={loading} className="w-100">
                  {loading ? (
                    <>
                      <Spinner animation="border" size="sm" className="me-2" />
                      Saving...
                    </>
                  ) : (
                    "Save"
                  )}
                </Button>
              </Col>
              <Col>
                <Button
                  variant="secondary"
                  className="w-100"
                  onClick={() => navigate("/users")}
                  disabled={loading}
                >
                  Cancel
                </Button>
              </Col>
            </Row>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
}
