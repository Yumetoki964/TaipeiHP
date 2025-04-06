/**
 * 講師情報サービス
 * 講師情報のビジネスロジックとデータアクセスを提供するサービス
 */
const Teacher = require('../models/Teacher');
const logger = require('../utils/logger');

/**
 * 全ての講師情報を取得する
 * @returns {Promise<Array>} 講師情報の配列
 */
exports.getAllTeachers = async () => {
  try {
    const teachers = await Teacher.find().sort({ sortOrder: 1 });
    return teachers;
  } catch (error) {
    logger.error(`全講師取得エラー: ${error.message}`);
    throw error;
  }
};

/**
 * アクティブな講師情報のみを取得する
 * @returns {Promise<Array>} アクティブな講師情報の配列
 */
exports.getActiveTeachers = async () => {
  try {
    const teachers = await Teacher.findActive();
    return teachers;
  } catch (error) {
    logger.error(`アクティブ講師取得エラー: ${error.message}`);
    throw error;
  }
};

/**
 * 校舎別に講師を取得する
 * @param {string} schoolId - 校舎ID
 * @returns {Promise<Array>} 校舎別講師情報の配列
 */
exports.getTeachersBySchool = async (schoolId) => {
  try {
    const teachers = await Teacher.findBySchool(schoolId);
    return teachers;
  } catch (error) {
    logger.error(`校舎別講師取得エラー: ${error.message}`);
    throw error;
  }
};

/**
 * 特定の講師情報をIDで取得する
 * @param {string} id - 講師ID
 * @returns {Promise<Object>} 講師情報オブジェクト
 */
exports.getTeacherById = async (id) => {
  try {
    const teacher = await Teacher.findById(id)
      .populate('school')
      .populate('courses');
    return teacher;
  } catch (error) {
    logger.error(`講師ID検索エラー: ${error.message}`);
    throw error;
  }
};

/**
 * 新しい講師を作成する
 * @param {Object} teacherData - 講師データ
 * @returns {Promise<Object>} 作成された講師オブジェクト
 */
exports.createTeacher = async (teacherData) => {
  try {
    // 新しい講師のソート順を取得（最大値+1）
    const maxSortOrder = await Teacher.findOne().sort({ sortOrder: -1 }).select('sortOrder');
    const newSortOrder = maxSortOrder ? maxSortOrder.sortOrder + 1 : 1;
    
    // デフォルト値の設定
    const teacherWithDefaults = {
      ...teacherData,
      sortOrder: teacherData.sortOrder || newSortOrder,
      isActive: teacherData.hasOwnProperty('isActive') ? teacherData.isActive : true
    };
    
    const teacher = await Teacher.create(teacherWithDefaults);
    return teacher;
  } catch (error) {
    logger.error(`講師作成エラー: ${error.message}`);
    throw error;
  }
};

/**
 * 講師情報を更新する
 * @param {string} id - 講師ID
 * @param {Object} updateData - 更新データ
 * @returns {Promise<Object>} 更新された講師オブジェクト
 */
exports.updateTeacher = async (id, updateData) => {
  try {
    const teacher = await Teacher.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true }
    );
    return teacher;
  } catch (error) {
    logger.error(`講師更新エラー: ${error.message}`);
    throw error;
  }
};

/**
 * 講師を削除する
 * @param {string} id - 講師ID
 * @returns {Promise<boolean>} 削除結果
 */
exports.deleteTeacher = async (id) => {
  try {
    const result = await Teacher.findByIdAndDelete(id);
    return !!result;
  } catch (error) {
    logger.error(`講師削除エラー: ${error.message}`);
    throw error;
  }
};