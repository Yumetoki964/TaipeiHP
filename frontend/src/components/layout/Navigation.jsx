import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Button, Box, useMediaQuery, useTheme } from '@mui/material';
import useLanguage from '../../hooks/useLanguage';

/**
 * メインナビゲーションコンポーネント
 * ヘッダー内でのナビゲーションリンクを表示する
 */
const Navigation = ({ onLangClick }) => {
  const theme = useTheme();
  const { t } = useTranslation();
  const { currentLang, availableLanguages } = useLanguage();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  // レスポンシブ対応のため、モバイル表示の場合は空を返す
  if (isMobile) {
    return null;
  }

  // ナビゲーションリンク
  const navLinks = [
    { name: t('menu.home'), path: '/' },
    { name: t('menu.about'), path: '/about' },
    { name: t('menu.courses'), path: '/courses' },
    { name: t('menu.schools'), path: '/schools' },
    { name: t('menu.teachers'), path: '/teachers' },
    { name: t('menu.blog'), path: '/blog' },
    { name: t('menu.contact'), path: '/contact' }
  ];

  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      {navLinks.map((link, index) => (
        <Button 
          key={index}
          color="inherit"
          component={RouterLink}
          to={link.path}
          sx={{ 
            mx: 0.5,
            fontSize: '0.9rem',
            transition: 'color 0.3s',
            '&:hover': {
              color: theme.palette.primary.main
            }
          }}
        >
          {link.name}
        </Button>
      ))}
      
      {/* 言語切替ボタン */}
      <Button 
        color="inherit" 
        onClick={onLangClick}
        startIcon={<span className="material-icons">language</span>}
        sx={{ 
          ml: 1,
          fontSize: '0.9rem',
          transition: 'color 0.3s',
          '&:hover': {
            color: theme.palette.primary.main
          }
        }}
      >
        {availableLanguages[currentLang]?.flag}
      </Button>
    </Box>
  );
};

export default Navigation;