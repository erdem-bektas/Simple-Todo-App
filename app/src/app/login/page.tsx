"use client"
import React, { FC, useState } from "react";
import { TextInput, PasswordInput, Paper, Title, Text, Container, Group, Button } from '@mantine/core';
import classes from './loginCustom.module.css';

const LoginPage: FC = () => {
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [validationErrors, setValidationErrors] = useState<{ [key: string]: string }>({});

  const handleSubmit = async () => {
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');

    setErrorMessage(null);
    setValidationErrors({});

    try {
      const response = await fetch(`${apiBaseUrl}users/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      if (response.status === 200) {
        const { token, refreshToken } = data;

        if (!token || !refreshToken) {
          setErrorMessage(data.message);
          alert(data.message);
        } else {
          localStorage.setItem('token', token);
          localStorage.setItem('refreshToken', refreshToken);

          alert('Login successful!,\n\nYou can use todo!');

        }
      } else if (response.status === 400) {
        const validationErrors: { [key: string]: string } = {};
        data.errors.forEach((error: any) => {
          validationErrors[error.path[0]] = error.message;
        });
        setValidationErrors(validationErrors);
      } else {
        setErrorMessage(data.message || 'Login failed. Please check your credentials.');
      }
    } catch (error) {
      console.error('Error during login:', error);
      setErrorMessage('An error occurred. Please try again.');
    }
  };

  return (
    <Container size={320} my={40}>
      <Title ta="center" className={classes.title}>
        Welcome
      </Title>
      <Paper withBorder shadow="md" p={60} mt={60} radius="md">
        {errorMessage && (
          <Text color="red" size="sm" ta="center" mb={10}>
            {errorMessage}
          </Text>
        )}
        <TextInput
          label="Email"
          placeholder="you@mantine.dev"
          required
          value={email}
          onChange={(event) => setEmail(event.currentTarget.value)}
          error={validationErrors.email}
        />
        <PasswordInput
          label="Password"
          placeholder="Your password"
          required
          mt="md"
          value={password}
          onChange={(event) => setPassword(event.currentTarget.value)}
          error={validationErrors.password}
        />
        <Group justify="space-between" mt="lg">
        </Group>
        <Button fullWidth mt="xl" onClick={handleSubmit}>
          Sign in
        </Button>
      </Paper>
    </Container>
  );
};

export default LoginPage;
