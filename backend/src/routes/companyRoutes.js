/**
 * 会社情報API ルート
 */
const express = require('express');
const router = express.Router();
const companyController = require('../controllers/companyController');

// 会社情報の取得
router.get('/', companyController.getCompanyInfo);

// 会社の歴史の取得
router.get('/history', companyController.getCompanyHistory);

// 会社の理念・ビジョンの取得
router.get('/values', companyController.getCompanyValues);

// 姉妹会社情報の取得
router.get('/sister-company', companyController.getSisterCompany);

module.exports = router;