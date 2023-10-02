import React from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useData } from '../dataContext/DataContext';


const Container = styled.div`
  display: flex;
  height: 80vh;
  justify-content: center;
  align-items: center;
  background: linear-gradient(to bottom, #1877F2, #3B5998);
`;

const StyledForm = styled(Form)`
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  width: 300px;
`;

const StyledField = styled(Field)`
  width: 100%;
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
  margin-bottom: 10px;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 5px;
`;

const SubmitButton = styled.button`
  padding: 10px 20px;
  border-radius: 5px;
  background-color: #1877F2;
  color: white;
  border: none;
  cursor: pointer;
`;

const initialValues = {
  email: '',
  password: '',
};

const validationSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email address').required('Email is required'),
  password: Yup.string().required('Password is required'),
});

function LoginForm() {
  const navigate = useNavigate();
  const { setIsAuthenticated } = useData();

  async function handleSubmit(values) {
    try {
      const response = await fetch('/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(values),
        
      });

      const data = await response.json();

      if (response.ok) {
        setIsAuthenticated(true); // Set isAuthenticated to true
        console.log("Redirecting to /users");
        navigate('/users'); // Redirect using the navigate function
      } else {
        console.error(data.message);
      }
      
    } catch (error) {
      console.error('There was an error logging in', error);
    }
  }

  return (
    <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
      {({ errors, touched }) => (
        <Container>
          <StyledForm>
            <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Login</h2>

            <div>
              <Label htmlFor="email">Email</Label>
              <StyledField type="text" name="email" placeholder="Email" />
              <ErrorMessage name="email" component="div" />
            </div>

            <div>
              <Label htmlFor="password">Password</Label>
              <StyledField type="password" name="password" placeholder="Password" />
              <ErrorMessage name="password" component="div" />
            </div>

            <div style={{ textAlign: 'center' }}>
              <SubmitButton type="submit">Login</SubmitButton>
            </div>
          </StyledForm>
        </Container>
      )}
    </Formik>
  );
}

export default LoginForm;
