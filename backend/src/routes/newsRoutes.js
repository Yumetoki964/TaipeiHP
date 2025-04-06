/**
 * ニュース情報API ルート
 */
const express = require('express');
const router = express.Router();
const { authenticate, isAdmin } = require('../middlewares/authMiddleware');
const { validationMiddleware } = require('../middlewares/errorMiddleware');
const { check } = require('express-validator');
const newsController = require('../controllers/newsController');

// ニュース一覧の取得
router.get('/', newsController.getAllNews);

// 特定のニュースの詳細をスラッグで取得
router.get('/slug/:slug', newsController.getNewsBySlug);

// 特定のニュースの詳細をIDで取得
router.get('/:id', newsController.getNewsById);

// 管理者向けAPI: 新規ニュースの作成 (認証必須)
router.post(
  '/',
  authenticate,
  isAdmin,
  [
    check('title.zh').notEmpty().withMessage('繁体字中国語のタイトルは必須です'),
    check('title.ja').notEmpty().withMessage('日本語のタイトルは必須です'),
    check('title.en').notEmpty().withMessage('英語のタイトルは必須です'),
    check('content.zh').notEmpty().withMessage('繁体字中国語の内容は必須です'),
    check('content.ja').notEmpty().withMessage('日本語の内容は必須です'),
    check('content.en').notEmpty().withMessage('英語の内容は必須です'),
    check('category.zh').notEmpty().withMessage('繁体字中国語のカテゴリは必須です'),
    check('category.ja').notEmpty().withMessage('日本語のカテゴリは必須です'),
    check('category.en').notEmpty().withMessage('英語のカテゴリは必須です')
  ],
  validationMiddleware,
  newsController.createNews
);

// 管理者向けAPI: ニュース情報の更新 (認証必須)
router.put(
  '/:id',
  authenticate,
  isAdmin,
  newsController.updateNews
);

// 管理者向けAPI: ニュースの削除 (認証必須)
router.delete(
  '/:id',
  authenticate,
  isAdmin,
  newsController.deleteNews
);

module.exports = router;