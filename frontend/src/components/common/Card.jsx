import React from 'react';
import { Card as MuiCard, CardContent, CardMedia, CardActions, Typography, Box } from '@mui/material';
import { Link } from 'react-router-dom';

/**
 * カスタマイズされたカードコンポーネント
 * アプリ全体で統一感のあるカードスタイルを提供します
 * 
 * @param {Object} props - コンポーネントのプロパティ
 * @param {string} [props.title] - カードのタイトル
 * @param {string} [props.subtitle] - カードのサブタイトル
 * @param {string} [props.imageUrl] - 画像URL
 * @param {string} [props.imageAlt] - 画像の代替テキスト
 * @param {number} [props.imageHeight=200] - 画像の高さ
 * @param {React.ReactNode} [props.content] - カードの本文コンテンツ
 * @param {React.ReactNode} [props.actions] - カードのアクション要素
 * @param {boolean} [props.elevation=1] - カードの影の強さ
 * @param {string} [props.to] - リンク先のパス（指定するとカード全体がリンクになります）
 * @param {string} [props.href] - 外部リンク先（指定するとカード全体が外部リンクになります）
 */
const Card = ({
  title,
  subtitle,
  imageUrl,
  imageAlt = '',
  imageHeight = 200,
  content,
  children,
  actions,
  elevation = 1,
  variant = 'elevation',
  to,
  href,
  sx = {},
  ...props
}) => {
  // カードの基本スタイル
  const cardStyles = {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    transition: 'transform 0.3s, box-shadow 0.3s',
    borderRadius: 2,
    overflow: 'hidden',
    ...(to || href ? {
      '&:hover': {
        transform: 'translateY(-4px)',
        boxShadow: 6,
      },
    } : {}),
    ...sx
  };

  // カードの内部コンテンツ
  const cardContent = (
    <>
      {imageUrl && (
        <CardMedia
          component="img"
          height={imageHeight}
          image={imageUrl}
          alt={imageAlt}
        />
      )}
      <CardContent sx={{ flexGrow: 1, p: 3 }}>
        {title && (
          <Typography variant="h5" component="h2" gutterBottom sx={{ fontWeight: 600 }}>
            {title}
          </Typography>
        )}
        {subtitle && (
          <Typography variant="subtitle1" color="text.secondary" sx={{ mb: 2 }}>
            {subtitle}
          </Typography>
        )}
        {content && (
          <Typography variant="body2">
            {content}
          </Typography>
        )}
        {children}
      </CardContent>
      {actions && (
        <CardActions sx={{ p: 2, pt: 0 }}>
          {actions}
        </CardActions>
      )}
    </>
  );

  // リンク機能がある場合
  if (to) {
    return (
      <Box
        component={Link}
        to={to}
        sx={{
          textDecoration: 'none',
          color: 'inherit',
          display: 'block',
          height: '100%'
        }}
      >
        <MuiCard elevation={elevation} variant={variant} sx={cardStyles} {...props}>
          {cardContent}
        </MuiCard>
      </Box>
    );
  }

  // 外部リンクの場合
  if (href) {
    return (
      <Box
        component="a"
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        sx={{
          textDecoration: 'none',
          color: 'inherit',
          display: 'block',
          height: '100%'
        }}
      >
        <MuiCard elevation={elevation} variant={variant} sx={cardStyles} {...props}>
          {cardContent}
        </MuiCard>
      </Box>
    );
  }

  // 通常のカードの場合
  return (
    <MuiCard elevation={elevation} variant={variant} sx={cardStyles} {...props}>
      {cardContent}
    </MuiCard>
  );
};

export default Card;