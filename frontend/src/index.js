import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import App from './App';
import reportWebVitals from './reportWebVitals';
import theme from './styles/theme';
import './i18n/index';

// グローバルCSSスタイルのインポート（作成される予定）
import './styles/GlobalStyles.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <HelmetProvider>
        <ThemeProvider theme={theme}>
          {/* CSSベースラインリセット */}
          <CssBaseline />
          <App />
        </ThemeProvider>
      </HelmetProvider>
    </BrowserRouter>
  </React.StrictMode>
);

// Webパフォーマンス計測
// 必要に応じてGoogle AnalyticsなどでパフォーマンスをGAに送信するように変更できます
// 例: reportWebVitals(console.log)
// または: reportWebVitals(sendToAnalytics)
reportWebVitals();