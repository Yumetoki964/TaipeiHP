/**
 * BlueLamp HP バックエンドサーバー
 * 夢時商業股份有限公司のウェブサイト用APIサーバー
 */

// 環境変数の読み込み
const path = require('path');
const fs = require('fs');

// 絶対パスで.envファイルを指定
const envPath = path.resolve(__dirname, '.env');
console.log(`🔍 .envファイルパス: ${envPath}`);
require('dotenv').config({ path: envPath });

// 環境固有の設定があれば上書き
const envDevPath = path.resolve(__dirname, `.env.${process.env.NODE_ENV || 'development'}`);
console.log(`🔍 環境固有ファイルパス: ${envDevPath}`);
if (fs.existsSync(envDevPath)) {
  require('dotenv').config({
    path: envDevPath,
    override: true
  });
}

// 環境変数の読み込み確認
if (fs.existsSync(envPath)) {
  console.log('✅ .envファイルが存在します。');
} else {
  console.log('⚠️ .envファイルが見つかりません！');
}

if (fs.existsSync(envDevPath)) {
  console.log(`✅ 環境固有の.envファイルが存在します。`);
} else {
  console.log(`ℹ️ 環境固有の.envファイルは存在しません。`);
}

// 重要な環境変数のデバッグログ（セキュリティに注意して部分表示）
const debugEnv = {
  NODE_ENV: process.env.NODE_ENV,
  PORT: process.env.PORT,
  MONGODB_URI: process.env.MONGODB_URI 
    ? `${process.env.MONGODB_URI.substring(0, 10)}...` 
    : undefined,
  DB_NAME: process.env.DB_NAME,
  API_VERSION: process.env.API_VERSION
};
console.log('📊 環境変数:', debugEnv);

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

// サーバー起動関数
const startServer = () => {
  // 環境変数PORTを整数に変換して確認
  const envPort = process.env.PORT;
  console.log(`🔧 環境変数PORT: "${envPort}", タイプ: ${typeof envPort}`);
  
  // 明示的に整数変換して5001をデフォルトに
  const PORT = envPort ? parseInt(envPort, 10) : 5001;
  console.log(`🚪 使用するポート: ${PORT}`);
  
  logger.info(`ポート ${PORT} でサーバーを起動します...`);
  httpServer.listen(PORT, () => {
    logger.info(`サーバーが起動しました - ポート ${PORT}`);
  });
};

// データベースへの接続処理
connectDatabase()
  .then(() => {
    startServer();
  })
  .catch(err => {
    if (process.env.NODE_ENV === 'development') {
      // 開発環境では接続エラーでもサーバーを起動
      logger.warn('開発環境: データベース接続エラーを無視して続行します');
      startServer(); 
    } else {
      // 本番環境では、データベース接続は必須
      logger.error('データベース接続エラー:', err);
      process.exit(1);
    }
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