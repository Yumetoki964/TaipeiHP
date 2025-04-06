import React from 'react';
import { useTranslation } from 'react-i18next';
import { Box, Container } from '@mui/material';
import SEO from '../../components/common/SEO';
import Hero from '../../components/sections/home/Hero';
import Features from '../../components/sections/home/Features';
import SchoolsOverview from '../../components/sections/home/SchoolsOverview';
import News from '../../components/sections/home/News';
import SisterCompany from '../../components/sections/home/SisterCompany';

/**
 * ホームページコンポーネント
 * サイトのメインページ、会社とサービスの概要紹介
 */
const Home = () => {
  const { t } = useTranslation(['home', 'common']);

  return (
    <>
      <SEO
        title={t('home:meta.title')}
        description={t('home:meta.description')}
        keywords={t('home:meta.keywords')}
      />
      
      <main>
        {/* ヒーローセクション */}
        <Hero />
        
        {/* 特徴セクション */}
        <Features />
        
        {/* 校舎紹介セクション */}
        <SchoolsOverview />
        
        {/* ニュースセクション */}
        <News />
        
        {/* 日本の兄弟会社セクション */}
        <SisterCompany />
      </main>
    </>
  );
};

export default Home;
