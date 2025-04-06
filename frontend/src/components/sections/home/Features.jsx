import React from 'react';
import { useTranslation } from 'react-i18next';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
} from '@mui/material';

/**
 * 特徴セクションコンポーネント
 * 教育サービスの主要特徴を紹介
 */
const Features = () => {
  const { t } = useTranslation(['home', 'common']);
  
  // 特徴データ
  const features = [
    {
      id: 'feature1',
      image: '/assets/images/tutoring.jpg',
      titleKey: 'home:features.feature1.title',
      descKey: 'home:features.feature1.desc',
    },
    {
      id: 'feature2',
      image: '/assets/images/teacher.jpg',
      titleKey: 'home:features.feature2.title',
      descKey: 'home:features.feature2.desc',
    },
    {
      id: 'feature3',
      image: '/assets/images/students.jpg',
      titleKey: 'home:features.feature3.title',
      descKey: 'home:features.feature3.desc',
    },
  ];

  return (
    <Box sx={{ py: 8 }}>
      <Container maxWidth="lg">
        <Typography
          variant="h4"
          component="h2"
          sx={{
            textAlign: 'center',
            mb: 1,
            fontWeight: 'bold',
          }}
        >
          {t('home:features.title')}
        </Typography>
        
        <Typography
          variant="subtitle1"
          sx={{
            textAlign: 'center',
            mb: 6,
            color: 'text.secondary',
          }}
        >
          {t('home:features.subtitle')}
        </Typography>
        
        <Grid container spacing={4}>
          {features.map((feature) => (
            <Grid item xs={12} md={4} key={feature.id}>
              <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                <CardMedia
                  component="img"
                  height="140"
                  image={feature.image}
                  alt={t(feature.titleKey)}
                />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography variant="h6" component="h3" gutterBottom>
                    {t(feature.titleKey)}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {t(feature.descKey)}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default Features;
