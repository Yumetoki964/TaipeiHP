/**
 * データベース接続設定
 */
const mongoose = require('mongoose');
const logger = require('../utils/logger');

/**
 * データベースに接続する
 * @returns {Promise<void>}
 */
const connectDatabase = async () => {
  try {
    // 開発環境ではモックデータを使用するためMongoDB接続をスキップ可能
    if (process.env.NODE_ENV === 'development' && process.env.MOCK_DB === 'true') {
      logger.info('開発環境: モックデータベースモード。MongoDB接続をスキップします。');
      return { connection: { host: 'mock-db-server' } };
    }

    const options = {
      dbName: process.env.DB_NAME || 'yumetoki',
      // useUnifiedTopologyオプションは非推奨ですが、警告を出しても接続には影響しないため残します
      useUnifiedTopology: true
    };

    logger.info(`MongoDB Atlas に接続しています...`);
    
    // 接続文字列の最初の部分だけをログに表示（セキュリティのため）
    const displayUri = process.env.MONGODB_URI 
      ? `${process.env.MONGODB_URI.split('@')[0].substring(0, 15)}...` 
      : 'URI未設定';
    logger.debug(`接続URI: ${displayUri}`);
    logger.debug(`DB_NAME: ${process.env.DB_NAME}`);
    
    if (!process.env.MONGODB_URI) {
      throw new Error('MONGODB_URIが設定されていません。');
    }

    const connection = await mongoose.connect(process.env.MONGODB_URI, options);

    logger.info(`MongoDB 接続成功: ${connection.connection.host}`);
    
    // 接続イベントの監視
    mongoose.connection.on('error', err => {
      logger.error(`MongoDB 接続エラー: ${err}`);
    });

    mongoose.connection.on('disconnected', () => {
      logger.warn('MongoDB 接続が切断されました');
    });

    return connection;
  } catch (error) {
    logger.error(`MongoDB 接続エラー: ${error.message}`);
    
    // 開発環境ではエラーを無視して続行可能
    if (process.env.NODE_ENV === 'development') {
      logger.warn('開発環境: MongoDB接続エラーを無視して続行します');
      return { connection: { host: 'mock-db-server' } };
    }
    
    throw error;
  }
};

module.exports = {
  connectDatabase
};