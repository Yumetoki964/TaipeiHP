import React from 'react';
import { Box, Typography, Grid, Paper, useTheme } from '@mui/material';
import { useTranslation } from 'react-i18next';
import SchoolIcon from '@mui/icons-material/School';
import ChildCareIcon from '@mui/icons-material/ChildCare';
import PersonIcon from '@mui/icons-material/Person';
import WorkIcon from '@mui/icons-material/Work';

const AgeGroups = () => {
  const { t } = useTranslation(['courses']);
  const theme = useTheme();

  const ageGroups = [
    {
      id: 'elementary',
      title: t('courses:ageGroups.elementary.title'),
      age: t('courses:ageGroups.elementary.age'),
      description: t('courses:ageGroups.elementary.description'),
      icon: <ChildCareIcon sx={{ fontSize: 40 }} />,
      color: theme.palette.success.light,
    },
    {
      id: 'junior',
      title: t('courses:ageGroups.junior.title'),
      age: t('courses:ageGroups.junior.age'),
      description: t('courses:ageGroups.junior.description'),
      icon: <SchoolIcon sx={{ fontSize: 40 }} />,
      color: theme.palette.info.light,
    },
    {
      id: 'high',
      title: t('courses:ageGroups.high.title'),
      age: t('courses:ageGroups.high.age'),
      description: t('courses:ageGroups.high.description'),
      icon: <PersonIcon sx={{ fontSize: 40 }} />,
      color: theme.palette.warning.light,
    },
    {
      id: 'adult',
      title: t('courses:ageGroups.adult.title'),
      age: t('courses:ageGroups.adult.age'),
      description: t('courses:ageGroups.adult.description'),
      icon: <WorkIcon sx={{ fontSize: 40 }} />,
      color: theme.palette.secondary.light,
    },
  ];

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
        {t('courses:ageGroupsTitle')}
      </Typography>
      
      <Grid container spacing={3}>
        {ageGroups.map((group) => (
          <Grid item xs={12} sm={6} md={3} key={group.id}>
            <Paper 
              elevation={2}
              sx={{ 
                p: 3, 
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
                transition: 'transform 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-5px)'
                }
              }}
            >
              <Box 
                sx={{ 
                  p: 1.5, 
                  borderRadius: '50%', 
                  bgcolor: group.color,
                  color: 'white',
                  mb: 2
                }}
              >
                {group.icon}
              </Box>
              <Typography variant="h6" component="h3" gutterBottom>
                {group.title}
              </Typography>
              <Typography 
                variant="subtitle2" 
                color="text.secondary" 
                gutterBottom
              >
                {group.age}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {group.description}
              </Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default AgeGroups;