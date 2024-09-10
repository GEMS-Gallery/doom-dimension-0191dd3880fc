import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Container, CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import Home from './components/Home';
import GameInfo from './components/GameInfo';
import Gallery from './components/Gallery';
import Quiz from './components/Quiz';
import Ratings from './components/Ratings';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#8B0000',
    },
    secondary: {
      main: '#FFD700',
    },
    background: {
      default: '#1A1A1A',
      paper: '#2A2A2A',
    },
  },
  typography: {
    fontFamily: 'Roboto, sans-serif',
    h1: {
      fontFamily: 'Orbitron, sans-serif',
    },
    h2: {
      fontFamily: 'Orbitron, sans-serif',
    },
    h3: {
      fontFamily: 'Orbitron, sans-serif',
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            DOOM Fan Page
          </Typography>
          <nav>
            <Link to="/" style={{ color: 'white', marginRight: '1rem', textDecoration: 'none' }}>Home</Link>
            <Link to="/info" style={{ color: 'white', marginRight: '1rem', textDecoration: 'none' }}>Info</Link>
            <Link to="/gallery" style={{ color: 'white', marginRight: '1rem', textDecoration: 'none' }}>Gallery</Link>
            <Link to="/quiz" style={{ color: 'white', marginRight: '1rem', textDecoration: 'none' }}>Quiz</Link>
            <Link to="/rate" style={{ color: 'white', textDecoration: 'none' }}>Rate</Link>
          </nav>
        </Toolbar>
      </AppBar>
      <Container>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/info" element={<GameInfo />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/quiz" element={<Quiz />} />
          <Route path="/rate" element={<Ratings />} />
        </Routes>
      </Container>
    </ThemeProvider>
  );
}

export default App;
