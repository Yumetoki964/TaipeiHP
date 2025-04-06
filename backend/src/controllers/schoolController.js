/**
 * 校舎情報コントローラー
 * 校舎情報の取得・作成・更新・削除を処理するコントローラー
 */
const School = require('../models/School');
const { ApiError, notFoundError, serverError } = require('../utils/errorHandler');
const logger = require('../utils/logger');
const schoolService = require('../services/schoolService');

/**
 * 全校舎情報を取得する
 * @param {Object} req - Expressリクエストオブジェクト
 * @param {Object} res - Expressレスポンスオブジェクト
 * @param {Function} next - Express nextミドルウェア関数
 */
exports.getAllSchools = async (req, res, next) => {
  try {
    // クエリパラメータから取得
    const { active } = req.query;
    
    let schools;
    if (active === 'true') {
      // アクティブな校舎のみ取得
      schools = await schoolService.getActiveSchools();
    } else {
      // 全校舎を取得
      schools = await schoolService.getAllSchools();
    }
    
    logger.info(`校舎一覧が取得されました (${schools.length}件)`);
    
    res.status(200).json({
      success: true,
      message: {
        zh: '成功獲取所有校舍資料',
        ja: '全校舎情報の取得に成功しました',
        en: 'Successfully retrieved all schools'
      },
      count: schools.length,
      data: schools
    });
  } catch (error) {
    logger.error(`校舎一覧取得エラー: ${error.message}`);
    next(serverError(error));
  }
};

/**
 * 特定の校舎情報を取得する
 * @param {Object} req - Expressリクエストオブジェクト
 * @param {Object} res - Expressレスポンスオブジェクト
 * @param {Function} next - Express nextミドルウェア関数
 */
exports.getSchoolById = async (req, res, next) => {
  try {
    const { id } = req.params;
    
    const school = await schoolService.getSchoolById(id);
    
    if (!school) {
      return next(notFoundError('School'));
    }
    
    logger.info(`校舎情報が取得されました: ID ${id}`);
    
    res.status(200).json({
      success: true,
      message: {
        zh: '成功獲取校舍詳細資料',
        ja: '校舎詳細情報の取得に成功しました',
        en: 'Successfully retrieved school details'
      },
      data: school
    });
  } catch (error) {
    logger.error(`校舎情報取得エラー: ${error.message}`);
    next(serverError(error));
  }
};

/**
 * 新しい校舎を作成する（管理者用）
 * @param {Object} req - Expressリクエストオブジェクト
 * @param {Object} res - Expressレスポンスオブジェクト
 * @param {Function} next - Express nextミドルウェア関数
 */
exports.createSchool = async (req, res, next) => {
  try {
    const schoolData = req.body;
    
    const school = await schoolService.createSchool(schoolData);
    
    logger.info(`新しい校舎が作成されました: ID ${school._id}`);
    
    res.status(201).json({
      success: true,
      message: {
        zh: '成功創建新校舍',
        ja: '新しい校舎の作成に成功しました',
        en: 'Successfully created new school'
      },
      data: school
    });
  } catch (error) {
    logger.error(`校舎作成エラー: ${error.message}`);
    next(serverError(error));
  }
};

/**
 * 校舎情報を更新する（管理者用）
 * @param {Object} req - Expressリクエストオブジェクト
 * @param {Object} res - Expressレスポンスオブジェクト
 * @param {Function} next - Express nextミドルウェア関数
 */
exports.updateSchool = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updateData = req.body;
    
    const school = await schoolService.updateSchool(id, updateData);
    
    if (!school) {
      return next(notFoundError('School'));
    }
    
    logger.info(`校舎情報が更新されました: ID ${id}`);
    
    res.status(200).json({
      success: true,
      message: {
        zh: '成功更新校舍資料',
        ja: '校舎情報の更新に成功しました',
        en: 'Successfully updated school'
      },
      data: school
    });
  } catch (error) {
    logger.error(`校舎更新エラー: ${error.message}`);
    next(serverError(error));
  }
};

/**
 * 校舎を削除する（管理者用）
 * @param {Object} req - Expressリクエストオブジェクト
 * @param {Object} res - Expressレスポンスオブジェクト
 * @param {Function} next - Express nextミドルウェア関数
 */
exports.deleteSchool = async (req, res, next) => {
  try {
    const { id } = req.params;
    
    const result = await schoolService.deleteSchool(id);
    
    if (!result) {
      return next(notFoundError('School'));
    }
    
    logger.info(`校舎が削除されました: ID ${id}`);
    
    res.status(200).json({
      success: true,
      message: {
        zh: '成功刪除校舍',
        ja: '校舎の削除に成功しました',
        en: 'Successfully deleted school'
      }
    });
  } catch (error) {
    logger.error(`校舎削除エラー: ${error.message}`);
    next(serverError(error));
  }
};