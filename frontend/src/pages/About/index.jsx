import React, { useState, useEffect } from 'react';
import { Box, Typography, Container, CircularProgress } from '@mui/material';
import { useTranslation } from 'react-i18next';
import SEO from '../../components/common/SEO';
import CompanyInfo from '../../components/sections/about/CompanyInfo';
import History from '../../components/sections/about/History';
import Vision from '../../components/sections/about/Vision';
import SisterCompanyDetail from '../../components/sections/about/SisterCompanyDetail';
import { getCompanyInfo, getCompanyHistory, getCompanyValues, getSisterCompany } from '../../services/aboutService';

/**
 * 会社概要ページ
 * 会社の基本情報、歴史、ビジョン・ミッション、姉妹会社情報を表示する
 */
const AboutPage = () => {
  const { t } = useTranslation('about');
  const [loading, setLoading] = useState(true);
  const [companyInfo, setCompanyInfo] = useState(null);
  const [historyItems, setHistoryItems] = useState([]);
  const [valueItems, setValueItems] = useState([]);
  const [sisterCompany, setSisterCompany] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [infoData, historyData, valuesData, sisterCompanyData] = await Promise.all([
          getCompanyInfo(),
          getCompanyHistory(),
          getCompanyValues(),
          getSisterCompany()
        ]);
        
        setCompanyInfo(infoData);
        setHistoryItems(historyData);
        setValueItems(valuesData);
        setSisterCompany(sisterCompanyData);
        setError(null);
      } catch (err) {
        console.error('会社情報の取得に失敗しました:', err);
        setError('会社情報の取得に失敗しました。しばらくしてから再度お試しください。');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <SEO
        title={t('metaTitle')}
        description={t('metaDescription')}
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
            {t('pageTitle')}
          </Typography>
          <Typography 
            variant="h6" 
            sx={{ 
              textAlign: 'center',
              mt: 2
            }}
            className="slide-up"
          >
            {t('pageSubtitle')}
          </Typography>
        </Container>
      </Box>

      {/* ローディング表示 */}
      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
          <CircularProgress size={60} thickness={4} sx={{ color: '#d4af37' }} />
        </Box>
      ) : error ? (
        <Box sx={{ textAlign: 'center', py: 8 }}>
          <Typography variant="h6" color="error">
            {error}
          </Typography>
        </Box>
      ) : (
        <>
          {/* 会社基本情報 */}
          <CompanyInfo companyInfo={companyInfo} />
          
          {/* ビジョン・ミッション・価値観 */}
          <Vision valueItems={valueItems} />
          
          {/* 会社の歴史 */}
          <History historyItems={historyItems} />
          
          {/* 姉妹会社情報 */}
          <SisterCompanyDetail sisterCompany={sisterCompany} />
        </>
      )}
    </>
  );
};

export default AboutPage;