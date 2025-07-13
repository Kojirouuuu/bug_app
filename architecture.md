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
- **Result Screen**: AI分析結果表示
- **Chat Screen**: 虫博士・フレンドとのチャット
- **Notebook Screen**: 図鑑一���表示
- **Profile Screen**: ユーザープロフィール・実績

### Backend (AWS)
- **API Gateway**: RESTful API エンドポイント
- **AppSync**: GraphQL API、リアルタイム同期
- **Lambda Functions**: 
  - 画像解析AI処理
  - チャット機能
  - データ処理ロジック
- **Bedrock**: Claude 3.5 Sonnet による AI 処��
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