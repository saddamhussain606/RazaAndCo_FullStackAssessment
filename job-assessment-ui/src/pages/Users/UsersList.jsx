import { useEffect, useState } from "react";
import {
  Container,
  Table,
  Button,
  Spinner,
  Alert,
  Card,
  Row,
  Col,
  Badge,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { userService } from "../../services/user";

export default function UsersList() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [deletingId, setDeletingId] = useState(null);
  const navigate = useNavigate();

  const roleMap = {
    0: { label: "User", variant: "secondary" },
    1: { label: "Admin", variant: "danger" },
  };

  const loadUsers = async () => {
    try {
      const data = await userService.getAll();
      setUsers(data);
    } catch {
      setError("Unable to load users");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete user?")) return;

    try {
      setDeletingId(id);
      await userService.remove(id);
      setUsers((prev) => prev.filter((u) => u.id !== id));
    } catch {
      setError("Failed to delete user");
    } finally {
      setDeletingId(null);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  if (loading) {
    return (
      <Container className="d-flex justify-content-center mt-5">
        <Spinner animation="border" />
      </Container>
    );
  }

  return (
    <Container fluid className="py-4 bg-light min-vh-100">
      <Container>
        {/* Header */}
        <Row className="mb-3 align-items-center">
          <Col>
            <h3 className="mb-0">Users</h3>
            <small className="text-muted">
              Manage application users
            </small>
          </Col>
          <Col xs="auto">
            <Button onClick={() => navigate("/users/create")}>
              + Add User
            </Button>
          </Col>
        </Row>

        {/* Error */}
        {error && <Alert variant="danger">{error}</Alert>}

        {/* Table Card */}
        <Card className="shadow-sm">
          <Card.Body className="p-0">
            {users.length === 0 ? (
              <div className="text-center py-5 text-muted">
                No users found
              </div>
            ) : (
              <Table responsive hover className="mb-0 align-middle">
                <thead className="table-light">
                  <tr>
                    <th>#</th>
                    <th>Username</th>
                    <th>Email</th>
                    <th>Role</th>
                    <th className="text-end">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((u, i) => (
                    <tr key={u.id}>
                      <td>{i + 1}</td>
                      <td className="fw-medium">{u.username}</td>
                      <td className="text-muted">{u.email}</td>
                      <td>
                        <Badge bg={roleMap[u.role].variant}>
                          {roleMap[u.role].label}
                        </Badge>
                      </td>
                      <td className="text-end">
                        <Button
                          size="sm"
                          variant="outline-warning"
                          className="me-2"
                          onClick={() => navigate(`/users/edit/${u.id}`)}
                        >
                          Edit
                        </Button>
                        <Button
                          size="sm"
                          variant="outline-danger"
                          disabled={deletingId === u.id}
                          onClick={() => handleDelete(u.id)}
                        >
                          {deletingId === u.id ? "Deleting..." : "Delete"}
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            )}
          </Card.Body>
        </Card>
      </Container>
    </Container>
  );
}
