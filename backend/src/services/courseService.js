/**
 * コース情報サービス
 * コース情報のビジネスロジックとデータアクセスを提供するサービス
 */
const Course = require('../models/Course');
const logger = require('../utils/logger');

// モックデータ（開発環境用）
const mockCourses = [
  {
    _id: 'course_001',
    name: {
      zh: '基礎中文課程',
      ja: '基礎中国語コース',
      en: 'Basic Chinese Course'
    },
    description: {
      zh: '適合初學者的中文課程，從零開始學習中文基礎。',
      ja: '初心者向けの中国語コース。ゼロから中国語の基礎を学びます。',
      en: 'Chinese course suitable for beginners. Learn Chinese basics from scratch.'
    },
    targetAge: {
      zh: '16歲以上',
      ja: '16歳以上',
      en: '16 years and older'
    },
    level: 'beginner',
    duration: {
      zh: '3個月（12週）',
      ja: '3ヶ月（12週間）',
      en: '3 months (12 weeks)'
    },
    schedule: {
      zh: '每週2次，每次90分鐘',
      ja: '週2回、各90分',
      en: 'Twice a week, 90 minutes each'
    },
    price: {
      amount: 45000,
      currency: 'JPY',
      zh: '45,000日元',
      ja: '45,000円',
      en: '45,000 JPY'
    },
    category: 'language',
    materials: [
      {
        zh: '教科書《現代中文入門》',
        ja: '教科書「現代中国語入門」',
        en: 'Textbook "Modern Chinese Introduction"'
      },
      {
        zh: '練習冊',
        ja: '練習帳',
        en: 'Workbook'
      }
    ],
    features: [
      {
        zh: '小班授課（最多8人）',
        ja: '少人数制（最大8人）',
        en: 'Small class size (max 8 students)'
      },
      {
        zh: '中國籍教師',
        ja: '中国人教師による指導',
        en: 'Native Chinese teachers'
      }
    ],
    schools: ['school_001', 'school_002'],
    image: 'basic_chinese_course.jpg',
    sortOrder: 1,
    isActive: true,
    createdAt: new Date('2025-01-01'),
    updatedAt: new Date('2025-01-01')
  },
  {
    _id: 'course_002',
    name: {
      zh: '商務中文課程',
      ja: 'ビジネス中国語コース',
      en: 'Business Chinese Course'
    },
    description: {
      zh: '專為商務人士設計的中文課程，著重於商業溝通和談判技巧。',
      ja: 'ビジネスパーソン向けの中国語コース。ビジネスコミュニケーションと交渉スキルに重点を置いています。',
      en: 'Chinese course designed for business professionals, focusing on business communication and negotiation skills.'
    },
    targetAge: {
      zh: '20歲以上',
      ja: '20歳以上',
      en: '20 years and older'
    },
    level: 'intermediate',
    duration: {
      zh: '4個月（16週）',
      ja: '4ヶ月（16週間）',
      en: '4 months (16 weeks)'
    },
    schedule: {
      zh: '每週2次，每次120分鐘',
      ja: '週2回、各120分',
      en: 'Twice a week, 120 minutes each'
    },
    price: {
      amount: 68000,
      currency: 'JPY',
      zh: '68,000日元',
      ja: '68,000円',
      en: '68,000 JPY'
    },
    category: 'business',
    materials: [
      {
        zh: '教科書《商務中文精選》',
        ja: '教科書「ビジネス中国語精選」',
        en: 'Textbook "Selected Business Chinese"'
      },
      {
        zh: '商務文件範本',
        ja: 'ビジネス文書テンプレート',
        en: 'Business document templates'
      }
    ],
    features: [
      {
        zh: '模擬商務會議',
        ja: '模擬ビジネスミーティング',
        en: 'Simulated business meetings'
      },
      {
        zh: '實際案例分析',
        ja: '実例分析',
        en: 'Real case studies'
      }
    ],
    schools: ['school_001'],
    image: 'business_chinese_course.jpg',
    sortOrder: 2,
    isActive: true,
    createdAt: new Date('2025-01-15'),
    updatedAt: new Date('2025-01-15')
  }
];

/**
 * 全てのコース情報を取得する
 * @returns {Promise<Array>} コース情報の配列
 */
exports.getAllCourses = async () => {
  try {
    // モックデータモードが有効な場合
    if (process.env.MOCK_DB === 'true') {
      logger.info('モックデータを使用: getAllCourses');
      return mockCourses;
    }

    // 通常のデータベースクエリ
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
    // モックデータモードが有効な場合
    if (process.env.MOCK_DB === 'true') {
      logger.info('モックデータを使用: getActiveCourses');
      return mockCourses.filter(course => course.isActive);
    }

    // 通常のデータベースクエリ
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