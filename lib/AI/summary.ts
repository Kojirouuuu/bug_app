import axios from 'axios';
import config from '../../src/amplifyconfiguration.json';
import * as FileSystem from 'expo-file-system';
import { AnalyzeResult } from '@/types';

// Amplify設定ファイルからエンドポイントを取得
const API_BASE_URL = config.aws_cloud_logic_custom?.[0]?.endpoint || '';
const SUMMARY_API_PATH = '/summary';

const url = `${API_BASE_URL}${SUMMARY_API_PATH}`;

export interface SummaryPayload {
  photo: string; // base64エンコードされた画像データ
}

// 画像URLをbase64エンコードする関数
const convertImageUrlToBase64 = async (imageUrl: string): Promise<string> => {
  try {
    // file://プロトコルの場合は特別処理
    if (imageUrl.startsWith('file://')) {
      // React Native環境では、file://URLを直接fetchできない場合がある
      // この場合は、画像をBlobとして読み込む必要がある
      throw new Error(
        'file:// protocol is not supported. Please use a web-accessible URL or convert the image to base64 first.'
      );
    }

    const response = await fetch(imageUrl);
    if (!response.ok) {
      throw new Error(`Failed to fetch image: ${response.statusText}`);
    }

    const blob = await response.blob();

    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        const result = reader.result as string;
        // data:image/jpeg;base64,の部分を除去してbase64データのみを返す
        const base64Data = result.split(',')[1];
        resolve(base64Data);
      };
      reader.onerror = () =>
        reject(new Error('Failed to convert image to base64'));
      reader.readAsDataURL(blob);
    });
  } catch (error) {
    throw new Error(`Failed to convert image URL to base64: ${error}`);
  }
};

// 画像ファイルをbase64エンコードする関数（React Native用）
const convertImageFileToBase64 = async (imageUri: string): Promise<string> => {
  try {
    console.log('Converting image to base64:', imageUri);

    // file://プロトコルを除去してファイルパスを取得
    const filePath = imageUri.replace('file://', '');

    // expo-file-systemを使用してファイルをbase64で読み込み
    const base64Data = await FileSystem.readAsStringAsync(filePath, {
      encoding: FileSystem.EncodingType.Base64,
    });

    console.log('Base64 conversion successful, length:', base64Data.length);
    return base64Data;
  } catch (error) {
    console.error('Error converting image to base64:', error);
    throw new Error(`Failed to convert image file to base64: ${error}`);
  }
};

export const createSummary = async (
  imageUrl: string // 画像URLまたはファイルパスを受け取る
): Promise<AnalyzeResult> => {
  console.log('summary.ts url', url);
  console.log('summary.ts imageUrl', imageUrl);

  // バリデーション
  if (!imageUrl) {
    throw new Error('Image URL is required');
  }

  if (!API_BASE_URL) {
    throw new Error('API endpoint is not configured');
  }

  try {
    let base64Image: string;

    // URLの種類に応じて処理を分岐
    if (imageUrl.startsWith('file://')) {
      // ローカルファイルの場合
      base64Image = await convertImageFileToBase64(imageUrl);
    } else {
      // 通常のURLの場合
      base64Image = await convertImageUrlToBase64(imageUrl);
    }

    const payload: SummaryPayload = {
      photo: base64Image,
    };

    console.log(
      'Sending request to API with base64 length:',
      base64Image.length
    );

    const response = await axios.post(url, payload, {
      headers: {
        'Content-Type': 'application/json',
      },
      timeout: 30000, // 30秒に延長（AI処理には時間がかかる場合がある）
    });

    // レスポンスのステータスコードをチェック
    if (response.status !== 200) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    // レスポンスデータの存在確認
    if (!response.data) {
      throw new Error('No response data received');
    }

    console.log('API Response data:', JSON.stringify(response.data, null, 2));

    // エラーレスポンスのチェック
    if (response.data.error) {
      throw new Error(response.data.error);
    }

    // 必須フィールドの存在確認（デバッグ用に緩和）
    const { scientificName, japaneseName, family } = response.data;
    if (
      scientificName === undefined ||
      japaneseName === undefined ||
      family === undefined
    ) {
      console.error('Missing required fields in response:', {
        scientificName: !!scientificName,
        japaneseName: !!japaneseName,
        family: !!family,
        responseData: response.data,
      });
      throw new Error('Invalid response format: missing required fields');
    }

    // 空文字列の場合は警告を出すが、処理は続行
    if (!scientificName || !japaneseName || !family) {
      console.warn('Some fields are empty in response:', {
        scientificName,
        japaneseName,
        family,
      });
    }

    return response.data;
  } catch (error) {
    console.error('Summary API error:', error);

    if (axios.isAxiosError(error)) {
      const axiosError = error;

      // ネットワークエラー
      if (!axiosError.response) {
        throw new Error('Network error: Unable to connect to the server');
      }

      // HTTPエラー
      const status = axiosError.response.status;
      const data = axiosError.response.data;

      if (status === 400) {
        throw new Error(data?.error || 'Invalid request data');
      } else if (status === 500) {
        throw new Error(data?.error || 'Server error occurred');
      } else if (status === 408 || status === 504) {
        throw new Error('Request timeout: The operation took too long');
      } else {
        throw new Error(`HTTP ${status}: ${data?.error || axiosError.message}`);
      }
    }

    // その他のエラー
    const errorMessage = error instanceof Error ? error.message : String(error);
    throw new Error(`Failed to create summary: ${errorMessage}`);
  }
};
