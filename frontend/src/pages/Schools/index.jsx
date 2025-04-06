import React from 'react';
import { Box, Container, Typography, Breadcrumbs, Link } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { Link as RouterLink } from 'react-router-dom';
import SchoolList from '../../components/sections/schools/SchoolList';
import SEO from '../../components/common/SEO';

/**
 * 校舎紹介ページ
 * すべての校舎を一覧表示するページ
 *
 * @returns {JSX.Element}
 */
const SchoolsPage = () => {
  const { t } = useTranslation(['common']);

  return (
    <Box sx={{ minHeight: '100vh', pt: 4 }}>
      <SEO
        title={t('common:schoolsPageTitle')}
        description={t('common:schoolsPageDescription')}
      />
      
      <Container maxWidth="lg">
        <Breadcrumbs sx={{ mb: 3 }}>
          <Link component={RouterLink} to="/" underline="hover" color="inherit">
            {t('common:home')}
          </Link>
          <Typography color="text.primary">{t('common:schools')}</Typography>
        </Breadcrumbs>
        
        <Typography
          variant="h3"
          component="h1"
          sx={{ mb: 3, fontWeight: 'bold', color: '#1a1a1a' }}
        >
          {t('common:schoolsTitle')}
        </Typography>
        
        <Typography variant="subtitle1" sx={{ mb: 5, color: 'text.secondary' }}>
          {t('common:schoolsPageIntro')}
        </Typography>
      </Container>
      
      <SchoolList />
    </Box>
  );
};

export default SchoolsPage;