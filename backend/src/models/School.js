/**
 * 校舎データモデル
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
 * 校舎スキーマ
 */
const schoolSchema = new mongoose.Schema(
  {
    name: multiLangStringSchema,
    address: multiLangStringSchema,
    phone: {
      type: String,
      required: [true, '電話番号は必須です'],
      trim: true
    },
    features: multiLangArraySchema,
    hours: {
      weekdays: multiLangStringSchema,
      weekends: multiLangStringSchema
    },
    access: {
      directions: multiLangStringSchema
    },
    mapUrl: {
      type: String,
      required: [true, 'Google Maps URLは必須です']
    },
    images: {
      type: [String],
      default: []
    },
    imageDescriptions: multiLangArraySchema,
    isActive: {
      type: Boolean,
      default: true
    },
    sortOrder: {
      type: Number,
      default: 0
    }
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

// インデックスの設定
schoolSchema.index({ 'name.zh': 1 });
schoolSchema.index({ 'name.ja': 1 });
schoolSchema.index({ 'name.en': 1 });
schoolSchema.index({ isActive: 1 });
schoolSchema.index({ sortOrder: 1 });

/**
 * 活動中の校舎のみを取得する静的メソッド
 * @returns {Query} Mongooseクエリオブジェクト
 */
schoolSchema.statics.findActive = function() {
  return this.find({ isActive: true }).sort({ sortOrder: 1 });
};

const School = mongoose.model('School', schoolSchema);

module.exports = School;