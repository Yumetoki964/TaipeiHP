import React, { createContext, useState, useEffect, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { AVAILABLE_LANGUAGES } from '../i18n';

// 言語コンテキストの作成
export const LanguageContext = createContext({
  currentLang: 'zh',
  changeLanguage: () => {},
  availableLanguages: AVAILABLE_LANGUAGES,
});

/**
 * 言語コンテキストプロバイダーコンポーネント
 * 多言語対応のための状態と機能を提供する
 */
export const LanguageProvider = ({ children }) => {
  const { i18n } = useTranslation();
  const [currentLang, setCurrentLang] = useState(
    localStorage.getItem('i18nextLng')?.split('-')[0] || 
    process.env.REACT_APP_DEFAULT_LANGUAGE || 
    'zh'
  );
  
  // 言語変更関数
  const changeLanguage = useCallback((langCode) => {
    if (AVAILABLE_LANGUAGES[langCode]) {
      i18n.changeLanguage(langCode);
      setCurrentLang(langCode);
      // 言語設定をlocalStorageに保存して永続化
      localStorage.setItem('i18nextLng', langCode);
      
      // ドキュメントの言語属性も更新
      document.documentElement.lang = langCode;
      
      // 必要に応じてメタタグも更新
      const metaDescription = document.querySelector('meta[name="description"]');
      if (metaDescription) {
        // ここで言語に応じたメタディスクリプションを設定できる
        // metaDescription.setAttribute('content', 'ディスクリプション');
      }
    } else {
      console.warn(`Unsupported language code: ${langCode}`);
    }
  }, [i18n]);

  // 初回レンダリング時に現在の言語を設定
  useEffect(() => {
    // ボディ要素にdata-language属性を設定（CSSでの言語固有スタイリングに使用可能）
    document.body.setAttribute('data-language', currentLang);
    
    // ドキュメントの言語属性を更新
    document.documentElement.lang = currentLang;
    
    // i18nの言語が現在の言語と異なる場合は更新
    if (i18n.language?.split('-')[0] !== currentLang) {
      i18n.changeLanguage(currentLang);
    }
  }, [currentLang, i18n]);

  // コンテキスト値
  const contextValue = {
    currentLang,
    changeLanguage,
    availableLanguages: AVAILABLE_LANGUAGES,
  };

  return (
    <LanguageContext.Provider value={contextValue}>
      {children}
    </LanguageContext.Provider>
  );
};

export default LanguageProvider;