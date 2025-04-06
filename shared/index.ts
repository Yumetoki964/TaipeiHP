/**
 * ===== 統合型定義・APIパスガイドライン =====
 * 
 * 【絶対に守るべき原則】
 * 1. フロントエンドとバックエンドで異なる型を作らない
 * 2. 同じデータ構造に対して複数の型を作らない
 * 3. 新しいプロパティは必ずオプショナルとして追加
 * 4. データの形は1箇所でのみ定義し、それを共有する
 * 5. APIパスは必ずこのファイルで一元管理する
 * 6. コード内でAPIパスをハードコードしない
 * 7. パスパラメータを含むエンドポイントは関数として提供する
 * 
 * 【命名規則】
 * - データモデル: [Model]Type または I[Model]
 * - リクエスト: [Model]Request
 * - レスポンス: [Model]Response
 * 
 * 【APIパス構造例】
 * export const API_BASE_PATH = '/api/v1';
 * 
 * export const AUTH = {
 *   LOGIN: `${API_BASE_PATH}/auth/login`,
 *   REGISTER: `${API_BASE_PATH}/auth/register`,
 *   PROFILE: `${API_BASE_PATH}/auth/profile`,
 *   // パスパラメータを含む場合は関数を定義
 *   USER_DETAIL: (userId: string) => `${API_BASE_PATH}/auth/users/${userId}`
 * };
 * 
 * 【変更履歴】
 * - 2025/04/04: 初期モデル・APIパス定義 (AI/Claude)
 * - 2025/04/04: CompanyInfoType、CompanyHistoryType、SisterCompanyType、CompanyValueType、COMPANY_INFOを追加 (小野)
 */

// APIのベースパス
export const API_BASE_PATH = '/api/v1';

// =====================
// データモデル
// =====================

// 会社情報
export interface CompanyInfoType {
  name: {
    zh: string;
    ja: string;
    en: string;
  };
  foundingYear: string;
  representative: {
    zh: string;
    ja: string;
    en: string;
  };
  address: {
    zh: string;
    ja: string;
    en: string;
  };
  phone: string;
  email: string;
  registrationNumber?: string;
}

// 会社の歴史項目
export interface CompanyHistoryType {
  year: string;
  month?: string;
  title: {
    zh: string;
    ja: string;
    en: string;
  };
  description: {
    zh: string;
    ja: string;
    en: string;
  };
  image?: string;
}

// 企業理念・ビジョン
export interface CompanyValueType {
  title: {
    zh: string;
    ja: string;
    en: string;
  };
  description: {
    zh: string;
    ja: string;
    en: string;
  };
  icon?: string;
}

// 姉妹会社情報
export interface SisterCompanyType {
  name: {
    zh: string;
    ja: string;
    en: string;
  };
  description: {
    zh: string;
    ja: string;
    en: string;
  };
  location: {
    zh: string;
    ja: string;
    en: string;
  };
  website?: string;
  logo?: string;
  images?: string[];
}

// 校舎情報
export interface SchoolType {
  id: string;
  name: {
    zh: string;
    ja: string;
    en: string;
  };
  address: {
    zh: string;
    ja: string;
    en: string;
  };
  phone: string;
  features: {
    zh: string[];
    ja: string[];
    en: string[];
  };
  hours: {
    weekdays: {
      zh: string;
      ja: string;
      en: string;
    };
    weekends: {
      zh: string;
      ja: string;
      en: string;
    };
  };
  access: {
    directions: {
      zh: string;
      ja: string;
      en: string;
    };
  };
  mapUrl: string;
  images: string[];
  imageDescriptions: {
    zh: string[];
    ja: string[];
    en: string[];
  };
}

// コース情報
export interface CourseType {
  id: string;
  name: {
    zh: string;
    ja: string;
    en: string;
  };
  description: {
    zh: string;
    ja: string;
    en: string;
  };
  targetAge: {
    zh: string;
    ja: string;
    en: string;
  };
  features: {
    zh: string[];
    ja: string[];
    en: string[];
  };
  pricing?: {
    zh: string;
    ja: string;
    en: string;
  };
  image?: string;
}

// 講師情報
export interface TeacherType {
  id: string;
  name: {
    zh: string;
    ja: string;
    en: string;
  };
  specialties: {
    zh: string[];
    ja: string[];
    en: string[];
  };
  biography: {
    zh: string;
    ja: string;
    en: string;
  };
  image: string;
}

// ニュース・お知らせ
export interface NewsType {
  id: string;
  title: {
    zh: string;
    ja: string;
    en: string;
  };
  content: {
    zh: string;
    ja: string;
    en: string;
  };
  date: string; // ISO 8601形式 (YYYY-MM-DD)
  category: {
    zh: string;
    ja: string;
    en: string;
  };
  image?: string;
}

// お問い合わせフォーム
export interface ContactRequest {
  name: string;
  email: string;
  phone?: string;
  message: string;
  category: 'general' | 'course' | 'trial';
  preferredLanguage: 'zh' | 'ja' | 'en';
}

export interface ContactResponse {
  success: boolean;
  message: {
    zh: string;
    ja: string;
    en: string;
  };
  id?: string;
}

// 体験授業申し込みフォーム
export interface TrialLessonRequest {
  studentName: string;
  parentName?: string;
  email: string;
  phone: string;
  age: number;
  schoolGrade?: string;
  courseInterest: string;
  preferredSchool: string;
  preferredDate: string[];
  preferredTime: string[];
  message?: string;
  preferredLanguage: 'zh' | 'ja' | 'en';
}

export interface TrialLessonResponse {
  success: boolean;
  message: {
    zh: string;
    ja: string;
    en: string;
  };
  id?: string;
  scheduledDate?: string;
  scheduledTime?: string;
}

// =====================
// APIエンドポイント
// =====================

// 校舎情報API
export const SCHOOLS = {
  LIST: `${API_BASE_PATH}/schools`,
  DETAIL: (schoolId: string) => `${API_BASE_PATH}/schools/${schoolId}`
};

// コース情報API
export const COURSES = {
  LIST: `${API_BASE_PATH}/courses`,
  DETAIL: (courseId: string) => `${API_BASE_PATH}/courses/${courseId}`
};

// 講師情報API
export const TEACHERS = {
  LIST: `${API_BASE_PATH}/teachers`,
  DETAIL: (teacherId: string) => `${API_BASE_PATH}/teachers/${teacherId}`
};

// ニュース・お知らせAPI
export const NEWS = {
  LIST: `${API_BASE_PATH}/news`,
  DETAIL: (newsId: string) => `${API_BASE_PATH}/news/${newsId}`
};

// お問い合わせフォームAPI
export const CONTACT = {
  SUBMIT: `${API_BASE_PATH}/contact`
};

// 体験授業申し込みAPI
export const TRIAL_LESSON = {
  SUBMIT: `${API_BASE_PATH}/trial-lesson`,
  AVAILABLE_SLOTS: `${API_BASE_PATH}/trial-lesson/available-slots`
};

// 会社情報API
export const COMPANY_INFO = {
  DETAIL: `${API_BASE_PATH}/company`,
  HISTORY: `${API_BASE_PATH}/company/history`,
  VALUES: `${API_BASE_PATH}/company/values`,
  SISTER_COMPANY: `${API_BASE_PATH}/company/sister-company`
};