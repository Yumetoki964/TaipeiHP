import React from 'react';
import { Grid, Typography, Box } from '@mui/material';
import { useTranslation } from 'react-i18next';
import CourseCard from './CourseCard';
import Loader from '../../common/Loader';

const CourseList = ({ courses, isLoading, error }) => {
  const { t } = useTranslation(['courses']);

  if (isLoading) {
    return (
      <Box sx={{ py: 4, textAlign: 'center' }}>
        <Loader />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ py: 4, textAlign: 'center' }}>
        <Typography color="error">{error}</Typography>
      </Box>
    );
  }

  if (!courses || courses.length === 0) {
    return (
      <Box sx={{ py: 4, textAlign: 'center' }}>
        <Typography>{t('courses:noCourses')}</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ my: 6 }}>
      <Typography 
        variant="h4" 
        component="h2" 
        sx={{ 
          mb: 4, 
          fontWeight: 'bold',
          textAlign: 'center',
          position: 'relative',
          '&:after': {
            content: '""',
            position: 'absolute',
            bottom: -8,
            left: '50%',
            width: 60,
            height: 3,
            bgcolor: 'secondary.main',
            transform: 'translateX(-50%)'
          }
        }}
      >
        {t('courses:courseList')}
      </Typography>
      
      <Grid container spacing={3}>
        {courses.map((course) => (
          <Grid item xs={12} sm={6} md={4} key={course.id}>
            <CourseCard course={course} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default CourseList;