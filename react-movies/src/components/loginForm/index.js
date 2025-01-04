import React, { useContext, useState } from "react"; 
import { TextField, Button, Container, Typography, Box, Alert, Link } from '@mui/material';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from "../../context/authContext";

const LoginPage = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const context = useContext(AuthContext);
  let location = useLocation();

  const { from } = location.state?.from?.pathname ? location.state : { from: "/" };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!userName || !password) {
      setError('Please fill in all fields.');
      return;
    }

    try {
      await context.authenticate(userName, password);
    } catch (err) {
      setError('Login failed: ' + (err.message || 'Invalid username or password.'));
    }
  };

  if (context.isAuthenticated) {
    window.location.href = from;
    return null; 
  }

  return (
    <Container maxWidth="xs" sx={{ mt: 8 }}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          boxShadow: 3,
          p: 4,
          borderRadius: 2,
          backgroundColor: 'background.paper',
        }}
      >
        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            fullWidth
            id="userName"
            label="Username"
            name="userName"
            autoComplete="username"
            autoFocus
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />
          <TextField
            margin="normal"
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Login
          </Button>
        </Box>
        <Typography variant="body2" sx={{ mt: 2 }}>
          Don&apos;t have an account? <Link href="/register">Register</Link>
        </Typography>
      </Box>
    </Container>
  );
};

export default LoginPage;
