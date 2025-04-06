/**
 * ローカルMongoDB接続テストスクリプト
 * 
 * localhost:27017に接続を試みます
 */

const mongoose = require('mongoose');

// ローカルの接続文字列
const MONGODB_URI = 'mongodb://localhost:27017/yumetoki_dev';
const DB_NAME = 'yumetoki_dev';

console.log('使用する接続文字列:', MONGODB_URI);
console.log(`データベース名: ${DB_NAME}`);

// MongoDB接続オプション
const options = {
  dbName: DB_NAME
};

console.log('ローカルMongoDB接続テストを開始します...');

// 接続テスト
mongoose.connect(MONGODB_URI, options)
  .then(() => {
    console.log('✅ ローカルMongoDB接続成功!');
    
    // データベース情報を表示
    console.log('\nデータベース情報:');
    console.log(`- 接続ホスト: ${mongoose.connection.host}`);
    console.log(`- データベース名: ${mongoose.connection.name}`);
    
    // 接続を閉じる
    return mongoose.connection.close();
  })
  .then(() => {
    console.log('\n接続を閉じました');
    process.exit(0);
  })
  .catch(err => {
    console.error('\n❌ ローカルMongoDB接続エラー:');
    console.error(err);
    
    console.log('\n注意: ローカルMongoDBが起動していない場合は、以下のコマンドで起動できます:');
    console.log('  mongod --dbpath=/path/to/data/db');
    console.log('または Docker を使用する場合:');
    console.log('  docker run -d -p 27017:27017 --name mongodb mongo:latest');
    
    process.exit(1);
  });