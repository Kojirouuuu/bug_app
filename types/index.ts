// Mock data types for the Bug Encyclopedia app
import { Photo, Insect } from '@/src/API';

export type Article = {
  photos: Photo[];
  insects: Insect[];
};

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

export type SettingsStore = {
  friendGender: 'boy' | 'girl';
  setFriendGender: (gender: 'boy' | 'girl') => void;
};

export type ArticleForFrontend = {
  article: Article;
  image: string;
  summary: string;
};
