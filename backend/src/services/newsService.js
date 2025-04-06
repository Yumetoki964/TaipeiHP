/**
 * ニュース情報サービス
 * ニュース情報のビジネスロジックとデータアクセスを提供するサービス
 */
const News = require('../models/News');
const logger = require('../utils/logger');

/**
 * すべてのニュース情報を取得する
 * @param {number} limit - 取得件数制限（省略可）
 * @returns {Promise<Array>} ニュース情報の配列
 */
exports.getAllNews = async (limit) => {
  try {
    let query = News.find().sort({ date: -1 });
    
    if (limit) {
      query = query.limit(limit);
    }
    
    const news = await query;
    return news;
  } catch (error) {
    logger.error(`全ニュース取得エラー: ${error.message}`);
    throw error;
  }
};

/**
 * 公開中のニュースのみを取得する
 * @param {number} limit - 取得件数制限（省略可）
 * @returns {Promise<Array>} 公開中のニュース情報の配列
 */
exports.getPublishedNews = async (limit) => {
  try {
    let query = News.findPublished();
    
    if (limit) {
      query = query.limit(limit);
    }
    
    const news = await query;
    return news;
  } catch (error) {
    logger.error(`公開中ニュース取得エラー: ${error.message}`);
    throw error;
  }
};

/**
 * ハイライトされたニュースを取得する
 * @param {number} limit - 取得件数（デフォルト: 5）
 * @returns {Promise<Array>} ハイライトニュース情報の配列
 */
exports.getHighlightedNews = async (limit = 5) => {
  try {
    const news = await News.findHighlighted(limit);
    return news;
  } catch (error) {
    logger.error(`ハイライトニュース取得エラー: ${error.message}`);
    throw error;
  }
};

/**
 * 特定のニュース情報をIDで取得する
 * @param {string} id - ニュースID
 * @returns {Promise<Object>} ニュース情報オブジェクト
 */
exports.getNewsById = async (id) => {
  try {
    const news = await News.findById(id);
    return news;
  } catch (error) {
    logger.error(`ニュースID検索エラー: ${error.message}`);
    throw error;
  }
};

/**
 * ニュース情報をスラッグで取得する
 * @param {string} slug - ニューススラッグ
 * @returns {Promise<Object>} ニュース情報オブジェクト
 */
exports.getNewsBySlug = async (slug) => {
  try {
    const news = await News.findOne({ slug, isPublished: true });
    return news;
  } catch (error) {
    logger.error(`ニューススラッグ検索エラー: ${error.message}`);
    throw error;
  }
};

/**
 * 新しいニュースを作成する
 * @param {Object} newsData - ニュースデータ
 * @returns {Promise<Object>} 作成されたニュースオブジェクト
 */
exports.createNews = async (newsData) => {
  try {
    // スラッグがない場合はタイトルから生成
    if (!newsData.slug && newsData.title && newsData.title.en) {
      const baseSlug = newsData.title.en
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-|-$/g, '');
      
      // 同じスラッグが存在するか確認
      const slugExists = await News.findOne({ slug: baseSlug });
      
      if (slugExists) {
        // 既存のスラッグがある場合はタイムスタンプを追加
        newsData.slug = `${baseSlug}-${Date.now()}`;
      } else {
        newsData.slug = baseSlug;
      }
    }
    
    // デフォルト値の設定
    const newsWithDefaults = {
      ...newsData,
      date: newsData.date || new Date(),
      isPublished: newsData.hasOwnProperty('isPublished') ? newsData.isPublished : true,
      isHighlighted: newsData.hasOwnProperty('isHighlighted') ? newsData.isHighlighted : false
    };
    
    const news = await News.create(newsWithDefaults);
    return news;
  } catch (error) {
    logger.error(`ニュース作成エラー: ${error.message}`);
    throw error;
  }
};

/**
 * ニュース情報を更新する
 * @param {string} id - ニュースID
 * @param {Object} updateData - 更新データ
 * @returns {Promise<Object>} 更新されたニュースオブジェクト
 */
exports.updateNews = async (id, updateData) => {
  try {
    // スラッグが更新される場合、重複チェック
    if (updateData.slug) {
      const slugExists = await News.findOne({ 
        slug: updateData.slug,
        _id: { $ne: id }
      });
      
      if (slugExists) {
        // 既存のスラッグがある場合はタイムスタンプを追加
        updateData.slug = `${updateData.slug}-${Date.now()}`;
      }
    }
    
    const news = await News.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true }
    );
    return news;
  } catch (error) {
    logger.error(`ニュース更新エラー: ${error.message}`);
    throw error;
  }
};

/**
 * ニュースを削除する
 * @param {string} id - ニュースID
 * @returns {Promise<boolean>} 削除結果
 */
exports.deleteNews = async (id) => {
  try {
    const result = await News.findByIdAndDelete(id);
    return !!result;
  } catch (error) {
    logger.error(`ニュース削除エラー: ${error.message}`);
    throw error;
  }
};