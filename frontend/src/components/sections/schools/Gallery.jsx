import React, { useState } from 'react';
import { Box, Grid, Modal, IconButton, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';

/**
 * 校舎写真ギャラリーコンポーネント
 * 校舎の写真を表示し、クリックで拡大表示する
 *
 * @param {Object} props
 * @param {string[]} props.images 写真のURL配列
 * @param {Object} props.imageDescriptions 写真の説明オブジェクト
 * @returns {JSX.Element}
 */
const Gallery = ({ images, imageDescriptions }) => {
  const { i18n } = useTranslation();
  const lang = i18n.language;
  const [open, setOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState('');
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const handleOpen = (image, index) => {
    setSelectedImage(image);
    setSelectedImageIndex(index);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ mb: 6 }}>
      <Grid container spacing={2}>
        {images.map((image, index) => (
          <Grid item xs={6} sm={4} md={3} key={index}>
            <Box
              component="img"
              src={image}
              alt={imageDescriptions && imageDescriptions[lang] && imageDescriptions[lang][index] 
                ? imageDescriptions[lang][index] 
                : `School image ${index + 1}`}
              sx={{
                width: '100%',
                height: 180,
                objectFit: 'cover',
                borderRadius: 1,
                cursor: 'pointer',
                transition: 'transform 0.3s ease',
                '&:hover': {
                  transform: 'scale(1.05)'
                }
              }}
              onClick={() => handleOpen(image, index)}
            />
          </Grid>
        ))}
      </Grid>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="image-modal-title"
        aria-describedby="image-modal-description"
      >
        <Box sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: { xs: '95%', sm: '80%', md: '70%' },
          maxHeight: '90vh',
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 2,
          outline: 'none',
          borderRadius: 2,
          overflow: 'hidden'
        }}>
          <Box sx={{ position: 'relative' }}>
            <IconButton
              aria-label="close"
              sx={{ position: 'absolute', top: 5, right: 5, backgroundColor: 'rgba(0,0,0,0.5)', color: 'white' }}
              onClick={handleClose}
            >
              <span className="material-icons">close</span>
            </IconButton>
            <Box
              component="img"
              src={selectedImage}
              alt={imageDescriptions && imageDescriptions[lang] && imageDescriptions[lang][selectedImageIndex] 
                ? imageDescriptions[lang][selectedImageIndex] 
                : `School image ${selectedImageIndex + 1}`}
              sx={{
                width: '100%',
                maxHeight: '70vh',
                objectFit: 'contain',
                display: 'block',
                margin: '0 auto'
              }}
            />
            {imageDescriptions && imageDescriptions[lang] && imageDescriptions[lang][selectedImageIndex] && (
              <Typography variant="body2" sx={{ mt: 2, textAlign: 'center' }}>
                {imageDescriptions[lang][selectedImageIndex]}
              </Typography>
            )}
          </Box>
        </Box>
      </Modal>
    </Box>
  );
};

export default Gallery;