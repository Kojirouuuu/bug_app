import { create } from 'zustand';
import {
  signUpWithCognito,
  signInWithCognito,
  signOutFromCognito,
  confirmSignUpWithCognito,
  resendConfirmationCode,
  getAdminStatus,
  getCurrentUserFromDynamo,
  handleResetPassword,
  handleConfirmResetPassword,
} from '@/lib/aws/auth';
import { User as APIUser } from '@/src/API';

type UserStore = {
  user: Omit<APIUser, '__typename' | 'updatedAt' | 'createdAt'>;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
  //　認証機能
  signUp: (email: string, password: string) => Promise<void>;
  login: (
    email: string,
    password: string,
    cognitoIdVerrification: string | null
  ) => Promise<void>;
  logout: () => Promise<void>;

  cognitoIdVerrification: string | null;

  // 確認コード入力用
  emailForVerification: string | null;
  setEmailForVerification: (email: string) => void;
  confirmSignUp: (code: string) => Promise<void>;
  resendConfirmationCode: (email: string) => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  confirmResetPassword: (
    email: string,
    newPassword: string,
    confirmationCode: string
  ) => Promise<void>;
};

export const useUserStore = create<UserStore>((set, get) => ({
  user: {
    id: 'guest',
    name: '',
    cognitosub: '',
    lastLogin: '',
    region: '',
    points: 0,
    rank: '',
  },
  email: null,
  isAuthenticated: false,
  loading: false,
  error: null,
  emailForVerification: null,
  cognitoIdVerrification: null,
  confirmationCode: null,

  setEmailForVerification: (email: string) =>
    set({ emailForVerification: email }),

  login: async (
    email: string,
    password: string,
    cognitoIdVerrification: string | null
  ) => {
    set({ loading: true, error: null });
    try {
      await signOutFromCognito();

      const isSignInComplete = await signInWithCognito(email, password);
      if (isSignInComplete) {
        // TODO: dynamoDBからユーザー情報を取得する時に引数がemailなのか？
        const currentUser = await getCurrentUserFromDynamo(email);
        const isAdmin = await getAdminStatus();
        set({
          user: currentUser,
          isAuthenticated: true,
          loading: false,
        });
      } else {
        set({ error: 'ユーザーが見つかりません', loading: false });
        return;
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        set({ error: err.message, loading: false });
      } else {
        set({ error: 'An unknown error occurred', loading: false });
      }
    }
  },
  signUp: async (email: string, password: string) => {
    set({ loading: true, error: null });
    try {
      const result = await signUpWithCognito(email, password);
      set({
        cognitoIdVerrification: result.userId,
        loading: false,
        emailForVerification: email,
      });
    } catch (err: unknown) {
      if (err instanceof Error) {
        set({ error: err.message, loading: false });
      } else {
        set({ error: 'An unknown error occurred', loading: false });
      }
    }
  },

  logout: async () => {
    set({ loading: true, error: null });
    try {
      await signOutFromCognito();
      set({
        user: {
          id: '',
          name: '',
          cognitosub: '',
          lastLogin: '',
          region: '',
          points: 0,
          rank: '',
        },
        isAuthenticated: false,
        loading: false,
      });
    } catch (err: unknown) {
      if (err instanceof Error) {
        set({ error: err.message, loading: false });
      }
    }
  },
  confirmSignUp: async (code: string) => {
    const email = get().emailForVerification;
    if (!email) {
      set({ error: '確認用のメールアドレスがありません' });
      return;
    }
    const cognitoId = get().cognitoIdVerrification;
    if (!cognitoId) {
      set({ error: '確認用のユーザーIDがありません' });
      return;
    }
    set({ loading: true, error: null });
    try {
      if (!get().user) {
        throw new Error('ログインしていません');
      }
      await confirmSignUpWithCognito(cognitoId, email, code);
      set({ loading: false });
    } catch (err: unknown) {
      if (err instanceof Error) {
        set({ error: err.message, loading: false });
      } else {
      }
    }
  },
  resendConfirmationCode: async () => {
    const email = get().emailForVerification;
    if (!email) {
      set({ error: '確認用のメールアドレスがありません' });
      return;
    }
    set({ loading: true, error: null });
    try {
      await resendConfirmationCode(email);
      set({ loading: false });
    } catch (err: unknown) {
      if (err instanceof Error) {
        set({ error: err.message, loading: false });
      } else {
      }
    }
  },
  resetPassword: async (email: string) => {
    set({ loading: true, error: null });
    try {
      await handleResetPassword(email);
      set({ loading: false });
    } catch (err: unknown) {
      if (err instanceof Error) {
        set({ error: err.message, loading: false });
      } else {
      }
    }
  },
  confirmResetPassword: async (
    email: string,
    newPassword: string,
    confirmationCode: string
  ) => {
    set({ loading: true, error: null });
    try {
      await handleConfirmResetPassword(email, newPassword, confirmationCode);
      await signOutFromCognito();
      set({ loading: false });
    } catch (err: unknown) {
      if (err instanceof Error) {
        set({ error: err.message, loading: false });
      } else {
      }
    }
  },
}));
