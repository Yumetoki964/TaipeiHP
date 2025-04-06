/**
 * API エンドポイントテスト
 * バックエンドの各エンドポイントが正常に動作するかテストします
 */
const axios = require('axios');
const logger = require('./src/utils/logger');

// テスト対象のベースURL
const BASE_URL = 'http://localhost:5001/api/v1';

// テスト対象のエンドポイント一覧
const endpoints = [
  // ステータスエンドポイント
  { path: '/', method: 'get', name: 'APIステータス', auth: false },
  
  // 校舎関連
  { path: '/schools', method: 'get', name: '校舎一覧', auth: false },
  
  // コース関連
  { path: '/courses', method: 'get', name: 'コース一覧', auth: false },
  
  // 講師関連
  { path: '/teachers', method: 'get', name: '講師一覧', auth: false },
  
  // ニュース関連
  { path: '/news', method: 'get', name: 'ニュース一覧', auth: false },
  
  // 会社情報関連
  { path: '/company', method: 'get', name: '会社情報', auth: false },
  { path: '/company/history', method: 'get', name: '会社の歴史', auth: false },
  { path: '/company/values', method: 'get', name: '会社の理念・ビジョン', auth: false },
  { path: '/company/sister-company', method: 'get', name: '姉妹会社情報', auth: false },
  
  // 体験授業関連
  { path: '/trial-lesson/available-slots', method: 'get', name: '体験授業の利用可能時間枠', auth: false }
];

// テスト実行関数
async function testEndpoint(endpoint) {
  const url = `${BASE_URL}${endpoint.path}`;
  
  try {
    logger.info(`テスト: ${endpoint.name} (${endpoint.method.toUpperCase()} ${url})`);
    
    const response = await axios({
      method: endpoint.method,
      url,
      timeout: 15000 // タイムアウトを15秒に延長
    });
    
    logger.info(`✅ 成功: ${endpoint.name} - ステータスコード: ${response.status}`);
    return {
      name: endpoint.name,
      path: endpoint.path,
      status: 'success',
      statusCode: response.status
    };
  } catch (error) {
    const statusCode = error.response ? error.response.status : 'N/A';
    const errorMessage = error.response 
      ? error.response.data.message 
        ? (typeof error.response.data.message === 'object' 
            ? JSON.stringify(error.response.data.message) 
            : error.response.data.message)
        : error.response.data
      : error.message;
    
    logger.error(`❌ 失敗: ${endpoint.name} - ステータスコード: ${statusCode} - エラー: ${errorMessage}`);
    return {
      name: endpoint.name,
      path: endpoint.path,
      status: 'failure',
      statusCode,
      error: errorMessage
    };
  }
}

// 全エンドポイントのテスト実行
async function runTests() {
  logger.info('=== APIエンドポイントテスト開始 ===');
  
  // サーバー接続確認
  try {
    // 直接APIルートにアクセスしてサーバー稼働を確認
    await axios.get(`${BASE_URL}`, { timeout: 10000 });
    logger.info('サーバーへの接続に成功しました');
  } catch (error) {
    logger.error(`サーバーへの接続に失敗しました: ${error.message}`);
    logger.error('サーバーが起動しているか確認してください');
    return;
  }
  
  const results = [];
  let successCount = 0;
  let failureCount = 0;
  
  for (const endpoint of endpoints) {
    const result = await testEndpoint(endpoint);
    results.push(result);
    
    if (result.status === 'success') {
      successCount++;
    } else {
      failureCount++;
    }
  }
  
  // テスト結果サマリー
  logger.info('\n=== テスト結果サマリー ===');
  logger.info(`総テスト数: ${results.length}`);
  logger.info(`成功: ${successCount}`);
  logger.info(`失敗: ${failureCount}`);
  
  // 失敗したテストがあれば詳細表示
  if (failureCount > 0) {
    logger.info('\n=== 失敗したテスト ===');
    const failedTests = results.filter(r => r.status === 'failure');
    failedTests.forEach(test => {
      logger.info(`- ${test.name} (${test.path}): ${test.error}`);
    });
  }
  
  logger.info('\n=== APIエンドポイントテスト完了 ===');
}

// テスト実行
runTests().catch(error => {
  logger.error(`テスト実行中にエラーが発生しました: ${error.message}`);
});