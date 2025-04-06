import React from 'react';
import { Box, Typography, Paper, Grid, Divider } from '@mui/material';
import { useTranslation } from 'react-i18next';

/**
 * 校舎のアクセス情報を表示するコンポーネント
 *
 * @param {Object} props
 * @param {Object} props.school 校舎情報オブジェクト
 * @returns {JSX.Element}
 */
const AccessInfo = ({ school }) => {
  const { t, i18n } = useTranslation(['common']);
  const lang = i18n.language;

  return (
    <Paper sx={{ p: 3, mb: 4 }} elevation={1}>
      <Typography variant="h5" component="h3" gutterBottom sx={{ color: '#d4af37', fontWeight: 'bold' }}>
        {t('common:accessInformation')}
      </Typography>
      
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Box sx={{ mb: 2 }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 1 }}>
              {t('common:address')}
            </Typography>
            <Typography variant="body1">
              {school.address[lang]}
            </Typography>
          </Box>
          
          <Box sx={{ mb: 2 }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 1 }}>
              {t('common:phone')}
            </Typography>
            <Typography variant="body1">
              {school.phone}
            </Typography>
          </Box>
        </Grid>
        
        <Grid item xs={12} md={6}>
          <Box sx={{ mb: 2 }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 1 }}>
              {t('common:hours')}
            </Typography>
            <Typography variant="body1" gutterBottom>
              {t('common:weekdays')}: {school.hours.weekdays[lang]}
            </Typography>
            <Typography variant="body1">
              {t('common:weekends')}: {school.hours.weekends[lang]}
            </Typography>
          </Box>
        </Grid>
      </Grid>
      
      <Divider sx={{ my: 3 }} />
      
      <Box>
        <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 1 }}>
          {t('common:directions')}
        </Typography>
        <Typography variant="body1">
          {school.access.directions[lang]}
        </Typography>
      </Box>
    </Paper>
  );
};

export default AccessInfo;