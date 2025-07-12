import {
  signUp,
  signIn,
  signOut,
  fetchAuthSession,
  confirmSignUp,
  resendSignUpCode,
  resetPassword,
  confirmResetPassword,
} from "aws-amplify/auth";
import { UserRole, Gender, User as APIUser, CreateUserInput } from "@/src/API";
import { createUser } from "@/src/graphql/mutations";
import { listUsers } from "@/src/graphql/queries";
import { generateClient } from "@aws-amplify/api";
import { useAuthStore } from "@/store/authStore";
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
    throw new Error("An unknown error occurred");
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
    throw new Error("An unknown error occurred");
  }
};
export const getCurrentUserFromDynamo = async (emailVerrification: string) => {
  const currentUser = await fetchAuthSession();
  const cognitoId = currentUser.tokens?.idToken?.payload.sub;
  if (!cognitoId) {
    throw new Error("Cognito ID not found");
  }
  let userData = await getUserFromDynamo(cognitoId);
  if (!userData) {
    await createUserToDynamo(emailVerrification, cognitoId);
    userData = await getUserFromDynamo(cognitoId);
  }
  return userData;
};

export const getUserFromDynamo = async (cognitoId: string) => {
  const result = await client.graphql({
    query: listUsers,
    variables: {
      filter: {
        id: {
          eq: cognitoId,
        },
      },
    },
    authMode: "userPool",
  });
  return result.data.listUsers.items[0];
};

export const signOutFromCognito = async () => {
  try {
    await signOut({ global: true }); // Amplify Auth の signOut を呼び出す
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw new Error("An unknown error occurred during sign out");
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
    console.error("confirmSignUpWithCognito error:", err);
    if (err instanceof Error) {
      throw new Error(err.message);
    }
    throw new Error("An unknown error occurred");
  }
};

export const resendConfirmationCode = async (email: string) => {
  try {
    await resendSignUpCode({ username: email });
  } catch (err: unknown) {
    if (err instanceof Error) {
      throw new Error(err.message);
    }
    throw new Error("An unknown error occurred");
  }
};
export const getAdminStatus = async () => {
  try {
    const tokens = await fetchAuthSession();
    const session = tokens.tokens;

    const cognitoGroups = session?.accessToken.payload[
      "cognito:groups"
    ] as string[];
    const isAdmin = cognitoGroups?.includes("admin");
    return isAdmin;
  } catch (err: unknown) {
    if (err instanceof Error) {
      throw new Error(err.message);
    }
    throw new Error("An unknown error occurred");
  }
};

export const createUserToDynamo = async (
  emailVerrification: string,
  cognitoId: string | null
) => {
  if (cognitoId !== null) {
    const input: CreateUserInput = {
      id: cognitoId,
      email: emailVerrification,
      name: "",
      role: UserRole.CUSTOMER,
      gender: Gender.OTHER,
      birthdate: null,
    };
    try {
      const res = await client.graphql({
        query: createUser,
        variables: {
          input,
        },
        authMode: "userPool",
      });

      if ((res as any).errors) {
        console.error("DynamoDB createUser error:", (res as any).errors);
        throw new Error(
          "DynamoDB createUser error: " + JSON.stringify((res as any).errors)
        );
      }
    } catch (dynamoError) {
      console.error("DynamoDB createUser exception:", dynamoError);
      throw new Error(
        "DynamoDB createUser exception: " +
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
