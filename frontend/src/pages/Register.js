import React, { useState } from 'react';
import { useNavigate, Link as LinkBase } from 'react-router-dom';
import styled from 'styled-components';
import { useAuth } from '../contexts/AuthContext';

import Structure from '../components/basic/layout/Structure';
import Text from '../components/basic/Text';

import { useCreatePlayer } from '../hooks/useCreatePlayer';

import { IoGolf } from 'react-icons/io5';

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 400px;
  margin: auto;
  padding: 20px;
  background-color: white;
  // border: 5px #748067 solid;
  border-radius: 8px;
  // border-color: #748067;
  // box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  color: #748067;

  h2 {
    text-align: center;
  }
`;

const GolfIcon = styled(IoGolf)`
  font-size: 5rem;
  color: ${({ theme }) => theme.colors.green500};
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;

  div {
    margin-bottom: 15px;
  }
}
`;

const Label = styled.label`
  font-size: 1rem;
  margin-bottom: 10px;
`;

const Input = styled.input`
  padding: 10px;
  font-size: 1rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  width: 100%;
  box-sizing: border-box;
  transition: border 0.3s;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.green500};
  }
`;

const Span = styled.span`
  font-size: 0.8rem;
  color: red;
  margin-top: 5px;
  display: inline-block;
`;

const Button = styled.button`
  padding: 10px;
  background-color: ${({ theme }) => theme.colors.green500};
  color: ${({ theme }) => theme.colors.pearl};
  font-size: 1rem;
  font-weight: 500;
  border: 1.5px solid white;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    border: 1.5px solid #748067;
    background-color: ${({ theme }) => theme.colors.pearl};
    color: ${({ theme }) => theme.colors.green500};
  }

  &:disabled {
    background-color: ${({ theme }) => theme.colors.grey300};
    color: ${({ theme }) => theme.colors.grey600};
    border-color: ${({ theme }) => theme.colors.grey400};
    box-shadow: none;
  }
`;

const Link = styled(LinkBase)`
  text-decoration: none;
  color: ${({ theme }) => theme.colors.green500};
  font-size: 1rem;
  font-family: 'Montserrat',arial,sans-serif;
  font-weight: 700;
`;

const Register = () => {
  const createPlayerMutation = useCreatePlayer();
  const { login } = useAuth();
  let navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });
  const [usernameError, setUsernameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const validateEmail = () => {
    // Regular expression for basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setEmailError(emailRegex.test(formData.email) ? '' : 'Invalid email address');
  };

  const validatePassword = () => {
    // Basic password validation: at least 6 characters
    setPasswordError(formData.password.length >= 6 ? '' : 'Password must be at least 6 characters');
  };

  const handleUsernameChange = (e) => {
    setFormData({
      ...formData,
      username: e.target.value,
    });
    setUsernameError('');
  };

  const handleEmailChange = (e) => {
    setFormData({
      ...formData,
      email: e.target.value,
    });
    setEmailError('');
  };

  const handlePasswordChange = (e) => {
    setFormData({
      ...formData,
      password: e.target.value,
    });

    setPasswordError('');
  };

  const isFormValid = async () => {
    return formData.username && formData.email && formData.password;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    // If there are no errors, you can proceed with the registration process
    if (!emailError && !passwordError && isFormValid()) {
      // Perform the registration logic here (e.g. send data to server)
      await createPlayerMutation.mutate(formData);
      // navigate('/');

    } else {
      console.log('Registration failed. Please correct the errors');
    }
  };

  return (
    <FormContainer>
      <GolfIcon />

      <h2>Create Account</h2>
      <Form onSubmit={handleSubmit}>
        <div>
          <Label>Username</Label>

          <Input
            type="username"
            value={formData.username}
            onChange={handleUsernameChange}
          />
          {usernameError && <Span>{usernameError}</Span>}
        </div>

        <div>
          <Label>Email</Label>

          <Input
            type="email"
            value={formData.email}
            onChange={handleEmailChange}
            onBlur={validateEmail}
          />
          {emailError && <Span>{emailError}</Span>}
        </div>

        <div>
          <Label>Password</Label>

          <Input
            type="password"
            value={formData.password}
            onChange={handlePasswordChange}
            onBlur={validatePassword}
          />
          {passwordError && <Span>{passwordError}</Span>}
        </div>

        <div>
          <Button type="submit" disabled={!isFormValid() || createPlayerMutation.isLoading}>
            Register
          </Button>
        </div>
      </Form>

      <Structure
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        width="85%"
        marginTop="1rem"
      >
        <Text fontWeight="500">Already have an account?</Text>

        <Link to="/login">Login</Link>
      </Structure>
    </FormContainer>
  )
}

export default Register;
