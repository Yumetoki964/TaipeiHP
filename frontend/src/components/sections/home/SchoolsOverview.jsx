import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link as RouterLink } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Button,
} from '@mui/material';

/**
 * 校舎紹介概要コンポーネント
 * ホームページに表示する校舎情報の概要
 */
const SchoolsOverview = () => {
  const { t } = useTranslation(['home', 'common']);
  
  // 校舎データ
  const schools = [
    {
      id: 'school1',
      image: '/assets/images/school1.jpg',
      nameKey: 'home:schools.school1.name',
      addressKey: 'home:schools.school1.address',
      detailsKey: 'home:schools.school1.details',
      slug: 'minghu',
    },
    {
      id: 'school2',
      image: '/assets/images/school2.jpg',
      nameKey: 'home:schools.school2.name',
      addressKey: 'home:schools.school2.address',
      detailsKey: 'home:schools.school2.details',
      slug: 'neihu-station',
    },
  ];

  return (
    <Box sx={{ py: 8, backgroundColor: (theme) => theme.palette.background.light }}>
      <Container maxWidth="lg">
        <Typography
          variant="h4"
          component="h2"
          sx={{
            textAlign: 'center',
            mb: 6,
            fontWeight: 'bold',
          }}
        >
          {t('home:schools.title')}
        </Typography>
        
        <Grid container spacing={4}>
          {schools.map((school) => (
            <Grid item xs={12} md={6} key={school.id}>
              <Card>
                <CardMedia
                  component="img"
                  height="200"
                  image={school.image}
                  alt={t(school.nameKey)}
                />
                <CardContent>
                  <Typography variant="h5" component="h3" gutterBottom>
                    {t(school.nameKey)}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    {t(school.addressKey)}
                  </Typography>
                  <Button
                    component={RouterLink}
                    to={`/schools/${school.slug}`}
                    variant="outlined"
                    sx={{
                      mt: 2,
                      borderColor: (theme) => theme.palette.primary.main,
                      color: (theme) => theme.palette.primary.main,
                      '&:hover': {
                        borderColor: (theme) => theme.palette.primary.dark,
                        backgroundColor: 'rgba(212, 175, 55, 0.1)',
                      },
                    }}
                  >
                    {t(school.detailsKey)}
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default SchoolsOverview;
