import React, { useState, useEffect } from 'react';
import { Typography, Box, Rating, Button, CircularProgress } from '@mui/material';
import { backend } from '../../declarations/backend';

function Ratings() {
  const [rating, setRating] = useState<number | null>(null);
  const [averageRating, setAverageRating] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchAverageRating();
  }, []);

  async function fetchAverageRating() {
    try {
      const avgRating = await backend.getAverageRating();
      setAverageRating(avgRating ? Number(avgRating) : null);
    } catch (error) {
      console.error('Error fetching average rating:', error);
    } finally {
      setLoading(false);
    }
  }

  const handleRatingChange = (event: React.ChangeEvent<{}>, newValue: number | null) => {
    setRating(newValue);
  };

  const handleSubmit = async () => {
    if (rating !== null) {
      setSubmitting(true);
      try {
        await backend.submitRating(rating);
        await fetchAverageRating();
      } catch (error) {
        console.error('Error submitting rating:', error);
      } finally {
        setSubmitting(false);
      }
    }
  };

  if (loading) {
    return <CircularProgress />;
  }

  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h2" component="h1" gutterBottom>
        Rate DOOM
      </Typography>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
        <Typography component="legend">Your Rating:</Typography>
        <Rating
          name="doom-rating"
          value={rating}
          onChange={handleRatingChange}
          size="large"
        />
      </Box>
      <Button
        variant="contained"
        color="primary"
        onClick={handleSubmit}
        disabled={rating === null || submitting}
      >
        {submitting ? <CircularProgress size={24} /> : 'Submit Rating'}
      </Button>
      {averageRating !== null && (
        <Box sx={{ mt: 2 }}>
          <Typography variant="h6" component="p">
            Average Rating: {averageRating.toFixed(1)} / 5
          </Typography>
        </Box>
      )}
    </Box>
  );
}

export default Ratings;
