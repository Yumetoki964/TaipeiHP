import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { AVAILABLE_LANGUAGES } from '../i18n';

/**
 * 言語関連の機能をまとめたカスタムフック
 * 
 * @returns {Object} 言語関連の機能とデータ
 */
const useLanguage = () => {
  const { i18n, t } = useTranslation();

  /**
   * 現在の言語を変更する
   * 
   * @param {string} langCode - 新しい言語コード（例: 'zh', 'ja', 'en'）
   * @returns {void}
   */
  const changeLanguage = useCallback((langCode) => {
    if (AVAILABLE_LANGUAGES[langCode]) {
      i18n.changeLanguage(langCode);
      // 言語設定をlocalStorageに保存して永続化
      localStorage.setItem('i18nextLng', langCode);
    } else {
      console.warn(`Unsupported language code: ${langCode}`);
    }
  }, [i18n]);

  /**
   * 現在の言語コードを取得
   * 
   * @returns {string} 現在の言語コード
   */
  const getCurrentLanguage = useCallback(() => {
    return i18n.language?.split('-')[0] || 'zh';
  }, [i18n.language]);

  /**
   * 現在の言語情報（コード、ラベル、フラグ）を取得
   * 
   * @returns {Object} 現在の言語情報
   */
  const getCurrentLanguageInfo = useCallback(() => {
    const langCode = getCurrentLanguage();
    return AVAILABLE_LANGUAGES[langCode] || AVAILABLE_LANGUAGES['zh'];
  }, [getCurrentLanguage]);

  return {
    currentLang: getCurrentLanguage(),
    currentLangInfo: getCurrentLanguageInfo(),
    changeLanguage,
    availableLanguages: AVAILABLE_LANGUAGES,
    t,
  };
};

export default useLanguage;