/**
 * MongoDB Atlas接続テストスクリプト (シンプル版)
 */

// 環境変数の読み込み
require('dotenv').config();

// 純粋なmongodbドライバーを使用
const { MongoClient } = require('mongodb');

// 接続文字列
const MONGODB_URI = "mongodb+srv://crossono:nyny10021@cluster0.7g3vlbp.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

if (!MONGODB_URI) {
  console.error('エラー: MONGODB_URI が設定されていません');
  process.exit(1);
}

// パスワードを隠した接続文字列を表示
const maskedURI = MONGODB_URI.replace(
  /mongodb(\+srv)?:\/\/([^:]+):([^@]+)@/,
  'mongodb$1://$2:******@'
);
console.log('Atlas接続テストを実行します...');
console.log('使用する接続文字列:', maskedURI);

// モンゴクライアントを作成
const client = new MongoClient(MONGODB_URI);

async function run() {
  try {
    console.log('接続中...');
    await client.connect();
    console.log('✅ MongoDB Atlas接続成功!');
    
    const db = client.db();
    console.log(`データベース: ${db.databaseName}`);
    
    try {
      // サーバー情報を取得（権限がない場合はスキップ）
      const serverInfo = await db.command({ serverStatus: 1 });
      console.log('サーバー情報:');
      console.log(`- バージョン: ${serverInfo.version}`);
      console.log(`- 接続数: ${serverInfo.connections.current}`);
    } catch (err) {
      console.log('サーバー情報の取得はスキップされました（権限不足）');
    }
    
    // コレクション一覧を取得
    const collections = await db.listCollections().toArray();
    console.log('\n利用可能なコレクション:');
    if (collections.length === 0) {
      console.log('- コレクションがありません');
    } else {
      collections.forEach(collection => {
        console.log(`- ${collection.name}`);
      });
    }
    
    return 'テスト完了';
  } catch (err) {
    console.error('❌ 接続エラー:', err);
    throw err;
  } finally {
    await client.close();
    console.log('接続を閉じました');
  }
}

// テスト実行
run()
  .then(console.log)
  .catch(console.error)
  .finally(() => process.exit());