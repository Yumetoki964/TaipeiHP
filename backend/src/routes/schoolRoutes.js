/**
 * 校舎情報API ルート
 */
const express = require('express');
const router = express.Router();
const { authenticate, isAdmin } = require('../middlewares/authMiddleware');
const { validationMiddleware } = require('../middlewares/errorMiddleware');
const { check } = require('express-validator');
const schoolController = require('../controllers/schoolController');

// 校舎一覧の取得
router.get('/', schoolController.getAllSchools);

// 特定の校舎の詳細を取得
router.get('/:id', schoolController.getSchoolById);

// 管理者向けAPI: 新規校舎の作成 (認証必須)
router.post(
  '/',
  authenticate,
  isAdmin,
  [
    check('name.zh').notEmpty().withMessage('繁体字中国語の校舎名は必須です'),
    check('name.ja').notEmpty().withMessage('日本語の校舎名は必須です'),
    check('name.en').notEmpty().withMessage('英語の校舎名は必須です'),
    check('address.zh').notEmpty().withMessage('繁体字中国語の住所は必須です'),
    check('address.ja').notEmpty().withMessage('日本語の住所は必須です'),
    check('address.en').notEmpty().withMessage('英語の住所は必須です'),
    check('phone').notEmpty().withMessage('電話番号は必須です'),
    check('mapUrl').notEmpty().withMessage('地図URLは必須です')
  ],
  validationMiddleware,
  schoolController.createSchool
);

// 管理者向けAPI: 校舎情報の更新 (認証必須)
router.put(
  '/:id',
  authenticate,
  isAdmin,
  schoolController.updateSchool
);

// 管理者向けAPI: 校舎の削除 (認証必須)
router.delete(
  '/:id',
  authenticate,
  isAdmin,
  schoolController.deleteSchool
);

module.exports = router;