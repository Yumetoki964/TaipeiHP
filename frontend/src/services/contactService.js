import { CONTACT } from '../shared';

/**
 * お問い合わせフォームの送信処理を行うサービス
 * @param {object} formData - お問い合わせフォームのデータ
 * @param {string} formData.name - 問い合わせ者の名前
 * @param {string} formData.email - 問い合わせ者のメールアドレス
 * @param {string} formData.phone - 問い合わせ者の電話番号（任意）
 * @param {string} formData.message - 問い合わせ内容
 * @param {string} formData.category - 問い合わせカテゴリ
 * @param {string} formData.preferredLanguage - 希望する連絡言語
 * @returns {Promise<object>} レスポンスデータ
 */
export const submitContactForm = async (formData) => {
  try {
    const response = await fetch(CONTACT.SUBMIT, {
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
    console.error('Error submitting contact form:', error);
    throw error;
  }
};

/**
 * 開発環境用のモック送信処理
 * 本番環境では使用しません
 * @param {object} formData - お問い合わせフォームのデータ
 * @returns {Promise<object>} モックレスポンス
 */
export const submitContactFormMock = async (formData) => {
  // 開発時のデモンストレーション用
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log('Mock contact form submission:', formData);
      resolve({
        success: true,
        message: {
          zh: '謝謝您的訊息！我們將盡快回覆您。',
          ja: 'ありがとうございます！メッセージを受け付けました。できるだけ早くご返信いたします。',
          en: 'Thank you for your message! We will get back to you soon.'
        },
        id: `mock-${Date.now()}`
      });
    }, 1000);
  });
};