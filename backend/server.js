/**
 * BlueLamp HP バックエンドサーバー
 * 夢時商業股份有限公司のウェブサイト用APIサーバー
 */

// 環境変数の読み込み
require('dotenv').config({
  path: `.env.${process.env.NODE_ENV || 'development'}`
});

const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');
const morgan = require('morgan');
const mongoose = require('mongoose');
const { createServer } = require('http');
const logger = require('./src/utils/logger');
const { errorMiddleware } = require('./src/middlewares/errorMiddleware');

// 設定の読み込み
const { corsOptions } = require('./src/config/cors');
const { connectDatabase } = require('./src/config/database');

// ルート定義の読み込み
const routes = require('./src/routes');

// バージョン表示
logger.info(`API Version: ${process.env.API_VERSION || 'v1'}`);
logger.info(`Environment: ${process.env.NODE_ENV || 'development'}`);

// Expressアプリケーションの初期化
const app = express();
const httpServer = createServer(app);

// ミドルウェアの設定
app.use(helmet()); // セキュリティヘッダー設定
app.use(cors(corsOptions)); // CORS設定
app.use(compression()); // レスポンス圧縮
app.use(express.json({ limit: '10mb' })); // JSONボディ解析
app.use(express.urlencoded({ extended: true, limit: '10mb' })); // URLエンコードボディ解析
app.use(morgan('combined', { stream: { write: message => logger.info(message.trim()) } })); // リクエストログ

// APIルートのマウント
app.use(`/api/${process.env.API_VERSION || 'v1'}`, routes);

// ヘルスチェックエンドポイント
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'ok',
    timestamp: new Date(),
    environment: process.env.NODE_ENV || 'development'
  });
});

// 404ハンドラー
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: {
      zh: '找不到請求的資源',
      ja: 'リクエストされたリソースが見つかりません',
      en: 'The requested resource was not found'
    }
  });
});

// エラーハンドラーミドルウェア
app.use(errorMiddleware);

// データベース接続
connectDatabase()
  .then(() => {
    // サーバー起動
    const PORT = process.env.PORT || 5000;
    httpServer.listen(PORT, () => {
      logger.info(`サーバーが起動しました - ポート ${PORT}`);
    });
  })
  .catch(err => {
    logger.error('データベース接続エラー:', err);
    process.exit(1);
  });

// 未処理の例外ハンドラー
process.on('uncaughtException', err => {
  logger.error('未処理の例外が発生しました:', err);
  process.exit(1);
});

// 未処理のPromise拒否ハンドラー
process.on('unhandledRejection', (reason, promise) => {
  logger.error('未処理のPromise拒否が発生しました:', reason);
});

// 正常なシャットダウンの処理
process.on('SIGTERM', () => {
  logger.info('SIGTERMを受信しました。グレースフルシャットダウンを開始します...');
  httpServer.close(() => {
    logger.info('HTTPサーバーが閉じられました');
    mongoose.connection.close(false, () => {
      logger.info('MongoDBコネクションが閉じられました');
      process.exit(0);
    });
  });
});