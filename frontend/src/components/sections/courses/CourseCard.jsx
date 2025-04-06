import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardMedia, CardActions, Typography, Button, Box, Chip } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { ArrowForward as ArrowForwardIcon } from '@mui/icons-material';

const CourseCard = ({ course }) => {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation(['common', 'courses']);
  const currentLanguage = i18n.language;

  // デフォルトの画像
  const defaultImage = 'https://source.unsplash.com/random/800x500/?education,classroom';

  const handleViewDetails = () => {
    navigate(`/courses/${course.id}`);
  };

  return (
    <Card 
      sx={{ 
        height: '100%', 
        display: 'flex', 
        flexDirection: 'column',
        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
        '&:hover': {
          transform: 'translateY(-5px)',
          boxShadow: 6
        }
      }}
    >
      <CardMedia
        component="img"
        height="160"
        image={course.image || defaultImage}
        alt={course.name[currentLanguage]}
      />
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography 
          variant="h5" 
          component="h3" 
          gutterBottom 
          sx={{ 
            fontWeight: 'bold',
            color: 'primary.main' 
          }}
        >
          {course.name[currentLanguage]}
        </Typography>
        
        <Box sx={{ mb: 2 }}>
          <Chip 
            label={course.targetAge[currentLanguage]} 
            size="small" 
            sx={{ 
              bgcolor: 'secondary.light',
              color: 'secondary.contrastText',
              fontSize: '0.75rem'
            }}
          />
        </Box>

        <Typography 
          variant="body2" 
          color="text.secondary" 
          sx={{ 
            mb: 2,
            display: '-webkit-box',
            overflow: 'hidden',
            WebkitBoxOrient: 'vertical',
            WebkitLineClamp: 3,
          }}
        >
          {course.description[currentLanguage]}
        </Typography>

        <Box sx={{ mt: 'auto' }}>
          {course.pricing && (
            <Typography 
              variant="subtitle2" 
              color="primary"
              sx={{ fontWeight: 'bold' }}
            >
              {t('courses:pricing')}: {course.pricing[currentLanguage]}
            </Typography>
          )}
        </Box>
      </CardContent>
      
      <CardActions sx={{ p: 2, pt: 0 }}>
        <Button 
          size="small" 
          variant="outlined" 
          color="primary"
          endIcon={<ArrowForwardIcon />}
          onClick={handleViewDetails}
          fullWidth
        >
          {t('common:buttons.details')}
        </Button>
      </CardActions>
    </Card>
  );
};

export default CourseCard;