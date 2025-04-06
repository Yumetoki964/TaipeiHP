/**
 * コース情報API ルート
 */
const express = require('express');
const router = express.Router();
const { authenticate, isAdmin } = require('../middlewares/authMiddleware');
const { validationMiddleware } = require('../middlewares/errorMiddleware');
const { check } = require('express-validator');
const courseController = require('../controllers/courseController');

// コース一覧の取得
router.get('/', courseController.getAllCourses);

// 特定のコースの詳細を取得
router.get('/:id', courseController.getCourseById);

// 管理者向けAPI: 新規コースの作成 (認証必須)
router.post(
  '/',
  authenticate,
  isAdmin,
  [
    check('name.zh').notEmpty().withMessage('繁体字中国語のコース名は必須です'),
    check('name.ja').notEmpty().withMessage('日本語のコース名は必須です'),
    check('name.en').notEmpty().withMessage('英語のコース名は必須です'),
    check('description.zh').notEmpty().withMessage('繁体字中国語の説明は必須です'),
    check('description.ja').notEmpty().withMessage('日本語の説明は必須です'),
    check('description.en').notEmpty().withMessage('英語の説明は必須です'),
    check('targetAge.zh').notEmpty().withMessage('繁体字中国語の対象年齢は必須です'),
    check('targetAge.ja').notEmpty().withMessage('日本語の対象年齢は必須です'),
    check('targetAge.en').notEmpty().withMessage('英語の対象年齢は必須です')
  ],
  validationMiddleware,
  courseController.createCourse
);

// 管理者向けAPI: コース情報の更新 (認証必須)
router.put(
  '/:id',
  authenticate,
  isAdmin,
  courseController.updateCourse
);

// 管理者向けAPI: コースの削除 (認証必須)
router.delete(
  '/:id',
  authenticate,
  isAdmin,
  courseController.deleteCourse
);

module.exports = router;