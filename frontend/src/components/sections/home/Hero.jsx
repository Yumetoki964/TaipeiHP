import React from 'react';
import { useTranslation } from 'react-i18next';
import { Box, Container, Typography, Button } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { styled } from '@mui/material/styles';

// スタイル付きコンポーネント
const HeroWrapper = styled(Box)(({ theme }) => ({
  backgroundImage: 'url(/assets/images/hero-bg.jpg)', // デフォルト背景画像
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  position: 'relative',
  color: theme.palette.text.light,
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.6)', // オーバーレイ
    zIndex: 1,
  },
  '& > *': {
    position: 'relative',
    zIndex: 2,
  },
}));

/**
 * ヒーローセクションコンポーネント
 * ホームページのメインビジュアルとキャッチコピー、CTAを表示
 */
const Hero = () => {
  const { t } = useTranslation(['home', 'common']);

  return (
    <HeroWrapper>
      <Container maxWidth="lg">
        <Box
          sx={{
            py: { xs: 10, md: 15 },
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography
            variant="h2"
            component="h1"
            sx={{
              fontWeight: 'bold',
              mb: 2,
              color: (theme) => theme.palette.primary.main,
              animation: 'fadeIn 1s ease-in-out',
              '@keyframes fadeIn': {
                from: { opacity: 0 },
                to: { opacity: 1 },
              },
            }}
          >
            {t('home:hero.title')}
          </Typography>
          
          <Typography
            variant="h5"
            sx={{
              mb: 4,
              maxWidth: '800px',
              animation: 'slideUp 0.8s ease-out',
              '@keyframes slideUp': {
                from: { transform: 'translateY(20px)', opacity: 0 },
                to: { transform: 'translateY(0)', opacity: 1 },
              },
            }}
          >
            {t('home:hero.subtitle')}
          </Typography>
          
          <Button
            component={RouterLink}
            to="/contact"
            variant="contained"
            size="large"
            sx={{
              mt: 2,
              py: 1.5,
              px: 4,
              fontSize: '1.1rem',
            }}
          >
            {t('home:hero.cta')}
          </Button>
        </Box>
      </Container>
    </HeroWrapper>
  );
};

export default Hero;
