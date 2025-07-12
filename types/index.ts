// Mock data types for the Bug Encyclopedia app
import {
  User,
  Insect,
  Photo,
  AIAnalysis,
  PointsAward,
  Gacha,
  GachaResult,
  Ticket,
} from '@/src/API';

export type AnalyzeResult = {
  scientificName: string;
  japaneseName: string;
  family: string;
  img: string;
};

export type ChatTurn = {
  role: 'doctor' | 'child' | 'friend';
  message: string;
};

export type InsectStore = {
  insects: Insect[];
  addInsect: (insect: Omit<Insect, 'id' | 'discoveredAt'>) => void;
  updateInsectNotes: (id: string, notes: string) => void;
  getInsectById: (id: string) => Insect | undefined;
};

export type SettingsStore = {
  friendGender: 'boy' | 'girl';
  setFriendGender: (gender: 'boy' | 'girl') => void;
};
export type UserStore = {
  users: User[];
  setUser: (user: User) => void;
  addUser: (user: Omit<User, 'id' | 'createdAt'>) => void;
  updateUser: (id: string, user: Partial<User>) => void;
  getUserById: (id: string) => User | undefined;
};
