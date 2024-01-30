import React, { useState } from 'react';
import { Link as LinkBase, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useAuth } from '../contexts/AuthContext';

import Structure from '../components/basic/layout/Structure';
import Text from '../components/basic/Text';

import { IoGolf } from 'react-icons/io5';
import { HiOutlineEye, HiOutlineEyeOff } from "react-icons/hi";

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

const PasswordContainer = styled.div`
  position: relative;
  margin-bottom: 15px;
`;

const PasswordInput = styled(Input)`
  padding-right: 40px;
`;

const EyeIcon = styled.span`
  position: absolute;
  top: 50%;
  right: 10px;
  cursor: pointer;
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

const ForgotPassword = styled.a`
  display: block;
  margin-top: 8px;
  text-align: right;
  text-decoration: underline;
  color: #007bff;
  cursor: pointer;
`;

const Link = styled(LinkBase)`
  text-decoration: none;
  color: ${({ theme }) => theme.colors.green500};
  font-size: 1rem;
  font-family: 'Montserrat',arial,sans-serif;
  font-weight: 700;
`;

const Login = () => {
  const { login } = useAuth();
  let navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormData(prevData => ({ ...prevData, [name]: value }));
  };

  const handleShowPassword = () => {
    setShowPassword(prev => !prev);
  }

  const isFormValid = () => {
    return formData.email && formData.password;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isFormValid()) {
      try {
        const response = await fetch('http://localhost:4000/api/players/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });

        if (!response.ok) {
          const errorData = await response.json();
          console.error('Login failed:', errorData.error);
          // TODO: Handle error, display error message, etc.
        } else {
          const playerData = await response.json();
          console.log('Login successful:', playerData);
          // TODO: handle successful login, store user data, redirect, etc.
          login(playerData);
          navigate('/');

        }
      } catch (error) {
        console.error('Error during login:', error);
        // TODO: Handle network errors, etc.
      }
    } else {
      console.log('Login form is not valid')
    }
  };

  return (
    <FormContainer>
      <GolfIcon />

      <h2>Login to Account!</h2>

      <Form onSubmit={handleSubmit}>
        <div>
          <Label>Username/Email</Label>

          <Input
            type="text"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
          />
        </div>

        <PasswordContainer>
          <Label>Password</Label>

          <PasswordInput
            type={showPassword ? 'text' : 'password'}
            name="password"
            value={formData.password}
            onChange={handleInputChange}
          />

          <EyeIcon onClick={handleShowPassword}>
            {showPassword ? <HiOutlineEyeOff /> : <HiOutlineEye />}
          </EyeIcon>
        </PasswordContainer>

        <ForgotPassword href="#">Forgot Password?</ForgotPassword>

        <div>
          <Button type="submit" disabled={!isFormValid()}>
            Login
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
        <Text fontWeight="500">New User?</Text>

        <Link to="/register">Create an Account</Link>
      </Structure>
    </FormContainer>
  )
};

export default Login;
