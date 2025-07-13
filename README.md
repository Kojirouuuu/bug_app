# 虫図鑑アプリ

このアプリは子供向けの虫図鑑作成・学習アプリです。React Native と Expo で構築されています。AI を用いた画像解析やチャットにより虫について楽しく学べます。

## 主な機能

- **写真アップロードと虫判定**: 撮影した虫の写真をアップロードすると、AI が学名・和名・科名を自動判定して表示します。
- **チャット型知識探求**: 名前をもとに博士キャラクターがやさしい言葉で虫を説明し、音声再生も行います。次に知りたいことの候補も提示されます。
- **チャット要約・ノート**: 会話終了後、AI が内容を要約して自分だけの虫図鑑ノートに保存します。編集も可能です。
- **図鑑編集**: ユーザーが図鑑内容を自由に編集・追加できます。
- **ガチャ機能**: ポイントを消費してガチャを回し、チケットを獲得できます。
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

## AWS Amplify の設定

1. Amplify CLI をインストールします。

```bash
npm install -g @aws-amplify/cli
```

2. Amplify プロジェクトを初期化します。

```bash
amplify init
```

3. API をモックモードで起動します。

```bash
amplify mock api
```

4. シードデータを投入します。

```bash
# GraphQL エクスプローラーで amplify/backend/api/bugapp/seed.graphql の内容を実行
```

## ガチャシステムの仕組み

ガチャシステムは以下のように動作します：

1. ユーザーがガチャを回すと、`rollGacha` ミューテーションが呼び出されます。
2. システムはユーザーのポイント残高を確認し、十分なポイントがあるか検証します。
3. ポイントが十分にある場合、ユーザーのポイントが減少し、ガチャ結果とチケットが生成されます。
4. ポイントが不足している場合は、エラーが返されます。

### rollGacha ミューテーションの使用例

```graphql
mutation RollGacha {
  rollGacha(gachaID: "gacha-123", userID: "user-123") {
    id
    userID
    gachaID
    exchangedPoints
    obtainedTicket {
      id
      type
      userID
    }
    resultAt
  }
}
```

### Amplify クライアントでの使用例

```typescript
import { API, graphqlOperation } from 'aws-amplify';
import { rollGacha } from './src/graphql/mutations';
import { v4 as uuidv4 } from 'uuid';

async function rollGachaExample() {
  try {
    // クライアント側で生成したUUIDを使用して冪等性を確保
    const resultId = uuidv4();
    
    const result = await API.graphql(
      graphqlOperation(rollGacha, {
        gachaID: 'gacha-123',
        userID: 'user-123',
        clientGeneratedId: resultId
      })
    );
    
    console.log('Gacha result:', result.data.rollGacha);
    return result.data.rollGacha;
  } catch (error) {
    console.error('Error rolling gacha:', error);
    throw error;
  }
}
```

### エラーハンドリング

ガチャシステムは以下のエラーを返す可能性があります：

- `INSUFFICIENT_POINTS`: ユーザーのポイントが不足している場合
- `GACHA_NOT_ACTIVE`: ガチャがアクティブでない場合
- `GACHA_NOT_FOUND`: 指定されたガチャが存在しない場合
- `USER_NOT_FOUND`: 指定されたユーザーが存在しない場合

## 注意

- 初回起動時は必要なパッケージのダウンロードが走るため時間がかかる場合があります。
- 開発用コマンド `npm run lint` ではネットワークアクセスが必要です。Codex 環境では失敗することがあります。

## ライセンス

このリポジトリはハッカソン用途での利用を想定しています。
