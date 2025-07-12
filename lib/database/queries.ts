import { generateClient } from '@aws-amplify/api';
import {
  getUser,
  listUsers,
  getInsect,
  listInsects,
  getPhoto,
  listPhotos,
} from '@/src/graphql/queries';

const client = generateClient();

// ユーザー取得
export const getUserById = async (id: string) => {
  try {
    const result = await client.graphql({
      query: getUser,
      variables: { id },
    });
    return result.data.getUser;
  } catch (error) {
    console.error('Error fetching user:', error);
    throw error;
  }
};

// 全ユーザー取得
export const getAllUsers = async () => {
  try {
    const result = await client.graphql({
      query: listUsers,
    });
    return result.data.listUsers.items;
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error;
  }
};

// 昆虫データ取得
export const getInsectById = async (id: string) => {
  try {
    const result = await client.graphql({
      query: getInsect,
      variables: { id },
    });
    return result.data.getInsect;
  } catch (error) {
    console.error('Error fetching insect:', error);
    throw error;
  }
};

// 全昆虫データ取得
export const getAllInsects = async () => {
  try {
    const result = await client.graphql({
      query: listInsects,
    });
    return result.data.listInsects.items;
  } catch (error) {
    console.error('Error fetching insects:', error);
    throw error;
  }
};

// ユーザーの昆虫データ取得
export const getUserInsects = async (userID: string) => {
  try {
    const result = await client.graphql({
      query: listInsects,
      variables: {
        filter: { userID: { eq: userID } },
      },
    });
    return result.data.listInsects.items;
  } catch (error) {
    console.error('Error fetching user insects:', error);
    throw error;
  }
};
