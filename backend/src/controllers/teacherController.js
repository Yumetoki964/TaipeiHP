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
    // 開発環境モードではテスト用のデータを返す
    if (process.env.NODE_ENV === 'development') {
      // テスト用のサンプルデータ
      const sampleTeachers = [
        {
          _id: '1',
          name: {
            zh: '陳老師',
            ja: '陳先生',
            en: 'Mr. Chen'
          },
          specialties: {
            zh: ['數學', '物理'],
            ja: ['数学', '物理'],
            en: ['Mathematics', 'Physics']
          },
          biography: {
            zh: '畢業於台灣大學物理系，有十年教學經驗。',
            ja: '台湾大学物理学科卒業、10年の教育経験があります。',
            en: 'Graduated from Taiwan University with a degree in Physics, with 10 years of teaching experience.'
          },
          image: 'https://via.placeholder.com/300',
          isActive: true,
          sortOrder: 1
        },
        {
          _id: '2',
          name: {
            zh: '林老師',
            ja: '林先生',
            en: 'Mr. Lin'
          },
          specialties: {
            zh: ['英語', '日語'],
            ja: ['英語', '日本語'],
            en: ['English', 'Japanese']
          },
          biography: {
            zh: '具有英語和日語教學資格，專長於語言教學。',
            ja: '英語と日本語の教育資格を持ち、言語教育に特化しています。',
            en: 'Qualified in teaching English and Japanese, specializing in language education.'
          },
          image: 'https://via.placeholder.com/300',
          isActive: true,
          sortOrder: 2
        },
        {
          _id: '3',
          name: {
            zh: '王老師',
            ja: '王先生',
            en: 'Ms. Wang'
          },
          specialties: {
            zh: ['化學', '生物'],
            ja: ['化学', '生物学'],
            en: ['Chemistry', 'Biology']
          },
          biography: {
            zh: '畢業於成功大學化學系，熱愛科學教育。',
            ja: '成功大学化学科卒業、科学教育に情熱を持っています。',
            en: 'Graduated from Cheng Kung University with a degree in Chemistry, passionate about science education.'
          },
          image: 'https://via.placeholder.com/300',
          isActive: true,
          sortOrder: 3
        }
      ];
      
      logger.info(`開発環境: サンプル講師一覧が返されました (${sampleTeachers.length}件)`);
      
      return res.status(200).json(sampleTeachers);
    }
    
    // 本番環境では通常通りデータベースからデータを取得
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
    
    // 開発環境モードではテスト用のデータを返す
    if (process.env.NODE_ENV === 'development') {
      // IDに基づいてサンプルデータを返す
      const sampleTeacher = {
        _id: id,
        name: {
          zh: '陳老師',
          ja: '陳先生',
          en: 'Mr. Chen'
        },
        specialties: {
          zh: ['數學', '物理'],
          ja: ['数学', '物理'],
          en: ['Mathematics', 'Physics']
        },
        biography: {
          zh: '畢業於台灣大學物理系，有十年教學經驗。專精於高中數學與物理教學，擅長引導學生思考並解決問題。',
          ja: '台湾大学物理学科卒業、10年の教育経験があります。高校の数学と物理の指導に特化し、生徒の思考力と問題解決能力を育てることを得意としています。',
          en: 'Graduated from Taiwan University with a degree in Physics, with 10 years of teaching experience. Specializes in high school mathematics and physics, skilled at guiding students through critical thinking and problem-solving.'
        },
        image: 'https://via.placeholder.com/500',
        isActive: true,
        sortOrder: 1,
        subjects: {
          zh: ['高中數學', '高中物理', 'AP物理'],
          ja: ['高校数学', '高校物理', 'AP物理'],
          en: ['High School Math', 'High School Physics', 'AP Physics']
        },
        school: {
          _id: '1',
          name: {
            zh: '台北校',
            ja: '台北校',
            en: 'Taipei School'
          }
        },
        courses: [
          {
            _id: '1',
            title: {
              zh: '高中數學進階課程',
              ja: '高校数学上級コース',
              en: 'Advanced High School Math'
            }
          },
          {
            _id: '2',
            title: {
              zh: '物理奧林匹克預備班',
              ja: '物理オリンピック準備クラス',
              en: 'Physics Olympiad Preparation'
            }
          }
        ]
      };
      
      logger.info(`開発環境: サンプル講師詳細が返されました: ID ${id}`);
      
      return res.status(200).json(sampleTeacher);
    }
    
    // 本番環境では通常通りデータベースからデータを取得
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