#!/bin/bash

# 開発環境起動スクリプト
# バックエンドとフロントエンドを同時に起動

# 色の定義
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${BLUE}=== 夢時商業股份有限公司 開発環境 ===${NC}"
echo -e "${BLUE}このスクリプトはフロントエンドとバックエンドの両方を起動します${NC}"
echo

# 環境変数を設定
export MOCK_DB=true

# 現在のディレクトリを保存
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

# バックエンドを起動（バックグラウンド）
echo -e "${YELLOW}バックエンドサーバーを起動中...${NC}"
cd "$SCRIPT_DIR/backend"
npm install &>/dev/null || { echo -e "${RED}バックエンドの依存関係のインストールに失敗しました${NC}"; exit 1; }
npm start &
BACKEND_PID=$!
echo -e "${GREEN}バックエンドサーバーが起動しました (PID: $BACKEND_PID)${NC}"
echo -e "${GREEN}URL: http://localhost:5001/api/v1${NC}"
echo

# フロントエンドを起動（バックグラウンド）
echo -e "${YELLOW}フロントエンドサーバーを起動中...${NC}"
cd "$SCRIPT_DIR/frontend"
npm install &>/dev/null || { echo -e "${RED}フロントエンドの依存関係のインストールに失敗しました${NC}"; exit 1; }
npm start &
FRONTEND_PID=$!
echo -e "${GREEN}フロントエンドサーバーが起動しました (PID: $FRONTEND_PID)${NC}"
echo -e "${GREEN}URL: http://localhost:3000${NC}"
echo

# 終了ハンドラを設定
trap "echo -e '${YELLOW}終了中...${NC}'; kill $BACKEND_PID $FRONTEND_PID 2>/dev/null; exit" INT TERM EXIT

# 終了待ち
echo -e "${BLUE}両方のサーバーが起動しました。Ctrl+Cで両方を終了できます。${NC}"
echo
wait