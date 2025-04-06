import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Typography, Box, Grid, Button, Chip, Paper, Divider, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import { CheckCircle as CheckCircleIcon, ArrowBack as ArrowBackIcon } from '@mui/icons-material';
import { useTranslation } from 'react-i18next';
import SEO from '../../components/common/SEO';
import PricingInfo from '../../components/sections/courses/PricingInfo';
import TrialLesson from '../../components/sections/courses/TrialLesson';
import { getCourseById } from '../../services/courseService';
import Loader from '../../components/common/Loader';

const CourseDetail = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const { t, i18n } = useTranslation(['common', 'courses']);
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const currentLanguage = i18n.language;

  useEffect(() => {
    const fetchCourseDetails = async () => {
      try {
        setLoading(true);
        const data = await getCourseById(courseId);
        setCourse(data);
        setError(null);
      } catch (err) {
        console.error('Error fetching course details:', err);
        setError(t('courses:errors.detailsFailed'));
      } finally {
        setLoading(false);
      }
    };

    if (courseId) {
      fetchCourseDetails();
    }
  }, [courseId, t]);

  if (loading) {
    return <Loader />;
  }

  if (error || !course) {
    return (
      <Container maxWidth="lg" sx={{ py: 8, textAlign: 'center' }}>
        <Typography variant="h5" color="error" gutterBottom>
          {error || t('courses:errors.courseNotFound')}
        </Typography>
        <Button 
          variant="contained" 
          color="primary" 
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate('/courses')}
          sx={{ mt: 2 }}
        >
          {t('common:buttons.backToCourses')}
        </Button>
      </Container>
    );
  }

  return (
    <>
      <SEO
        title={`${course.name[currentLanguage]} | ${t('courses:pageTitle')}`}
        description={course.description[currentLanguage]}
      />
      
      {/* ページヘッダー */}
      <Box 
        sx={{ 
          bgcolor: 'primary.dark', 
          color: 'white',
          py: { xs: 4, md: 6 },
          mb: 6
        }}
      >
        <Container maxWidth="lg">
          <Typography 
            variant="h3" 
            component="h1" 
            sx={{ 
              textAlign: 'center',
              fontWeight: 'bold',
              color: 'secondary.main'
            }}
            className="fade-in"
          >
            {course.name[currentLanguage]}
          </Typography>
          <Typography 
            variant="h6" 
            sx={{ 
              textAlign: 'center',
              mt: 2
            }}
            className="slide-up"
          >
            {t('courses:targetAge')}: {course.targetAge[currentLanguage]}
          </Typography>
        </Container>
      </Box>

      <Container maxWidth="lg" sx={{ mb: 8 }}>
        <Button 
          variant="outlined" 
          color="primary" 
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate('/courses')}
          sx={{ mb: 4 }}
        >
          {t('common:buttons.backToCourses')}
        </Button>

        <Grid container spacing={4}>
          <Grid item xs={12} md={8}>
            {/* コース詳細 */}
            <Paper sx={{ p: 3, mb: 4 }}>
              <Typography variant="h5" component="h2" gutterBottom>
                {t('courses:courseDescription')}
              </Typography>
              <Divider sx={{ mb: 2 }} />
              <Typography variant="body1" paragraph>
                {course.description[currentLanguage]}
              </Typography>

              <Typography variant="h5" component="h2" gutterBottom sx={{ mt: 4 }}>
                {t('courses:features')}
              </Typography>
              <Divider sx={{ mb: 2 }} />
              <List>
                {course.features[currentLanguage].map((feature, index) => (
                  <ListItem key={index}>
                    <ListItemIcon>
                      <CheckCircleIcon color="secondary" />
                    </ListItemIcon>
                    <ListItemText primary={feature} />
                  </ListItem>
                ))}
              </List>
            </Paper>
          </Grid>

          <Grid item xs={12} md={4}>
            {/* サイドバー情報 */}
            <Paper sx={{ p: 3, mb: 4 }}>
              {/* 料金情報 */}
              <PricingInfo pricing={course.pricing?.[currentLanguage]} />

              <Box sx={{ mt: 4 }}>
                <Typography variant="h6" gutterBottom>
                  {t('courses:contactInfo')}
                </Typography>
                <Typography variant="body2" paragraph>
                  {t('courses:contactDescription')}
                </Typography>
                <Button 
                  variant="contained" 
                  color="secondary" 
                  fullWidth
                  href="/contact"
                >
                  {t('common:buttons.contact')}
                </Button>
              </Box>
            </Paper>
          </Grid>
        </Grid>

        {/* 体験授業案内 */}
        <Box sx={{ mt: 6 }}>
          <TrialLesson courseId={courseId} />
        </Box>
      </Container>
    </>
  );
};

export default CourseDetail;