/**
 * CORS設定
 */
const logger = require('../utils/logger');

// 許可されたオリジンを環境変数から取得
const allowedOrigins = (process.env.CORS_ORIGIN || 'http://localhost:3000')
  .split(',')
  .map(origin => origin.trim());

// CORS設定オプション
const corsOptions = {
  origin: (origin, callback) => {
    // オリジンがない場合（POSTMANなど）、または許可リストにある場合はアクセスを許可
    if (!origin || allowedOrigins.includes(origin) || allowedOrigins.includes('*')) {
      callback(null, true);
    } else {
      logger.warn(`CORS制限: ${origin} からのリクエストはブロックされました`);
      callback(new Error('CORS policy不適合により拒否されました'), false);
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
  credentials: true,
  preflightContinue: false,
  optionsSuccessStatus: 204
};

module.exports = {
  corsOptions,
  allowedOrigins
};