/**
 * お問い合わせAPI ルート
 */
const express = require('express');
const router = express.Router();
const { authenticate, isAdmin } = require('../middlewares/authMiddleware');
const { validationMiddleware } = require('../middlewares/errorMiddleware');
const { check } = require('express-validator');
const contactController = require('../controllers/contactController');

// お問い合わせ送信
router.post(
  '/',
  [
    check('name').notEmpty().withMessage('名前は必須です'),
    check('email').isEmail().withMessage('有効なメールアドレスを入力してください'),
    check('message').notEmpty().withMessage('メッセージは必須です'),
    check('category').isIn(['general', 'course', 'trial']).withMessage('無効なカテゴリです'),
    check('preferredLanguage').isIn(['zh', 'ja', 'en']).withMessage('無効な言語設定です')
  ],
  validationMiddleware,
  contactController.submitContact
);

// 管理者向けAPI: お問い合わせ一覧の取得 (認証必須)
router.get(
  '/',
  authenticate,
  isAdmin,
  contactController.getAllContacts
);

// 管理者向けAPI: カテゴリ別お問い合わせ一覧の取得 (認証必須)
router.get(
  '/category/:category',
  authenticate,
  isAdmin,
  contactController.getContactsByCategory
);

// 管理者向けAPI: 特定のお問い合わせの詳細を取得 (認証必須)
router.get(
  '/:id',
  authenticate,
  isAdmin,
  contactController.getContactById
);

// 管理者向けAPI: お問い合わせステータスの更新 (認証必須)
router.patch(
  '/:id/status',
  authenticate,
  isAdmin,
  [
    check('status').isIn(['new', 'inProgress', 'completed']).withMessage('無効なステータスです')
  ],
  validationMiddleware,
  contactController.updateContactStatus
);

// 管理者向けAPI: お問い合わせへのメモ追加 (認証必須)
router.patch(
  '/:id/notes',
  authenticate,
  isAdmin,
  [
    check('notes').notEmpty().withMessage('メモは必須です')
  ],
  validationMiddleware,
  contactController.addContactNotes
);

// 管理者向けAPI: お問い合わせの削除 (認証必須)
router.delete(
  '/:id',
  authenticate,
  isAdmin,
  contactController.deleteContact
);

module.exports = router;