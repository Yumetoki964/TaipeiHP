/**
 * 講師データモデル
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
 * 講師スキーマ
 */
const teacherSchema = new mongoose.Schema(
  {
    name: multiLangStringSchema,
    specialties: multiLangArraySchema,
    biography: multiLangStringSchema,
    image: {
      type: String,
      required: [true, '講師画像は必須です']
    },
    isActive: {
      type: Boolean,
      default: true
    },
    sortOrder: {
      type: Number,
      default: 0
    },
    school: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'School'
    },
    courses: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Course'
    }],
    subjects: multiLangArraySchema,
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

// インデックスの設定
teacherSchema.index({ 'name.zh': 1 });
teacherSchema.index({ 'name.ja': 1 });
teacherSchema.index({ 'name.en': 1 });
teacherSchema.index({ isActive: 1 });
teacherSchema.index({ sortOrder: 1 });
teacherSchema.index({ school: 1 });

/**
 * 活動中の講師のみを取得する静的メソッド
 * @returns {Query} Mongooseクエリオブジェクト
 */
teacherSchema.statics.findActive = function() {
  return this.find({ isActive: true }).sort({ sortOrder: 1 });
};

/**
 * 校舎別に講師を取得する静的メソッド
 * @param {string} schoolId - 校舎のID
 * @returns {Query} Mongooseクエリオブジェクト
 */
teacherSchema.statics.findBySchool = function(schoolId) {
  return this.find({ 
    isActive: true,
    school: schoolId 
  }).sort({ sortOrder: 1 });
};

const Teacher = mongoose.model('Teacher', teacherSchema);

module.exports = Teacher;