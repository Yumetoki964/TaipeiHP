/**
 * 講師情報API ルート
 */
const express = require('express');
const router = express.Router();
const { authenticate, isAdmin } = require('../middlewares/authMiddleware');
const { validationMiddleware } = require('../middlewares/errorMiddleware');
const { check } = require('express-validator');
const teacherController = require('../controllers/teacherController');

// 講師一覧の取得
router.get('/', teacherController.getAllTeachers);

// 特定の講師の詳細を取得
router.get('/:id', teacherController.getTeacherById);

// 管理者向けAPI: 新規講師の作成 (認証必須)
router.post(
  '/',
  authenticate,
  isAdmin,
  [
    check('name.zh').notEmpty().withMessage('繁体字中国語の講師名は必須です'),
    check('name.ja').notEmpty().withMessage('日本語の講師名は必須です'),
    check('name.en').notEmpty().withMessage('英語の講師名は必須です'),
    check('specialties.zh').isArray().withMessage('繁体字中国語の専門分野は配列で必須です'),
    check('specialties.ja').isArray().withMessage('日本語の専門分野は配列で必須です'),
    check('specialties.en').isArray().withMessage('英語の専門分野は配列で必須です'),
    check('biography.zh').notEmpty().withMessage('繁体字中国語の経歴は必須です'),
    check('biography.ja').notEmpty().withMessage('日本語の経歴は必須です'),
    check('biography.en').notEmpty().withMessage('英語の経歴は必須です'),
    check('image').notEmpty().withMessage('講師画像は必須です')
  ],
  validationMiddleware,
  teacherController.createTeacher
);

// 管理者向けAPI: 講師情報の更新 (認証必須)
router.put(
  '/:id',
  authenticate,
  isAdmin,
  teacherController.updateTeacher
);

// 管理者向けAPI: 講師の削除 (認証必須)
router.delete(
  '/:id',
  authenticate,
  isAdmin,
  teacherController.deleteTeacher
);

module.exports = router;