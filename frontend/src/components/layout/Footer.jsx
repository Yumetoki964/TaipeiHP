import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  Box,
  Container,
  Grid,
  Typography,
  IconButton,
  Link
} from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import LanguageIcon from '@mui/icons-material/Language';
import InstagramIcon from '@mui/icons-material/Instagram';
import YouTubeIcon from '@mui/icons-material/YouTube';

const Footer = () => {
  const { t } = useTranslation();
  
  const currentYear = new Date().getFullYear();
  
  // フッターナビゲーションリンク
  const footerLinks = [
    { name: t('menu.home'), path: '/' },
    { name: t('menu.about'), path: '/about' },
    { name: t('menu.courses'), path: '/courses' },
    { name: t('menu.schools'), path: '/schools' },
    { name: t('menu.teachers'), path: '/teachers' }
  ];
  
  return (
    <Box component="footer" sx={{ py: 6, backgroundColor: '#f5f5f5' }}>
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Typography variant="h6" sx={{ color: '#1a1a1a', fontWeight: 'bold', mb: 2 }}>
              {t('footer.company')}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {t('footer.address')}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {t('footer.phone')} +886-XXX-XXX-XXX
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {t('footer.email')} info@yumetoki.com.tw
            </Typography>
          </Grid>
          
          <Grid item xs={12} md={4}>
            <Typography variant="h6" sx={{ color: '#1a1a1a', fontWeight: 'bold', mb: 2 }}>
              {t('menu.home')}
            </Typography>
            {footerLinks.map((link, index) => (
              <Typography key={index} variant="body2" component="p" gutterBottom>
                <Link 
                  component={RouterLink} 
                  to={link.path}
                  sx={{ color: '#666', textDecoration: 'none', '&:hover': { color: '#d4af37' } }}
                >
                  {link.name}
                </Link>
              </Typography>
            ))}
          </Grid>
          
          <Grid item xs={12} md={4}>
            <Typography variant="h6" sx={{ color: '#1a1a1a', fontWeight: 'bold', mb: 2 }}>
              {t('footer.follow')}
            </Typography>
            <Box sx={{ display: 'flex', gap: 2 }}>
              <IconButton sx={{ color: '#1877f2' }} aria-label="Facebook">
                <FacebookIcon />
              </IconButton>
              <IconButton sx={{ color: '#1da1f2' }} aria-label="Website">
                <LanguageIcon />
              </IconButton>
              <IconButton sx={{ color: '#c32aa3' }} aria-label="Instagram">
                <InstagramIcon />
              </IconButton>
              <IconButton sx={{ color: '#ff0000' }} aria-label="YouTube">
                <YouTubeIcon />
              </IconButton>
            </Box>
          </Grid>
        </Grid>
        
        <Box sx={{ mt: 4, pt: 3, borderTop: '1px solid #ddd', textAlign: 'center' }}>
          <Typography variant="body2" color="text.secondary">
            &copy; {currentYear} {t('footer.rights')}
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;