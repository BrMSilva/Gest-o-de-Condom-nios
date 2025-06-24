import React, { useState } from 'react';
import {TextField,Button,Typography,Paper,Link,Box,Alert} from '@mui/material';
import { useLocation } from 'wouter';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [, navigate] = useLocation(); // Para navegação com Wouter

  const handleSubmit = (event) => {
    event.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Por favor, preencha o email e a senha.');
      return;
    }

    // Simula login
    if (email === 'admin@email.com' && password === '123456') {
      navigate('/home');
    } else {
      setError('Credenciais inválidas. Tente novamente.');
    }
  };

  return (
    <Box
      sx={{
        height: '100vh',
        backgroundColor: '#f5f5f5',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 2,
      }}
    >
      <Paper elevation={3} sx={{ padding: 4, maxWidth: 400, width: '100%' }}>
        <Typography variant="h5" align="center" gutterBottom>
          Gestão de Condomínios
        </Typography>
        <Typography variant="h4" align="center" gutterBottom>
          Login
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        <form onSubmit={handleSubmit}>
          <TextField
            label="Email"
            variant="outlined"
            type="email"
            fullWidth
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <TextField
            label="Senha"
            variant="outlined"
            type="password"
            fullWidth
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 2 }}
          >
            Entrar
          </Button>
        </form>

        <Box
          sx={{
            marginTop: 2,
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >
          <Link href="/forgot-password" underline="hover">
            Esqueceu a senha?
          </Link>
          <Link href="/register" underline="hover">
            Cadastre-se
          </Link>
        </Box>
      </Paper>
    </Box>
  );
}

export default Login;
