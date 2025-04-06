/**
 * エラーハンドリングユーティリティ
 * カスタムエラークラスと共通エラーメソッドを提供
 */
const logger = require('./logger');

/**
 * カスタムAPIエラークラス
 * @extends Error
 */
class ApiError extends Error {
  /**
   * @param {string} message - エラーメッセージ
   * @param {number} statusCode - HTTPステータスコード
   * @param {Object} multilangMessage - 多言語エラーメッセージ
   * @param {Object} data - 追加のエラーデータ
   */
  constructor(message, statusCode = 500, multilangMessage = null, data = null) {
    super(message);
    this.statusCode = statusCode;
    this.multilangMessage = multilangMessage || {
      zh: '發生錯誤',
      ja: 'エラーが発生しました',
      en: 'An error occurred'
    };
    this.data = data;
    this.isOperational = true; // 操作上のエラー（予期されるエラー）かどうか

    // プロトタイプチェーンの維持
    Error.captureStackTrace(this, this.constructor);
  }
}

/**
 * 404 Not Found エラーを生成
 * @param {string} resource - 見つからないリソースの名前
 * @returns {ApiError} 404エラーオブジェクト
 */
const notFoundError = (resource = 'resource') => {
  return new ApiError(
    `${resource} not found`,
    404,
    {
      zh: `找不到${resource}`,
      ja: `${resource}が見つかりません`,
      en: `The requested ${resource} was not found`
    }
  );
};

/**
 * 400 Bad Request エラーを生成
 * @param {string} message - エラーメッセージ
 * @param {Object} data - 追加のエラーデータ
 * @returns {ApiError} 400エラーオブジェクト
 */
const badRequestError = (message = 'Invalid request', data = null) => {
  return new ApiError(
    message,
    400,
    {
      zh: '無效的請求',
      ja: '無効なリクエストです',
      en: 'Invalid request'
    },
    data
  );
};

/**
 * 401 Unauthorized エラーを生成
 * @returns {ApiError} 401エラーオブジェクト
 */
const unauthorizedError = () => {
  return new ApiError(
    'Unauthorized access',
    401,
    {
      zh: '未經授權的訪問',
      ja: '認証されていません',
      en: 'Unauthorized access'
    }
  );
};

/**
 * 403 Forbidden エラーを生成
 * @returns {ApiError} 403エラーオブジェクト
 */
const forbiddenError = () => {
  return new ApiError(
    'Access forbidden',
    403,
    {
      zh: '禁止訪問',
      ja: 'アクセスが禁止されています',
      en: 'Access forbidden'
    }
  );
};

/**
 * 500 Internal Server Error を生成
 * @param {Error} originalError - 元のエラーオブジェクト
 * @returns {ApiError} 500エラーオブジェクト
 */
const serverError = (originalError) => {
  // エラーをログに記録
  logger.error(`サーバーエラー: ${originalError.message}`, { 
    stack: originalError.stack 
  });
  
  return new ApiError(
    'Internal server error',
    500,
    {
      zh: '伺服器內部錯誤',
      ja: 'サーバー内部エラーが発生しました',
      en: 'Internal server error occurred'
    }
  );
};

module.exports = {
  ApiError,
  notFoundError,
  badRequestError,
  unauthorizedError,
  forbiddenError,
  serverError
};