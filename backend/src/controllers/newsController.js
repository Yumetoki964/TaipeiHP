/**
 * ニュース情報コントローラー
 * ニュース情報の取得・作成・更新・削除を処理するコントローラー
 */
const News = require('../models/News');
const { ApiError, notFoundError, serverError } = require('../utils/errorHandler');
const logger = require('../utils/logger');
const newsService = require('../services/newsService');

/**
 * 全ニュース情報を取得する
 * @param {Object} req - Expressリクエストオブジェクト
 * @param {Object} res - Expressレスポンスオブジェクト
 * @param {Function} next - Express nextミドルウェア関数
 */
exports.getAllNews = async (req, res, next) => {
  try {
    // クエリパラメータから取得
    const { published, highlighted, limit } = req.query;
    const parsedLimit = limit ? parseInt(limit, 10) : undefined;
    
    let news;
    if (highlighted === 'true') {
      // ハイライトされたニュースのみ取得
      news = await newsService.getHighlightedNews(parsedLimit);
    } else if (published === 'true') {
      // 公開中のニュースのみ取得
      news = await newsService.getPublishedNews(parsedLimit);
    } else {
      // 全ニュースを取得
      news = await newsService.getAllNews(parsedLimit);
    }
    
    logger.info(`ニュース一覧が取得されました (${news.length}件)`);
    
    res.status(200).json({
      success: true,
      message: {
        zh: '成功獲取所有新聞資料',
        ja: '全ニュース情報の取得に成功しました',
        en: 'Successfully retrieved all news'
      },
      count: news.length,
      data: news
    });
  } catch (error) {
    logger.error(`ニュース一覧取得エラー: ${error.message}`);
    next(serverError(error));
  }
};

/**
 * 特定のニュース情報を取得する
 * @param {Object} req - Expressリクエストオブジェクト
 * @param {Object} res - Expressレスポンスオブジェクト
 * @param {Function} next - Express nextミドルウェア関数
 */
exports.getNewsById = async (req, res, next) => {
  try {
    const { id } = req.params;
    
    const news = await newsService.getNewsById(id);
    
    if (!news) {
      return next(notFoundError('News'));
    }
    
    logger.info(`ニュース情報が取得されました: ID ${id}`);
    
    res.status(200).json({
      success: true,
      message: {
        zh: '成功獲取新聞詳細資料',
        ja: 'ニュース詳細情報の取得に成功しました',
        en: 'Successfully retrieved news details'
      },
      data: news
    });
  } catch (error) {
    logger.error(`ニュース情報取得エラー: ${error.message}`);
    next(serverError(error));
  }
};

/**
 * ニュースをスラッグで取得する
 * @param {Object} req - Expressリクエストオブジェクト
 * @param {Object} res - Expressレスポンスオブジェクト
 * @param {Function} next - Express nextミドルウェア関数
 */
exports.getNewsBySlug = async (req, res, next) => {
  try {
    const { slug } = req.params;
    
    const news = await newsService.getNewsBySlug(slug);
    
    if (!news) {
      return next(notFoundError('News'));
    }
    
    logger.info(`ニュース情報がスラッグで取得されました: ${slug}`);
    
    res.status(200).json({
      success: true,
      message: {
        zh: '成功獲取新聞詳細資料',
        ja: 'ニュース詳細情報の取得に成功しました',
        en: 'Successfully retrieved news details'
      },
      data: news
    });
  } catch (error) {
    logger.error(`ニュース情報取得エラー: ${error.message}`);
    next(serverError(error));
  }
};

/**
 * 新しいニュースを作成する（管理者用）
 * @param {Object} req - Expressリクエストオブジェクト
 * @param {Object} res - Expressレスポンスオブジェクト
 * @param {Function} next - Express nextミドルウェア関数
 */
exports.createNews = async (req, res, next) => {
  try {
    const newsData = req.body;
    
    const news = await newsService.createNews(newsData);
    
    logger.info(`新しいニュースが作成されました: ID ${news._id}`);
    
    res.status(201).json({
      success: true,
      message: {
        zh: '成功創建新新聞',
        ja: '新しいニュースの作成に成功しました',
        en: 'Successfully created new news'
      },
      data: news
    });
  } catch (error) {
    logger.error(`ニュース作成エラー: ${error.message}`);
    next(serverError(error));
  }
};

/**
 * ニュース情報を更新する（管理者用）
 * @param {Object} req - Expressリクエストオブジェクト
 * @param {Object} res - Expressレスポンスオブジェクト
 * @param {Function} next - Express nextミドルウェア関数
 */
exports.updateNews = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updateData = req.body;
    
    const news = await newsService.updateNews(id, updateData);
    
    if (!news) {
      return next(notFoundError('News'));
    }
    
    logger.info(`ニュース情報が更新されました: ID ${id}`);
    
    res.status(200).json({
      success: true,
      message: {
        zh: '成功更新新聞資料',
        ja: 'ニュース情報の更新に成功しました',
        en: 'Successfully updated news'
      },
      data: news
    });
  } catch (error) {
    logger.error(`ニュース更新エラー: ${error.message}`);
    next(serverError(error));
  }
};

/**
 * ニュースを削除する（管理者用）
 * @param {Object} req - Expressリクエストオブジェクト
 * @param {Object} res - Expressレスポンスオブジェクト
 * @param {Function} next - Express nextミドルウェア関数
 */
exports.deleteNews = async (req, res, next) => {
  try {
    const { id } = req.params;
    
    const result = await newsService.deleteNews(id);
    
    if (!result) {
      return next(notFoundError('News'));
    }
    
    logger.info(`ニュースが削除されました: ID ${id}`);
    
    res.status(200).json({
      success: true,
      message: {
        zh: '成功刪除新聞',
        ja: 'ニュースの削除に成功しました',
        en: 'Successfully deleted news'
      }
    });
  } catch (error) {
    logger.error(`ニュース削除エラー: ${error.message}`);
    next(serverError(error));
  }
};