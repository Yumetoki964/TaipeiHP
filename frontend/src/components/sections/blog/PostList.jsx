import React from 'react';
import { Grid, Typography, Box, Pagination, Container, CircularProgress } from '@mui/material';
import { useTranslation } from 'react-i18next';
import PostCard from './PostCard';

/**
 * ブログ記事一覧コンポーネント
 * 
 * @param {Array} posts - ブログ記事データの配列
 * @param {boolean} loading - ロード中かどうか
 * @param {number} page - 現在のページ番号
 * @param {number} totalPages - 総ページ数
 * @param {Function} onPageChange - ページ変更時のコールバック関数
 * @param {string} title - セクションタイトル（オプション）
 * @param {string} emptyMessage - 記事がない場合のメッセージ
 * @returns {JSX.Element}
 */
const PostList = ({ 
  posts = [], 
  loading = false, 
  page = 1, 
  totalPages = 1, 
  onPageChange,
  title = null,
  emptyMessage = null
}) => {
  const { t } = useTranslation('blog');
  
  // ロード中の場合
  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '300px' }}>
        <CircularProgress color="primary" />
      </Box>
    );
  }
  
  // 記事がない場合
  if (posts.length === 0) {
    return (
      <Box sx={{ py: 4, textAlign: 'center' }}>
        <Typography variant="body1" color="text.secondary">
          {emptyMessage || t('noPosts')}
        </Typography>
      </Box>
    );
  }
  
  return (
    <Container>
      {title && (
        <Typography 
          variant="h4" 
          component="h2" 
          gutterBottom 
          sx={{ 
            mb: 4, 
            fontWeight: 'bold',
            position: 'relative',
            '&:after': {
              content: '""',
              position: 'absolute',
              bottom: '-8px',
              left: 0,
              width: '50px',
              height: '3px',
              backgroundColor: '#d4af37'
            }
          }}
        >
          {title}
        </Typography>
      )}
      
      <Grid container spacing={3}>
        {/* 最初の記事を特集記事として表示（最初の記事がある場合のみ） */}
        {posts.length > 0 && (
          <Grid item xs={12} sx={{ mb: 2 }}>
            <PostCard post={posts[0]} featured={true} />
          </Grid>
        )}
        
        {/* 残りの記事を通常サイズで表示 */}
        {posts.slice(1).map((post, index) => (
          <Grid item xs={12} sm={6} md={4} key={post.id || index}>
            <PostCard post={post} />
          </Grid>
        ))}
      </Grid>
      
      {/* ページネーション（総ページ数が1以上の場合のみ表示） */}
      {totalPages > 1 && (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4, mb: 2 }}>
          <Pagination 
            count={totalPages} 
            page={page} 
            onChange={(e, newPage) => onPageChange(newPage)}
            color="primary"
            sx={{
              '& .MuiPaginationItem-root': {
                color: '#666'
              },
              '& .Mui-selected': {
                backgroundColor: '#d4af37',
                color: 'white',
                '&:hover': {
                  backgroundColor: '#b8860b'
                }
              }
            }}
          />
        </Box>
      )}
    </Container>
  );
};

export default PostList;