import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardMedia, Typography, Box, Chip, Button } from '@mui/material';
import { useTranslation } from 'react-i18next';
import useLanguage from '../../../hooks/useLanguage';

/**
 * ブログ記事カードコンポーネント
 * 
 * @param {Object} post - ブログ記事データ
 * @param {boolean} featured - 特集記事かどうか
 * @returns {JSX.Element}
 */
const PostCard = ({ post, featured = false }) => {
  const { t } = useTranslation('blog');
  const { currentLang } = useLanguage();
  
  // 日付のフォーマット
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat(currentLang === 'ja' ? 'ja-JP' : (currentLang === 'zh' ? 'zh-TW' : 'en-US'), {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).format(date);
  };
  
  return (
    <Card 
      sx={{ 
        height: '100%', 
        display: 'flex', 
        flexDirection: 'column',
        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
        '&:hover': {
          transform: 'translateY(-5px)',
          boxShadow: '0 10px 20px rgba(0,0,0,0.1)'
        },
        ...(featured && {
          border: '1px solid #d4af37'
        })
      }}
    >
      <CardMedia
        component="img"
        height={featured ? "240" : "180"}
        image={post.image || '/assets/images/blog/default-blog.jpg'}
        alt={post.title[currentLang]}
        sx={{ objectFit: 'cover' }}
      />
      
      <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
        <Box sx={{ mb: 1 }}>
          <Chip 
            label={post.category[currentLang]} 
            size="small" 
            sx={{ 
              backgroundColor: '#f0e6ba', 
              color: '#8a7200',
              fontWeight: 'medium',
              fontSize: '0.75rem'
            }} 
          />
        </Box>
        
        <Typography 
          variant={featured ? "h5" : "h6"} 
          component="h2" 
          gutterBottom
          sx={{ 
            fontWeight: 'bold',
            color: '#333',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            lineHeight: 1.2,
            height: featured ? '2.4em' : '2.4em'
          }}
        >
          {post.title[currentLang]}
        </Typography>
        
        <Typography 
          variant="body2" 
          color="text.secondary" 
          sx={{ 
            mb: 2,
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            display: '-webkit-box',
            WebkitLineClamp: 3,
            WebkitBoxOrient: 'vertical',
            flexGrow: 1
          }}
        >
          {post.excerpt ? post.excerpt[currentLang] : post.content[currentLang].substring(0, 120) + '...'}
        </Typography>
        
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 'auto' }}>
          <Typography variant="caption" color="text.secondary">
            {post.author && `${post.author[currentLang]} · `}{formatDate(post.date)}
          </Typography>
          
          <Button 
            component={Link}
            to={`/blog/${post.slug || post.id}`}
            size="small"
            sx={{ 
              color: '#d4af37',
              '&:hover': {
                backgroundColor: 'rgba(212, 175, 55, 0.1)'
              }
            }}
          >
            {t('readMore')}
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default PostCard;