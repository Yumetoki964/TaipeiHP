import React, { useState } from 'react';
import { Box, Button, Menu, MenuItem, Typography, IconButton } from '@mui/material';
import LanguageIcon from '@mui/icons-material/Language';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import useLanguage from '../../hooks/useLanguage';

/**
 * 言語切替コンポーネント
 * サイト全体の言語切替機能を提供します
 * 
 * @param {Object} props - コンポーネントのプロパティ
 * @param {string} [props.variant='button'] - 表示バリアント ('button' | 'icon' | 'text')
 * @param {string} [props.size='medium'] - サイズ ('small' | 'medium' | 'large')
 * @param {string} [props.color='primary'] - 色
 * @param {boolean} [props.showText=true] - テキストを表示するかどうか（buttonバリアントの場合）
 * @param {boolean} [props.showFlag=true] - 国旗を表示するかどうか
 */
const LanguageSwitcher = ({
  variant = 'button',
  size = 'medium',
  color = 'primary',
  showText = true,
  showFlag = true,
  sx = {}
}) => {
  const { currentLang, currentLangInfo, changeLanguage, availableLanguages } = useLanguage();
  const [anchorEl, setAnchorEl] = useState(null);
  
  // メニューを開く
  const handleOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };
  
  // メニューを閉じる
  const handleClose = () => {
    setAnchorEl(null);
  };
  
  // 言語を変更する
  const handleChangeLanguage = (langCode) => {
    changeLanguage(langCode);
    handleClose();
  };
  
  // アイコンのサイズを調整
  const getIconSize = () => {
    switch (size) {
      case 'small': return 18;
      case 'large': return 24;
      default: return 20;
    }
  };
  
  // ボタンのレンダリング
  const renderToggleButton = () => {
    switch (variant) {
      case 'icon':
        return (
          <IconButton
            onClick={handleOpen}
            color={color}
            aria-label="change language"
            aria-controls="language-menu"
            aria-haspopup="true"
            size={size}
            sx={sx}
          >
            <LanguageIcon fontSize="inherit" />
          </IconButton>
        );
        
      case 'text':
        return (
          <Box
            onClick={handleOpen}
            sx={{ 
              display: 'flex', 
              alignItems: 'center',
              cursor: 'pointer',
              ...sx
            }}
          >
            {showFlag && (
              <Typography variant="body2" component="span" sx={{ mr: 0.5 }}>
                {currentLangInfo.flag}
              </Typography>
            )}
            <Typography 
              variant="body2" 
              component="span"
              sx={{ 
                textTransform: 'uppercase',
                fontWeight: 500
              }}
            >
              {currentLang}
            </Typography>
            <KeyboardArrowDownIcon fontSize="small" sx={{ ml: 0.5 }} />
          </Box>
        );
        
      case 'button':
      default:
        return (
          <Button
            onClick={handleOpen}
            variant="text"
            color={color}
            size={size}
            startIcon={showFlag ? null : <LanguageIcon />}
            endIcon={<KeyboardArrowDownIcon />}
            sx={{ 
              textTransform: 'none',
              ...sx
            }}
          >
            {showFlag && (
              <Typography variant="body2" component="span" sx={{ mr: showText ? 0.5 : 0 }}>
                {currentLangInfo.flag}
              </Typography>
            )}
            {showText && currentLangInfo.label}
          </Button>
        );
    }
  };
  
  return (
    <>
      {renderToggleButton()}
      
      <Menu
        id="language-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
        sx={{ mt: 1 }}
      >
        {Object.values(availableLanguages).map((lang) => (
          <MenuItem 
            key={lang.code} 
            onClick={() => handleChangeLanguage(lang.code)}
            selected={currentLang === lang.code}
            sx={{
              px: 2,
              py: 1,
              minWidth: 140,
              '&.Mui-selected': {
                backgroundColor: 'rgba(212, 175, 55, 0.15)',
                '&:hover': {
                  backgroundColor: 'rgba(212, 175, 55, 0.25)'
                }
              }
            }}
          >
            <Typography variant="body2">{lang.flag} {lang.label}</Typography>
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};

export default LanguageSwitcher;