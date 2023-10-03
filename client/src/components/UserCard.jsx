
import { Link } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import '../index.css';



function UserCard({ user }) {
    return (
        <Link to={`/users/${user.id}`}>
            <Card className="user-card-list">
                <Container>
                    <Row className="justify-content-center">
                        <Col xs="auto">
                            <Card.Img
                                variant="top"
                                src={user.photo_url || "default_image_url.jpg"}
                                style={{ width: '80px', height: '80px', padding: '5px' }}
                            />
                        </Col>
                    </Row>
                </Container>
                <Card.Body className="text-center">
                    <Card.Title>{`${user.first_name} ${user.last_name}`}</Card.Title>
                    <Card.Text>
{user.email}
                    </Card.Text>
                </Card.Body>
            </Card>
        </Link>
    );
}
export default UserCard;