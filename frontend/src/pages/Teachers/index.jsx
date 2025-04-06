import React from 'react';
import { Box, Container, Typography, Breadcrumbs, Link } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { Link as RouterLink } from 'react-router-dom';
import TeacherList from '../../components/sections/teachers/TeacherList';
import SEO from '../../components/common/SEO';

/**
 * 講師紹介ページ
 * すべての講師を一覧表示するページ
 *
 * @returns {JSX.Element}
 */
const TeachersPage = () => {
  const { t } = useTranslation(['teachers', 'common']);

  return (
    <Box sx={{ minHeight: '100vh', pt: 4 }}>
      <SEO
        title={t('teachers:pageTitle')}
        description={t('teachers:pageDescription')}
      />
      
      <Container maxWidth="lg">
        <Breadcrumbs sx={{ mb: 3 }}>
          <Link component={RouterLink} to="/" underline="hover" color="inherit">
            {t('common:home')}
          </Link>
          <Typography color="text.primary">{t('common:teachers')}</Typography>
        </Breadcrumbs>
        
        <Typography
          variant="h3"
          component="h1"
          sx={{ mb: 3, fontWeight: 'bold', color: '#1a1a1a' }}
        >
          {t('teachers:pageHeading')}
        </Typography>
        
        <Typography variant="subtitle1" sx={{ mb: 5, color: 'text.secondary' }}>
          {t('teachers:pageIntro')}
        </Typography>
      </Container>
      
      <TeacherList />
    </Box>
  );
};

export default TeachersPage;