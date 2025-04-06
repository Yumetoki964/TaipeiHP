/**
 * 校舎情報サービス
 * 校舎情報のビジネスロジックとデータアクセスを提供するサービス
 */
const School = require('../models/School');
const logger = require('../utils/logger');

/**
 * 全ての校舎情報を取得する
 * @returns {Promise<Array>} 校舎情報の配列
 */
exports.getAllSchools = async () => {
  try {
    const schools = await School.find().sort({ sortOrder: 1 });
    return schools;
  } catch (error) {
    logger.error(`全校舎取得エラー: ${error.message}`);
    throw error;
  }
};

/**
 * アクティブな校舎情報のみを取得する
 * @returns {Promise<Array>} アクティブな校舎情報の配列
 */
exports.getActiveSchools = async () => {
  try {
    const schools = await School.findActive();
    return schools;
  } catch (error) {
    logger.error(`アクティブ校舎取得エラー: ${error.message}`);
    throw error;
  }
};

/**
 * 特定の校舎情報をIDで取得する
 * @param {string} id - 校舎ID
 * @returns {Promise<Object>} 校舎情報オブジェクト
 */
exports.getSchoolById = async (id) => {
  try {
    const school = await School.findById(id);
    return school;
  } catch (error) {
    logger.error(`校舎ID検索エラー: ${error.message}`);
    throw error;
  }
};

/**
 * 新しい校舎を作成する
 * @param {Object} schoolData - 校舎データ
 * @returns {Promise<Object>} 作成された校舎オブジェクト
 */
exports.createSchool = async (schoolData) => {
  try {
    // 新しい校舎のソート順を取得（最大値+1）
    const maxSortOrder = await School.findOne().sort({ sortOrder: -1 }).select('sortOrder');
    const newSortOrder = maxSortOrder ? maxSortOrder.sortOrder + 1 : 1;
    
    // デフォルト値の設定
    const schoolWithDefaults = {
      ...schoolData,
      sortOrder: schoolData.sortOrder || newSortOrder,
      isActive: schoolData.hasOwnProperty('isActive') ? schoolData.isActive : true
    };
    
    const school = await School.create(schoolWithDefaults);
    return school;
  } catch (error) {
    logger.error(`校舎作成エラー: ${error.message}`);
    throw error;
  }
};

/**
 * 校舎情報を更新する
 * @param {string} id - 校舎ID
 * @param {Object} updateData - 更新データ
 * @returns {Promise<Object>} 更新された校舎オブジェクト
 */
exports.updateSchool = async (id, updateData) => {
  try {
    const school = await School.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true }
    );
    return school;
  } catch (error) {
    logger.error(`校舎更新エラー: ${error.message}`);
    throw error;
  }
};

/**
 * 校舎を削除する
 * @param {string} id - 校舎ID
 * @returns {Promise<boolean>} 削除結果
 */
exports.deleteSchool = async (id) => {
  try {
    const result = await School.findByIdAndDelete(id);
    return !!result;
  } catch (error) {
    logger.error(`校舎削除エラー: ${error.message}`);
    throw error;
  }
};