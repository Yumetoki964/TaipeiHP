import React from 'react';
import { 
  Container, 
  Typography, 
  Box, 
  Tab, 
  Tabs, 
  useMediaQuery, 
  useTheme, 
  Paper
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import ContactForm from '../../components/sections/contact/ContactForm';
import TrialLessonForm from '../../components/sections/contact/TrialLessonForm';
import SchoolContacts from '../../components/sections/contact/SchoolContacts';
import FAQ from '../../components/sections/contact/FAQ';
import SEO from '../../components/common/SEO';

/**
 * お問い合わせページコンポーネント
 */
const ContactPage = () => {
  const { t } = useTranslation('contact/index');
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [tabValue, setTabValue] = React.useState(0);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  return (
    <>
      <SEO 
        title={t('title')} 
        description={t('overview')}
      />
      
      {/* ページヘッダー */}
      <Box 
        sx={{ 
          bgcolor: '#1a1a1a', 
          color: 'white',
          py: { xs: 4, md: 6 }
        }}
      >
        <Container maxWidth="lg">
          <Typography 
            variant="h3" 
            component="h1" 
            sx={{ 
              textAlign: 'center',
              fontWeight: 'bold',
              color: '#d4af37'
            }}
            className="fade-in"
          >
            {t('title')}
          </Typography>
          <Typography 
            variant="h6" 
            sx={{ 
              textAlign: 'center',
              mt: 2
            }}
            className="slide-up"
          >
            {t('subtitle')}
          </Typography>
        </Container>
      </Box>
      
      <Container maxWidth="lg" sx={{ mt: 6, mb: 8 }}>
        {/* 概要説明 */}
        <Typography 
          variant="body1" 
          sx={{ 
            textAlign: 'center', 
            mb: 6, 
            maxWidth: 800, 
            mx: 'auto' 
          }}
        >
          {t('overview')}
        </Typography>
        
        {/* モバイル用タブ */}
        {isMobile && (
          <Paper elevation={0} sx={{ mb: 4 }}>
            <Tabs 
              value={tabValue} 
              onChange={handleTabChange}
              variant="fullWidth"
              indicatorColor="primary"
              textColor="primary"
              aria-label="contact tabs"
              sx={{
                borderBottom: 1,
                borderColor: 'divider',
                '& .MuiTab-root': { 
                  fontWeight: 'bold',
                },
                '& .Mui-selected': { 
                  color: theme.palette.primary.main 
                },
              }}
            >
              <Tab label={t('contactForm.title')} id="contact-tab-0" />
              <Tab label={t('trialLessonForm.title')} id="contact-tab-1" />
            </Tabs>
          </Paper>
        )}
        
        {/* お問い合わせフォームと体験授業フォーム */}
        {isMobile ? (
          // モバイル表示 (タブで切り替え)
          <>
            <Box hidden={tabValue !== 0} id="contact-tabpanel-0">
              <ContactForm />
            </Box>
            <Box hidden={tabValue !== 1} id="contact-tabpanel-1">
              <TrialLessonForm />
            </Box>
          </>
        ) : (
          // デスクトップ表示 (並べて表示)
          <Box 
            sx={{ 
              display: 'grid', 
              gridTemplateColumns: '1fr 1fr', 
              gap: 4,
              mb: 6 
            }}
          >
            <ContactForm />
            <TrialLessonForm />
          </Box>
        )}
        
        {/* 校舎連絡先情報 */}
        <SchoolContacts />
        
        {/* よくある質問 */}
        <FAQ />
      </Container>
    </>
  );
};

export default ContactPage;