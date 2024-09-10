import React, { useState, useEffect } from 'react';
import { Typography, Box, ImageList, ImageListItem, ImageListItemBar, CircularProgress } from '@mui/material';
import { backend } from '../../declarations/backend';

interface GalleryImage {
  id: number;
  url: string;
  caption: string;
}

function Gallery() {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchGalleryImages() {
      try {
        const galleryImages = await backend.getGalleryImages();
        setImages(galleryImages);
      } catch (error) {
        console.error('Error fetching gallery images:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchGalleryImages();
  }, []);

  if (loading) {
    return <CircularProgress />;
  }

  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h2" component="h1" gutterBottom>
        DOOM Gallery
      </Typography>
      <ImageList sx={{ width: '100%', height: 450 }} cols={3} rowHeight={164}>
        {images.map((item) => (
          <ImageListItem key={item.id}>
            <img
              src={item.url}
              alt={item.caption}
              loading="lazy"
            />
            <ImageListItemBar
              title={item.caption}
              position="below"
            />
          </ImageListItem>
        ))}
      </ImageList>
    </Box>
  );
}

export default Gallery;
