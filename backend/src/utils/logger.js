/**
 * ロギングユーティリティ
 * Winstonを使用してログレベルと形式を設定します
 */
const { createLogger, format, transports } = require('winston');
const path = require('path');
const fs = require('fs');

// ログディレクトリが存在しない場合は作成
const logDir = 'logs';
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir);
}

// 環境設定
const isProd = process.env.NODE_ENV === 'production';
const logLevel = process.env.LOG_LEVEL || (isProd ? 'info' : 'debug');

// ログ形式の設定
const customFormat = format.combine(
  format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
  format.errors({ stack: true }),
  format.printf(info => {
    const { timestamp, level, message, ...rest } = info;
    const restString = Object.keys(rest).length ? JSON.stringify(rest, null, 2) : '';
    
    return `[${timestamp}] ${level.toUpperCase()}: ${message} ${restString}`;
  })
);

// ロガーの作成
const logger = createLogger({
  level: logLevel,
  format: customFormat,
  defaultMeta: { service: 'backend-api' },
  transports: [
    // コンソール出力 (開発環境はカラフルに、本番環境ではシンプルに)
    new transports.Console({
      format: isProd
        ? customFormat
        : format.combine(
            format.colorize(),
            customFormat
          )
    }),
    
    // 情報ログはファイルに出力
    new transports.File({
      filename: path.join(logDir, 'combined.log'),
      level: 'info'
    }),
    
    // エラーログは別ファイルに出力
    new transports.File({
      filename: path.join(logDir, 'error.log'),
      level: 'error'
    })
  ]
});

// 開発環境では詳細なログを出力
if (!isProd) {
  logger.debug('ロガー初期化: 詳細なログモード');
}

module.exports = logger;