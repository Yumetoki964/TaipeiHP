import { TRIAL_LESSON } from '../shared';

/**
 * 体験授業申し込みフォームの送信処理を行うサービス
 * @param {object} formData - 体験授業申し込みデータ
 * @param {string} formData.studentName - 生徒の名前
 * @param {string} formData.parentName - 保護者の名前（18歳未満の場合）
 * @param {string} formData.email - 連絡先メールアドレス
 * @param {string} formData.phone - 連絡先電話番号
 * @param {number} formData.age - 生徒の年齢
 * @param {string} formData.schoolGrade - 生徒の学年（任意）
 * @param {string} formData.courseInterest - 興味のあるコース
 * @param {string} formData.preferredSchool - 希望校舎
 * @param {string[]} formData.preferredDate - 希望日（複数可）
 * @param {string[]} formData.preferredTime - 希望時間（複数可）
 * @param {string} formData.message - 追加メッセージ（任意）
 * @param {string} formData.preferredLanguage - 希望する連絡言語
 * @returns {Promise<object>} レスポンスデータ
 */
export const submitTrialLessonForm = async (formData) => {
  try {
    const response = await fetch(TRIAL_LESSON.SUBMIT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error submitting trial lesson form:', error);
    throw error;
  }
};

/**
 * 利用可能な体験授業の日時スロットを取得
 * @returns {Promise<object>} 利用可能な日時スロット
 */
export const getAvailableTimeSlots = async () => {
  try {
    const response = await fetch(TRIAL_LESSON.AVAILABLE_SLOTS, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching available time slots:', error);
    throw error;
  }
};

/**
 * 開発環境用のモック送信処理
 * 本番環境では使用しません
 * @param {object} formData - 体験授業申し込みデータ
 * @returns {Promise<object>} モックレスポンス
 */
export const submitTrialLessonFormMock = async (formData) => {
  // 開発時のデモンストレーション用
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log('Mock trial lesson form submission:', formData);
      resolve({
        success: true,
        message: {
          zh: '謝謝您的預約！我們將盡快與您聯繫確認體驗課程詳情。',
          ja: 'お申し込みありがとうございます！体験授業の詳細について、近日中にご連絡いたします。',
          en: 'Thank you for your booking! We will contact you soon to confirm the details of your trial lesson.'
        },
        id: `mock-${Date.now()}`
      });
    }, 1000);
  });
};

/**
 * 開発環境用のモック日時スロット取得
 * 本番環境では使用しません
 * @returns {Promise<object>} モック日時スロット
 */
export const getAvailableTimeSlotsMock = async () => {
  // 開発時のデモンストレーション用
  return new Promise((resolve) => {
    setTimeout(() => {
      // 今日から14日間の日付を生成
      const dates = Array.from({ length: 14 }, (_, i) => {
        const date = new Date();
        date.setDate(date.getDate() + i + 1);
        return date.toISOString().split('T')[0];
      });

      // 時間スロット
      const timeSlots = [
        '10:00-12:00',
        '13:00-15:00',
        '15:30-17:30',
        '18:00-20:00'
      ];

      resolve({
        dates,
        timeSlots
      });
    }, 500);
  });
};