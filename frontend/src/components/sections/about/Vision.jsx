import React from 'react';
import { Box, Typography, Container, Grid, Paper, useTheme, useMediaQuery } from '@mui/material';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';

/**
 * ビジョン・ミッションコンポーネント
 * 会社のビジョン、ミッション、価値観を表示する
 */
const Vision = ({ valueItems }) => {
  const { t, i18n } = useTranslation('about');
  const currentLang = i18n.language;
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  if (!valueItems || valueItems.length === 0) return null;

  return (
    <Container maxWidth="lg" sx={{ my: 8 }}>
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
          {t('vision.title')}
        </Typography>
        <Typography
          variant="subtitle1"
          sx={{ maxWidth: '700px', mx: 'auto', mt: 3 }}
        >
          {t('vision.description')}
        </Typography>
      </Box>

      <Grid container spacing={4}>
        {valueItems.map((item, index) => (
          <Grid item xs={12} md={4} key={index}>
            <Paper
              elevation={3}
              sx={{
                p: 4,
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
                borderRadius: 2,
                transition: 'transform 0.3s ease-in-out',
                '&:hover': {
                  transform: 'translateY(-5px)',
                  boxShadow: 6
                },
                position: 'relative',
                overflow: 'hidden',
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '5px',
                  backgroundColor: '#d4af37'
                }
              }}
              className="slide-up"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <Box
                sx={{
                  width: 64,
                  height: 64,
                  borderRadius: '50%',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: 'rgba(212, 175, 55, 0.1)',
                  mb: 2
                }}
              >
                <Box
                  component="span"
                  className="material-icons"
                  sx={{ fontSize: 32, color: '#d4af37' }}
                >
                  {item.icon || 'star'}
                </Box>
              </Box>
              <Typography variant="h5" component="h3" gutterBottom sx={{ fontWeight: 'bold' }}>
                {item.title[currentLang]}
              </Typography>
              <Typography variant="body1" sx={{ mt: 2, flexGrow: 1 }}>
                {item.description[currentLang]}
              </Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

Vision.propTypes = {
  valueItems: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.shape({
        zh: PropTypes.string.isRequired,
        ja: PropTypes.string.isRequired,
        en: PropTypes.string.isRequired
      }).isRequired,
      description: PropTypes.shape({
        zh: PropTypes.string.isRequired,
        ja: PropTypes.string.isRequired,
        en: PropTypes.string.isRequired
      }).isRequired,
      icon: PropTypes.string
    })
  )
};

export default Vision;