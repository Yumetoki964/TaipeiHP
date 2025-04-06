# ベースイメージ
FROM node:18-alpine

# 作業ディレクトリの設定
WORKDIR /usr/src/app

# パッケージリストをコピーしてから依存関係をインストール
COPY package*.json ./
RUN npm ci --only=production

# ソースコードをコピー
COPY . .

# 環境変数を設定
ENV NODE_ENV=production
ENV PORT=8080

# ヘルスチェック
HEALTHCHECK --interval=30s --timeout=3s --start-period=10s --retries=3 \
  CMD wget -qO- http://localhost:${PORT}/health || exit 1

# 8080ポートを公開
EXPOSE 8080

# アプリケーションを起動
CMD ["node", "server.js"]