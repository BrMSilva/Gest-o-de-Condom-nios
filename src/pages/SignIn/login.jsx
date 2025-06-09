
import React, { useState } from 'react';
import "./login.css"; // Importando o CSS para estilização

function Login() {
  // Estados para guardar o email e a senha digitados pelo usuário
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(''); // Estado para mensagens de erro

  // Função chamada quando o formulário é submetido
  const handleSubmit = (event) => {
    event.preventDefault(); // Previne o recarregamento da página padrão do formulário
    setError(''); // Limpa erros anteriores

    // --- Lógica de Autenticação (Aqui entra a sua validação) ---
    // Exemplo MUITO básico:
    console.log('Tentativa de login com:', { email, password });

    if (!email || !password) {
      setError('Por favor, preencha o email e a senha.');
        return;
      }
    };



  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h1>Gestão de Condomínios</h1>
        <h2>Login</h2>

        {error && <p className="error-message">{error}</p>} {/* Exibe a mensagem de erro */}

        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)} // Atualiza o estado 'email'
            placeholder="Digite seu email"
            required // Validação básica do HTML5
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Senha:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)} // Atualiza o estado 'password'
            placeholder="Digite sua senha"
            required // Validação básica do HTML5
          />
        </div>

        <button type="submit" className="login-button">
          Entrar
        </button>

        {/* Opcional: Link para esqueci minha senha ou cadastro */}
        <div className="form-links">
          <a href="/forgot-password">Esqueceu a senha?</a>
          <span> | </span>
          <a href="/register">Cadastre-se</a>
        </div>
      </form>
    </div>
  );
}

export default Login;