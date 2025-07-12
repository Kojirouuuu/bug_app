import {
  signUp,
  signIn,
  signOut,
  fetchAuthSession,
  getCurrentUser,
  confirmSignUp,
  resendSignUpCode,
  resetPassword,
  confirmResetPassword,
} from 'aws-amplify/auth';
import { User as APIUser, CreateUserInput } from '@/src/API';
import { createUser } from '@/src/graphql/mutations';
import { listUsers, listPhotos, listInsects } from '@/src/graphql/queries';
import { generateClient } from '@aws-amplify/api';
const client = generateClient();

export const signUpWithCognito = async (email: string, password: string) => {
  try {
    const signUpResult = await signUp({
      username: email,
      password,
      options: { userAttributes: { email: email } },
    });
    return signUpResult;
  } catch (err: unknown) {
    if (err instanceof Error) {
      throw new Error(err.message);
    }
    throw new Error('An unknown error occurred');
  }
};

export const signInWithCognito = async (email: string, password: string) => {
  try {
    const result = await signIn({
      username: email,
      password,
    });
    return result.isSignedIn;
  } catch (err: unknown) {
    if (err instanceof Error) {
      throw new Error(err.message);
    }
    throw new Error('An unknown error occurred');
  }
};

export const getCurrentUserFromDynamo = async (name: string) => {
  try {
    const currentUser = await getCurrentUser();
    console.log('currentUser', currentUser);
    const cognitoId = currentUser.userId;
    if (!cognitoId) {
      throw new Error('Cognito ID not found');
    }
    let userData = await getUserFromDynamo(cognitoId);
    if (!userData) {
      await createUserToDynamo(name, cognitoId);
      userData = await getUserFromDynamo(cognitoId);
    }
    return userData;
  } catch (error) {
    console.error('getCurrentUserFromDynamo error:', error);
    throw error;
  }
};

// インデックスを活用した高速なユーザー検索
export const getUserFromDynamo = async (cognitoId: string) => {
  try {
    // cognitosubインデックスを使用した高速検索
    const result = await client.graphql({
      query: listUsers,
      variables: {
        filter: {
          cognitosub: {
            eq: cognitoId,
          },
        },
        limit: 1, // 1件のみ取得して高速化
      },
      authMode: 'apiKey',
    });

    console.log(
      'User search result:',
      result.data.listUsers.items.length,
      'users found'
    );
    return result.data.listUsers.items[0];
  } catch (error) {
    console.error('getUserFromDynamo error:', error);
    throw error;
  }
};

// インデックスを活用した高速な写真検索
export const getPhotosByUser = async (userId: string, limit: number = 20) => {
  try {
    const result = await client.graphql({
      query: listPhotos,
      variables: {
        filter: {
          userID: {
            eq: userId,
          },
        },
        limit,
      },
      authMode: 'apiKey',
    });

    console.log(
      'Photos search result:',
      result.data.listPhotos.items.length,
      'photos found'
    );
    return result.data.listPhotos.items;
  } catch (error) {
    console.error('getPhotosByUser error:', error);
    throw error;
  }
};

// インデックスを活用した高速な昆虫検索
export const getInsectsByUser = async (userId: string, limit: number = 20) => {
  try {
    const result = await client.graphql({
      query: listInsects,
      variables: {
        filter: {
          userID: {
            eq: userId,
          },
        },
        limit,
      },
      authMode: 'apiKey',
    });

    console.log(
      'Insects search result:',
      result.data.listInsects.items.length,
      'insects found'
    );
    return result.data.listInsects.items;
  } catch (error) {
    console.error('getInsectsByUser error:', error);
    throw error;
  }
};

// 日付インデックスを活用した高速な写真検索
export const getPhotosByDateRange = async (
  startDate: string,
  endDate: string,
  limit: number = 50
) => {
  try {
    const result = await client.graphql({
      query: listPhotos,
      variables: {
        filter: {
          takenAt: {
            between: [startDate, endDate],
          },
        },
        limit,
      },
      authMode: 'apiKey',
    });

    console.log(
      'Photos by date range result:',
      result.data.listPhotos.items.length,
      'photos found'
    );
    return result.data.listPhotos.items;
  } catch (error) {
    console.error('getPhotosByDateRange error:', error);
    throw error;
  }
};

// 地域インデックスを活用した高速なユーザー検索
export const getUsersByRegion = async (region: string, limit: number = 50) => {
  try {
    const result = await client.graphql({
      query: listUsers,
      variables: {
        filter: {
          region: {
            eq: region,
          },
        },
        limit,
      },
      authMode: 'apiKey',
    });

    console.log(
      'Users by region result:',
      result.data.listUsers.items.length,
      'users found'
    );
    return result.data.listUsers.items;
  } catch (error) {
    console.error('getUsersByRegion error:', error);
    throw error;
  }
};

// ランクインデックスを活用した高速なユーザー検索
export const getUsersByRank = async (rank: string, limit: number = 50) => {
  try {
    const result = await client.graphql({
      query: listUsers,
      variables: {
        filter: {
          rank: {
            eq: rank,
          },
        },
        limit,
      },
      authMode: 'apiKey',
    });

    console.log(
      'Users by rank result:',
      result.data.listUsers.items.length,
      'users found'
    );
    return result.data.listUsers.items;
  } catch (error) {
    console.error('getUsersByRank error:', error);
    throw error;
  }
};

export const signOutFromCognito = async () => {
  try {
    await signOut({ global: true }); // Amplify Auth の signOut を呼び出す
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw new Error('An unknown error occurred during sign out');
  }
};

export const confirmSignUpWithCognito = async (
  userId: string,
  email: string,
  code: string
) => {
  try {
    // まずCognitoで確認コードを検証
    await confirmSignUp({ username: email, confirmationCode: code });
  } catch (err: unknown) {
    console.error('confirmSignUpWithCognito error:', err);
    if (err instanceof Error) {
      throw new Error(err.message);
    }
    throw new Error('An unknown error occurred');
  }
};

export const resendConfirmationCode = async (email: string) => {
  try {
    await resendSignUpCode({ username: email });
  } catch (err: unknown) {
    if (err instanceof Error) {
      throw new Error(err.message);
    }
    throw new Error('An unknown error occurred');
  }
};

export const createUserToDynamo = async (
  name: string,
  cognitoId: string | null
) => {
  if (cognitoId !== null) {
    const input: CreateUserInput = {
      name: name || 'anonymous',
      cognitosub: cognitoId,
      region: '東京都',
      points: 100,
      rank: 'rank1',
    };
    try {
      const res = await client.graphql({
        query: createUser,
        variables: {
          input,
        },
        authMode: 'apiKey',
      });

      if ((res as any).errors) {
        console.error('DynamoDB createUser error:', (res as any).errors);
        throw new Error(
          'DynamoDB createUser error: ' + JSON.stringify((res as any).errors)
        );
      }
    } catch (dynamoError) {
      console.error('DynamoDB createUser exception:', dynamoError);
      throw new Error(
        'DynamoDB createUser exception: ' +
          (dynamoError instanceof Error
            ? dynamoError.message
            : String(dynamoError))
      );
    }
  }
};

export const handleResetPassword = async (username: string) => {
  const result = await resetPassword({
    username,
  });
  const { attributeName, deliveryMedium, destination } =
    result.nextStep.codeDeliveryDetails;
  return result;
};

export const handleConfirmResetPassword = async (
  username: string,
  newPassword: string,
  confirmationCode: string
) => {
  await confirmResetPassword({
    username,
    newPassword,
    confirmationCode,
  });
};
