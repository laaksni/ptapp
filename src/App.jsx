import "./App.css";
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { Link, Outlet } from 'react-router-dom';

export default function App() {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Container maxWidth="xl">
        <CssBaseline />
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6">
              Personal Trainer
            </Typography>
          </Toolbar>
        </AppBar>
        <nav>
        <Link to="/Customers">Customers</Link>
        <Link to="/Trainings">Trainings</Link>
        </nav>
        <Outlet />
      </Container>
    </LocalizationProvider>
  );
}