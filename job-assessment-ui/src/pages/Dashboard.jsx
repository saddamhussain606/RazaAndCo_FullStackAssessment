
import { useContext } from "react";
import { Container, Card, Row, Col, Badge } from "react-bootstrap";
import { AuthContext } from "../contexts/AuthContext";

export default function Dashboard() {
  const { user } = useContext(AuthContext);

  return (
    <Container fluid className="py-4 bg-light min-vh-100">
      <Container>
        {/* Welcome Card */}
        <Row className="mb-4">
          <Col>
            <Card className="shadow-sm">
              <Card.Body>
                <h3 className="mb-2">
                  Welcome, <strong>{user.username}</strong> 👋
                </h3>

                <p className="mb-0">
                  Role:{" "}
                  <Badge bg={user.role === 1 ? "danger" : "secondary"}>
                    {user.role === 1 ? "Admin" : "User"}
                  </Badge>
                </p>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Dashboard Content */}
        <Row>
          <Col md={6} className="mb-4">
            <Card className="h-100 shadow-sm">
              <Card.Body>
                <h5 className="mb-3">Overview</h5>
                <p className="text-muted mb-0">
                  This is your dashboard where you can manage and view
                  application-related information.
                </p>
              </Card.Body>
            </Card>
          </Col>

          <Col md={6} className="mb-4">
            <Card className="h-100 shadow-sm">
              <Card.Body>
                <h5 className="mb-3">
                  {user.role === 1 ? "Admin Panel" : "User Panel"}
                </h5>

                {user.role === 1 ? (
                  <p className="text-muted mb-0">
                    As an admin, you can manage users, roles, and system
                    settings.
                  </p>
                ) : (
                  <p className="text-muted mb-0">
                    You have access to your personal dashboard and assigned
                    features.
                  </p>
                )}
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </Container>
  );
}

