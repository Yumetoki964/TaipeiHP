import React from 'react';
import { Box, Typography, Paper, Divider } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { CurrencyYen as CurrencyYenIcon } from '@mui/icons-material';

const PricingInfo = ({ pricing }) => {
  const { t } = useTranslation(['courses']);

  if (!pricing) {
    return (
      <Box>
        <Typography variant="h6" gutterBottom>
          {t('courses:pricing')}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {t('courses:pricingContactUs')}
        </Typography>
      </Box>
    );
  }

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        {t('courses:pricing')}
      </Typography>
      <Divider sx={{ mb: 2 }} />
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          p: 2,
          borderRadius: 1,
          bgcolor: 'action.hover',
        }}
      >
        <CurrencyYenIcon sx={{ color: 'secondary.main', mr: 1 }} />
        <Typography variant="body1" sx={{ fontWeight: 'medium' }}>
          {pricing}
        </Typography>
      </Box>
      <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 1 }}>
        {t('courses:pricingNote')}
      </Typography>
    </Box>
  );
};

export default PricingInfo;