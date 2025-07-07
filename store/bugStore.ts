// Zustand store for managing discovered bugs
import { create } from 'zustand';
import { Bug, BugStore } from '@/types';

// TODO: Replace with AWS DynamoDB integration for persistence
export const useBugStore = create<BugStore>((set, get) => ({
  bugs: [
    // Mock initial data
    {
      id: '1',
      scientificName: 'Armadillidium vulgare',
      japaneseName: 'ダンゴムシ',
      family: 'Armadillidiidae',
      img: 'https://images.pexels.com/photos/1108572/pexels-photo-1108572.jpeg?auto=compress&cs=tinysrgb&w=400',
      discoveredAt: new Date('2024-01-15'),
      notes: 'お庭で見つけた！丸くなるのがおもしろい。',
    },
    {
      id: '2',
      scientificName: 'Coccinella septempunctata',
      japaneseName: 'ナナホシテントウ',
      family: 'Coccinellidae',
      img: 'https://images.pexels.com/photos/416978/pexels-photo-416978.jpeg?auto=compress&cs=tinysrgb&w=400',
      discoveredAt: new Date('2024-01-20'),
      notes: 'きれいな赤い色！',
    },
  ],
  
  addBug: (bugData) => {
    const newBug: Bug = {
      ...bugData,
      id: Date.now().toString(),
      discoveredAt: new Date(),
    };
    set((state) => ({
      bugs: [newBug, ...state.bugs],
    }));
  },
  
  updateBugNotes: (id, notes) => {
    set((state) => ({
      bugs: state.bugs.map((bug) =>
        bug.id === id ? { ...bug, notes } : bug
      ),
    }));
  },
  
  getBugById: (id) => {
    return get().bugs.find((bug) => bug.id === id);
  },
}));