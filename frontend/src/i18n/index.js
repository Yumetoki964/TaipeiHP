import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import Backend from 'i18next-http-backend';

// 使用可能な言語
export const AVAILABLE_LANGUAGES = {
  'zh': { code: 'zh', label: '繁體中文', flag: '🇹🇼' },
  'ja': { code: 'ja', label: '日本語', flag: '🇯🇵' },
  'en': { code: 'en', label: 'English', flag: '🇺🇸' }
};

// 環境変数からデフォルト言語を取得
const DEFAULT_LANGUAGE = process.env.REACT_APP_DEFAULT_LANGUAGE || 'zh';

// i18nextの初期化
i18n
  // 翻訳ファイルをロードするためのバックエンドを使用
  .use(Backend)
  // ブラウザの言語設定を自動検出
  .use(LanguageDetector)
  // i18nをReactと統合
  .use(initReactI18next)
  // モジュールを初期化
  .init({
    // フォールバック言語
    fallbackLng: DEFAULT_LANGUAGE,
    // 翻訳キーが見つからない場合はキー名を表示
    saveMissing: true,
    // デバッグモード
    debug: process.env.NODE_ENV === 'development',
    // 言語間の相互運用性
    interpolation: {
      escapeValue: false, // すでにXSSセーフなのでエスケープ不要
    },
    // バックエンドの設定
    backend: {
      // 翻訳JSONファイルの場所
      loadPath: '/locales/{{lng}}/{{ns}}.json',
      // 翻訳追加のエンドポイント - 開発環境ではAPIサーバーを使用
      addPath: '/api/v1/locales/add/{{lng}}/{{ns}}',
    },
    // 検出オプション
    detection: {
      // 言語検出の順序
      order: ['querystring', 'cookie', 'localStorage', 'navigator', 'htmlTag'],
      // クエリパラメータの名前
      lookupQuerystring: 'lng',
      // Cookieの名前
      lookupCookie: 'i18next',
      // localStorageのキー
      lookupLocalStorage: 'i18nextLng',
      // ユーザーが言語を変更した場合にCookieに保存
      caches: ['localStorage', 'cookie'],
    },
    // 名前空間（複数の翻訳ファイルを使用可能）
    ns: ['common', 'home', 'about', 'courses', 'schools', 'teachers', 'contact', 'blog'],
    defaultNS: 'common',
  });

export default i18n;