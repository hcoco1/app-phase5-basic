import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import styled from 'styled-components';

const FacebookBlue = '#1877F2';
const White = '#FFFFFF';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: ${FacebookBlue};
  height: 100vh;
  padding: 50px 0;
`;

const StyledForm = styled(Form)`
  background-color: ${White};
  padding: 20px;
  border-radius: 8px;
  width: 100%;
  max-width: 400px;
`;

const StyledField = styled(Field)`
  width: 100%;
  padding: 10px;
  margin: 5px 0;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const StyledErrorMessage = styled(ErrorMessage)`
  color: red;
  font-size: 12px;
`;

const SubmitButton = styled.button`
  background-color: ${FacebookBlue};
  color: ${White};
  padding: 10px 15px;
  border: none;
  border-radius: 4px;
  margin-top: 10px;
  cursor: pointer;
  &:hover {
    background-color: #155293;
  }
`;

const initialValues = {
  first_name: '',
  last_name: '',
  email: '',
  address: '',
  biography: '',
  hobbies: '',
  photo_url: '',
  birth_date: '',
  privacy_settings: '',
  password: '',
  confirm_password: '',
};

const validationSchema = Yup.object().shape({
  first_name: Yup.string().required('First Name is required'),
  last_name: Yup.string().required('Last Name is required'),
  email: Yup.string().email('Invalid email address').required('Email is required'),
  password: Yup.string()
    .required('Password is required')
    .min(8, 'Password must be at least 8 characters long'),
  confirm_password: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required('Confirm Password is required'),
});

const FacebookStyledForm = () => {
  const onSubmit = (values, actions) => {
    console.log('Form data:', values);
    actions.resetForm();
  };

  return (
    <Container>
       <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Register</h2>
<Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
    {() => (
        <StyledForm>
            <StyledField name="first_name" placeholder="First Name" />
            <StyledErrorMessage name="first_name" component="div" />

            <StyledField name="last_name" placeholder="Last Name" />
            <StyledErrorMessage name="last_name" component="div" />

            <StyledField name="email" placeholder="Email" />
            <StyledErrorMessage name="email" component="div" />

            <StyledField name="address" placeholder="Address" />
            <StyledErrorMessage name="address" component="div" />

            <StyledField name="biography" placeholder="Biography" as="textarea" />
            <StyledErrorMessage name="biography" component="div" />

            <StyledField name="hobbies" placeholder="Hobbies" as="textarea" />
            <StyledErrorMessage name="hobbies" component="div" />

            <StyledField name="photo_url" placeholder="Photo URL" />
            <StyledErrorMessage name="photo_url" component="div" />

            <StyledField name="birth_date" placeholder="Birth Date" type="date" />
            <StyledErrorMessage name="birth_date" component="div" />

            <StyledField name="privacy_settings" placeholder="Privacy Settings" />
            <StyledErrorMessage name="privacy_settings" component="div" />

            <StyledField name="password" placeholder="Password" type="password" />
            <StyledErrorMessage name="password" component="div" />

            <StyledField name="confirm_password" placeholder="Confirm Password" type="password" />
            <StyledErrorMessage name="confirm_password" component="div" />

            <SubmitButton type="submit">Sign Up</SubmitButton>
        </StyledForm>
    )}
</Formik>

    </Container>
  );
};

export default FacebookStyledForm;