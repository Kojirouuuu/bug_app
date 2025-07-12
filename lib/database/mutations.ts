import { generateClient } from '@aws-amplify/api';
import {
  createUser,
  createPhoto,
  createInsect,
  createAIAnalysis,
} from '@/src/graphql/mutations';
import type {
  CreateUserInput,
  CreatePhotoInput,
  CreateInsectInput,
  CreateAIAnalysisInput,
} from '@/src/API';

const client = generateClient();

// ユーザー作成
export const createNewUser = async (userData: CreateUserInput) => {
  try {
    const result = await client.graphql({
      query: createUser,
      variables: { input: userData },
      authMode: 'apiKey',
    });
    return result.data.createUser;
  } catch (error) {
    console.error('Error creating user:', error);
    throw error;
  }
};

// 写真作成
export const createNewPhoto = async (photoData: CreatePhotoInput) => {
  try {
    const result = await client.graphql({
      query: createPhoto,
      variables: { input: photoData },
      authMode: 'apiKey',
    });
    return result.data.createPhoto;
  } catch (error) {
    console.error('Error creating photo:', error);
    throw error;
  }
};

// 昆虫データ作成
export const createNewInsect = async (insectData: CreateInsectInput) => {
  try {
    const result = await client.graphql({
      query: createInsect,
      variables: { input: insectData },
      authMode: 'apiKey',
    });
    return result.data.createInsect;
  } catch (error) {
    console.error('Error creating insect:', error);
    throw error;
  }
};

// AI解析結果作成
export const createNewAIAnalysis = async (
  analysisData: CreateAIAnalysisInput
) => {
  try {
    const result = await client.graphql({
      query: createAIAnalysis,
      variables: { input: analysisData },
      authMode: 'apiKey',
    });
    return result.data.createAIAnalysis;
  } catch (error) {
    console.error('Error creating AI analysis:', error);
    throw error;
  }
};

// 写真アップロード＋昆虫データ作成（統合関数）
export const createPhotoWithInsect = async (
  photoData: Omit<CreatePhotoInput, 'id'>,
  insectData: Omit<CreateInsectInput, 'id' | 'photoID'>
) => {
  try {
    // 1. 写真を作成
    const photo = await createNewPhoto({
      ...photoData,
      takenAt: new Date().toISOString(),
    });

    if (!photo) throw new Error('Failed to create photo');

    // 2. 昆虫データを作成（写真IDを関連付け）
    const insect = await createNewInsect({
      ...insectData,
      photoID: photo.id,
      foundAt: new Date().toISOString().split('T')[0], // YYYY-MM-DD format
    });

    return { photo, insect };
  } catch (error) {
    console.error('Error creating photo with insect:', error);
    throw error;
  }
};
