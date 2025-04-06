// プロキシの設定
// React開発サーバーからバックエンドAPIへのリクエストをプロキシします
const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  // APIエンドポイントへのリクエストをバックエンドサーバーにプロキシ
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://localhost:5001',
      changeOrigin: true,
    })
  );

  // 翻訳ファイル管理用のエンドポイントもプロキシ
  app.use(
    '/locales/add',
    createProxyMiddleware({
      target: 'http://localhost:5001/api/v1',
      changeOrigin: true,
      pathRewrite: {
        '^/locales/add': '/locales/add', // パスをそのまま保持
      },
    })
  );
};