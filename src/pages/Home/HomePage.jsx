import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import "./style.css";

import { createTheme, ThemeProvider } from "@mui/material/styles";

import Header from './Header';
import HeroSection from './HeroSection';
import DashboardCards from './DashboardCards';
import Footer from './Footer';

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

function HomePage() {
  return (
    <div>
      <Header />
      <HeroSection />
      <DashboardCards />
      <Footer />
    </div>
  );
  
}

export default HomePage;

