/**
 * メインルーターファイル
 * 全てのAPIルートをマウントする
 */
const express = require('express');
const router = express.Router();
const schoolRoutes = require('./schoolRoutes');
const courseRoutes = require('./courseRoutes');
const teacherRoutes = require('./teacherRoutes');
const newsRoutes = require('./newsRoutes');
const contactRoutes = require('./contactRoutes');
const trialLessonRoutes = require('./trialLessonRoutes');
const companyRoutes = require('./companyRoutes');

// APIステータスエンドポイント
router.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    message: {
      zh: 'API 正常運行中',
      ja: 'APIは正常に動作しています',
      en: 'API is running properly'
    },
    version: process.env.API_VERSION || 'v1',
    timestamp: new Date()
  });
});

// 各種ルートをマウント
router.use('/schools', schoolRoutes);
router.use('/courses', courseRoutes);
router.use('/teachers', teacherRoutes);
router.use('/news', newsRoutes);
router.use('/contact', contactRoutes);
router.use('/trial-lesson', trialLessonRoutes);
router.use('/company', companyRoutes);

module.exports = router;