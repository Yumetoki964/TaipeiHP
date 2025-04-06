/**
 * 講師情報コントローラー
 * 講師情報の取得・作成・更新・削除を処理するコントローラー
 */
const Teacher = require('../models/Teacher');
const { ApiError, notFoundError, serverError } = require('../utils/errorHandler');
const logger = require('../utils/logger');
const teacherService = require('../services/teacherService');

/**
 * 全講師情報を取得する
 * @param {Object} req - Expressリクエストオブジェクト
 * @param {Object} res - Expressレスポンスオブジェクト
 * @param {Function} next - Express nextミドルウェア関数
 */
exports.getAllTeachers = async (req, res, next) => {
  try {
    // クエリパラメータから取得
    const { active, schoolId } = req.query;
    
    let teachers;
    if (schoolId) {
      // 校舎別講師取得
      teachers = await teacherService.getTeachersBySchool(schoolId);
    } else if (active === 'true') {
      // アクティブな講師のみ取得
      teachers = await teacherService.getActiveTeachers();
    } else {
      // 全講師を取得
      teachers = await teacherService.getAllTeachers();
    }
    
    logger.info(`講師一覧が取得されました (${teachers.length}件)`);
    
    res.status(200).json({
      success: true,
      message: {
        zh: '成功獲取所有教師資料',
        ja: '全講師情報の取得に成功しました',
        en: 'Successfully retrieved all teachers'
      },
      count: teachers.length,
      data: teachers
    });
  } catch (error) {
    logger.error(`講師一覧取得エラー: ${error.message}`);
    next(serverError(error));
  }
};

/**
 * 特定の講師情報を取得する
 * @param {Object} req - Expressリクエストオブジェクト
 * @param {Object} res - Expressレスポンスオブジェクト
 * @param {Function} next - Express nextミドルウェア関数
 */
exports.getTeacherById = async (req, res, next) => {
  try {
    const { id } = req.params;
    
    const teacher = await teacherService.getTeacherById(id);
    
    if (!teacher) {
      return next(notFoundError('Teacher'));
    }
    
    logger.info(`講師情報が取得されました: ID ${id}`);
    
    res.status(200).json({
      success: true,
      message: {
        zh: '成功獲取教師詳細資料',
        ja: '講師詳細情報の取得に成功しました',
        en: 'Successfully retrieved teacher details'
      },
      data: teacher
    });
  } catch (error) {
    logger.error(`講師情報取得エラー: ${error.message}`);
    next(serverError(error));
  }
};

/**
 * 新しい講師を作成する（管理者用）
 * @param {Object} req - Expressリクエストオブジェクト
 * @param {Object} res - Expressレスポンスオブジェクト
 * @param {Function} next - Express nextミドルウェア関数
 */
exports.createTeacher = async (req, res, next) => {
  try {
    const teacherData = req.body;
    
    const teacher = await teacherService.createTeacher(teacherData);
    
    logger.info(`新しい講師が作成されました: ID ${teacher._id}`);
    
    res.status(201).json({
      success: true,
      message: {
        zh: '成功創建新教師',
        ja: '新しい講師の作成に成功しました',
        en: 'Successfully created new teacher'
      },
      data: teacher
    });
  } catch (error) {
    logger.error(`講師作成エラー: ${error.message}`);
    next(serverError(error));
  }
};

/**
 * 講師情報を更新する（管理者用）
 * @param {Object} req - Expressリクエストオブジェクト
 * @param {Object} res - Expressレスポンスオブジェクト
 * @param {Function} next - Express nextミドルウェア関数
 */
exports.updateTeacher = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updateData = req.body;
    
    const teacher = await teacherService.updateTeacher(id, updateData);
    
    if (!teacher) {
      return next(notFoundError('Teacher'));
    }
    
    logger.info(`講師情報が更新されました: ID ${id}`);
    
    res.status(200).json({
      success: true,
      message: {
        zh: '成功更新教師資料',
        ja: '講師情報の更新に成功しました',
        en: 'Successfully updated teacher'
      },
      data: teacher
    });
  } catch (error) {
    logger.error(`講師更新エラー: ${error.message}`);
    next(serverError(error));
  }
};

/**
 * 講師を削除する（管理者用）
 * @param {Object} req - Expressリクエストオブジェクト
 * @param {Object} res - Expressレスポンスオブジェクト
 * @param {Function} next - Express nextミドルウェア関数
 */
exports.deleteTeacher = async (req, res, next) => {
  try {
    const { id } = req.params;
    
    const result = await teacherService.deleteTeacher(id);
    
    if (!result) {
      return next(notFoundError('Teacher'));
    }
    
    logger.info(`講師が削除されました: ID ${id}`);
    
    res.status(200).json({
      success: true,
      message: {
        zh: '成功刪除教師',
        ja: '講師の削除に成功しました',
        en: 'Successfully deleted teacher'
      }
    });
  } catch (error) {
    logger.error(`講師削除エラー: ${error.message}`);
    next(serverError(error));
  }
};