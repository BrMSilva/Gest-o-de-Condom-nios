import React, { useState } from 'react';
import { TextField, Button, Typography, Paper, Link, Box, Alert } from '@mui/material';
import { useLocation } from 'wouter';


const register = () => {
    type registerFormEvent = React.FormEvent<HTMLFormElement>;
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [, navigate] = useLocation(); // Para navegação com Wouter

    const handleSubmit = async (event: registerFormEvent): Promise<void> => {
        event.preventDefault();
        setError('');

        if (!name || !email || !phone || !password || !confirmPassword) {
            setError('Por favor, preencha todos os campos.');
            return;
        }

        if (password !== confirmPassword) {
            setError('As senhas não coincidem.');
            return;
        }

        try {
            const response = await fetch('/api/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, email, phone, password }),
            });

            if (!response.ok) {
                throw new Error('Erro ao registrar usuário.');
            }

            const data = await response.json();

            if (data.success) {
                navigate('/SignIn/login'); // Redireciona para a página de login após o registro

                alert('Usuário registrado com sucesso! Faça login para continuar.');

            }

        } catch (error) {
            setError('Erro ao registrar usuário. Por favor, tente novamente.');
            console.error('Erro ao registrar usuário:', error);
        };

    }

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
                    Cadastro
                </Typography>

                {error && (
                    <Alert severity="error" sx={{ mb: 2 }}>
                        {error}
                    </Alert>
                )}

                <form onSubmit={handleSubmit}>
                    <TextField
                        label="Nome Completo"
                        variant="outlined"
                        type="text"
                        fullWidth
                        margin="normal"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required

                    />
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
                        label="Telefone"
                        variant="outlined"
                        type="tel"
                        fullWidth
                        margin="normal"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
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
                    <TextField
                        label="Confirme a Senha"
                        variant="outlined"
                        type="password"
                        fullWidth
                        margin="normal"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                    />

                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        fullWidth
                        sx={{ mt: 2 }}
                    >
                        Registrar
                    </Button>
                </form>

                <Box
                    sx={{
                        marginTop: 2,
                        display: 'flex',
                        justifyContent: 'space-between',
                    }}
                >
                    <Link href="/forgot-password" underline="hover" fontSize={'0.875rem'}>
                        Esqueceu a senha?
                    </Link>
                    <Link href="/SignIn/login" underline="hover" fontSize={'0.875rem'}>
                        Já tem uma conta? Faça login
                    </Link>
                </Box>
            </Paper>
        </Box>
    );
}

export default register;
