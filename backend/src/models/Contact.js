/**
 * お問い合わせデータモデル
 */
const mongoose = require('mongoose');

/**
 * お問い合わせスキーマ
 */
const contactSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, '名前は必須です'],
      trim: true
    },
    email: {
      type: String,
      required: [true, 'メールアドレスは必須です'],
      trim: true,
      lowercase: true,
      match: [
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
        '有効なメールアドレスを入力してください'
      ]
    },
    phone: {
      type: String,
      trim: true
    },
    message: {
      type: String,
      required: [true, 'メッセージは必須です']
    },
    category: {
      type: String,
      enum: ['general', 'course', 'trial'],
      default: 'general'
    },
    preferredLanguage: {
      type: String,
      enum: ['zh', 'ja', 'en'],
      default: 'zh'
    },
    status: {
      type: String,
      enum: ['new', 'inProgress', 'completed'],
      default: 'new'
    },
    notes: {
      type: String
    },
    assignedTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      default: null
    },
    ipAddress: {
      type: String
    },
    userAgent: {
      type: String
    }
  },
  {
    timestamps: true
  }
);

// インデックスの設定
contactSchema.index({ createdAt: -1 });
contactSchema.index({ category: 1 });
contactSchema.index({ status: 1 });
contactSchema.index({ preferredLanguage: 1 });
contactSchema.index({ assignedTo: 1 });

/**
 * 新規のお問い合わせを検索する静的メソッド
 * @returns {Query} Mongooseクエリオブジェクト
 */
contactSchema.statics.findNew = function() {
  return this.find({ status: 'new' }).sort({ createdAt: -1 });
};

/**
 * カテゴリ別にお問い合わせを検索する静的メソッド
 * @param {string} category - お問い合わせカテゴリ
 * @returns {Query} Mongooseクエリオブジェクト
 */
contactSchema.statics.findByCategory = function(category) {
  return this.find({ category }).sort({ createdAt: -1 });
};

const Contact = mongoose.model('Contact', contactSchema);

module.exports = Contact;