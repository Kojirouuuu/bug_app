import { create } from 'zustand';
import { SettingsStore } from '@/types';

export const useSettingsStore = create<SettingsStore>((set) => ({
  friendGender: 'boy',
  setFriendGender: (gender) => set({ friendGender: gender }),
}));
