import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import "./style.css";
import React from "react";
import {AppBar,Toolbar,Typography,Button,Grid,Paper,} from "@mui/material";

import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#1976d2",
    },
    secondary: {
      main: "#dc004e",
    },
  },
  typography: {
    fontFamily: "Roboto, Arial, sans-serif",
  },
});

<ThemeProvider theme={theme}>
  {`cadastro-cond`}
</ThemeProvider>


function HomePage() {
  return (
    <div>
      {/* Cabeçalho */}
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">Gestão de Condomínios</Typography>
          <div style={{ marginLeft: "auto" }}>
            <Button color="inherit">Painel</Button>
            <Button color="inherit">Condomínios</Button>
            <Button color="inherit">Financeiro</Button>
            <Button color="inherit">Suporte</Button>
            <Button color="inherit">Perfil</Button>
          </div>
        </Toolbar>
      </AppBar>

      {/* Hero Section */}
      <Paper elevation={3} style={{ padding: "20px", margin: "20px" }}>
        <Typography variant="h4" gutterBottom>
          Bem-vindo, [Nome do Usuário]!
        </Typography>
        <Typography variant="body1">Métricas Rápidas:</Typography>
        <ul>
          <li>Condomínios Geridos: X</li>
          <li>Pendências: Y</li>
          <li>Tarefas: Z</li>
        </ul>
        <Button
          variant="contained"
          color="primary"
          style={{ marginRight: "10px" }}
        >
          Adicionar Condomínio
        </Button>
        <Button variant="contained" color="secondary">
          Criar Nova Tarefa
        </Button>
        <Button
          variant="contained"
          color="secondary"
          style={{ marginLeft: "10px" }}
        >
          Reuniões
        </Button>
      </Paper>

      {/* Corpo */}
      <Grid container spacing={3} style={{ padding: "20px" }}>
        <Grid item xs={12} md={6}>
          <Paper elevation={3} style={{ padding: "10px" }}>
            <Typography variant="h6">Condomínios</Typography>
            <Typography variant="body1">
              Lista de condomínios com filtro e pesquisa.
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper elevation={3} style={{ padding: "10px" }}>
            <Typography variant="h6">Pendências</Typography>
            <Typography variant="body1">
              Tabela de pendências financeiras.
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper elevation={3} style={{ padding: "10px" }}>
            <Typography variant="h6">Calendário</Typography>
            <Typography variant="body1">
              Eventos e tarefas agendados no calendário.
            </Typography>
          </Paper>
        </Grid>
      </Grid>

      {/* Rodapé */}
      <footer
        style={{
          textAlign: "center",
          padding: "10px",
          backgroundColor: "#f4f4f4",
        }}
      >
        <Typography variant="body2">
          © 2025 Gestão de Condomínios. Todos os direitos reservados.
        </Typography>
      </footer>
    </div>
  );
}

export default HomePage;
