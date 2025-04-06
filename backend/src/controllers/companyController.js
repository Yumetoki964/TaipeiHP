/**
 * 会社情報コントローラー
 * 会社情報の取得・管理を処理するコントローラー
 */
const { ApiError, notFoundError, serverError } = require('../utils/errorHandler');
const logger = require('../utils/logger');

// 会社情報（本番環境ではデータベースから取得）
const companyInfo = {
  name: {
    zh: '夢時商業股份有限公司',
    ja: '夢時商業股份有限公司',
    en: 'Yumetoki Commercial Co., Ltd.'
  },
  foundingYear: '2022',
  representative: {
    zh: '王小明',
    ja: '王 小明',
    en: 'Xiao-Ming Wang'
  },
  address: {
    zh: '台北市中山區南京東路三段219號5樓',
    ja: '台北市中山区南京東路三段219号5階',
    en: '5F, No. 219, Sec. 3, Nanjing E. Rd., Zhongshan Dist., Taipei City, Taiwan'
  },
  phone: '+886-2-1234-5678',
  email: 'info@yumetoki.com.tw',
  registrationNumber: 'A123456789'
};

// 会社の歴史
const companyHistory = [
  {
    year: '2022',
    month: '03',
    title: {
      zh: '公司成立',
      ja: '会社設立',
      en: 'Company Established'
    },
    description: {
      zh: '夢時商業股份有限公司在台北市正式成立',
      ja: '夢時商業股份有限公司が台北市に正式に設立されました',
      en: 'Yumetoki Commercial Co., Ltd. was officially established in Taipei City'
    }
  },
  {
    year: '2022',
    month: '06',
    title: {
      zh: '第一間分校開幕',
      ja: '第一校開校',
      en: 'First School Opening'
    },
    description: {
      zh: '台北中山區分校正式開幕',
      ja: '台北中山区校が正式に開校しました',
      en: 'The Zhongshan District, Taipei Branch officially opened'
    }
  },
  {
    year: '2023',
    month: '09',
    title: {
      zh: '第二間分校開幕',
      ja: '第二校開校',
      en: 'Second School Opening'
    },
    description: {
      zh: '台北信義區分校正式開幕',
      ja: '台北信義区校が正式に開校しました',
      en: 'The Xinyi District, Taipei Branch officially opened'
    }
  }
];

// 企業理念・ビジョン
const companyValues = [
  {
    title: {
      zh: '個性化教育',
      ja: '個性を尊重する教育',
      en: 'Personalized Education'
    },
    description: {
      zh: '我們相信每個學生都是獨特的，因此提供量身訂製的學習計劃',
      ja: '私たちは一人ひとりの生徒がユニークであると信じ、オーダーメイドの学習プランを提供します',
      en: 'We believe each student is unique, so we provide tailored learning plans'
    },
    icon: 'personalized'
  },
  {
    title: {
      zh: '優質師資',
      ja: '質の高い講師陣',
      en: 'Quality Educators'
    },
    description: {
      zh: '聘請經驗豐富、熱情專業的教師，確保教學品質',
      ja: '経験豊富で情熱的なプロフェッショナル講師を採用し、教育の質を確保します',
      en: 'Employing experienced, passionate, and professional teachers to ensure quality education'
    },
    icon: 'teacher'
  },
  {
    title: {
      zh: '全人發展',
      ja: '全人的な成長',
      en: 'Holistic Development'
    },
    description: {
      zh: '不僅注重學術成就，同時培養學生的思考能力、創造力和社交技能',
      ja: '学業だけでなく、思考力、創造性、社会的スキルを育みます',
      en: 'Focus not only on academic achievement but also cultivating thinking ability, creativity, and social skills'
    },
    icon: 'development'
  }
];

// 姉妹会社情報
const sisterCompany = {
  name: {
    zh: '藍燈教育株式會社',
    ja: 'ブルーランプ教育株式会社',
    en: 'Blue Lamp Education Inc.'
  },
  description: {
    zh: '藍燈教育株式會社是我們在日本的姊妹公司，專注於提供日語教育和留學顧問服務',
    ja: 'ブルーランプ教育株式会社は日本にある姉妹会社で、日本語教育と留学コンサルティングサービスを提供しています',
    en: 'Blue Lamp Education Inc. is our sister company in Japan, focusing on Japanese language education and study abroad consulting services'
  },
  location: {
    zh: '日本東京都新宿區西新宿1-1-1',
    ja: '東京都新宿区西新宿1-1-1',
    en: '1-1-1 Nishishinjuku, Shinjuku-ku, Tokyo, Japan'
  },
  website: 'https://www.bluelamp-edu.co.jp',
  logo: '/assets/images/bluelamp-logo.png',
  images: [
    '/assets/images/bluelamp-office1.jpg',
    '/assets/images/bluelamp-office2.jpg'
  ]
};

/**
 * 会社情報を取得する
 * @param {Object} req - Expressリクエストオブジェクト
 * @param {Object} res - Expressレスポンスオブジェクト
 * @param {Function} next - Express nextミドルウェア関数
 */
exports.getCompanyInfo = async (req, res, next) => {
  try {
    logger.info('会社情報が取得されました');
    
    res.status(200).json({
      success: true,
      message: {
        zh: '成功獲取公司資料',
        ja: '会社情報の取得に成功しました',
        en: 'Successfully retrieved company information'
      },
      data: companyInfo
    });
  } catch (error) {
    logger.error(`会社情報取得エラー: ${error.message}`);
    next(serverError(error));
  }
};

/**
 * 会社の歴史を取得する
 * @param {Object} req - Expressリクエストオブジェクト
 * @param {Object} res - Expressレスポンスオブジェクト
 * @param {Function} next - Express nextミドルウェア関数
 */
exports.getCompanyHistory = async (req, res, next) => {
  try {
    logger.info('会社の歴史が取得されました');
    
    res.status(200).json({
      success: true,
      message: {
        zh: '成功獲取公司歷史',
        ja: '会社の歴史の取得に成功しました',
        en: 'Successfully retrieved company history'
      },
      data: companyHistory
    });
  } catch (error) {
    logger.error(`会社の歴史取得エラー: ${error.message}`);
    next(serverError(error));
  }
};

/**
 * 会社の理念・ビジョンを取得する
 * @param {Object} req - Expressリクエストオブジェクト
 * @param {Object} res - Expressレスポンスオブジェクト
 * @param {Function} next - Express nextミドルウェア関数
 */
exports.getCompanyValues = async (req, res, next) => {
  try {
    logger.info('会社の理念が取得されました');
    
    res.status(200).json({
      success: true,
      message: {
        zh: '成功獲取公司理念',
        ja: '会社の理念の取得に成功しました',
        en: 'Successfully retrieved company values'
      },
      data: companyValues
    });
  } catch (error) {
    logger.error(`会社の理念取得エラー: ${error.message}`);
    next(serverError(error));
  }
};

/**
 * 姉妹会社情報を取得する
 * @param {Object} req - Expressリクエストオブジェクト
 * @param {Object} res - Expressレスポンスオブジェクト
 * @param {Function} next - Express nextミドルウェア関数
 */
exports.getSisterCompany = async (req, res, next) => {
  try {
    logger.info('姉妹会社情報が取得されました');
    
    res.status(200).json({
      success: true,
      message: {
        zh: '成功獲取姊妹公司資料',
        ja: '姉妹会社情報の取得に成功しました',
        en: 'Successfully retrieved sister company information'
      },
      data: sisterCompany
    });
  } catch (error) {
    logger.error(`姉妹会社情報取得エラー: ${error.message}`);
    next(serverError(error));
  }
};