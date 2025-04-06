import React, { useState, useEffect } from 'react';
import { Container, Grid, Typography, Box, Alert, Breadcrumbs, Link as MuiLink } from '@mui/material';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import useLanguage from '../../hooks/useLanguage';
import PostList from '../../components/sections/blog/PostList';
import Categories from '../../components/sections/blog/Categories';
import SearchBar from '../../components/sections/blog/SearchBar';
import SEO from '../../components/common/SEO';
import blogService from '../../services/blogService';

/**
 * ブログ一覧ページコンポーネント
 */
const BlogPage = () => {
  const { t } = useTranslation(['blog', 'common']);
  const { currentLang } = useLanguage();
  const location = useLocation();
  const navigate = useNavigate();
  
  // 状態管理
  const [posts, setPosts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const postsPerPage = 6;
  
  // URLからクエリパラメータを取得
  const searchParams = new URLSearchParams(location.search);
  const categoryParam = searchParams.get('category');
  const searchParam = searchParams.get('search');
  const pageParam = searchParams.get('page');
  
  // 初期ロード時にページ番号を設定
  useEffect(() => {
    if (pageParam) {
      setPage(parseInt(pageParam, 10));
    } else {
      setPage(1);
    }
  }, [pageParam]);
  
  // カテゴリー情報の取得
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const categoriesData = await blogService.getAllCategories();
        setCategories(categoriesData);
      } catch (err) {
        console.error('Error fetching categories:', err);
        setError(t('blog:errorCategories'));
      }
    };
    
    fetchCategories();
  }, [t]);
  
  // 記事の取得（カテゴリー、検索キーワード、ページ変更時に再取得）
  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      
      try {
        let postsData;
        
        if (searchParam) {
          // 検索キーワードがある場合
          postsData = await blogService.searchPosts(searchParam);
        } else if (categoryParam) {
          // カテゴリー指定がある場合
          postsData = await blogService.getPostsByCategory(categoryParam);
        } else {
          // すべての記事を取得
          postsData = await blogService.getLatestPosts(999); // 全件取得してクライアント側でページング
        }
        
        setPosts(postsData);
        setTotalPages(Math.ceil(postsData.length / postsPerPage));
        setError(null);
      } catch (err) {
        console.error('Error fetching posts:', err);
        setError(t('blog:errorPosts'));
        setPosts([]);
      } finally {
        setLoading(false);
      }
    };
    
    fetchPosts();
  }, [categoryParam, searchParam, t]);
  
  // ページ変更ハンドラー
  const handlePageChange = (newPage) => {
    setPage(newPage);
    
    // URLのクエリパラメータを更新
    const searchParams = new URLSearchParams(location.search);
    searchParams.set('page', newPage);
    navigate(`${location.pathname}?${searchParams.toString()}`);
    
    // ページトップにスクロール
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
  // 検索ハンドラー
  const handleSearch = (keyword) => {
    const searchParams = new URLSearchParams(location.search);
    
    if (keyword) {
      searchParams.set('search', keyword);
    } else {
      searchParams.delete('search');
    }
    
    // カテゴリー検索と検索キーワードは排他的
    searchParams.delete('category');
    searchParams.delete('page');
    
    navigate(`/blog?${searchParams.toString()}`);
  };
  
  // カテゴリー選択ハンドラー
  const handleCategorySelect = (category) => {
    const searchParams = new URLSearchParams(location.search);
    
    if (category) {
      searchParams.set('category', category);
    } else {
      searchParams.delete('category');
    }
    
    // カテゴリー検索と検索キーワードは排他的
    searchParams.delete('search');
    searchParams.delete('page');
    
    navigate(`/blog?${searchParams.toString()}`);
  };
  
  // 現在のページの記事のみを表示
  const displayedPosts = posts.slice((page - 1) * postsPerPage, page * postsPerPage);
  
  // ページタイトルの決定
  let pageTitle = t('blog:title');
  if (searchParam) {
    pageTitle = t('blog:searchResults', { keyword: searchParam });
  } else if (categoryParam) {
    pageTitle = categoryParam;
  }
  
  return (
    <>
      <SEO 
        title={`${pageTitle} | ${t('common:siteName')}`}
        description={t('blog:description')}
      />
      
      {/* ヘッダーセクション */}
      <Box
        sx={{
          bgcolor: '#1a1a1a',
          color: 'white',
          py: { xs: 4, md: 6 },
          mb: 5
        }}
      >
        <Container maxWidth="lg">
          <Typography
            variant="h3"
            component="h1"
            sx={{
              textAlign: 'center',
              fontWeight: 'bold',
              color: '#d4af37'
            }}
          >
            {pageTitle}
          </Typography>
          
          {searchParam && (
            <Typography
              variant="h6"
              sx={{ textAlign: 'center', mt: 2 }}
            >
              {t('blog:searchResultsCount', { count: posts.length })}
            </Typography>
          )}
          
          {/* パンくずリスト */}
          <Breadcrumbs
            aria-label="breadcrumb"
            sx={{
              mt: 2,
              justifyContent: 'center',
              display: 'flex',
              color: 'rgba(255, 255, 255, 0.7)'
            }}
          >
            <MuiLink component={Link} to="/" sx={{ color: 'inherit' }}>
              {t('common:home')}
            </MuiLink>
            <Typography color="white">{t('blog:breadcrumb')}</Typography>
            {(categoryParam || searchParam) && (
              <Typography color="white">
                {categoryParam || (searchParam && t('blog:search'))}
              </Typography>
            )}
          </Breadcrumbs>
        </Container>
      </Box>
      
      {/* メインコンテンツ */}
      <Container maxWidth="lg" sx={{ mb: 8 }}>
        <Grid container spacing={4}>
          {/* サイドバー */}
          <Grid item xs={12} md={3}>
            <SearchBar 
              initialValue={searchParam || ''} 
              onSearch={handleSearch} 
            />
            
            <Categories
              categories={categories}
              activeCategory={categoryParam}
              onSelectCategory={handleCategorySelect}
            />
          </Grid>
          
          {/* メインコンテンツ */}
          <Grid item xs={12} md={9}>
            {error && (
              <Alert severity="error" sx={{ mb: 4 }}>
                {error}
              </Alert>
            )}
            
            <PostList
              posts={displayedPosts}
              loading={loading}
              page={page}
              totalPages={totalPages}
              onPageChange={handlePageChange}
              title={searchParam ? null : (categoryParam || null)}
              emptyMessage={
                searchParam 
                  ? t('blog:noSearchResults', { keyword: searchParam }) 
                  : categoryParam 
                    ? t('blog:noCategoryResults', { category: categoryParam }) 
                    : t('blog:noPosts')
              }
            />
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default BlogPage;