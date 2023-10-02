import React, { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import UserCard from './UserCard';
import SessionChecker from './SessionChecker';



function UsersList() {
    const [users, setUsers] = useState([]);
    const [status, setStatus] = useState('idle');
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchData() {
            try {
                setStatus('loading');
                const response = await fetch("/users");
                const data = await response.json();

                if (response.ok) {
                    setUsers(data);
                    setStatus('succeeded');
                } else {
                    setError(data.message);
                    setStatus('failed');
                }
            } catch (error) {
                setError('Network error. Please try again later.');
                setStatus('failed');
            }
        }
        fetchData();
    }, []);

    if (status === 'loading') {
        return <p>Loading...</p>;
    }

    if (status === 'failed') {
        return <p>Error loading data: {error}</p>;
    }

    return (
        <div className="d-flex align-items-center">
            <Container>
                <SessionChecker />
                <Row className="justify-content-center">
                    {users.map(user => (
                        <Col  key={user.id} className="mb-3 d-flex justify-content-center">
                            <UserCard user={user} />
                        </Col>
                    ))}
                </Row>
            </Container>
        </div>
    );
}

export default UsersList;
