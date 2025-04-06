/**
 * MongoDB接続テストスクリプト
 * 
 * 現在の.env設定を使用してMongoDBへの接続をテストします
 */

// 環境変数の読み込み
require('dotenv').config();

const mongoose = require('mongoose');

// 接続文字列を取得
const MONGODB_URI = process.env.MONGODB_URI;
const DB_NAME = process.env.DB_NAME;

if (!MONGODB_URI) {
  console.error('エラー: MONGODB_URI 環境変数が設定されていません');
  process.exit(1);
}

console.log('使用する接続文字列:');
// パスワードを隠した接続文字列を表示
const maskedURI = MONGODB_URI.replace(
  /mongodb(\+srv)?:\/\/([^:]+):([^@]+)@/,
  'mongodb$1://$2:******@'
);
console.log(maskedURI);
console.log(`データベース名: ${DB_NAME || 'デフォルト'}`);

// MongoDB接続オプション
const options = {
  dbName: DB_NAME
};

console.log('MongoDB接続テストを開始します...');

// 接続テスト
mongoose.connect(MONGODB_URI, options)
  .then(() => {
    console.log('✅ MongoDB接続成功!');
    
    // データベース情報を表示
    console.log('\nデータベース情報:');
    console.log(`- 接続ホスト: ${mongoose.connection.host}`);
    console.log(`- データベース名: ${mongoose.connection.name}`);
    
    // コレクション一覧を取得して表示
    return mongoose.connection.db.listCollections().toArray();
  })
  .then(collections => {
    console.log('\n利用可能なコレクション一覧:');
    if (collections.length === 0) {
      console.log('- コレクションがありません');
    } else {
      collections.forEach(collection => {
        console.log(`- ${collection.name}`);
      });
    }
    
    // 接続を閉じる
    return mongoose.connection.close();
  })
  .then(() => {
    console.log('\n接続を閉じました');
    process.exit(0);
  })
  .catch(err => {
    console.error('\n❌ MongoDB接続エラー:');
    console.error(err);
    process.exit(1);
  });