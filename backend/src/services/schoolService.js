/**
 * 校舎情報サービス
 * 校舎情報のビジネスロジックとデータアクセスを提供するサービス
 */
const School = require('../models/School');
const logger = require('../utils/logger');

// モックデータ（開発環境用）
const mockSchools = [
  {
    _id: 'school_001',
    name: {
      zh: '東京總校',
      ja: '東京本校',
      en: 'Tokyo Main School'
    },
    address: {
      zh: '東京都新宿區西新宿1-1-1',
      ja: '東京都新宿区西新宿1-1-1',
      en: '1-1-1 Nishi-Shinjuku, Shinjuku-ku, Tokyo'
    },
    phone: '03-1234-5678',
    email: 'tokyo@example.com',
    mapUrl: 'https://maps.example.com/tokyo',
    businessHours: {
      zh: '週一至週五 10:00-19:00',
      ja: '月〜金 10:00-19:00',
      en: 'Mon-Fri 10:00-19:00'
    },
    features: [
      {
        zh: '靠近新宿站',
        ja: '新宿駅近く',
        en: 'Near Shinjuku Station'
      },
      {
        zh: '現代化設備',
        ja: '最新設備完備',
        en: 'Modern facilities'
      }
    ],
    images: [
      'tokyo_school_1.jpg',
      'tokyo_school_2.jpg'
    ],
    sortOrder: 1,
    isActive: true,
    createdAt: new Date('2025-01-01'),
    updatedAt: new Date('2025-01-01')
  },
  {
    _id: 'school_002',
    name: {
      zh: '大阪分校',
      ja: '大阪校',
      en: 'Osaka School'
    },
    address: {
      zh: '大阪府大阪市北區梅田2-2-2',
      ja: '大阪府大阪市北区梅田2-2-2',
      en: '2-2-2 Umeda, Kita-ku, Osaka'
    },
    phone: '06-1234-5678',
    email: 'osaka@example.com',
    mapUrl: 'https://maps.example.com/osaka',
    businessHours: {
      zh: '週一至週五 10:00-19:00、週六 10:00-17:00',
      ja: '月〜金 10:00-19:00、土 10:00-17:00',
      en: 'Mon-Fri 10:00-19:00, Sat 10:00-17:00'
    },
    features: [
      {
        zh: '靠近梅田站',
        ja: '梅田駅近く',
        en: 'Near Umeda Station'
      },
      {
        zh: '寬敞教室',
        ja: '広々とした教室',
        en: 'Spacious classrooms'
      }
    ],
    images: [
      'osaka_school_1.jpg',
      'osaka_school_2.jpg'
    ],
    sortOrder: 2,
    isActive: true,
    createdAt: new Date('2025-01-15'),
    updatedAt: new Date('2025-01-15')
  }
];

/**
 * 全ての校舎情報を取得する
 * @returns {Promise<Array>} 校舎情報の配列
 */
exports.getAllSchools = async () => {
  try {
    // モックデータモードが有効な場合
    if (process.env.MOCK_DB === 'true') {
      logger.info('モックデータを使用: getAllSchools');
      return mockSchools;
    }

    // 通常のデータベースクエリ
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
    // モックデータモードが有効な場合
    if (process.env.MOCK_DB === 'true') {
      logger.info('モックデータを使用: getActiveSchools');
      return mockSchools.filter(school => school.isActive);
    }

    // 通常のデータベースクエリ
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
    // モックデータモードが有効な場合
    if (process.env.MOCK_DB === 'true') {
      logger.info(`モックデータを使用: getSchoolById ${id}`);
      const school = mockSchools.find(s => s._id === id);
      return school || null;
    }

    // 通常のデータベースクエリ
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