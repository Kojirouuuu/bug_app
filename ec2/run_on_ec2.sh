#!/bin/bash

# pemファイルは${KEY_PATH}/にあるものとする。

# 1. 環境変数の読み込み
set -a
source .env
set +a

# 2. 秘密鍵のパーミッション設定（※1回だけでOK）
chmod 400 ${KEY_PATH}/${YOUR_KEY}.pem

# 3. コードをEC2へアップロード（リモートのホームディレクトリへ）
rsync -avz -e "ssh -i ${KEY_PATH}/${YOUR_KEY}.pem" \
  . \
  ${EC2_USER}@${EC2_HOST}:bug_app/

# 4. EC2にSSH接続し、Pythonコードを実行し、環境変数を使う
ssh -t -i ${KEY_PATH}/${YOUR_KEY}.pem ${EC2_USER}@${EC2_HOST} << EOF
    cd bug_app
    # Amazon Linux 2 / 2023 共通
    sudo yum update -y
    sudo yum install -y git

    # 確認
    git --version   # e.g. git version 2.x.x


    # 公式サイトよりNode.jsをインストールする
    # Download and install nvm:
    curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.3/install.sh | bash

    # in lieu of restarting the shell
    \. "$HOME/.nvm/nvm.sh"

    # Download and install Node.js:
    nvm install 22

    # Verify the Node.js version:
    node -v # Should print "v22.17.0".
    nvm current # Should print "v22.17.0".

    # Verify npm version:
    npm -v # Should print "10.9.2".

    # amplifyのインストール
    npm install -g @aws-amplify/cli
    amplify configure
    amplify pull

    # expoのインストール
    npm install -g expo-cli

    npm i -g expo@latest eas-cli@latest
    npx expo install expo-dev-client
    eas build --profile development --platform all --clear-cache

    sudo yum install -y tmux
    tmux new -s expo
    npx expo start --tunnel



    # プロジェクトのインストール
    npm install

    # プロジェクトの起動
    npx expo start --tunnel
EOF
