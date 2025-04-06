import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Link as RouterLink } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Button,
  CircularProgress,
} from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import newsService from '../../../services/newsService';

/**
 * ニュースセクションコンポーネント
 * 最新のお知らせやニュース記事を表示
 */
const News = () => {
  const { t, i18n } = useTranslation(['home', 'common']);
  const currentLang = i18n.language?.split('-')[0] || 'zh';
  const [newsData, setNewsData] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // APIから最新のニュースを取得
  useEffect(() => {
    const fetchNews = async () => {
      try {
        setLoading(true);
        const news = await newsService.getLatestNews(3);
        setNewsData(news);
      } catch (error) {
        console.error('Failed to fetch news:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchNews();
  }, []);

  // 日付フォーマットのロケール設定
  const dateLocale = {
    zh: 'zh-TW',
    ja: 'ja-JP',
    en: 'en-US',
  }[currentLang] || 'zh-TW';

  return (
    <Box sx={{ py: 8 }}>
      <Container maxWidth="lg">
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
          <Typography
            variant="h4"
            component="h2"
            sx={{ fontWeight: 'bold' }}
          >
            {t('home:news.title')}
          </Typography>
          
          <Button
            component={RouterLink}
            to="/blog"
            variant="text"
            endIcon={<ArrowForwardIcon />}
            sx={{ color: (theme) => theme.palette.primary.main }}
          >
            {t('home:news.more')}
          </Button>
        </Box>
        
        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
            <CircularProgress />
          </Box>
        ) : (
          <Grid container spacing={4}>
            {newsData.map((news) => (
              <Grid item xs={12} sm={6} md={4} key={news.id}>
                <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                  <CardMedia
                    component="img"
                    height="140"
                    image={news.image}
                    alt={news.title[currentLang]}
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography variant="body2" color="text.secondary" gutterBottom>
                      {new Date(news.date).toLocaleDateString(dateLocale)}
                    </Typography>
                    <Typography
                      variant="h6"
                      component="h3"
                      sx={{
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        lineHeight: 1.3,
                        height: '2.6em',
                      }}
                    >
                      {news.title[currentLang]}
                    </Typography>
                    <Button
                      component={RouterLink}
                      to={`/blog/${news.slug}`}
                      variant="text"
                      size="small"
                      sx={{ mt: 1, color: (theme) => theme.palette.primary.main }}
                    >
                      {t('common:readMore')}
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
      </Container>
    </Box>
  );
};

export default News;
