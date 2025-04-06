import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';

/**
 * SEO最適化コンポーネント
 * ページごとのメタタグ設定をサポートします
 * 
 * @param {Object} props - コンポーネントのプロパティ
 * @param {string} [props.title] - ページタイトル
 * @param {string} [props.description] - ページの説明
 * @param {string} [props.keywords] - ページのキーワード（カンマ区切り）
 * @param {string} [props.ogImage] - OGP画像のURL
 * @param {string} [props.ogType='website'] - OGPタイプ
 * @param {string} [props.twitterCard='summary_large_image'] - Twitter Cardタイプ
 * @param {boolean} [props.noIndex=false] - noindexを設定するかどうか
 * @param {Object} [props.meta] - 追加のメタタグ
 */
const SEO = ({
  title,
  description,
  keywords,
  ogImage,
  ogType = 'website',
  twitterCard = 'summary_large_image',
  noIndex = false,
  meta = []
}) => {
  const { t, i18n } = useTranslation();
  const currentLanguage = i18n.language?.split('-')[0] || 'zh';
  
  // サイト名（多言語対応）
  const siteName = {
    zh: '夢時商業股份有限公司 - 專業1對1教學',
    ja: '夢時商業股份有限公司 - プロフェッショナルな1対1指導',
    en: 'Yumetoki Commercial Co., Ltd. - Professional 1-on-1 Tutoring'
  };
  
  // デフォルトのメタ説明（多言語対応）
  const defaultDescription = {
    zh: '夢時商業股份有限公司提供台灣最優質的1對1個別指導教育服務，為每位學生量身打造學習計劃。',
    ja: '夢時商業股份有限公司は、台湾で最高品質の1対1個別指導教育サービスを提供し、生徒一人ひとりに合わせた学習プランをご用意しています。',
    en: 'Yumetoki Commercial Co., Ltd. provides the highest quality 1-on-1 personalized tutoring services in Taiwan, with tailored learning plans for each student.'
  };
  
  // 実際のタイトルとメタ説明を設定
  const pageTitle = title 
    ? `${title} | ${siteName[currentLanguage]}`
    : siteName[currentLanguage];
    
  const pageDescription = description || defaultDescription[currentLanguage];
  
  // デフォルトOGP画像
  const defaultOgImage = '/assets/images/ogp.jpg';
  
  return (
    <Helmet
      title={pageTitle}
      htmlAttributes={{
        lang: currentLanguage
      }}
      meta={[
        { name: 'description', content: pageDescription },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { property: 'og:title', content: pageTitle },
        { property: 'og:description', content: pageDescription },
        { property: 'og:type', content: ogType },
        { property: 'og:image', content: ogImage || defaultOgImage },
        { property: 'og:site_name', content: siteName[currentLanguage] },
        { property: 'og:locale', content: currentLanguage === 'zh' ? 'zh_TW' : (currentLanguage === 'ja' ? 'ja_JP' : 'en_US') },
        { name: 'twitter:card', content: twitterCard },
        { name: 'twitter:title', content: pageTitle },
        { name: 'twitter:description', content: pageDescription },
        { name: 'twitter:image', content: ogImage || defaultOgImage },
        ...(keywords ? [{ name: 'keywords', content: keywords }] : []),
        ...(noIndex ? [{ name: 'robots', content: 'noindex, nofollow' }] : []),
        ...meta
      ]}
      link={[
        { rel: 'canonical', href: window.location.href }
      ]}
    />
  );
};

export default SEO;