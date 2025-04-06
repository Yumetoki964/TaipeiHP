/**
 * 体験授業申し込みコントローラー
 * 体験授業申し込みの送信・管理を処理するコントローラー
 */
const TrialLesson = require('../models/TrialLesson');
const { ApiError, notFoundError, serverError, badRequestError } = require('../utils/errorHandler');
const logger = require('../utils/logger');

/**
 * 体験授業申し込みを送信する
 * @param {Object} req - Expressリクエストオブジェクト
 * @param {Object} res - Expressレスポンスオブジェクト
 * @param {Function} next - Express nextミドルウェア関数
 */
exports.submitTrialLesson = async (req, res, next) => {
  try {
    // リクエストからIPアドレスとユーザーエージェントを取得
    const ipAddress = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    const userAgent = req.headers['user-agent'];
    
    // 入力データにIPとユーザーエージェントを追加
    const trialLessonData = {
      ...req.body,
      ipAddress,
      userAgent,
      status: 'pending'
    };
    
    // 体験授業申し込みを保存
    const trialLesson = await TrialLesson.create(trialLessonData);
    
    logger.info(`新しい体験授業申し込みが送信されました: ID ${trialLesson._id}`);
    
    // TODO: 通知メール送信処理を追加する
    
    res.status(201).json({
      success: true,
      message: {
        zh: '成功提交體驗課程申請',
        ja: '体験授業申し込みの送信に成功しました',
        en: 'Successfully submitted trial lesson request'
      },
      id: trialLesson._id
    });
  } catch (error) {
    logger.error(`体験授業申し込み送信エラー: ${error.message}`);
    next(serverError(error));
  }
};

/**
 * 利用可能な体験授業の時間枠を取得する
 * @param {Object} req - Expressリクエストオブジェクト
 * @param {Object} res - Expressレスポンスオブジェクト
 * @param {Function} next - Express nextミドルウェア関数
 */
exports.getAvailableTimeSlots = async (req, res, next) => {
  try {
    // 2週間分の日付を生成（今日から14日間）
    const dates = [];
    for (let i = 1; i <= 14; i++) {
      const date = new Date();
      date.setDate(date.getDate() + i);
      dates.push(date.toISOString().split('T')[0]);
    }
    
    // 時間スロット（校舎の営業時間内）
    const timeSlots = [
      '10:00-12:00',
      '13:00-15:00',
      '15:30-17:30',
      '18:00-20:00'
    ];
    
    // TODO: 既に予約が入っている時間枠を除外する処理を追加
    
    logger.info('利用可能な時間枠が取得されました');
    
    res.status(200).json({
      success: true,
      message: {
        zh: '成功獲取可用時間',
        ja: '利用可能な時間枠の取得に成功しました',
        en: 'Successfully retrieved available time slots'
      },
      data: {
        dates,
        timeSlots
      }
    });
  } catch (error) {
    logger.error(`時間枠取得エラー: ${error.message}`);
    next(serverError(error));
  }
};

/**
 * 全ての体験授業申し込みを取得する（管理者用）
 * @param {Object} req - Expressリクエストオブジェクト
 * @param {Object} res - Expressレスポンスオブジェクト
 * @param {Function} next - Express nextミドルウェア関数
 */
exports.getAllTrialLessons = async (req, res, next) => {
  try {
    // クエリパラメータから取得
    const { status, schoolId, limit } = req.query;
    const parsedLimit = limit ? parseInt(limit, 10) : undefined;
    
    let query = {};
    
    // ステータスフィルター
    if (status) {
      query.status = status;
    }
    
    // 校舎フィルター
    if (schoolId) {
      query.preferredSchool = schoolId;
    }
    
    // クエリ実行
    let trialLessonsQuery = TrialLesson.find(query).sort({ createdAt: -1 });
    
    // 件数制限
    if (parsedLimit) {
      trialLessonsQuery = trialLessonsQuery.limit(parsedLimit);
    }
    
    const trialLessons = await trialLessonsQuery;
    
    logger.info(`体験授業申し込み一覧が取得されました (${trialLessons.length}件)`);
    
    res.status(200).json({
      success: true,
      message: {
        zh: '成功獲取所有體驗課程申請',
        ja: '全ての体験授業申し込みの取得に成功しました',
        en: 'Successfully retrieved all trial lesson requests'
      },
      count: trialLessons.length,
      data: trialLessons
    });
  } catch (error) {
    logger.error(`体験授業申し込み一覧取得エラー: ${error.message}`);
    next(serverError(error));
  }
};

/**
 * 特定の体験授業申し込みを取得する（管理者用）
 * @param {Object} req - Expressリクエストオブジェクト
 * @param {Object} res - Expressレスポンスオブジェクト
 * @param {Function} next - Express nextミドルウェア関数
 */
exports.getTrialLessonById = async (req, res, next) => {
  try {
    const { id } = req.params;
    
    const trialLesson = await TrialLesson.findById(id)
      .populate('assignedTeacher');
    
    if (!trialLesson) {
      return next(notFoundError('TrialLesson'));
    }
    
    logger.info(`体験授業申し込みが取得されました: ID ${id}`);
    
    res.status(200).json({
      success: true,
      message: {
        zh: '成功獲取體驗課程詳細',
        ja: '体験授業申し込み詳細の取得に成功しました',
        en: 'Successfully retrieved trial lesson details'
      },
      data: trialLesson
    });
  } catch (error) {
    logger.error(`体験授業申し込み取得エラー: ${error.message}`);
    next(serverError(error));
  }
};

/**
 * 体験授業申し込みのステータスを更新する（管理者用）
 * @param {Object} req - Expressリクエストオブジェクト
 * @param {Object} res - Expressレスポンスオブジェクト
 * @param {Function} next - Express nextミドルウェア関数
 */
exports.updateTrialLessonStatus = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    
    // ステータス検証
    if (!['pending', 'confirmed', 'completed', 'canceled'].includes(status)) {
      return next(badRequestError('無効なステータスです'));
    }
    
    const trialLesson = await TrialLesson.findByIdAndUpdate(
      id,
      { status },
      { new: true, runValidators: true }
    );
    
    if (!trialLesson) {
      return next(notFoundError('TrialLesson'));
    }
    
    logger.info(`体験授業申し込みステータスが更新されました: ID ${id}, 新ステータス: ${status}`);
    
    res.status(200).json({
      success: true,
      message: {
        zh: '成功更新體驗課程狀態',
        ja: '体験授業申し込みステータスの更新に成功しました',
        en: 'Successfully updated trial lesson status'
      },
      data: trialLesson
    });
  } catch (error) {
    logger.error(`体験授業申し込みステータス更新エラー: ${error.message}`);
    next(serverError(error));
  }
};

/**
 * 体験授業の日時を確定する（管理者用）
 * @param {Object} req - Expressリクエストオブジェクト
 * @param {Object} res - Expressレスポンスオブジェクト
 * @param {Function} next - Express nextミドルウェア関数
 */
exports.confirmTrialLesson = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { scheduledDate, scheduledTime, assignedTeacher } = req.body;
    
    // 必須フィールドの検証
    if (!scheduledDate || !scheduledTime) {
      return next(badRequestError('日付と時間は必須です'));
    }
    
    const updateData = {
      scheduledDate,
      scheduledTime,
      status: 'confirmed'
    };
    
    // 講師が割り当てられている場合
    if (assignedTeacher) {
      updateData.assignedTeacher = assignedTeacher;
    }
    
    const trialLesson = await TrialLesson.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true }
    ).populate('assignedTeacher');
    
    if (!trialLesson) {
      return next(notFoundError('TrialLesson'));
    }
    
    logger.info(`体験授業が確定されました: ID ${id}, 日時: ${scheduledDate} ${scheduledTime}`);
    
    // TODO: 確定通知メール送信処理を追加
    
    res.status(200).json({
      success: true,
      message: {
        zh: '成功確認體驗課程',
        ja: '体験授業の確定に成功しました',
        en: 'Successfully confirmed trial lesson'
      },
      data: trialLesson
    });
  } catch (error) {
    logger.error(`体験授業確定エラー: ${error.message}`);
    next(serverError(error));
  }
};

/**
 * 体験授業申し込みのメモを追加する（管理者用）
 * @param {Object} req - Expressリクエストオブジェクト
 * @param {Object} res - Expressレスポンスオブジェクト
 * @param {Function} next - Express nextミドルウェア関数
 */
exports.addTrialLessonNotes = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { notes } = req.body;
    
    const trialLesson = await TrialLesson.findByIdAndUpdate(
      id,
      { notes },
      { new: true, runValidators: true }
    );
    
    if (!trialLesson) {
      return next(notFoundError('TrialLesson'));
    }
    
    logger.info(`体験授業申し込みメモが追加されました: ID ${id}`);
    
    res.status(200).json({
      success: true,
      message: {
        zh: '成功添加體驗課程備註',
        ja: '体験授業申し込みメモの追加に成功しました',
        en: 'Successfully added trial lesson notes'
      },
      data: trialLesson
    });
  } catch (error) {
    logger.error(`体験授業申し込みメモ追加エラー: ${error.message}`);
    next(serverError(error));
  }
};

/**
 * 体験授業申し込みを削除する（管理者用）
 * @param {Object} req - Expressリクエストオブジェクト
 * @param {Object} res - Expressレスポンスオブジェクト
 * @param {Function} next - Express nextミドルウェア関数
 */
exports.deleteTrialLesson = async (req, res, next) => {
  try {
    const { id } = req.params;
    
    const result = await TrialLesson.findByIdAndDelete(id);
    
    if (!result) {
      return next(notFoundError('TrialLesson'));
    }
    
    logger.info(`体験授業申し込みが削除されました: ID ${id}`);
    
    res.status(200).json({
      success: true,
      message: {
        zh: '成功刪除體驗課程申請',
        ja: '体験授業申し込みの削除に成功しました',
        en: 'Successfully deleted trial lesson request'
      }
    });
  } catch (error) {
    logger.error(`体験授業申し込み削除エラー: ${error.message}`);
    next(serverError(error));
  }
};