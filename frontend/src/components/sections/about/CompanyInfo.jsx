import React from 'react';
import { Box, Typography, Grid, Paper, Container, Divider, useTheme, useMediaQuery } from '@mui/material';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';

/**
 * 会社情報コンポーネント
 * 会社の基本情報を表示する
 */
const CompanyInfo = ({ companyInfo }) => {
  const { t, i18n } = useTranslation('about');
  const currentLang = i18n.language;
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  if (!companyInfo) return null;

  return (
    <Container maxWidth="lg" sx={{ my: 6 }}>
      <Box
        component="section"
        className="fade-in"
        sx={{
          textAlign: 'center',
          mb: 6
        }}
      >
        <Typography
          variant="h4"
          component="h2"
          gutterBottom
          sx={{
            fontWeight: 'bold',
            color: '#d4af37',
            position: 'relative',
            display: 'inline-block',
            '&::after': {
              content: '""',
              position: 'absolute',
              bottom: '-10px',
              left: '50%',
              transform: 'translateX(-50%)',
              width: '80px',
              height: '4px',
              backgroundColor: '#d4af37'
            }
          }}
        >
          {t('companyInfo.title')}
        </Typography>
      </Box>

      <Grid container spacing={4} alignItems="center">
        <Grid item xs={12} md={6}>
          <Paper
            elevation={3}
            sx={{
              p: 4,
              height: '100%',
              backgroundColor: '#fff',
              borderRadius: 2,
              transition: 'transform 0.3s ease-in-out',
              '&:hover': {
                transform: 'translateY(-5px)'
              }
            }}
          >
            <Typography variant="h5" component="h3" gutterBottom sx={{ color: '#1a1a1a', fontWeight: 'bold' }}>
              {companyInfo.name[currentLang]}
            </Typography>
            <Divider sx={{ my: 2 }} />
            
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 2 }}>
                  <Box
                    component="span"
                    className="material-icons"
                    sx={{ mr: 2, color: '#d4af37', mt: 0.5 }}
                  >
                    event
                  </Box>
                  <Box>
                    <Typography variant="subtitle2" color="textSecondary">
                      {t('companyInfo.established')}
                    </Typography>
                    <Typography variant="body1">{companyInfo.foundingYear}</Typography>
                  </Box>
                </Box>
              </Grid>
              
              <Grid item xs={12}>
                <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 2 }}>
                  <Box
                    component="span"
                    className="material-icons"
                    sx={{ mr: 2, color: '#d4af37', mt: 0.5 }}
                  >
                    person
                  </Box>
                  <Box>
                    <Typography variant="subtitle2" color="textSecondary">
                      {t('companyInfo.representative')}
                    </Typography>
                    <Typography variant="body1">{companyInfo.representative[currentLang]}</Typography>
                  </Box>
                </Box>
              </Grid>
              
              <Grid item xs={12}>
                <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 2 }}>
                  <Box
                    component="span"
                    className="material-icons"
                    sx={{ mr: 2, color: '#d4af37', mt: 0.5 }}
                  >
                    place
                  </Box>
                  <Box>
                    <Typography variant="subtitle2" color="textSecondary">
                      {t('companyInfo.address')}
                    </Typography>
                    <Typography variant="body1">{companyInfo.address[currentLang]}</Typography>
                  </Box>
                </Box>
              </Grid>
              
              <Grid item xs={12}>
                <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 2 }}>
                  <Box
                    component="span"
                    className="material-icons"
                    sx={{ mr: 2, color: '#d4af37', mt: 0.5 }}
                  >
                    phone
                  </Box>
                  <Box>
                    <Typography variant="subtitle2" color="textSecondary">
                      {t('companyInfo.phone')}
                    </Typography>
                    <Typography variant="body1">{companyInfo.phone}</Typography>
                  </Box>
                </Box>
              </Grid>
              
              <Grid item xs={12}>
                <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 2 }}>
                  <Box
                    component="span"
                    className="material-icons"
                    sx={{ mr: 2, color: '#d4af37', mt: 0.5 }}
                  >
                    email
                  </Box>
                  <Box>
                    <Typography variant="subtitle2" color="textSecondary">
                      {t('companyInfo.email')}
                    </Typography>
                    <Typography variant="body1">{companyInfo.email}</Typography>
                  </Box>
                </Box>
              </Grid>
              
              {companyInfo.registrationNumber && (
                <Grid item xs={12}>
                  <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
                    <Box
                      component="span"
                      className="material-icons"
                      sx={{ mr: 2, color: '#d4af37', mt: 0.5 }}
                    >
                      badge
                    </Box>
                    <Box>
                      <Typography variant="subtitle2" color="textSecondary">
                        {t('companyInfo.registrationNumber')}
                      </Typography>
                      <Typography variant="body1">{companyInfo.registrationNumber}</Typography>
                    </Box>
                  </Box>
                </Grid>
              )}
            </Grid>
          </Paper>
        </Grid>
        
        <Grid item xs={12} md={6}>
          <Box
            component="img"
            src="/assets/images/company/office.jpg"
            alt={t('companyInfo.officeImage')}
            sx={{
              width: '100%',
              height: isMobile ? '300px' : '400px',
              objectFit: 'cover',
              borderRadius: 2,
              boxShadow: 3
            }}
            className="slide-up"
          />
        </Grid>
      </Grid>
    </Container>
  );
};

CompanyInfo.propTypes = {
  companyInfo: PropTypes.shape({
    name: PropTypes.shape({
      zh: PropTypes.string.isRequired,
      ja: PropTypes.string.isRequired,
      en: PropTypes.string.isRequired
    }).isRequired,
    foundingYear: PropTypes.string.isRequired,
    representative: PropTypes.shape({
      zh: PropTypes.string.isRequired,
      ja: PropTypes.string.isRequired,
      en: PropTypes.string.isRequired
    }).isRequired,
    address: PropTypes.shape({
      zh: PropTypes.string.isRequired,
      ja: PropTypes.string.isRequired,
      en: PropTypes.string.isRequired
    }).isRequired,
    phone: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    registrationNumber: PropTypes.string
  })
};

export default CompanyInfo;