/**
 * お問い合わせコントローラー
 * お問い合わせフォームの送信・管理を処理するコントローラー
 */
const Contact = require('../models/Contact');
const { ApiError, notFoundError, serverError, badRequestError } = require('../utils/errorHandler');
const logger = require('../utils/logger');

/**
 * お問い合わせを送信する
 * @param {Object} req - Expressリクエストオブジェクト
 * @param {Object} res - Expressレスポンスオブジェクト
 * @param {Function} next - Express nextミドルウェア関数
 */
exports.submitContact = async (req, res, next) => {
  try {
    // リクエストからIPアドレスとユーザーエージェントを取得
    const ipAddress = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    const userAgent = req.headers['user-agent'];
    
    // 入力データにIPとユーザーエージェントを追加
    const contactData = {
      ...req.body,
      ipAddress,
      userAgent,
      status: 'new'
    };
    
    // お問い合わせを保存
    const contact = await Contact.create(contactData);
    
    logger.info(`新しいお問い合わせが送信されました: ID ${contact._id}`);
    
    // TODO: 通知メール送信処理を追加する
    
    res.status(201).json({
      success: true,
      message: {
        zh: '成功提交聯絡表單',
        ja: 'お問い合わせの送信に成功しました',
        en: 'Successfully submitted contact form'
      },
      id: contact._id
    });
  } catch (error) {
    logger.error(`お問い合わせ送信エラー: ${error.message}`);
    next(serverError(error));
  }
};

/**
 * 全てのお問い合わせを取得する（管理者用）
 * @param {Object} req - Expressリクエストオブジェクト
 * @param {Object} res - Expressレスポンスオブジェクト
 * @param {Function} next - Express nextミドルウェア関数
 */
exports.getAllContacts = async (req, res, next) => {
  try {
    // クエリパラメータから取得
    const { status, category, limit } = req.query;
    const parsedLimit = limit ? parseInt(limit, 10) : undefined;
    
    let query = {};
    
    // ステータスフィルター
    if (status) {
      query.status = status;
    }
    
    // カテゴリフィルター
    if (category) {
      query.category = category;
    }
    
    // クエリ実行
    let contactsQuery = Contact.find(query).sort({ createdAt: -1 });
    
    // 件数制限
    if (parsedLimit) {
      contactsQuery = contactsQuery.limit(parsedLimit);
    }
    
    const contacts = await contactsQuery;
    
    logger.info(`お問い合わせ一覧が取得されました (${contacts.length}件)`);
    
    res.status(200).json({
      success: true,
      message: {
        zh: '成功獲取所有聯絡表單',
        ja: '全てのお問い合わせの取得に成功しました',
        en: 'Successfully retrieved all contacts'
      },
      count: contacts.length,
      data: contacts
    });
  } catch (error) {
    logger.error(`お問い合わせ一覧取得エラー: ${error.message}`);
    next(serverError(error));
  }
};

/**
 * カテゴリ別のお問い合わせを取得する（管理者用）
 * @param {Object} req - Expressリクエストオブジェクト
 * @param {Object} res - Expressレスポンスオブジェクト
 * @param {Function} next - Express nextミドルウェア関数
 */
exports.getContactsByCategory = async (req, res, next) => {
  try {
    const { category } = req.params;
    
    // カテゴリ検証
    if (!['general', 'course', 'trial'].includes(category)) {
      return next(badRequestError('無効なカテゴリです'));
    }
    
    const contacts = await Contact.findByCategory(category);
    
    logger.info(`カテゴリ別お問い合わせが取得されました: ${category} (${contacts.length}件)`);
    
    res.status(200).json({
      success: true,
      message: {
        zh: '成功獲取分類聯絡表單',
        ja: 'カテゴリ別お問い合わせの取得に成功しました',
        en: 'Successfully retrieved contacts by category'
      },
      count: contacts.length,
      data: contacts
    });
  } catch (error) {
    logger.error(`カテゴリ別お問い合わせ取得エラー: ${error.message}`);
    next(serverError(error));
  }
};

/**
 * 特定のお問い合わせを取得する（管理者用）
 * @param {Object} req - Expressリクエストオブジェクト
 * @param {Object} res - Expressレスポンスオブジェクト
 * @param {Function} next - Express nextミドルウェア関数
 */
exports.getContactById = async (req, res, next) => {
  try {
    const { id } = req.params;
    
    const contact = await Contact.findById(id);
    
    if (!contact) {
      return next(notFoundError('Contact'));
    }
    
    logger.info(`お問い合わせが取得されました: ID ${id}`);
    
    res.status(200).json({
      success: true,
      message: {
        zh: '成功獲取聯絡表單詳細',
        ja: 'お問い合わせ詳細の取得に成功しました',
        en: 'Successfully retrieved contact details'
      },
      data: contact
    });
  } catch (error) {
    logger.error(`お問い合わせ取得エラー: ${error.message}`);
    next(serverError(error));
  }
};

/**
 * お問い合わせステータスを更新する（管理者用）
 * @param {Object} req - Expressリクエストオブジェクト
 * @param {Object} res - Expressレスポンスオブジェクト
 * @param {Function} next - Express nextミドルウェア関数
 */
exports.updateContactStatus = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    
    // ステータス検証
    if (!['new', 'inProgress', 'completed'].includes(status)) {
      return next(badRequestError('無効なステータスです'));
    }
    
    const contact = await Contact.findByIdAndUpdate(
      id,
      { status },
      { new: true, runValidators: true }
    );
    
    if (!contact) {
      return next(notFoundError('Contact'));
    }
    
    logger.info(`お問い合わせステータスが更新されました: ID ${id}, 新ステータス: ${status}`);
    
    res.status(200).json({
      success: true,
      message: {
        zh: '成功更新聯絡表單狀態',
        ja: 'お問い合わせステータスの更新に成功しました',
        en: 'Successfully updated contact status'
      },
      data: contact
    });
  } catch (error) {
    logger.error(`お問い合わせステータス更新エラー: ${error.message}`);
    next(serverError(error));
  }
};

/**
 * お問い合わせメモを追加する（管理者用）
 * @param {Object} req - Expressリクエストオブジェクト
 * @param {Object} res - Expressレスポンスオブジェクト
 * @param {Function} next - Express nextミドルウェア関数
 */
exports.addContactNotes = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { notes } = req.body;
    
    const contact = await Contact.findByIdAndUpdate(
      id,
      { notes },
      { new: true, runValidators: true }
    );
    
    if (!contact) {
      return next(notFoundError('Contact'));
    }
    
    logger.info(`お問い合わせメモが追加されました: ID ${id}`);
    
    res.status(200).json({
      success: true,
      message: {
        zh: '成功添加聯絡表單備註',
        ja: 'お問い合わせメモの追加に成功しました',
        en: 'Successfully added contact notes'
      },
      data: contact
    });
  } catch (error) {
    logger.error(`お問い合わせメモ追加エラー: ${error.message}`);
    next(serverError(error));
  }
};

/**
 * お問い合わせを削除する（管理者用）
 * @param {Object} req - Expressリクエストオブジェクト
 * @param {Object} res - Expressレスポンスオブジェクト
 * @param {Function} next - Express nextミドルウェア関数
 */
exports.deleteContact = async (req, res, next) => {
  try {
    const { id } = req.params;
    
    const result = await Contact.findByIdAndDelete(id);
    
    if (!result) {
      return next(notFoundError('Contact'));
    }
    
    logger.info(`お問い合わせが削除されました: ID ${id}`);
    
    res.status(200).json({
      success: true,
      message: {
        zh: '成功刪除聯絡表單',
        ja: 'お問い合わせの削除に成功しました',
        en: 'Successfully deleted contact'
      }
    });
  } catch (error) {
    logger.error(`お問い合わせ削除エラー: ${error.message}`);
    next(serverError(error));
  }
};