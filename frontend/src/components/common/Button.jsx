import React from 'react';
import { Button as MuiButton, CircularProgress } from '@mui/material';
import { Link } from 'react-router-dom';

/**
 * カスタマイズされたボタンコンポーネント
 * アプリ全体で統一感のあるボタンスタイルを提供します
 * 
 * @param {Object} props - コンポーネントのプロパティ
 * @param {string} [props.variant='contained'] - ボタンのバリアント (contained, outlined, text)
 * @param {string} [props.color='primary'] - ボタンの色 (primary, secondary, error, info, success, warning)
 * @param {string} [props.size='medium'] - ボタンのサイズ (small, medium, large)
 * @param {boolean} [props.fullWidth=false] - ボタンを親要素の幅いっぱいに広げるかどうか
 * @param {boolean} [props.loading=false] - ロード中かどうか
 * @param {string} [props.to] - リンク先のパス（指定するとLinkコンポーネントとしてレンダリング）
 * @param {string} [props.href] - 外部リンク先（指定するとaタグとしてレンダリング）
 */
const Button = ({
  children,
  variant = 'contained',
  color = 'primary',
  size = 'medium',
  fullWidth = false,
  disabled = false,
  loading = false,
  startIcon,
  endIcon,
  to,
  href,
  onClick,
  ...props
}) => {
  // ボタンの基本スタイル
  const buttonStyles = {
    boxShadow: variant === 'contained' ? 2 : 'none',
    fontWeight: 500,
    borderRadius: '4px',
    textTransform: 'none',
    position: 'relative',
    transition: 'all 0.3s',
    ...(loading && {
      color: 'transparent',
      '& .MuiButton-startIcon, & .MuiButton-endIcon': {
        visibility: 'hidden'
      }
    })
  };

  // 内部コンテンツ
  const buttonContent = (
    <>
      {children}
      {loading && (
        <CircularProgress
          size={24}
          color="inherit"
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            marginTop: '-12px',
            marginLeft: '-12px',
          }}
        />
      )}
    </>
  );

  // リンクの場合
  if (to) {
    return (
      <MuiButton
        component={Link}
        to={to}
        variant={variant}
        color={color}
        size={size}
        disabled={disabled || loading}
        fullWidth={fullWidth}
        startIcon={startIcon}
        endIcon={endIcon}
        sx={buttonStyles}
        {...props}
      >
        {buttonContent}
      </MuiButton>
    );
  }

  // 外部リンクの場合
  if (href) {
    return (
      <MuiButton
        component="a"
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        variant={variant}
        color={color}
        size={size}
        disabled={disabled || loading}
        fullWidth={fullWidth}
        startIcon={startIcon}
        endIcon={endIcon}
        sx={buttonStyles}
        {...props}
      >
        {buttonContent}
      </MuiButton>
    );
  }

  // 通常のボタンの場合
  return (
    <MuiButton
      variant={variant}
      color={color}
      size={size}
      disabled={disabled || loading}
      fullWidth={fullWidth}
      startIcon={startIcon}
      endIcon={endIcon}
      onClick={onClick}
      sx={buttonStyles}
      {...props}
    >
      {buttonContent}
    </MuiButton>
  );
};

export default Button;