import React, { useEffect, useState } from 'react';
import { Container, Typography, Box, Grid } from '@mui/material';
import { useTranslation } from 'react-i18next';
import SEO from '../../components/common/SEO';
import CourseList from '../../components/sections/courses/CourseList';
import AgeGroups from '../../components/sections/courses/AgeGroups';
import TrialLesson from '../../components/sections/courses/TrialLesson';
import { getCourses } from '../../services/courseService';

const CoursesPage = () => {
  const { t } = useTranslation(['common', 'courses']);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setLoading(true);
        const data = await getCourses();
        setCourses(data);
        setError(null);
      } catch (err) {
        console.error('Error fetching courses:', err);
        setError(t('courses:errors.fetchFailed'));
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, [t]);

  return (
    <>
      <SEO
        title={t('courses:pageTitle')}
        description={t('courses:metaDescription')}
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
            {t('courses:title')}
          </Typography>
          <Typography 
            variant="h6" 
            sx={{ 
              textAlign: 'center',
              mt: 2
            }}
            className="slide-up"
          >
            {t('courses:subtitle')}
          </Typography>
        </Container>
      </Box>

      <Container maxWidth="lg" sx={{ mb: 8 }}>
        {/* コース概要 */}
        <Box sx={{ mb: 6 }}>
          <Typography variant="body1" paragraph>
            {t('courses:overview')}
          </Typography>
        </Box>

        {/* 年齢層セクション */}
        <AgeGroups />

        {/* コース一覧 */}
        <CourseList courses={courses} isLoading={loading} error={error} />

        {/* 体験授業案内 */}
        <TrialLesson />
      </Container>
    </>
  );
};

export default CoursesPage;