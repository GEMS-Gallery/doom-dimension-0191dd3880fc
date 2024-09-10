import React from 'react';
import { Typography, Box } from '@mui/material';

function Home() {
  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h2" component="h1" gutterBottom>
        Welcome to the DOOM Fan Page
      </Typography>
      <Typography variant="body1" paragraph>
        Explore the world of DOOM, the iconic first-person shooter that revolutionized the gaming industry.
      </Typography>
      <Typography variant="body1" paragraph>
        Check out our game information, browse the gallery, test your knowledge with our quiz, and don't forget to rate the game!
      </Typography>
    </Box>
  );
}

export default Home;
