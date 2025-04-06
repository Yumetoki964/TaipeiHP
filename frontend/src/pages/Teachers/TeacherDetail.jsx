import React, { useState, useEffect } from 'react';
import { 
  Box, Container, Typography, Breadcrumbs, Link, Grid, Button,
  CircularProgress, Alert, Divider, Chip, Paper, Avatar
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import { Link as RouterLink, useParams, useNavigate } from 'react-router-dom';
import teacherService from '../../services/teacherService';
import SEO from '../../components/common/SEO';
import Biography from '../../components/sections/teachers/Biography';
import Specialties from '../../components/sections/teachers/Specialties';

/**
 * 講師詳細ページ
 * 特定の講師の詳細情報を表示するページ
 *
 * @returns {JSX.Element}
 */
const TeacherDetailPage = () => {
  const { t, i18n } = useTranslation(['teachers', 'common']);
  const lang = i18n.language;
  const { teacherId } = useParams();
  const navigate = useNavigate();
  
  const [teacher, setTeacher] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTeacherDetail = async () => {
      try {
        setLoading(true);
        const data = await teacherService.getTeacherById(teacherId);
        setTeacher(data);
        setLoading(false);
      } catch (err) {
        console.error(`Failed to fetch teacher with id ${teacherId}:`, err);
        setError(t('teachers:errors.failedToLoadTeacherDetails'));
        setLoading(false);
      }
    };

    fetchTeacherDetail();
  }, [teacherId, t]);

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
        <Button variant="contained" onClick={() => navigate('/teachers')}>
          {t('teachers:backToTeachersList')}
        </Button>
      </Container>
    );
  }

  if (!teacher) {
    return (
      <Container maxWidth="lg" sx={{ py: 8, minHeight: '60vh' }}>
        <Alert severity="info" sx={{ mb: 3 }}>{t('teachers:teacherNotFound')}</Alert>
        <Button variant="contained" onClick={() => navigate('/teachers')}>
          {t('teachers:backToTeachersList')}
        </Button>
      </Container>
    );
  }

  return (
    <Box sx={{ minHeight: '100vh', pt: 4, pb: 8 }}>
      <SEO
        title={`${teacher.name[lang]} - ${t('teachers:teacherDetailTitle')}`}
        description={t('teachers:teacherDetailDescription', { teacherName: teacher.name[lang] })}
      />
      
      <Container maxWidth="lg">
        <Breadcrumbs sx={{ mb: 3 }}>
          <Link component={RouterLink} to="/" underline="hover" color="inherit">
            {t('common:home')}
          </Link>
          <Link component={RouterLink} to="/teachers" underline="hover" color="inherit">
            {t('common:teachers')}
          </Link>
          <Typography color="text.primary">{teacher.name[lang]}</Typography>
        </Breadcrumbs>
        
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Box sx={{ mb: { xs: 4, md: 0 } }}>
              <Paper elevation={2} sx={{ p: 2, borderRadius: 2, overflow: 'hidden' }}>
                <Box
                  component="img"
                  src={teacher.image}
                  alt={teacher.name[lang]}
                  sx={{
                    width: '100%',
                    height: 'auto',
                    objectFit: 'cover',
                    borderRadius: 1
                  }}
                />
              </Paper>
            </Box>
          </Grid>
          
          <Grid item xs={12} md={8}>
            <Typography
              variant="h3"
              component="h1"
              sx={{ mb: 2, fontWeight: 'bold', color: '#1a1a1a' }}
            >
              {teacher.name[lang]}
            </Typography>
            
            <Box sx={{ mb: 3 }}>
              {teacher.specialties[lang].slice(0, 5).map((specialty, index) => (
                <Chip 
                  key={index} 
                  label={specialty} 
                  sx={{ 
                    mr: 1, 
                    mb: 1,
                    backgroundColor: index === 0 ? '#d4af37' : '#f5f5f5',
                    color: index === 0 ? 'white' : 'inherit'
                  }} 
                />
              ))}
            </Box>
            
            <Divider sx={{ mb: 3 }} />
            
            <Specialties teacher={teacher} />
            <Biography teacher={teacher} />
            
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
                {t('teachers:contactForLesson')}
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default TeacherDetailPage;