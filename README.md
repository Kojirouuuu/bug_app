# 虫図鑑アプリ

このアプリは子供向けの虫図鑑作成・学習アプリです。React Native と Expo で構築されています。AI を用いた画像解析やチャットにより虫について楽しく学べます。

## 主な機能

- **写真アップロードと虫判定**: 撮影した虫の写真をアップロードすると、AI が学名・和名・科名を自動判定して表示します。
- **チャット型知識探求**: 名前をもとに博士キャラクターがやさしい言葉で虫を説明し、音声再生も行います。次に知りたいことの候補も提示されます。
- **チャット要約・ノート**: 会話終了後、AI が内容を要約して自分だけの虫図鑑ノートに保存します。編集も可能です。
- **図鑑編集**: ユーザーが図鑑内容を自由に編集・追加できます。
- **追加提案機能(予定)**: ゲーミフィケーション要素や地図連携、共有機能などを検討しています。

## 開発環境の準備

1. **Node.js** と **npm** をインストールしてください。
2. **Expo CLI** をグローバルにインストールします。

```bash
npm install -g expo-cli
```

3. 依存パッケージをインストールします。

```bash
npm install
```

4. **Expo Go** アプリをスマートフォンにインストールすると、実機で簡単にテストできます。
5. 開発サーバーを起動します。

```bash
npx expo start
```

表示される QR コードを Expo Go で読み取るとアプリを実行できます。

6. アーキテクチャ図

# 虫図鑑アプリ アーキテクチャ図

```mermaid
graph TB
    %% Frontend Layer
    subgraph "Frontend (React Native + Expo)"
        A[Home Screen] --> B[Camera Screen]
        A --> C[Notebook Screen]
        A --> D[Chat Screen]
        A --> E[Profile Screen]
        A --> F[Gacha Screen]

        B --> G[Result Screen]
        D --> H[Chat Select Screen]
        C --> I[Detail Screen]
        E --> J[Achievement Screen]
    end

    %% API Gateway
    subgraph "AWS API Gateway"
        K[REST API Endpoints]
        L[GraphQL API - AppSync]
    end

    %% Lambda Functions
    subgraph "AWS Lambda"
        M[Image Analysis AI]
        N[Chat Functions]
        O[Data Processing]
    end

    %% AI Services
    subgraph "AWS Bedrock"
        P[Claude 3.5 Sonnet]
        Q[Image Recognition]
        R[Text Generation]
    end

    %% Storage
    subgraph "AWS S3"
        S[Image Storage]
        T[Static Assets]
    end

    %% Database
    subgraph "AWS DynamoDB"
        U[User Data]
        V[Insect Records]
        W[Chat History]
        X[Achievement Data]
    end

    %% Authentication
    subgraph "AWS Cognito"
        Y[User Authentication]
        Z[User Management]
    end

    %% Location Services
    AA[GPS/Location Services]

    %% Data Flow
    B -->|Photo Upload| K
    K -->|Image Analysis| M
    M -->|AI Processing| P
    P -->|Insect ID| M
    M -->|Results| G

    D -->|Chat Request| K
    K -->|Process Chat| N
    N -->|AI Chat| R
    R -->|Response| N
    N -->|Chat Data| D

    G -->|Save Data| L
    L -->|Store Records| V
    L -->|Store Images| S

    A -->|User Auth| Y
    E -->|Profile Data| U
    F -->|Gacha Logic| O

    AA -->|Location Data| L

    %% Styling
    classDef frontend fill:#e1f5fe
    classDef aws fill:#ff9800
    classDef ai fill:#4caf50
    classDef storage fill:#2196f3
    classDef auth fill:#9c27b0

    class A,B,C,D,E,F,G,H,I,J frontend
    class K,L,M,N,O aws
    class P,Q,R ai
    class S,T,U,V,W,X storage
    class Y,Z auth
```

## システム構成要素

### Frontend (React Native + Expo)

- **Home Screen**: メイン画面、撮影ボタン
- **Camera Screen**: 虫の撮影機能
- **Result Screen**: AI 分析結果表示
- **Chat Screen**: 虫博士・フレンドとのチャット
- **Notebook Screen**: 図鑑一 ��� 表示
- **Profile Screen**: ユーザープロフィール・実績

### Backend (AWS)

- **API Gateway**: RESTful API エンドポイント
- **AppSync**: GraphQL API、リアルタイム同期
- **Lambda Functions**:
  - 画像解析 AI 処理
  - チャット機能
  - データ処理ロジック
- **Bedrock**: Claude 3.5 Sonnet による AI 処 ��
- **S3**: 画像ファイル保存
- **DynamoDB**: ユーザーデータ、虫記録、チャット履歴
- **Cognito**: ユーザー認証・管理

### データフロー

1. **虫撮影**: Camera → S3 → Lambda → Bedrock → Result
2. **チャット**: Chat → Lambda → Bedrock → Response
3. **データ保存**: Result → AppSync → DynamoDB
4. **認証**: Frontend → Cognito → Backend

### 主要機能

- 📸 **画像解析**: Bedrock Claude 3.5 Sonnet
- 💬 **AI チャット**: 虫博士・フレンドキャラクター
- 📚 **図鑑管理**: 発見した虫の記録・編集
- 🎯 **実績システム**: ゲーミフィケーション要素
- 🎰 **ガチャ機能**: ポイント消費型コンテンツ

## 注意

- 初回起動時は必要なパッケージのダウンロードが走るため時間がかかる場合があります。
- 開発用コマンド `npm run lint` ではネットワークアクセスが必要です。Codex 環境では失敗することがあります。

## ライセンス

このリポジトリはハッカソン用途での利用を想定しています。
