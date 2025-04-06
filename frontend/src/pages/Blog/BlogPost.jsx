import React, { useState, useEffect } from 'react';
import { 
  Container, 
  Typography, 
  Box, 
  Divider, 
  Chip, 
  Grid, 
  Card, 
  CardContent, 
  Button,
  Avatar,
  CircularProgress,
  Alert,
  Breadcrumbs,
  Link as MuiLink
} from '@mui/material';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import useLanguage from '../../hooks/useLanguage';
import SEO from '../../components/common/SEO';
import blogService from '../../services/blogService';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import PersonIcon from '@mui/icons-material/Person';
import ShareIcon from '@mui/icons-material/Share';
import PostCard from '../../components/sections/blog/PostCard';

/**
 * ブログ記事詳細ページコンポーネント
 */
const BlogPost = () => {
  const { slug } = useParams();
  const { t } = useTranslation(['blog', 'common']);
  const { currentLang } = useLanguage();
  const navigate = useNavigate();
  
  // 状態管理
  const [post, setPost] = useState(null);
  const [relatedPosts, setRelatedPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // 記事データの取得
  useEffect(() => {
    const fetchPostData = async () => {
      setLoading(true);
      
      try {
        // スラッグまたはIDで記事を取得
        let postData;
        if (isNaN(slug)) {
          postData = await blogService.getPostBySlug(slug);
        } else {
          postData = await blogService.getPostById(slug);
        }
        
        if (postData) {
          setPost(postData);
          setError(null);
          
          // 関連記事の取得（同じカテゴリーの記事）
          const category = postData.category[currentLang];
          const relatedData = await blogService.getPostsByCategory(category, 3);
          // 現在の記事を除外
          const filtered = relatedData.filter(p => p.id !== postData.id);
          setRelatedPosts(filtered.slice(0, 3));
        } else {
          setError(t('blog:postNotFound'));
          setPost(null);
        }
      } catch (err) {
        console.error('Error fetching post:', err);
        setError(t('blog:errorLoadingPost'));
        setPost(null);
      } finally {
        setLoading(false);
      }
    };
    
    fetchPostData();
  }, [slug, currentLang, t]);
  
  // 日付のフォーマット
  const formatDate = (dateString) => {
    if (!dateString) return '';
    
    const date = new Date(dateString);
    return new Intl.DateTimeFormat(currentLang === 'ja' ? 'ja-JP' : (currentLang === 'zh' ? 'zh-TW' : 'en-US'), {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).format(date);
  };
  
  // シェアハンドラー
  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: post?.title[currentLang],
        text: post?.excerpt ? post.excerpt[currentLang] : '',
        url: window.location.href
      }).catch((error) => console.error('Error sharing:', error));
    } else {
      // フォールバック：クリップボードにコピー
      navigator.clipboard.writeText(window.location.href)
        .then(() => alert(t('blog:linkCopied')))
        .catch(() => alert(t('blog:copyFailed')));
    }
  };
  
  // 戻るボタンハンドラー
  const handleGoBack = () => {
    navigate('/blog');
  };
  
  // ローディング表示
  if (loading) {
    return (
      <Container sx={{ py: 8, textAlign: 'center' }}>
        <CircularProgress color="primary" />
      </Container>
    );
  }
  
  // エラー表示
  if (error) {
    return (
      <Container sx={{ py: 8 }}>
        <Alert severity="error" sx={{ mb: 4 }}>
          {error}
        </Alert>
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={handleGoBack}
          sx={{ mt: 2 }}
        >
          {t('blog:backToList')}
        </Button>
      </Container>
    );
  }
  
  // 記事がない場合
  if (!post) {
    return (
      <Container sx={{ py: 8 }}>
        <Alert severity="info">
          {t('blog:postNotFound')}
        </Alert>
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={handleGoBack}
          sx={{ mt: 2 }}
        >
          {t('blog:backToList')}
        </Button>
      </Container>
    );
  }
  
  return (
    <>
      <SEO 
        title={`${post.title[currentLang]} | ${t('common:siteName')}`}
        description={post.excerpt ? post.excerpt[currentLang] : post.content[currentLang].substring(0, 150)}
        image={post.image}
      />
      
      {/* ヒーローセクション */}
      <Box
        sx={{
          position: 'relative',
          height: { xs: '250px', md: '400px' },
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(${post.image || '/assets/images/blog/default-blog.jpg'})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          mb: 6
        }}
      >
        <Container maxWidth="md">
          <Box sx={{ textAlign: 'center' }}>
            <Chip 
              label={post.category[currentLang]} 
              sx={{ 
                backgroundColor: '#d4af37', 
                color: 'white',
                fontWeight: 'bold',
                mb: 2
              }} 
            />
            
            <Typography 
              variant="h3" 
              component="h1" 
              sx={{ 
                fontWeight: 'bold',
                mb: 4,
                textShadow: '1px 1px 3px rgba(0,0,0,0.3)'
              }}
            >
              {post.title[currentLang]}
            </Typography>
            
            <Box sx={{ 
              display: 'flex', 
              justifyContent: 'center', 
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: 3
            }}>
              {post.author && (
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Avatar sx={{ width: 24, height: 24, mr: 1, backgroundColor: '#d4af37' }}>
                    <PersonIcon fontSize="small" />
                  </Avatar>
                  <Typography variant="body2">
                    {post.author[currentLang]}
                  </Typography>
                </Box>
              )}
              
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <CalendarTodayIcon fontSize="small" sx={{ mr: 1 }} />
                <Typography variant="body2">
                  {formatDate(post.date)}
                </Typography>
              </Box>
            </Box>
          </Box>
          
          {/* パンくずリスト */}
          <Breadcrumbs
            aria-label="breadcrumb"
            sx={{
              mt: 4,
              justifyContent: 'center',
              display: 'flex',
              color: 'rgba(255, 255, 255, 0.7)'
            }}
          >
            <MuiLink component={Link} to="/" sx={{ color: 'inherit' }}>
              {t('common:home')}
            </MuiLink>
            <MuiLink component={Link} to="/blog" sx={{ color: 'inherit' }}>
              {t('blog:breadcrumb')}
            </MuiLink>
            <Typography color="white">{post.title[currentLang]}</Typography>
          </Breadcrumbs>
        </Container>
      </Box>
      
      {/* 記事コンテンツ */}
      <Container maxWidth="md" sx={{ mb: 8 }}>
        <Grid container spacing={4}>
          <Grid item xs={12} md={8}>
            {/* 記事本文 */}
            <Box 
              sx={{ 
                typography: 'body1', 
                lineHeight: 1.8,
                '& p': { mb: 2 },
                '& h2': { mt: 4, mb: 2, fontWeight: 'bold' },
                '& h3': { mt: 3, mb: 2, fontWeight: 'bold' },
                '& ul, & ol': { mb: 2, pl: 4 },
                '& li': { mb: 1 },
                whiteSpace: 'pre-line'
              }}
            >
              {post.content[currentLang]}
            </Box>
            
            {/* シェアボタン */}
            <Box sx={{ mt: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Button
                startIcon={<ArrowBackIcon />}
                onClick={handleGoBack}
                sx={{ 
                  color: '#666',
                  '&:hover': {
                    backgroundColor: 'rgba(0, 0, 0, 0.05)'
                  }
                }}
              >
                {t('blog:backToList')}
              </Button>
              
              <Button
                startIcon={<ShareIcon />}
                onClick={handleShare}
                sx={{ 
                  color: '#d4af37',
                  '&:hover': {
                    backgroundColor: 'rgba(212, 175, 55, 0.1)'
                  }
                }}
              >
                {t('blog:share')}
              </Button>
            </Box>
          </Grid>
          
          {/* サイドバー */}
          <Grid item xs={12} md={4}>
            <Card sx={{ mb: 4, boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
              <CardContent>
                <Typography variant="h6" component="h2" gutterBottom sx={{ fontWeight: 'bold', color: '#333' }}>
                  {t('blog:category')}
                </Typography>
                <Divider sx={{ mb: 2 }} />
                <Chip 
                  label={post.category[currentLang]} 
                  sx={{ 
                    backgroundColor: '#f0e6ba', 
                    color: '#8a7200'
                  }} 
                  component={Link}
                  to={`/blog?category=${encodeURIComponent(post.category[currentLang])}`}
                  clickable
                />
                
                {post.tags && post.tags.length > 0 && (
                  <>
                    <Typography variant="h6" component="h2" gutterBottom sx={{ fontWeight: 'bold', color: '#333', mt: 4 }}>
                      {t('blog:tags')}
                    </Typography>
                    <Divider sx={{ mb: 2 }} />
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                      {post.tags.map((tag, index) => (
                        <Chip 
                          key={index}
                          label={tag} 
                          size="small"
                          sx={{ 
                            backgroundColor: '#f5f5f5',
                            '&:hover': {
                              backgroundColor: '#e0e0e0'
                            }
                          }} 
                          component={Link}
                          to={`/blog?search=${encodeURIComponent(tag)}`}
                          clickable
                        />
                      ))}
                    </Box>
                  </>
                )}
              </CardContent>
            </Card>
            
            {/* 関連記事 */}
            {relatedPosts.length > 0 && (
              <Box>
                <Typography variant="h6" component="h2" gutterBottom sx={{ fontWeight: 'bold', color: '#333' }}>
                  {t('blog:relatedPosts')}
                </Typography>
                <Divider sx={{ mb: 3 }} />
                
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  {relatedPosts.map((relatedPost) => (
                    <Card 
                      key={relatedPost.id}
                      component={Link}
                      to={`/blog/${relatedPost.slug || relatedPost.id}`}
                      sx={{ 
                        display: 'flex',
                        textDecoration: 'none',
                        mb: 2,
                        transition: 'transform 0.3s ease',
                        '&:hover': {
                          transform: 'translateY(-3px)'
                        }
                      }}
                    >
                      <Box 
                        sx={{ 
                          width: 100, 
                          height: 80, 
                          backgroundImage: `url(${relatedPost.image || '/assets/images/blog/default-blog.jpg'})`,
                          backgroundSize: 'cover',
                          backgroundPosition: 'center'
                        }} 
                      />
                      <CardContent sx={{ flex: 1, p: 2 }}>
                        <Typography 
                          variant="subtitle2" 
                          component="h3"
                          sx={{ 
                            fontWeight: 'medium',
                            color: '#333',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            display: '-webkit-box',
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: 'vertical'
                          }}
                        >
                          {relatedPost.title[currentLang]}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {formatDate(relatedPost.date)}
                        </Typography>
                      </CardContent>
                    </Card>
                  ))}
                </Box>
                
                <Button
                  component={Link}
                  to="/blog"
                  fullWidth
                  variant="outlined"
                  sx={{ 
                    mt: 2,
                    borderColor: '#d4af37',
                    color: '#d4af37',
                    '&:hover': {
                      borderColor: '#b8860b',
                      backgroundColor: 'rgba(212, 175, 55, 0.1)'
                    }
                  }}
                >
                  {t('blog:viewAllPosts')}
                </Button>
              </Box>
            )}
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default BlogPost;