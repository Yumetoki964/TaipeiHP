// プロキシの設定
// React開発サーバーからバックエンドAPIへのリクエストをプロキシします
const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  // 統合プロキシの設定
  // APIとlocales/addの両方に対応
  const apiProxy = createProxyMiddleware(['/api', '/locales/add'], {
    target: 'http://localhost:5001',
    changeOrigin: true,
    pathRewrite: function(path, req) {
      if (path.startsWith('/locales/add')) {
        // /locales/add/en/common -> /api/v1/locales/add/en/common
        return path.replace('/locales/add', '/api/v1/locales/add');
      }
      return path;
    },
    onProxyReq: function(proxyReq, req, res) {
      console.log('プロキシリクエスト:', req.method, req.path, '->',
                  proxyReq.method, proxyReq.path);
    },
    onError: function(err, req, res) {
      console.error('プロキシエラー:', err);
    }
  });

  app.use(apiProxy);
};