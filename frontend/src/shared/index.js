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
 * 【変更履歴】
 * - 2025/04/04: 初期モデル・APIパス定義 (AI/Claude)
 * - 2025/04/04: CompanyInfoType、CompanyHistoryType、SisterCompanyType、CompanyValueType、COMPANY_INFOを追加 (小野)
 */

// APIのベースパス
export const API_BASE_PATH = '/api/v1';

// ニュース・お知らせAPI
export const NEWS = {
  LIST: `${API_BASE_PATH}/news`,
  DETAIL: (newsId) => `${API_BASE_PATH}/news/${newsId}`
};

// 校舎情報API
export const SCHOOLS = {
  LIST: `${API_BASE_PATH}/schools`,
  DETAIL: (schoolId) => `${API_BASE_PATH}/schools/${schoolId}`
};

// コース情報API
export const COURSES = {
  LIST: `${API_BASE_PATH}/courses`,
  DETAIL: (courseId) => `${API_BASE_PATH}/courses/${courseId}`
};

// 講師情報API
export const TEACHERS = {
  LIST: `${API_BASE_PATH}/teachers`,
  DETAIL: (teacherId) => `${API_BASE_PATH}/teachers/${teacherId}`
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