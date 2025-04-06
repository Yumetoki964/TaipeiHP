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
    const options = {
      dbName: process.env.DB_NAME || 'yumetoki',
      // ディポリケーションガイド
      useUnifiedTopology: true
    };

    logger.info(`MongoDB ${process.env.NODE_ENV === 'production' ? 'Atlas' : 'Local'} に接続しています...`);

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
    throw error;
  }
};

module.exports = {
  connectDatabase
};