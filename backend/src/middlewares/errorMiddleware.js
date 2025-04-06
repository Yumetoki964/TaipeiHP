/**
 * エラー処理ミドルウェア
 */
const { ApiError, serverError } = require('../utils/errorHandler');
const logger = require('../utils/logger');
const { validationResult } = require('express-validator');

/**
 * Express Validatorの検証エラーを処理するミドルウェア
 * @param {Object} req - Expressリクエストオブジェクト
 * @param {Object} res - Expressレスポンスオブジェクト
 * @param {Function} next - Express nextミドルウェア関数
 */
const validationMiddleware = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const errorMessages = errors.array().map(error => ({
      field: error.param,
      message: error.msg
    }));
    
    logger.warn(`バリデーションエラー: ${JSON.stringify(errorMessages)}`);
    
    return res.status(400).json({
      success: false,
      message: {
        zh: '輸入資料無效',
        ja: '入力データが無効です',
        en: 'Invalid input data'
      },
      errors: errorMessages
    });
  }
  next();
};

/**
 * グローバルエラーハンドラーミドルウェア
 * @param {Error} err - エラーオブジェクト
 * @param {Object} req - Expressリクエストオブジェクト
 * @param {Object} res - Expressレスポンスオブジェクト
 * @param {Function} next - Express nextミドルウェア関数
 */
const errorMiddleware = (err, req, res, next) => {
  // レスポンスがすでに送信されている場合は次へ
  if (res.headersSent) {
    return next(err);
  }

  let error = err;

  // MongoDBの固有のエラーハンドリング
  if (err.name === 'CastError') {
    error = new ApiError(
      'データが無効です',
      400,
      {
        zh: '無效的資料格式',
        ja: 'データ形式が無効です',
        en: 'Invalid data format'
      }
    );
  }

  // Mongooseのバリデーションエラー
  if (err.name === 'ValidationError') {
    error = new ApiError(
      'バリデーションエラー',
      400,
      {
        zh: '資料驗證失敗',
        ja: 'データ検証に失敗しました',
        en: 'Data validation failed'
      },
      Object.values(err.errors).map(e => e.message)
    );
  }

  // 重複キーエラー
  if (err.code === 11000) {
    error = new ApiError(
      'データが重複しています',
      400,
      {
        zh: '數據已存在',
        ja: 'データが既に存在します',
        en: 'Data already exists'
      }
    );
  }

  // トークンエラー
  if (err.name === 'JsonWebTokenError') {
    error = new ApiError(
      'トークンが無効です',
      401,
      {
        zh: '無效的令牌',
        ja: '無効なトークンです',
        en: 'Invalid token'
      }
    );
  }

  // トークン有効期限切れ
  if (err.name === 'TokenExpiredError') {
    error = new ApiError(
      'トークンの有効期限が切れています',
      401,
      {
        zh: '令牌已過期',
        ja: 'トークンの有効期限が切れています',
        en: 'Token has expired'
      }
    );
  }

  // カスタムAPIエラーでない場合はサーバーエラーとして扱う
  if (!(error instanceof ApiError)) {
    logger.error(`未処理のエラー: ${err.message}`, { stack: err.stack });
    error = serverError(err);
  }

  // 開発環境では詳細情報を含める
  const isDev = process.env.NODE_ENV !== 'production';
  const responseData = {
    success: false,
    message: error.multilangMessage || {
      zh: '發生錯誤',
      ja: 'エラーが発生しました',
      en: 'An error occurred'
    },
    ...(error.data && { errors: error.data }),
    ...(isDev && { 
      stack: error.stack,
      detail: error.message
    })
  };

  return res.status(error.statusCode || 500).json(responseData);
};

module.exports = {
  errorMiddleware,
  validationMiddleware
};