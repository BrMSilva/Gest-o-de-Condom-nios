import { AppBar, Toolbar, Typography, Button } from "@mui/material";

function Header() {
  return (
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
  );
}

export default Header;
