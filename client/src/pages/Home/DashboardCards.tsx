import { Grid, Paper, Typography } from "@mui/material";
import React from "react";

function DashboardCards() {
  return (
    <Grid container spacing={3} sx={{ p: "20px" }}>
      <Grid item xs={12} md={6}>
        <Paper elevation={3} sx={{ p: "10px" }}>
          <Typography variant="h6">Condomínios</Typography>
          <Typography variant="body1">
            Lista de condomínios com filtro e pesquisa.
          </Typography>
        </Paper>
      </Grid>
      <Grid item xs={12} md={6}> 
        <Paper elevation={3} sx={{ p: "10px" }}>
          <Typography variant="h6">Tarefas</Typography>
          <Typography variant="body1">
            Lista de tarefas pendentes e concluídas.
          </Typography>
        </Paper>
      </Grid>
      <Grid item xs={12} md={6}>
        <Paper elevation={3} sx={{ p: "10px" }}>
          <Typography variant="h6">Pendências</Typography>
          <Typography variant="body1">
            Tabela de pendências financeiras.
          </Typography>
        </Paper>
      </Grid>
      <Grid item xs={12}>
        <Paper elevation={3} sx={{ p: "10px" }}>
          <Typography variant="h6">Calendário</Typography>
          <Typography variant="body1">
            Eventos e tarefas agendados no calendário.
          </Typography>
        </Paper>
      </Grid>
    </Grid>
  );
}

export default DashboardCards;
