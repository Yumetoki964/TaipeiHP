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
const fs = require('fs').promises;
const path = require('path');
const logger = require('../utils/logger');

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

// 翻訳管理用エンドポイント
router.post('/locales/add/:lng/:ns', async (req, res) => {
  try {
    const { lng, ns } = req.params;
    const translations = req.body;
    
    logger.info(`翻訳の追加リクエスト: ${lng}/${ns}`);
    logger.debug('翻訳データ:', translations);
    
    // 開発環境では、フロントエンドのlocalesディレクトリに保存
    if (process.env.NODE_ENV === 'development') {
      const frontendDir = path.join(__dirname, '../../../frontend');
      const localeDir = path.join(frontendDir, 'public/locales', lng);
      const filePath = path.join(localeDir, `${ns}.json`);
      
      try {
        // ディレクトリが存在するか確認し、なければ作成
        await fs.mkdir(localeDir, { recursive: true });
        
        // 既存のファイルを読み込む
        let existingData = {};
        try {
          const fileContent = await fs.readFile(filePath, 'utf8');
          existingData = JSON.parse(fileContent);
        } catch (err) {
          if (err.code !== 'ENOENT') throw err;
          // ファイルが存在しない場合は新規作成
          logger.info(`翻訳ファイルが存在しないため新規作成: ${filePath}`);
        }
        
        // 翻訳データをマージ
        const newData = { ...existingData, ...translations };
        
        // 保存
        await fs.writeFile(filePath, JSON.stringify(newData, null, 2), 'utf8');
        logger.info(`翻訳ファイルを保存しました: ${filePath}`);
        
        return res.status(200).json({
          success: true,
          message: {
            zh: '翻譯已成功保存',
            ja: '翻訳が正常に保存されました',
            en: 'Translations saved successfully'
          }
        });
      } catch (err) {
        logger.error(`翻訳ファイル保存エラー: ${err.message}`);
        throw err;
      }
    }
    
    // 本番環境では、ただ成功を返す（実際の保存は行わない）
    return res.status(200).json({
      success: true,
      message: {
        zh: '翻譯已成功保存',
        ja: '翻訳が正常に保存されました',
        en: 'Translations saved successfully'
      }
    });
  } catch (err) {
    logger.error(`翻訳保存エラー: ${err.message}`);
    return res.status(500).json({
      success: false,
      message: {
        zh: '保存翻譯時發生錯誤',
        ja: '翻訳の保存中にエラーが発生しました',
        en: 'Error occurred while saving translations'
      },
      error: err.message
    });
  }
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