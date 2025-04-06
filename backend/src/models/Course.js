/**
 * コースデータモデル
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
 * 多言語配列フィールドのスキーマ
 */
const multiLangArraySchema = {
  zh: {
    type: [String],
    required: [true, '繁体字中国語は必須です']
  },
  ja: {
    type: [String],
    required: [true, '日本語は必須です']
  },
  en: {
    type: [String],
    required: [true, '英語は必須です']
  }
};

/**
 * コーススキーマ
 */
const courseSchema = new mongoose.Schema(
  {
    name: multiLangStringSchema,
    description: multiLangStringSchema,
    targetAge: multiLangStringSchema,
    features: multiLangArraySchema,
    pricing: multiLangStringSchema,
    image: {
      type: String,
      default: null
    },
    isActive: {
      type: Boolean,
      default: true
    },
    sortOrder: {
      type: Number,
      default: 0
    },
    schools: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'School'
    }],
    category: {
      type: String,
      enum: ['elementary', 'junior', 'high', 'adult', 'other'],
      default: 'other'
    }
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

// インデックスの設定
courseSchema.index({ 'name.zh': 1 });
courseSchema.index({ 'name.ja': 1 });
courseSchema.index({ 'name.en': 1 });
courseSchema.index({ isActive: 1 });
courseSchema.index({ sortOrder: 1 });
courseSchema.index({ category: 1 });

/**
 * 活動中のコースのみを取得する静的メソッド
 * @returns {Query} Mongooseクエリオブジェクト
 */
courseSchema.statics.findActive = function() {
  return this.find({ isActive: true }).sort({ category: 1, sortOrder: 1 });
};

/**
 * カテゴリ別にコースを取得する静的メソッド
 * @param {string} category - コースカテゴリ
 * @returns {Query} Mongooseクエリオブジェクト
 */
courseSchema.statics.findByCategory = function(category) {
  return this.find({ 
    isActive: true,
    category 
  }).sort({ sortOrder: 1 });
};

const Course = mongoose.model('Course', courseSchema);

module.exports = Course;