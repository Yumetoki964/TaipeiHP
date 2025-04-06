import React, { useState, useEffect } from 'react';
import { Grid, Typography, Container, Box, CircularProgress, Alert } from '@mui/material';
import { useTranslation } from 'react-i18next';
import SchoolCard from './SchoolCard';
import schoolService from '../../../services/schoolService';

/**
 * 校舎一覧コンポーネント
 * すべての校舎を一覧表示する
 *
 * @returns {JSX.Element}
 */
const SchoolList = () => {
  const { t } = useTranslation(['common']);
  const [schools, setSchools] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSchools = async () => {
      try {
        setLoading(true);
        const data = await schoolService.getAllSchools();
        setSchools(data);
        setLoading(false);
      } catch (err) {
        console.error('Failed to fetch schools:', err);
        setError(t('common:errors.failedToLoadSchools'));
        setLoading(false);
      }
    };

    fetchSchools();
  }, [t]);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', py: 8 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ py: 4 }}>
        <Alert severity="error">{error}</Alert>
      </Box>
    );
  }

  return (
    <Box sx={{ py: 8, backgroundColor: '#f5f5f5' }}>
      <Container maxWidth="lg">
        <Typography
          variant="h4"
          component="h2"
          sx={{
            textAlign: 'center',
            mb: 6,
            fontWeight: 'bold'
          }}
        >
          {t('common:schoolsTitle')}
        </Typography>

        <Grid container spacing={4}>
          {schools.map((school) => (
            <Grid item xs={12} md={6} key={school.id}>
              <SchoolCard school={school} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default SchoolList;