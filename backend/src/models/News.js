/**
 * ニュースデータモデル
 */
const mongoose = require('mongoose');

/**
 * 多言語フィールドのスキーマ
 */
const multiLangStringSchema = {
  zh: {
    type: String,
    required: [true, '繁体字中国語は必須です']
  },
  ja: {
    type: String,
    required: [true, '日本語は必須です']
  },
  en: {
    type: String,
    required: [true, '英語は必須です']
  }
};

/**
 * ニューススキーマ
 */
const newsSchema = new mongoose.Schema(
  {
    title: multiLangStringSchema,
    content: multiLangStringSchema,
    date: {
      type: Date,
      required: [true, '日付は必須です'],
      default: Date.now
    },
    category: multiLangStringSchema,
    image: {
      type: String,
      default: null
    },
    isPublished: {
      type: Boolean,
      default: true
    },
    isHighlighted: {
      type: Boolean,
      default: false
    },
    school: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'School',
      default: null
    },
    slug: {
      type: String,
      unique: true,
      sparse: true,
      trim: true
    },
    tags: [{
      type: String,
      trim: true
    }]
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

// インデックスの設定
newsSchema.index({ 'title.zh': 1 });
newsSchema.index({ 'title.ja': 1 });
newsSchema.index({ 'title.en': 1 });
newsSchema.index({ date: -1 });
newsSchema.index({ isPublished: 1 });
newsSchema.index({ isHighlighted: 1 });
newsSchema.index({ slug: 1 }, { unique: true, sparse: true });
newsSchema.index({ tags: 1 });

/**
 * ニュース記事のURLを生成する仮想フィールド
 */
newsSchema.virtual('url').get(function() {
  return this.slug ? `/news/${this.slug}` : `/news/${this._id}`;
});

/**
 * 公開済みのニュースのみを取得する静的メソッド
 * @returns {Query} Mongooseクエリオブジェクト
 */
newsSchema.statics.findPublished = function() {
  return this.find({ isPublished: true }).sort({ date: -1 });
};

/**
 * ハイライト（注目）のニュースを取得する静的メソッド
 * @param {number} limit - 取得する件数
 * @returns {Query} Mongooseクエリオブジェクト
 */
newsSchema.statics.findHighlighted = function(limit = 5) {
  return this.find({ 
    isPublished: true,
    isHighlighted: true 
  })
  .sort({ date: -1 })
  .limit(limit);
};

/**
 * 最近のニュースを取得する静的メソッド
 * @param {number} limit - 取得する件数
 * @returns {Query} Mongooseクエリオブジェクト
 */
newsSchema.statics.findRecent = function(limit = 5) {
  return this.find({ isPublished: true })
    .sort({ date: -1 })
    .limit(limit);
};

const News = mongoose.model('News', newsSchema);

module.exports = News;