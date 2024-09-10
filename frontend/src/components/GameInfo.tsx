import React, { useState, useEffect } from 'react';
import { Typography, Box, CircularProgress } from '@mui/material';
import { backend } from '../../declarations/backend';

interface GameInfo {
  title: string;
  releaseDate: string;
  developer: string;
  description: string | null;
}

function GameInfo() {
  const [gameInfo, setGameInfo] = useState<GameInfo | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchGameInfo() {
      try {
        const info = await backend.getGameInfo();
        setGameInfo(info);
      } catch (error) {
        console.error('Error fetching game info:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchGameInfo();
  }, []);

  if (loading) {
    return <CircularProgress />;
  }

  if (!gameInfo) {
    return <Typography>Failed to load game information.</Typography>;
  }

  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h2" component="h1" gutterBottom>
        {gameInfo.title}
      </Typography>
      <Typography variant="body1" paragraph>
        <strong>Release Date:</strong> {gameInfo.releaseDate}
      </Typography>
      <Typography variant="body1" paragraph>
        <strong>Developer:</strong> {gameInfo.developer}
      </Typography>
      {gameInfo.description && (
        <Typography variant="body1" paragraph>
          <strong>Description:</strong> {gameInfo.description}
        </Typography>
      )}
    </Box>
  );
}

export default GameInfo;
