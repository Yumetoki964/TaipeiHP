/**
 * 認証ミドルウェア
 */
const jwt = require('jsonwebtoken');
const { ApiError, unauthorizedError } = require('../utils/errorHandler');
const logger = require('../utils/logger');

/**
 * JWT認証を検証するミドルウェア
 * @param {Object} req - Expressリクエストオブジェクト
 * @param {Object} res - Expressレスポンスオブジェクト
 * @param {Function} next - Express nextミドルウェア関数
 */
const authenticate = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return next(new ApiError(
        'トークンが提供されていません',
        401,
        {
          zh: '未提供令牌',
          ja: 'トークンが提供されていません',
          en: 'No token provided'
        }
      ));
    }
    
    const token = authHeader.split(' ')[1];
    
    if (!token) {
      return next(unauthorizedError());
    }
    
    // トークンの検証
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        logger.warn(`トークン検証エラー: ${err.message}`);
        
        if (err.name === 'TokenExpiredError') {
          return next(new ApiError(
            'トークンの有効期限が切れています',
            401,
            {
              zh: '令牌已過期',
              ja: 'トークンの有効期限が切れています',
              en: 'Token has expired'
            }
          ));
        }
        
        return next(unauthorizedError());
      }
      
      // デコードされたユーザー情報をリクエストに追加
      req.user = decoded;
      next();
    });
  } catch (error) {
    logger.error(`認証ミドルウェアエラー: ${error.message}`);
    next(unauthorizedError());
  }
};

/**
 * 管理者権限を確認するミドルウェア
 * authenticate ミドルウェアの後に使用する必要があります
 * @param {Object} req - Expressリクエストオブジェクト
 * @param {Object} res - Expressレスポンスオブジェクト
 * @param {Function} next - Express nextミドルウェア関数
 */
const isAdmin = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    next();
  } else {
    next(new ApiError(
      '管理者権限が必要です',
      403,
      {
        zh: '需要管理員權限',
        ja: '管理者権限が必要です',
        en: 'Admin privileges required'
      }
    ));
  }
};

module.exports = {
  authenticate,
  isAdmin
};