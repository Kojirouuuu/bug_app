// Zustand store for managing discovered bugs and photos
import { create } from 'zustand';
import { Photo, Insect } from '@/src/API';

type ArticleStore = {
  photos: Photo[];
  insects: Insect[];
  loading: boolean;
  error: string | null;

  // Photo actions
  addPhoto: (photo: Photo) => void;
  updatePhoto: (id: string, photo: Partial<Photo>) => void;
  getPhoto: (id: string) => Photo | undefined;
  getPhotosByUser: (userID: string) => Photo[];

  // Insect actions
  addInsect: (insect: Insect) => void;
  updateInsect: (id: string, insect: Partial<Insect>) => void;
  getInsect: (id: string) => Insect | undefined;
  getInsectsByUser: (userID: string) => Insect[];
  updateInsectNotes: (id: string, notes: string) => void;

  // Combined actions
  getArticleWithPhoto: (
    photoID: string
  ) => { photo: Photo; insect?: Insect } | undefined;
  getArticleWithInsect: (
    insectID: string
  ) => { insect: Insect; photo?: Photo } | undefined;

  // State management
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  clearError: () => void;
};

// TODO: Replace with AWS DynamoDB integration for persistence
export const useArticleStore = create<ArticleStore>((set, get) => ({
  photos: [
    // Mock initial data
    {
      __typename: 'Photo',
      id: '1',
      url: 'https://images.pexels.com/photos/1108572/pexels-photo-1108572.jpeg?auto=compress&cs=tinysrgb&w=400',
      userID: '1',
      takenAt: new Date().toISOString(),
      location: 'お庭',
      s3path: '/photos/1.jpg',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      photoAnalysisId: null,
      photoInsectId: '1',
    },
  ],
  insects: [
    // Mock initial data
    {
      __typename: 'Insect',
      id: '1',
      scientificName: 'Coccinella septempunctata',
      japaneseName: 'ナナホシテントウ',
      family: 'Coccinellidae',
      description: '美しい赤い色のテントウムシ',
      notes: 'きれいな赤い色！',
      userID: '1',
      location: 'お庭',
      foundAt: new Date('2024-01-20').toISOString(),
      photoID: '1',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  ],
  loading: false,
  error: null,

  // Photo actions
  addPhoto: (photo: Photo) => {
    set((state) => ({
      photos: [photo, ...state.photos],
    }));
  },

  updatePhoto: (id: string, photo: Partial<Photo>) => {
    set((state) => ({
      photos: state.photos.map((p) =>
        p.id === id
          ? { ...p, ...photo, updatedAt: new Date().toISOString() }
          : p
      ),
    }));
  },

  getPhoto: (id: string) => {
    return get().photos.find((photo) => photo.id === id);
  },

  getPhotosByUser: (userID: string) => {
    return get().photos.filter((photo) => photo.userID === userID);
  },

  // Insect actions
  addInsect: (insect: Insect) => {
    set((state) => ({
      insects: [insect, ...state.insects],
    }));
  },

  updateInsect: (id: string, insect: Partial<Insect>) => {
    set((state) => ({
      insects: state.insects.map((i) =>
        i.id === id
          ? { ...i, ...insect, updatedAt: new Date().toISOString() }
          : i
      ),
    }));
  },

  getInsect: (id: string) => {
    return get().insects.find((insect) => insect.id === id);
  },

  getInsectsByUser: (userID: string) => {
    return get().insects.filter((insect) => insect.userID === userID);
  },

  updateInsectNotes: (id: string, notes: string) => {
    set((state) => ({
      insects: state.insects.map((insect) =>
        insect.id === id
          ? { ...insect, notes, updatedAt: new Date().toISOString() }
          : insect
      ),
    }));
  },

  // Combined actions
  getArticleWithPhoto: (photoID: string) => {
    const state = get();
    const photo = state.photos.find((p) => p.id === photoID);
    if (!photo) return undefined;

    const insect = state.insects.find((i) => i.photoID === photoID);
    return { photo, insect };
  },

  getArticleWithInsect: (insectID: string) => {
    const state = get();
    const insect = state.insects.find((i) => i.id === insectID);
    if (!insect) return undefined;

    const photo = insect.photoID
      ? state.photos.find((p) => p.id === insect.photoID)
      : undefined;
    return { insect, photo };
  },

  // State management
  setLoading: (loading: boolean) => {
    set({ loading });
  },

  setError: (error: string | null) => {
    set({ error });
  },

  clearError: () => {
    set({ error: null });
  },
}));
