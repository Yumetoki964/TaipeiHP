import React, { useState } from 'react';
import { Box, Typography, Container, Grid, Paper, Button, Dialog, DialogContent,
         IconButton, useTheme, useMediaQuery } from '@mui/material';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';

/**
 * 姉妹会社詳細コンポーネント
 * 日本の兄弟会社についての詳細情報を表示する
 */
const SisterCompanyDetail = ({ sisterCompany }) => {
  const { t, i18n } = useTranslation('about');
  const currentLang = i18n.language;
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [imageDialogOpen, setImageDialogOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  if (!sisterCompany) return null;

  const handleImageClick = (image) => {
    setSelectedImage(image);
    setImageDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setImageDialogOpen(false);
  };

  return (
    <Box
      component="section"
      sx={{
        py: 8,
        backgroundColor: '#f5f5f5'
      }}
    >
      <Container maxWidth="lg">
        <Box
          sx={{
            textAlign: 'center',
            mb: 6
          }}
        >
          <Typography
            variant="h4"
            component="h2"
            gutterBottom
            sx={{
              fontWeight: 'bold',
              color: '#d4af37',
              position: 'relative',
              display: 'inline-block',
              '&::after': {
                content: '""',
                position: 'absolute',
                bottom: '-10px',
                left: '50%',
                transform: 'translateX(-50%)',
                width: '80px',
                height: '4px',
                backgroundColor: '#d4af37'
              }
            }}
          >
            {t('sisterCompany.title')}
          </Typography>
        </Box>

        <Paper
          elevation={3}
          sx={{
            p: 4,
            borderRadius: 2,
            backgroundColor: '#fff'
          }}
        >
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6}>
              <Box 
                sx={{ 
                  display: 'flex', 
                  flexDirection: 'column', 
                  height: '100%' 
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                  {sisterCompany.logo && (
                    <Box
                      component="img"
                      src={sisterCompany.logo}
                      alt={sisterCompany.name[currentLang]}
                      sx={{
                        height: 60,
                        width: 'auto',
                        mr: 2
                      }}
                    />
                  )}
                  <Typography variant="h5" component="h3" sx={{ fontWeight: 'bold' }}>
                    {sisterCompany.name[currentLang]}
                  </Typography>
                </Box>
                
                <Typography variant="body1" paragraph>
                  {sisterCompany.description[currentLang]}
                </Typography>
                
                <Box sx={{ mt: 3 }}>
                  <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 2 }}>
                    <Box
                      component="span"
                      className="material-icons"
                      sx={{ mr: 2, color: '#d4af37', mt: 0.5 }}
                    >
                      place
                    </Box>
                    <Typography variant="body1">
                      {sisterCompany.location[currentLang]}
                    </Typography>
                  </Box>

                  {sisterCompany.website && (
                    <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
                      <Box
                        component="span"
                        className="material-icons"
                        sx={{ mr: 2, color: '#d4af37', mt: 0.5 }}
                      >
                        language
                      </Box>
                      <Button
                        href={sisterCompany.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        variant="text"
                        size="small"
                        sx={{
                          color: theme.palette.primary.main,
                          textDecoration: 'underline',
                          textTransform: 'none',
                          pl: 0
                        }}
                      >
                        {sisterCompany.website}
                      </Button>
                    </Box>
                  )}
                </Box>
              </Box>
            </Grid>
            
            <Grid item xs={12} md={6}>
              <Grid container spacing={2}>
                {sisterCompany.images && sisterCompany.images.map((image, idx) => (
                  <Grid item xs={6} key={idx}>
                    <Box
                      component="img"
                      src={image}
                      alt={`${sisterCompany.name[currentLang]} - ${idx + 1}`}
                      sx={{
                        width: '100%',
                        height: 200,
                        objectFit: 'cover',
                        borderRadius: 1,
                        cursor: 'pointer',
                        transition: 'transform 0.3s ease',
                        '&:hover': {
                          transform: 'scale(1.03)'
                        }
                      }}
                      onClick={() => handleImageClick(image)}
                    />
                  </Grid>
                ))}
              </Grid>
            </Grid>
          </Grid>
        </Paper>
      </Container>

      {/* 画像拡大表示ダイアログ */}
      <Dialog
        open={imageDialogOpen}
        onClose={handleCloseDialog}
        maxWidth="md"
        fullWidth
      >
        <DialogContent sx={{ p: 0, position: 'relative' }}>
          {selectedImage && (
            <Box
              component="img"
              src={selectedImage}
              alt="Sister company image"
              sx={{
                width: '100%',
                height: 'auto',
                display: 'block'
              }}
            />
          )}
          <IconButton
            onClick={handleCloseDialog}
            sx={{
              position: 'absolute',
              top: 8,
              right: 8,
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
              color: '#fff',
              '&:hover': {
                backgroundColor: 'rgba(0, 0, 0, 0.7)'
              }
            }}
          >
            <Box component="span" className="material-icons">
              close
            </Box>
          </IconButton>
        </DialogContent>
      </Dialog>
    </Box>
  );
};

SisterCompanyDetail.propTypes = {
  sisterCompany: PropTypes.shape({
    name: PropTypes.shape({
      zh: PropTypes.string.isRequired,
      ja: PropTypes.string.isRequired,
      en: PropTypes.string.isRequired
    }).isRequired,
    description: PropTypes.shape({
      zh: PropTypes.string.isRequired,
      ja: PropTypes.string.isRequired,
      en: PropTypes.string.isRequired
    }).isRequired,
    location: PropTypes.shape({
      zh: PropTypes.string.isRequired,
      ja: PropTypes.string.isRequired,
      en: PropTypes.string.isRequired
    }).isRequired,
    website: PropTypes.string,
    logo: PropTypes.string,
    images: PropTypes.arrayOf(PropTypes.string)
  })
};

export default SisterCompanyDetail;