import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  Drawer,
  Box,
  List,
  ListItem,
  ListItemText,
  Divider,
  Typography,
  IconButton
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import useLanguage from '../../hooks/useLanguage';

/**
 * モバイル用メニュードロワーコンポーネント
 * スマートフォン等の小画面デバイス向けのナビゲーションメニュー
 */
const MobileMenu = ({ open, onClose, onLanguageChange }) => {
  const { t } = useTranslation();
  const { currentLang, availableLanguages } = useLanguage();

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
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
    >
      <Box
        sx={{ 
          width: 280,
          height: '100%',
          display: 'flex',
          flexDirection: 'column'
        }}
        role="presentation"
      >
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          p: 2,
          borderBottom: '1px solid rgba(0, 0, 0, 0.12)'
        }}>
          <Typography variant="h6" sx={{ fontWeight: 'bold', color: (theme) => theme.palette.primary.main }}>
            夢時
          </Typography>
          <IconButton onClick={onClose} aria-label="close menu">
            <CloseIcon />
          </IconButton>
        </Box>

        <List sx={{ flexGrow: 1, py: 0 }}>
          {navLinks.map((link, index) => (
            <ListItem 
              button 
              key={index}
              component={RouterLink}
              to={link.path}
              onClick={onClose}
              sx={{ 
                py: 1.5,
                borderBottom: '1px solid rgba(0, 0, 0, 0.06)',
                '&:hover': {
                  backgroundColor: 'rgba(212, 175, 55, 0.08)'
                }
              }}
            >
              <ListItemText 
                primary={link.name} 
                primaryTypographyProps={{ 
                  fontSize: '1rem',
                  fontWeight: 500
                }}
              />
            </ListItem>
          ))}
        </List>

        <Divider />
        
        <Box sx={{ p: 2 }}>
          <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 600 }}>
            言語 / Language
          </Typography>
          <List sx={{ py: 0 }}>
            {Object.values(availableLanguages).map((lang) => (
              <ListItem 
                button 
                key={lang.code} 
                onClick={() => {
                  onLanguageChange(lang.code);
                  onClose();
                }}
                selected={currentLang === lang.code}
                sx={{ 
                  py: 1,
                  borderRadius: 1,
                  '&.Mui-selected': {
                    backgroundColor: 'rgba(212, 175, 55, 0.15)',
                    '&:hover': {
                      backgroundColor: 'rgba(212, 175, 55, 0.25)'
                    }
                  }
                }}
              >
                <ListItemText 
                  primary={`${lang.flag} ${lang.label}`}
                  primaryTypographyProps={{ fontSize: '0.9rem' }}
                />
              </ListItem>
            ))}
          </List>
        </Box>
      </Box>
    </Drawer>
  );
};

export default MobileMenu;