# 環境変数設定の進捗状況

## 自動設定済み環境変数（Phase 2完了）

### フロントエンド
- [x] `REACT_APP_API_URL` - バックエンドAPIのベースURL
- [x] `REACT_APP_DEFAULT_LANGUAGE` - デフォルト言語設定（zh/ja/en）
- [x] `REACT_APP_ENV` - 環境設定（development/production）
- [x] `REACT_APP_VERSION` - アプリケーションバージョン
- [x] `REACT_APP_LOG_LEVEL` - ログレベル

### バックエンド
- [x] `PORT` - サーバーが動作するポート番号
- [x] `NODE_ENV` - Node.js環境設定（development/production）
- [x] `API_VERSION` - API バージョン（v1など）
- [x] `MONGODB_URI` - MongoDB接続文字列
- [x] `DB_NAME` - データベース名
- [x] `JWT_SECRET` - JSONウェブトークン署名用の秘密鍵
- [x] `JWT_EXPIRY` - トークンの有効期限
- [x] `CORS_ORIGIN` - CORSで許可するオリジン
- [x] `LOG_LEVEL` - ログレベル

## ユーザー設定が必要な環境変数（Phase 3）

### 優先度1：Firebase関連（認証・ホスティング用）
- [x] `REACT_APP_FIREBASE_API_KEY` - Firebase APIキー
- [x] `REACT_APP_FIREBASE_AUTH_DOMAIN` - Firebase認証ドメイン
- [x] `REACT_APP_FIREBASE_PROJECT_ID` - Firebaseプロジェクトのユニーク識別子
- [x] `REACT_APP_FIREBASE_STORAGE_BUCKET` - Firebaseストレージバケット
- [x] `REACT_APP_FIREBASE_MESSAGING_SENDER_ID` - Firebaseメッセージング送信者ID
- [x] `REACT_APP_FIREBASE_APP_ID` - FirebaseアプリケーションID
- [ ] `FIREBASE_TOKEN` - Firebase CLI認証トークン（CI/CD用）

### 優先度2：MongoDB Atlas設定
- [x] 本番環境用MongoDB接続文字列

### 優先度3：Google Maps関連
- [x] `REACT_APP_GOOGLE_MAPS_API_KEY` - Google Maps APIキー

### 優先度4：メール送信設定
- [ ] `SMTP_HOST` - SMTPサーバーホスト
- [ ] `SMTP_PORT` - SMTPサーバーポート
- [ ] `SMTP_USER` - SMTPユーザー名
- [ ] `SMTP_PASS` - SMTPパスワード
- [ ] `MAIL_FROM` - 送信元メールアドレス
- [ ] `ADMIN_EMAIL` - 管理者メールアドレス

### 優先度5：分析ツール関連
- [x] `REACT_APP_GA_TRACKING_ID` - Google Analytics トラッキングID
- [ ] `REACT_APP_FACEBOOK_PIXEL_ID` - Facebook Pixel ID（任意）

### 優先度6：その他の外部API連携
- [ ] `RECAPTCHA_SECRET_KEY` - Google reCAPTCHA秘密鍵

### 優先度7：CI/CD環境変数（デプロイフェーズ）
- [ ] `GCP_PROJECT_ID` - Google Cloudプロジェクト識別子
- [ ] `GCP_SA_KEY` - Google Cloudサービスアカウントキー（JSON）