import { Paper, Typography, Button } from "@mui/material";
import React from "react";

function HeroSection () {
  const userName = JSON.parse(localStorage.getItem("user") || "{}").name || "";
  return (
    <Paper elevation={3} style={{ padding: "20px", margin: "20px" }}>
      <Typography variant="h4" gutterBottom>
        Bem-vindo, {userName || "Usuário"}!
      </Typography>
      <Typography variant="body1">Métricas Rápidas:</Typography>
      <ul>
        <li>Condomínios Geridos: X</li>
        <li>Pendências: Y</li>
        <li>Tarefas: Z</li>
      </ul>
      <Button variant="contained" color="primary" style={{ marginRight: "10px" }}>
        Adicionar Condomínio
      </Button>
      <Button variant="contained" color="secondary">
        Criar Nova Tarefa
      </Button>
      <Button variant="contained" color="secondary" style={{ marginLeft: "10px" }}>
        Reuniões
      </Button>
    </Paper>
  );
}

export default HeroSection;
