import React, { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Box,
  Menu,
  MenuItem,
  useMediaQuery,
  useTheme
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import LanguageIcon from '@mui/icons-material/Language';
import useLanguage from '../../hooks/useLanguage';
import Navigation from './Navigation';
import MobileMenu from './MobileMenu';

/**
 * ヘッダーコンポーネント
 * サイトのトップバーとナビゲーションを担当
 */
const Header = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const { currentLang, changeLanguage, availableLanguages } = useLanguage();
  const { t } = useTranslation();
  
  // メニュー状態
  const [langAnchor, setLangAnchor] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);

  // 言語メニュー
  const handleLangClick = (event) => {
    setLangAnchor(event.currentTarget);
  };
  
  const handleLangClose = () => {
    setLangAnchor(null);
  };
  
  const handleLangChange = (langCode) => {
    changeLanguage(langCode);
    setLangAnchor(null);
  };
  
  // ハンバーガーメニュー
  const toggleDrawer = (open) => {
    setDrawerOpen(open);
  };

  return (
    <AppBar position="sticky" sx={{ 
      backgroundColor: theme.palette.secondary.main,
      boxShadow: 2
    }}>
      <Toolbar sx={{ 
        px: { xs: 2, sm: 3, md: 4 },
        py: { xs: 0.75, md: 1 }
      }}>
        <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
          <Typography 
            variant="h6" 
            component={RouterLink} 
            to="/"
            sx={{ 
              color: theme.palette.primary.main, 
              fontWeight: 'bold',
              textDecoration: 'none',
              letterSpacing: 0.5,
              fontSize: { xs: '1.25rem', md: '1.5rem' }
            }}
          >
            夢時
          </Typography>
        </Box>
        
        {/* デスクトップメニュー */}
        <Navigation onLangClick={handleLangClick} />
        
        {/* モバイルメニューボタン */}
        {isMobile && (
          <IconButton
            edge="end"
            color="inherit"
            aria-label="menu"
            onClick={() => toggleDrawer(true)}
            sx={{
              color: '#fff',
              '&:hover': {
                color: theme.palette.primary.main
              }
            }}
          >
            <MenuIcon />
          </IconButton>
        )}
        
        {/* 言語メニュー（デスクトップ） */}
        <Menu
          anchorEl={langAnchor}
          open={Boolean(langAnchor)}
          onClose={handleLangClose}
          PaperProps={{
            elevation: 3,
            sx: {
              mt: 1.5,
              minWidth: 150,
              borderRadius: 1
            }
          }}
        >
          {Object.values(availableLanguages).map((lang) => (
            <MenuItem 
              key={lang.code} 
              onClick={() => handleLangChange(lang.code)}
              selected={currentLang === lang.code}
              sx={{
                py: 1.5,
                '&.Mui-selected': {
                  backgroundColor: 'rgba(212, 175, 55, 0.15)',
                  '&:hover': {
                    backgroundColor: 'rgba(212, 175, 55, 0.25)'
                  }
                }
              }}
            >
              {lang.flag} {lang.label}
            </MenuItem>
          ))}
        </Menu>
        
        {/* モバイルドロワー */}
        <MobileMenu 
          open={drawerOpen} 
          onClose={() => toggleDrawer(false)} 
          onLanguageChange={handleLangChange} 
        />
      </Toolbar>
    </AppBar>
  );
};

export default Header;