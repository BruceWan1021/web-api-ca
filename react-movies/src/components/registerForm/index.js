import React, { useState, useContext } from 'react';
import { TextField, Button, Container, Typography, Box, Alert, Link } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/authContext';

const RegisterPage = () => {
  const context = useContext(AuthContext);
  const [account, setAccount] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
  
    if (!account || !password || !confirmPassword) {
      setError("Please fill in all fields.");
      return;
    }
  
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
  
    try {
      const success = await context.register(account, password);
      if (success) {
        alert("Registration successful!");
        navigate("/login");
      } else {
        setError("Registration failed.");
      }
    } catch (err) {
      setError(err.message || "An error occurred during registration.");
    }
  };
  

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
            id="account"
            label="Account"
            name="account"
            autoComplete="username"
            autoFocus
            value={account}
            onChange={(e) => setAccount(e.target.value)}
          />
          <TextField
            margin="normal"
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="new-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <TextField
            margin="normal"
            fullWidth
            name="confirmPassword"
            label="Confirm Password"
            type="password"
            id="confirmPassword"
            autoComplete="new-password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Register
          </Button>
        </Box>
        <Typography variant="body2" sx={{ mt: 2 }}>
          Already have an account? <Link href="/login">Login</Link>
        </Typography>
      </Box>
    </Container>
  );
};

export default RegisterPage;
