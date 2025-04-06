import React from 'react';
import { Box, Typography, Paper, Grid, Chip, Divider } from '@mui/material';
import { useTranslation } from 'react-i18next';

/**
 * 講師の専門分野を表示するコンポーネント
 *
 * @param {Object} props
 * @param {Object} props.teacher 講師情報オブジェクト
 * @returns {JSX.Element}
 */
const Specialties = ({ teacher }) => {
  const { t, i18n } = useTranslation(['teachers']);
  const lang = i18n.language;

  return (
    <Paper sx={{ p: 3, mb: 4 }} elevation={1}>
      <Typography variant="h5" component="h3" sx={{ color: '#d4af37', fontWeight: 'bold', mb: 2 }}>
        {t('specialties')}
      </Typography>
      
      <Divider sx={{ mb: 3 }} />
      
      <Grid container spacing={2}>
        {teacher.specialties[lang].map((specialty, index) => (
          <Grid item key={index}>
            <Chip 
              label={specialty} 
              sx={{ 
                py: 2, 
                px: 1, 
                backgroundColor: '#f5f5f5',
                '&:hover': {
                  backgroundColor: '#e0e0e0'
                },
                fontSize: '1rem',
                fontWeight: 'medium'
              }} 
            />
          </Grid>
        ))}
      </Grid>
    </Paper>
  );
};

export default Specialties;