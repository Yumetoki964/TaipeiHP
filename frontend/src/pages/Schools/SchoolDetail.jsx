import React, { useState, useEffect } from 'react';
import { 
  Box, Container, Typography, Breadcrumbs, Link, Grid, Button,
  CircularProgress, Alert, Divider, Chip, Paper, Card, CardContent
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import { Link as RouterLink, useParams, useNavigate } from 'react-router-dom';
import schoolService from '../../services/schoolService';
import SEO from '../../components/common/SEO';
import Gallery from '../../components/sections/schools/Gallery';
import AccessInfo from '../../components/sections/schools/AccessInfo';
import MapView from '../../components/sections/schools/MapView';

/**
 * 校舎詳細ページ
 * 特定の校舎の詳細情報を表示するページ
 *
 * @returns {JSX.Element}
 */
const SchoolDetailPage = () => {
  const { t, i18n } = useTranslation(['common']);
  const lang = i18n.language;
  const { schoolId } = useParams();
  const navigate = useNavigate();
  
  const [school, setSchool] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSchoolDetail = async () => {
      try {
        setLoading(true);
        const data = await schoolService.getSchoolById(schoolId);
        setSchool(data);
        setLoading(false);
      } catch (err) {
        console.error(`Failed to fetch school with id ${schoolId}:`, err);
        setError(t('common:errors.failedToLoadSchoolDetails'));
        setLoading(false);
      }
    };

    fetchSchoolDetail();
  }, [schoolId, t]);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', py: 8, minHeight: '60vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Container maxWidth="lg" sx={{ py: 8, minHeight: '60vh' }}>
        <Alert severity="error" sx={{ mb: 3 }}>{error}</Alert>
        <Button variant="contained" onClick={() => navigate('/schools')}>
          {t('common:backToSchoolsList')}
        </Button>
      </Container>
    );
  }

  if (!school) {
    return (
      <Container maxWidth="lg" sx={{ py: 8, minHeight: '60vh' }}>
        <Alert severity="info" sx={{ mb: 3 }}>{t('common:schoolNotFound')}</Alert>
        <Button variant="contained" onClick={() => navigate('/schools')}>
          {t('common:backToSchoolsList')}
        </Button>
      </Container>
    );
  }

  return (
    <Box sx={{ minHeight: '100vh', pt: 4, pb: 8 }}>
      <SEO
        title={`${school.name[lang]} - ${t('common:schoolDetailTitle')}`}
        description={t('common:schoolDetailDescription', { schoolName: school.name[lang] })}
      />
      
      <Container maxWidth="lg">
        <Breadcrumbs sx={{ mb: 3 }}>
          <Link component={RouterLink} to="/" underline="hover" color="inherit">
            {t('common:home')}
          </Link>
          <Link component={RouterLink} to="/schools" underline="hover" color="inherit">
            {t('common:schools')}
          </Link>
          <Typography color="text.primary">{school.name[lang]}</Typography>
        </Breadcrumbs>
        
        <Typography
          variant="h3"
          component="h1"
          sx={{ mb: 2, fontWeight: 'bold', color: '#1a1a1a' }}
        >
          {school.name[lang]}
        </Typography>
        
        <Box sx={{ mb: 4 }}>
          <Chip 
            label={t('common:school')} 
            sx={{ 
              mr: 1, 
              backgroundColor: '#d4af37', 
              color: 'white',
              fontWeight: 'bold'
            }} 
          />
        </Box>
        
        <Divider sx={{ mb: 4 }} />
        
        <Grid container spacing={4}>
          <Grid item xs={12}>
            <Typography variant="h4" component="h2" sx={{ mb: 3, color: '#d4af37' }}>
              {t('common:galleryTitle')}
            </Typography>
            <Gallery 
              images={school.images} 
              imageDescriptions={school.imageDescriptions} 
            />
          </Grid>
          
          <Grid item xs={12}>
            <Typography variant="h4" component="h2" sx={{ mb: 3, color: '#d4af37' }}>
              {t('common:schoolFeaturesTitle')}
            </Typography>
            <Paper sx={{ p: 3, mb: 4 }} elevation={1}>
              <Grid container spacing={2}>
                {school.features[lang].map((feature, index) => (
                  <Grid item xs={12} sm={6} md={4} key={index}>
                    <Card sx={{ height: '100%', backgroundColor: '#f5f5f5' }}>
                      <CardContent>
                        <Typography variant="body1">
                          {feature}
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </Paper>
          </Grid>
          
          <Grid item xs={12} md={6}>
            <AccessInfo school={school} />
          </Grid>
          
          <Grid item xs={12} md={6}>
            <MapView 
              mapUrl={school.mapUrl} 
              title={school.name[lang]}
            />
          </Grid>
        </Grid>
        
        <Box sx={{ mt: 4, textAlign: 'center' }}>
          <Button
            variant="contained"
            component={RouterLink}
            to="/contact"
            sx={{
              backgroundColor: '#d4af37',
              '&:hover': {
                backgroundColor: '#b8860b'
              },
              px: 4,
              py: 1.5
            }}
          >
            {t('common:contactSchool')}
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default SchoolDetailPage;