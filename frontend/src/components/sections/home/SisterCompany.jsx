import React from 'react';
import { useTranslation } from 'react-i18next';
import {
  Box,
  Container,
  Typography,
  Grid,
  Button,
} from '@mui/material';

/**
 * 日本の兄弟会社セクションコンポーネント
 * 日本の兄弟会社「株式会社銀座夢時」の紹介
 */
const SisterCompany = () => {
  const { t } = useTranslation(['home', 'common']);

  return (
    <Box sx={{ py: 8, backgroundColor: (theme) => theme.palette.background.dark, color: 'white' }}>
      <Container maxWidth="md">
        <Grid container spacing={4} alignItems="center">
          <Grid item xs={12} md={6}>
            <Typography
              variant="h4"
              component="h2"
              sx={{
                mb: 2,
                color: (theme) => theme.palette.primary.main,
                fontWeight: 'bold',
              }}
            >
              {t('home:sister.title')}
            </Typography>
            
            <Typography variant="h5" gutterBottom>
              {t('home:sister.name')}
            </Typography>
            
            <Typography variant="body1" sx={{ mb: 3 }}>
              {t('home:sister.desc')}
            </Typography>
            
            <Button
              variant="contained"
              href="http://www.yumetoki.jp"
              target="_blank"
              rel="noopener noreferrer"
              sx={{
                backgroundColor: (theme) => theme.palette.primary.main,
                '&:hover': {
                  backgroundColor: (theme) => theme.palette.primary.dark,
                },
              }}
            >
              {t('home:sister.link')}
            </Button>
          </Grid>
          
          <Grid item xs={12} md={6}>
            <Box
              component="img"
              sx={{
                width: '100%',
                borderRadius: 2,
                boxShadow: 3,
              }}
              src="/assets/images/ginza.jpg"
              alt="Ginza Yumetoki"
            />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default SisterCompany;
