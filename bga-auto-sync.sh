#!/bin/bash

# BGA Studio 自動同步腳本（Mac 版本）
# Requirements: fswatch, sftp, lftp
# 使用方式：./bga-auto-sync.sh

# ============ 設定區 ============
BGA_USERNAME="wildjcrt"                 # 你的 BGA 用戶名
GAME_NAME="eirakuchotori"               # 你的遊戲名稱
LOCAL_PATH="$HOME/projects/bga/$GAME_NAME"  # 本地專案路徑
REMOTE_PATH="$GAME_NAME"                # 遠端路徑

# ~/.ssh/config 內放入以下這段：
# Host bga-studio
#     HostName 1.studio.boardgamearena.com
#     Port 2022
#     User wildjcrt
#     IdentityFile ~/.ssh/id_ed25519
#     IdentitiesOnly yes
SSH_HOST="bga-studio" # 改用設定在 SSH config 的 alias

# 同步間隔（秒）- 避免過於頻繁
SYNC_DELAY=3

# 排除的檔案/目錄
EXCLUDE_PATTERNS=".git/ .DS_Store node_modules/ *.tmp .vscode/"

# ============ 腳本開始 ============

# 檢查 lftp 是否已安裝
if ! command -v lftp &> /dev/null; then
    echo "❌ lftp 未安裝，正在安裝..."
    brew install lftp
fi

# 檢查 fswatch 是否已安裝
if ! command -v fswatch &> /dev/null; then
    echo "❌ fswatch 未安裝，正在安裝..."
    brew install fswatch
fi

# 檢查本地路徑是否存在
if [ ! -d "$LOCAL_PATH" ]; then
    echo "❌ 本地路徑不存在: $LOCAL_PATH"
    echo "請確認路徑是否正確"
    exit 1
fi

# 建立 lftp 設定檔
LFTP_RC="$HOME/.lftprc"
if [ ! -f "$LFTP_RC" ]; then
    cat > "$LFTP_RC" << EOF
set sftp:auto-confirm yes
set sftp:connect-program "ssh -a -x"
set ssl:verify-certificate no
EOF
    echo "✅ 已建立 lftp 設定檔: $LFTP_RC"
fi

echo "🚀 BGA Studio 自動同步啟動中 (lftp 模式)..."
echo "監控路徑: $LOCAL_PATH"
echo "遠端伺服器: $SSH_HOST"
echo "按 Ctrl+C 停止同步"
echo "================================"

# 建立同步函數
sync_to_remote() {
    echo "📤 開始同步 ($(date '+%H:%M:%S'))..."

    # 建立排除參數
    EXCLUDE_ARGS=""
    for pattern in $EXCLUDE_PATTERNS; do
        EXCLUDE_ARGS="$EXCLUDE_ARGS --exclude-glob $pattern"
    done

    # 使用 lftp mirror 指令
    lftp -c "
        open sftp://$SSH_HOST
        mirror --reverse --delete --verbose --parallel=5 $EXCLUDE_ARGS $LOCAL_PATH/ $REMOTE_PATH/
        bye
    "

    if [ $? -eq 0 ]; then
        echo "✅ 同步完成 ($(date '+%H:%M:%S'))"
    else
        echo "❌ 同步失敗"
    fi
    echo ""
}

# 執行初次完整同步
echo "📤 執行初次完整同步..."
sync_to_remote

if [ $? -ne 0 ]; then
    echo ""
    echo "❌ 初次同步失敗"
    echo ""
    echo "可能的原因："
    echo "1. 尚未上傳 SSH Key，需要輸入密碼"
    echo "2. 遠端路徑不存在"
    echo "3. 網路連線問題"
    echo ""
    echo "建議："
    echo "- 測試連線: sftp $SSH_HOST"
    echo "- 上傳 SSH Key: https://studio.boardgamearena.com/controlpanel"
    exit 1
fi

echo "👀 開始監控檔案變更..."
echo "   (會在檔案變更後 ${SYNC_DELAY} 秒執行同步)"
echo ""

# 使用 fswatch 監控檔案變更
LAST_SYNC=0

fswatch -0 -r \
    --exclude='\.git/' \
    --exclude='\.DS_Store' \
    --exclude='node_modules/' \
    --exclude='\.vscode/' \
    "$LOCAL_PATH" | while IFS= read -r -d '' path; do

    # 顯示變更的檔案
    RELATIVE_PATH="${path#$LOCAL_PATH/}"
    echo "📝 檔案變更: $RELATIVE_PATH"

    # 節流控制：避免短時間內多次同步
    CURRENT_TIME=$(date +%s)
    TIME_DIFF=$((CURRENT_TIME - LAST_SYNC))

    if [ $TIME_DIFF -lt $SYNC_DELAY ]; then
        WAIT_TIME=$((SYNC_DELAY - TIME_DIFF))
        echo "   等待 ${WAIT_TIME} 秒後同步..."
        sleep $WAIT_TIME
    fi

    # 執行同步
    sync_to_remote

    LAST_SYNC=$(date +%s)
done