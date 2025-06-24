import { Grid, Paper, Typography } from "@mui/material";

function DashboardCards() {
  return (
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
  );
}

export default DashboardCards;
