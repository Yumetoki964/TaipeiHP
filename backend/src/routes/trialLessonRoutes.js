/**
 * 体験授業申し込みAPI ルート
 */
const express = require('express');
const router = express.Router();
const { authenticate, isAdmin } = require('../middlewares/authMiddleware');
const { validationMiddleware } = require('../middlewares/errorMiddleware');
const { check } = require('express-validator');
const trialLessonController = require('../controllers/trialLessonController');

// 体験授業申し込み送信
router.post(
  '/',
  [
    check('studentName').notEmpty().withMessage('生徒名は必須です'),
    check('email').isEmail().withMessage('有効なメールアドレスを入力してください'),
    check('phone').notEmpty().withMessage('電話番号は必須です'),
    check('age').isInt({ min: 3, max: 100 }).withMessage('年齢は3〜100の間で入力してください'),
    check('courseInterest').notEmpty().withMessage('興味のあるコースは必須です'),
    check('preferredSchool').notEmpty().withMessage('希望校舎は必須です'),
    check('preferredDate').isArray({ min: 1 }).withMessage('希望日は少なくとも1つ選択してください'),
    check('preferredTime').isArray({ min: 1 }).withMessage('希望時間は少なくとも1つ選択してください'),
    check('preferredLanguage').isIn(['zh', 'ja', 'en']).withMessage('無効な言語設定です')
  ],
  validationMiddleware,
  trialLessonController.submitTrialLesson
);

// 利用可能な体験授業の時間枠を取得
router.get(
  '/available-slots',
  trialLessonController.getAvailableTimeSlots
);

// 管理者向けAPI: 体験授業申し込み一覧の取得 (認証必須)
router.get(
  '/',
  authenticate,
  isAdmin,
  trialLessonController.getAllTrialLessons
);

// 管理者向けAPI: 特定の体験授業申し込みの詳細を取得 (認証必須)
router.get(
  '/:id',
  authenticate,
  isAdmin,
  trialLessonController.getTrialLessonById
);

// 管理者向けAPI: 体験授業申し込みステータスの更新 (認証必須)
router.patch(
  '/:id/status',
  authenticate,
  isAdmin,
  [
    check('status').isIn(['pending', 'confirmed', 'completed', 'canceled']).withMessage('無効なステータスです')
  ],
  validationMiddleware,
  trialLessonController.updateTrialLessonStatus
);

// 管理者向けAPI: 体験授業の日時を確定する (認証必須)
router.patch(
  '/:id/confirm',
  authenticate,
  isAdmin,
  [
    check('scheduledDate').notEmpty().withMessage('予定日は必須です'),
    check('scheduledTime').notEmpty().withMessage('予定時間は必須です')
  ],
  validationMiddleware,
  trialLessonController.confirmTrialLesson
);

// 管理者向けAPI: 体験授業申し込みへのメモ追加 (認証必須)
router.patch(
  '/:id/notes',
  authenticate,
  isAdmin,
  [
    check('notes').notEmpty().withMessage('メモは必須です')
  ],
  validationMiddleware,
  trialLessonController.addTrialLessonNotes
);

// 管理者向けAPI: 体験授業申し込みの削除 (認証必須)
router.delete(
  '/:id',
  authenticate,
  isAdmin,
  trialLessonController.deleteTrialLesson
);

module.exports = router;