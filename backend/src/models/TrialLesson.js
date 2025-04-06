/**
 * 体験授業申し込みデータモデル
 */
const mongoose = require('mongoose');

/**
 * 体験授業申し込みスキーマ
 */
const trialLessonSchema = new mongoose.Schema(
  {
    studentName: {
      type: String,
      required: [true, '生徒名は必須です'],
      trim: true
    },
    parentName: {
      type: String,
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
      required: [true, '電話番号は必須です'],
      trim: true
    },
    age: {
      type: Number,
      required: [true, '年齢は必須です'],
      min: [3, '年齢は3歳以上である必要があります'],
      max: [100, '年齢は100歳以下である必要があります']
    },
    schoolGrade: {
      type: String,
      trim: true
    },
    courseInterest: {
      type: String,
      required: [true, '興味のあるコースは必須です']
    },
    preferredSchool: {
      type: String,
      required: [true, '希望校舎は必須です']
    },
    preferredDate: {
      type: [String],
      required: [true, '希望日は必須です'],
      validate: {
        validator: function(array) {
          return array && array.length > 0;
        },
        message: '少なくとも1つの希望日を選択してください'
      }
    },
    preferredTime: {
      type: [String],
      required: [true, '希望時間は必須です'],
      validate: {
        validator: function(array) {
          return array && array.length > 0;
        },
        message: '少なくとも1つの希望時間を選択してください'
      }
    },
    message: {
      type: String
    },
    preferredLanguage: {
      type: String,
      enum: ['zh', 'ja', 'en'],
      default: 'zh'
    },
    status: {
      type: String,
      enum: ['pending', 'confirmed', 'completed', 'canceled'],
      default: 'pending'
    },
    scheduledDate: {
      type: Date
    },
    scheduledTime: {
      type: String
    },
    assignedTeacher: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Teacher'
    },
    notes: {
      type: String
    },
    followUpDate: {
      type: Date
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
trialLessonSchema.index({ createdAt: -1 });
trialLessonSchema.index({ status: 1 });
trialLessonSchema.index({ preferredSchool: 1 });
trialLessonSchema.index({ scheduledDate: 1 });
trialLessonSchema.index({ preferredLanguage: 1 });
trialLessonSchema.index({ assignedTeacher: 1 });

/**
 * 未確定の体験授業申し込みを検索する静的メソッド
 * @returns {Query} Mongooseクエリオブジェクト
 */
trialLessonSchema.statics.findPending = function() {
  return this.find({ status: 'pending' }).sort({ createdAt: -1 });
};

/**
 * 確定した体験授業申し込みを検索する静的メソッド
 * @returns {Query} Mongooseクエリオブジェクト
 */
trialLessonSchema.statics.findConfirmed = function() {
  return this.find({ status: 'confirmed' }).sort({ scheduledDate: 1 });
};

/**
 * 特定の校舎の体験授業申し込みを検索する静的メソッド
 * @param {string} schoolId - 校舎ID
 * @returns {Query} Mongooseクエリオブジェクト
 */
trialLessonSchema.statics.findBySchool = function(schoolId) {
  return this.find({ 
    preferredSchool: schoolId,
    status: { $in: ['pending', 'confirmed'] }
  }).sort({ createdAt: -1 });
};

const TrialLesson = mongoose.model('TrialLesson', trialLessonSchema);

module.exports = TrialLesson;