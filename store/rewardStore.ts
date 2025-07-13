import { create } from 'zustand';
// 仮のAPI関数（実装は別途）
// import { getUserRewardByUserId } from '@/lib/database/queries';

export type RewardStore = {
  points: number;
  boostLevel: number;
  loading: boolean;
  error: string | null;
  addPoints: (amount: number) => void;
  consumePoints: (amount: number) => boolean;
  setBoost: (level: number) => void;
  loadUserReward: (userID: string) => Promise<void>;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  clearError: () => void;
};

export const useRewardStore = create<RewardStore>((set, get) => ({
  points: 100,
  boostLevel: 0,
  loading: false,
  error: null,
  addPoints: (amount) => set((state) => ({ points: state.points + amount })),
  consumePoints: (amount) => {
    if (get().points < amount) return false;
    set((state) => ({ points: state.points - amount }));
    return true;
  },
  setBoost: (level) => set({ boostLevel: level }),
  loadUserReward: async (userID: string) => {
    set({ loading: true, error: null });
    try {
      // 仮実装: 本来はAPIやDynamoDBから取得
      // const reward = await getUserRewardByUserId(userID);
      // set({ points: reward.points, loading: false });
      set({ points: 100, loading: false }); // デモ用
    } catch (error) {
      set({ error: 'リワード情報の取得に失敗しました', loading: false });
    }
  },
  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),
  clearError: () => set({ error: null }),
}));
