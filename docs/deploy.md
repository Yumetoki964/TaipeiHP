# デプロイ設計書

## 概要
夢時商業股份有限公司のウェブサイトを効率的かつ安全にデプロイするための設計書です。本プロジェクトでは、クライアントの技術スキルレベルを考慮し、運用負荷を最小化しながら、高品質なサービスを提供できる環境を選定しています。

## 推奨デプロイ環境

### フロントエンド: Firebase Hosting
**選定理由**:
- 簡単なデプロイプロセス（コマンド一つでデプロイ可能）
- グローバルCDNによる高速コンテンツ配信
- SSL証明書の自動管理
- 無料枠が十分な範囲で利用可能
- 日本語ドキュメントが充実
- CI/CDとの統合が容易

**デプロイ手順**:
1. Firebase CLIのインストール: `npm install -g firebase-tools`
2. ログイン: `firebase login`
3. プロジェクト初期化: `firebase init hosting`
4. ビルド: `npm run build`
5. デプロイ: `firebase deploy`

### バックエンド: Google Cloud Run
**選定理由**:
- サーバーレスでメンテナンス負荷が少ない
- スケーラビリティに優れている
- 使用した分だけの課金体系
- コンテナベースでポータビリティが高い
- 日本語サポートが充実
- Firebase Hostingとの親和性が高い

**デプロイ手順**:
1. Dockerイメージのビルド: `docker build -t gcr.io/PROJECT_ID/yumetoki-backend .`
2. イメージのプッシュ: `docker push gcr.io/PROJECT_ID/yumetoki-backend`
3. Cloud Runへのデプロイ: `gcloud run deploy --image gcr.io/PROJECT_ID/yumetoki-backend --platform managed`

### データベース: MongoDB Atlas
**選定理由**:
- スケーラビリティに優れたNoSQLデータベース
- 柔軟なスキーマで拡張性が高い
- 無料枠から始められる段階的な料金体系
- 管理ダッシュボードの使いやすさ
- 多言語に対応したドキュメント管理に適している
- バックアップと復元が容易

**設定手順**:
1. MongoDB Atlasでアカウント作成
2. クラスターの作成（無料枠でスタート可能）
3. ネットワークアクセス設定（IP許可リスト）
4. データベースユーザーの作成
5. 接続文字列の取得と環境変数への設定

## CI/CD設計

### GitHub Actions
**選定理由**:
- GitHubとの緊密な統合
- シンプルな設定ファイルで自動化が可能
- 無料枠が十分な範囲で利用可能
- 豊富なサードパーティアクション

**自動化フロー**:
1. mainブランチへのプッシュ時に自動ビルド
2. テスト成功時に自動デプロイ
3. プルリクエストに対する自動テスト実行
4. Slack等への通知連携

## バックアップ戦略
1. データベース: MongoDB Atlasの自動バックアップ
2. ソースコード: GitHubリポジトリ
3. 静的アセット: Google Cloud Storageへの定期バックアップ

## 監視とロギング
1. Google Cloud Monitoringによるアプリケーション監視
2. Firebase Performance Monitoringによるフロントエンドパフォーマンス監視
3. Google Cloud Loggingによる集中ログ管理

## ドメイン・SSL設定
1. 独自ドメインの取得（推奨: Google Domains）
2. Firebase Hostingでのカスタムドメイン設定
3. 自動SSL証明書の取得と更新（Firebase Hostingにより自動管理）

## セキュリティ対策
1. Google Cloud IAMによる厳格なアクセス制御
2. Firebase Authenticationによる安全な認証
3. Google Cloud Armorによるウェブアプリケーションファイアウォール
4. 定期的なセキュリティスキャンの実施

## 運用保守計画
1. 毎月のセキュリティアップデート適用
2. 四半期ごとの依存パッケージアップデート
3. 年次のインフラストラクチャ見直し
4. 定期的なパフォーマンス最適化

## コスト見積もり（月額）
- Firebase Hosting: 無料枠内〜$25/月
- Google Cloud Run: $20〜$50/月
- MongoDB Atlas: 無料枠内〜$57/月
- その他（ドメイン、ストレージ等）: $10〜$20/月
- **合計**: $30〜$152/月

**注**: 実際のコストはトラフィック量やデータ量に応じて変動します。初期段階では無料枠内での運用が可能です。