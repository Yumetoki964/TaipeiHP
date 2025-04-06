import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Box, CircularProgress } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { HelmetProvider } from 'react-helmet-async';

// テーマとスタイル
import theme from './styles/theme';
import './styles/GlobalStyles.css';

// コンテキストプロバイダー
import { LanguageProvider } from './contexts/LanguageContext';

// レイアウトコンポーネント
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';

// ページコンポーネント
const Home = React.lazy(() => import('./pages/Home'));
const About = React.lazy(() => import('./pages/About'));
const Courses = React.lazy(() => import('./pages/Courses'));
const CourseDetail = React.lazy(() => import('./pages/Courses/CourseDetail'));
const Schools = React.lazy(() => import('./pages/Schools'));
const SchoolDetail = React.lazy(() => import('./pages/Schools/SchoolDetail'));
const Teachers = React.lazy(() => import('./pages/Teachers'));
const TeacherDetail = React.lazy(() => import('./pages/Teachers/TeacherDetail'));
const Blog = React.lazy(() => import('./pages/Blog'));
const BlogPost = React.lazy(() => import('./pages/Blog/BlogPost'));
const Contact = React.lazy(() => import('./pages/Contact'));
// 未実装のページは一時的なコンポーネントを使用

// ローディングコンポーネント
const LoadingComponent = () => (
  <Box 
    sx={{ 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      minHeight: '100vh' 
    }}
  >
    <CircularProgress />
  </Box>
);

// 一時的なページコンポーネント
// 実際のページコンポーネントが作成されるまでの代替として使用
const TempPageComponent = ({ pageName }) => (
  <Box 
    sx={{ 
      py: 8,
      minHeight: '70vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center'
    }}
  >
    <h1>{pageName} Page</h1>
    <p>このページは現在開発中です。</p>
  </Box>
);

function App() {
  const { i18n } = useTranslation();
  const [isLoading, setIsLoading] = useState(true);

  // デフォルト言語の設定
  useEffect(() => {
    const defaultLanguage = process.env.REACT_APP_DEFAULT_LANGUAGE || 'zh';
    i18n.changeLanguage(defaultLanguage);
    
    // 初期ロード完了のシミュレーション
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, [i18n]);

  if (isLoading) {
    return <LoadingComponent />;
  }

  return (
    <HelmetProvider>
      <ThemeProvider theme={theme}>
        <LanguageProvider>
          <Header />
          <main>
            <React.Suspense fallback={<LoadingComponent />}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/courses" element={<Courses />} />
                <Route path="/courses/:courseId" element={<CourseDetail />} />
                <Route path="/schools" element={<Schools />} />
                <Route path="/schools/:schoolId" element={<SchoolDetail />} />
                <Route path="/teachers" element={<Teachers />} />
                <Route path="/teachers/:teacherId" element={<TeacherDetail />} />
                <Route path="/blog" element={<Blog />} />
                <Route path="/blog/:slug" element={<BlogPost />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="*" element={<TempPageComponent pageName="404 Not Found" />} />
              </Routes>
            </React.Suspense>
          </main>
          <Footer />
        </LanguageProvider>
      </ThemeProvider>
    </HelmetProvider>
  );
}

export default App;