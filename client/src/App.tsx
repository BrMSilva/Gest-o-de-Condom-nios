
import { Route, Router, Link } from "wouter";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import React from "react";

import Login from "./pages/SignIn/login";
import Home from "./pages/Home/HomePage";
import register from "./pages/SignIn/register";

// Criação do tema com Material-UI
// Define as cores primária e secundária, além da tipografia
const theme = createTheme({
  palette: {
    primary: { main: "#1976d2" },
    secondary: { main: "#dc004e" },
  },
  typography: {
    fontFamily: "Roboto, Arial, sans-serif",
  },
});

// Criação do componente principal da aplicação
function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline /> {/* Aplica uma base de estilos consistente */}

      <Router>
        <nav style={{ padding: "10px" }}>
          <Link href="/">Login</Link> | <Link href="/home">Home</Link>
        </nav>

        <Route path="/" component={Login} />
        <Route path="/home" component={Home} />
        <Route path="/SignIn/login" component={Login} />
        <Route path="/SignIn/register" component={register} />


      </Router>
    </ThemeProvider>
  );
}

export default App;

