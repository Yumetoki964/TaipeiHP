/**
 * コース情報コントローラー
 * コース情報の取得・作成・更新・削除を処理するコントローラー
 */
const Course = require('../models/Course');
const { ApiError, notFoundError, serverError } = require('../utils/errorHandler');
const logger = require('../utils/logger');
const courseService = require('../services/courseService');

/**
 * 全コース情報を取得する
 * @param {Object} req - Expressリクエストオブジェクト
 * @param {Object} res - Expressレスポンスオブジェクト
 * @param {Function} next - Express nextミドルウェア関数
 */
exports.getAllCourses = async (req, res, next) => {
  try {
    // クエリパラメータから取得
    const { active, category } = req.query;
    
    let courses;
    if (category) {
      // カテゴリ別コース取得
      courses = await courseService.getCoursesByCategory(category);
    } else if (active === 'true') {
      // アクティブなコースのみ取得
      courses = await courseService.getActiveCourses();
    } else {
      // 全コースを取得
      courses = await courseService.getAllCourses();
    }
    
    logger.info(`コース一覧が取得されました (${courses.length}件)`);
    
    res.status(200).json({
      success: true,
      message: {
        zh: '成功獲取所有課程資料',
        ja: '全コース情報の取得に成功しました',
        en: 'Successfully retrieved all courses'
      },
      count: courses.length,
      data: courses
    });
  } catch (error) {
    logger.error(`コース一覧取得エラー: ${error.message}`);
    next(serverError(error));
  }
};

/**
 * 特定のコース情報を取得する
 * @param {Object} req - Expressリクエストオブジェクト
 * @param {Object} res - Expressレスポンスオブジェクト
 * @param {Function} next - Express nextミドルウェア関数
 */
exports.getCourseById = async (req, res, next) => {
  try {
    const { id } = req.params;
    
    const course = await courseService.getCourseById(id);
    
    if (!course) {
      return next(notFoundError('Course'));
    }
    
    logger.info(`コース情報が取得されました: ID ${id}`);
    
    res.status(200).json({
      success: true,
      message: {
        zh: '成功獲取課程詳細資料',
        ja: 'コース詳細情報の取得に成功しました',
        en: 'Successfully retrieved course details'
      },
      data: course
    });
  } catch (error) {
    logger.error(`コース情報取得エラー: ${error.message}`);
    next(serverError(error));
  }
};

/**
 * 新しいコースを作成する（管理者用）
 * @param {Object} req - Expressリクエストオブジェクト
 * @param {Object} res - Expressレスポンスオブジェクト
 * @param {Function} next - Express nextミドルウェア関数
 */
exports.createCourse = async (req, res, next) => {
  try {
    const courseData = req.body;
    
    const course = await courseService.createCourse(courseData);
    
    logger.info(`新しいコースが作成されました: ID ${course._id}`);
    
    res.status(201).json({
      success: true,
      message: {
        zh: '成功創建新課程',
        ja: '新しいコースの作成に成功しました',
        en: 'Successfully created new course'
      },
      data: course
    });
  } catch (error) {
    logger.error(`コース作成エラー: ${error.message}`);
    next(serverError(error));
  }
};

/**
 * コース情報を更新する（管理者用）
 * @param {Object} req - Expressリクエストオブジェクト
 * @param {Object} res - Expressレスポンスオブジェクト
 * @param {Function} next - Express nextミドルウェア関数
 */
exports.updateCourse = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updateData = req.body;
    
    const course = await courseService.updateCourse(id, updateData);
    
    if (!course) {
      return next(notFoundError('Course'));
    }
    
    logger.info(`コース情報が更新されました: ID ${id}`);
    
    res.status(200).json({
      success: true,
      message: {
        zh: '成功更新課程資料',
        ja: 'コース情報の更新に成功しました',
        en: 'Successfully updated course'
      },
      data: course
    });
  } catch (error) {
    logger.error(`コース更新エラー: ${error.message}`);
    next(serverError(error));
  }
};

/**
 * コースを削除する（管理者用）
 * @param {Object} req - Expressリクエストオブジェクト
 * @param {Object} res - Expressレスポンスオブジェクト
 * @param {Function} next - Express nextミドルウェア関数
 */
exports.deleteCourse = async (req, res, next) => {
  try {
    const { id } = req.params;
    
    const result = await courseService.deleteCourse(id);
    
    if (!result) {
      return next(notFoundError('Course'));
    }
    
    logger.info(`コースが削除されました: ID ${id}`);
    
    res.status(200).json({
      success: true,
      message: {
        zh: '成功刪除課程',
        ja: 'コースの削除に成功しました',
        en: 'Successfully deleted course'
      }
    });
  } catch (error) {
    logger.error(`コース削除エラー: ${error.message}`);
    next(serverError(error));
  }
};