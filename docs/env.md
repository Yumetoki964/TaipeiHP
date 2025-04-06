# 環境変数リスト

## フロントエンド環境変数

### 必須環境変数
[x] `REACT_APP_API_URL` - バックエンドAPIのベースURL
[x] `REACT_APP_DEFAULT_LANGUAGE` - デフォルト言語設定（zh/ja/en）

### 認証関連
[x] `REACT_APP_FIREBASE_API_KEY` - Firebase APIキー
[x] `REACT_APP_FIREBASE_AUTH_DOMAIN` - Firebase認証ドメイン
[x] `REACT_APP_FIREBASE_PROJECT_ID` - Firebaseプロジェクトのユニーク識別子
[x] `REACT_APP_FIREBASE_STORAGE_BUCKET` - Firebaseストレージバケット
[x] `REACT_APP_FIREBASE_MESSAGING_SENDER_ID` - Firebaseメッセージング送信者ID
[x] `REACT_APP_FIREBASE_APP_ID` - FirebaseアプリケーションID

### Google Maps関連
[x] `REACT_APP_GOOGLE_MAPS_API_KEY` - Google Maps APIキー（校舎の位置表示用）

### 分析ツール関連
[x] `REACT_APP_GA_TRACKING_ID` - Google Analytics トラッキングID
[ ] `REACT_APP_FACEBOOK_PIXEL_ID` - Facebook Pixel ID（任意）

### 本番/開発環境設定
[x] `REACT_APP_ENV` - 環境設定（development/production）
[x] `REACT_APP_VERSION` - アプリケーションバージョン

## バックエンド環境変数

### サーバー設定
[x] `PORT` - サーバーが動作するポート番号
[x] `NODE_ENV` - Node.js環境設定（development/production）
[x] `API_VERSION` - API バージョン（v1など）

### データベース接続
[x] `MONGODB_URI` - MongoDB接続文字列
[x] `DB_NAME` - データベース名

### 認証・セキュリティ
[x] `JWT_SECRET` - JSONウェブトークン署名用の秘密鍵
[x] `JWT_EXPIRY` - トークンの有効期限（例: 30d）
[x] `CORS_ORIGIN` - CORSで許可するオリジン

### メール送信設定
[ ] `SMTP_HOST` - SMTPサーバーホスト
[ ] `SMTP_PORT` - SMTPサーバーポート
[ ] `SMTP_USER` - SMTPユーザー名
[ ] `SMTP_PASS` - SMTPパスワード
[ ] `MAIL_FROM` - 送信元メールアドレス
[ ] `ADMIN_EMAIL` - 管理者メールアドレス（通知受信用）

### 外部API連携
[ ] `RECAPTCHA_SECRET_KEY` - Google reCAPTCHA秘密鍵（フォームスパム防止用）

### ロギング
[x] `LOG_LEVEL` - ログレベル（debug/info/warn/error）

## CI/CD環境変数

### ビルド・デプロイ用
[ ] `FIREBASE_TOKEN` - Firebase CLI認証トークン
[ ] `GCP_PROJECT_ID` - Google Cloudプロジェクト識別子
[ ] `GCP_SA_KEY` - Google Cloudサービスアカウントキー（JSON）

### テスト用
[ ] `TEST_DB_URI` - テスト用データベース接続文字列

## 環境変数ステータスの説明

- [ ] - 未設定の環境変数
- [x] - 設定済みの環境変数
- [!] - 使用中または仮実装の環境変数

## 環境変数ファイル

本プロジェクトでは以下の環境変数ファイルを使用します：

### フロントエンド
- `.env` - すべての環境で共有される基本設定
- `.env.development` - 開発環境用設定
- `.env.production` - 本番環境用設定
- `.env.local` - ローカル環境のみの設定（Gitにコミットしない）

### バックエンド
- `.env` - 環境変数設定ファイル
- `.env.development` - 開発環境用設定
- `.env.production` - 本番環境用設定
- `.env.test` - テスト環境用設定

**注意**: 秘密鍵や機密情報を含む環境変数ファイルをバージョン管理システムにコミットしないでください。`.env.local`および`.env.*.local`ファイルは`.gitignore`に追加されています。