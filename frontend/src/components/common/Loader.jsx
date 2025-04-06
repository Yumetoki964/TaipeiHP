import React from 'react';
import { Box, CircularProgress, Typography, useTheme } from '@mui/material';

/**
 * ローディング表示コンポーネント
 * アプリ全体で統一したローディング表示を提供します
 * 
 * @param {Object} props - コンポーネントのプロパティ
 * @param {string} [props.size='medium'] - ローダーのサイズ ('small' | 'medium' | 'large')
 * @param {string} [props.type='fullscreen'] - 表示タイプ ('fullscreen' | 'inline' | 'overlay' | 'button')
 * @param {string} [props.color='primary'] - ローダーの色
 * @param {string} [props.message] - 表示するメッセージ
 * @param {number} [props.thickness=3.6] - ローダーの線の太さ
 */
const Loader = ({
  size = 'medium',
  type = 'fullscreen',
  color = 'primary',
  message,
  thickness = 3.6,
  sx = {}
}) => {
  const theme = useTheme();
  
  // サイズに基づいた値の設定
  const getSizeValue = () => {
    switch (size) {
      case 'small': return { spinner: 24, fontSize: 14 };
      case 'large': return { spinner: 60, fontSize: 18 };
      case 'medium':
      default: return { spinner: 40, fontSize: 16 };
    }
  };
  
  const sizeValues = getSizeValue();
  
  // 全画面表示
  if (type === 'fullscreen') {
    return (
      <Box
        sx={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'rgba(255, 255, 255, 0.9)',
          zIndex: theme.zIndex.modal + 1,
          ...sx
        }}
      >
        <CircularProgress 
          color={color} 
          size={sizeValues.spinner}
          thickness={thickness}
        />
        {message && (
          <Typography 
            variant="body2" 
            sx={{ 
              mt: 2, 
              color: 'text.secondary',
              fontSize: sizeValues.fontSize
            }}
          >
            {message}
          </Typography>
        )}
      </Box>
    );
  }
  
  // オーバーレイ表示
  if (type === 'overlay') {
    return (
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'rgba(255, 255, 255, 0.8)',
          zIndex: theme.zIndex.appBar - 1,
          borderRadius: 'inherit',
          ...sx
        }}
      >
        <CircularProgress 
          color={color} 
          size={sizeValues.spinner}
          thickness={thickness}
        />
        {message && (
          <Typography 
            variant="body2" 
            sx={{ 
              mt: 2, 
              color: 'text.secondary',
              fontSize: sizeValues.fontSize
            }}
          >
            {message}
          </Typography>
        )}
      </Box>
    );
  }
  
  // ボタン内表示
  if (type === 'button') {
    return (
      <CircularProgress 
        color={color} 
        size={20} 
        thickness={thickness + 0.4}
        sx={sx}
      />
    );
  }
  
  // インライン表示（デフォルト）
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        py: 3,
        ...sx
      }}
    >
      <CircularProgress 
        color={color} 
        size={sizeValues.spinner}
        thickness={thickness}
      />
      {message && (
        <Typography 
          variant="body2" 
          sx={{ 
            mt: 2, 
            color: 'text.secondary',
            fontSize: sizeValues.fontSize
          }}
        >
          {message}
        </Typography>
      )}
    </Box>
  );
};

export default Loader;