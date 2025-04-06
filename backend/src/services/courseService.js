/**
 * コース情報サービス
 * コース情報のビジネスロジックとデータアクセスを提供するサービス
 */
const Course = require('../models/Course');
const logger = require('../utils/logger');

/**
 * 全てのコース情報を取得する
 * @returns {Promise<Array>} コース情報の配列
 */
exports.getAllCourses = async () => {
  try {
    const courses = await Course.find().sort({ category: 1, sortOrder: 1 });
    return courses;
  } catch (error) {
    logger.error(`全コース取得エラー: ${error.message}`);
    throw error;
  }
};

/**
 * アクティブなコース情報のみを取得する
 * @returns {Promise<Array>} アクティブなコース情報の配列
 */
exports.getActiveCourses = async () => {
  try {
    const courses = await Course.findActive();
    return courses;
  } catch (error) {
    logger.error(`アクティブコース取得エラー: ${error.message}`);
    throw error;
  }
};

/**
 * カテゴリ別にコースを取得する
 * @param {string} category - コースカテゴリ
 * @returns {Promise<Array>} カテゴリ別コース情報の配列
 */
exports.getCoursesByCategory = async (category) => {
  try {
    const courses = await Course.findByCategory(category);
    return courses;
  } catch (error) {
    logger.error(`カテゴリ別コース取得エラー: ${error.message}`);
    throw error;
  }
};

/**
 * 特定のコース情報をIDで取得する
 * @param {string} id - コースID
 * @returns {Promise<Object>} コース情報オブジェクト
 */
exports.getCourseById = async (id) => {
  try {
    const course = await Course.findById(id).populate('schools');
    return course;
  } catch (error) {
    logger.error(`コースID検索エラー: ${error.message}`);
    throw error;
  }
};

/**
 * 新しいコースを作成する
 * @param {Object} courseData - コースデータ
 * @returns {Promise<Object>} 作成されたコースオブジェクト
 */
exports.createCourse = async (courseData) => {
  try {
    // カテゴリ内での新しいコースのソート順を取得（最大値+1）
    const maxSortOrder = await Course.findOne({ category: courseData.category || 'other' })
      .sort({ sortOrder: -1 })
      .select('sortOrder');
    const newSortOrder = maxSortOrder ? maxSortOrder.sortOrder + 1 : 1;
    
    // デフォルト値の設定
    const courseWithDefaults = {
      ...courseData,
      sortOrder: courseData.sortOrder || newSortOrder,
      isActive: courseData.hasOwnProperty('isActive') ? courseData.isActive : true
    };
    
    const course = await Course.create(courseWithDefaults);
    return course;
  } catch (error) {
    logger.error(`コース作成エラー: ${error.message}`);
    throw error;
  }
};

/**
 * コース情報を更新する
 * @param {string} id - コースID
 * @param {Object} updateData - 更新データ
 * @returns {Promise<Object>} 更新されたコースオブジェクト
 */
exports.updateCourse = async (id, updateData) => {
  try {
    const course = await Course.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true }
    );
    return course;
  } catch (error) {
    logger.error(`コース更新エラー: ${error.message}`);
    throw error;
  }
};

/**
 * コースを削除する
 * @param {string} id - コースID
 * @returns {Promise<boolean>} 削除結果
 */
exports.deleteCourse = async (id) => {
  try {
    const result = await Course.findByIdAndDelete(id);
    return !!result;
  } catch (error) {
    logger.error(`コース削除エラー: ${error.message}`);
    throw error;
  }
};