import { create } from 'zustand';

export type RewardStore = {
  points: number;
  boostLevel: number;
  addPoints: (amount: number) => void;
  consumePoints: (amount: number) => boolean;
  setBoost: (level: number) => void;
};

export const useRewardStore = create<RewardStore>((set, get) => ({
  points: 100,
  boostLevel: 0,
  addPoints: (amount) => set((state) => ({ points: state.points + amount })),
  consumePoints: (amount) => {
    if (get().points < amount) return false;
    set((state) => ({ points: state.points - amount }));
    return true;
  },
  setBoost: (level) => set({ boostLevel: level }),
}));
