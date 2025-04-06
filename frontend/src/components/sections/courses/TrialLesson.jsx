import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Typography, Paper, Grid, Button, useTheme, useMediaQuery } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { EventAvailable as EventAvailableIcon } from '@mui/icons-material';

const TrialLesson = ({ courseId = null }) => {
  const { t } = useTranslation(['common', 'courses']);
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const handleScheduleTrial = () => {
    const url = courseId 
      ? `/contact?type=trial&courseId=${courseId}` 
      : '/contact?type=trial';
    navigate(url);
  };

  return (
    <Paper 
      elevation={3}
      sx={{ 
        p: { xs: 3, md: 5 }, 
        borderRadius: 2,
        background: 'linear-gradient(to right, #f5f5f5, #ffffff)',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* デコレーション要素 */}
      <Box
        sx={{
          position: 'absolute',
          right: -50,
          top: -30,
          width: 200,
          height: 200,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(212,175,55,0.1) 0%, rgba(212,175,55,0) 70%)',
          zIndex: 0
        }}
      />
      
      <Grid container spacing={4} alignItems="center">
        {!isMobile && (
          <Grid item xs={12} md={5}>
            <Box
              component="img"
              src="https://source.unsplash.com/random/600x400/?classroom,student"
              alt={t('courses:trialLesson.title')}
              sx={{
                width: '100%',
                borderRadius: 2,
                boxShadow: 3,
                height: 300,
                objectFit: 'cover'
              }}
            />
          </Grid>
        )}
        
        <Grid item xs={12} md={7} sx={{ position: 'relative', zIndex: 1 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <EventAvailableIcon 
              sx={{ 
                color: 'secondary.main',
                fontSize: 28,
                mr: 1
              }} 
            />
            <Typography 
              variant="h4" 
              component="h2" 
              sx={{ 
                fontWeight: 'bold',
                color: 'primary.main'
              }}
            >
              {t('courses:trialLesson.title')}
            </Typography>
          </Box>
          
          <Typography variant="body1" paragraph>
            {t('courses:trialLesson.description')}
          </Typography>
          
          <Box sx={{ mt: 3 }}>
            <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 'medium' }}>
              {t('courses:trialLesson.benefits.title')}:
            </Typography>
            <ul>
              {[1, 2, 3].map((num) => (
                <Typography 
                  component="li" 
                  variant="body2" 
                  key={num}
                  sx={{ mb: 1 }}
                >
                  {t(`courses:trialLesson.benefits.benefit${num}`)}
                </Typography>
              ))}
            </ul>
          </Box>
          
          <Button
            variant="contained"
            color="secondary"
            size="large"
            sx={{ 
              mt: 3,
              px: 4
            }}
            onClick={handleScheduleTrial}
          >
            {t('courses:trialLesson.cta')}
          </Button>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default TrialLesson;