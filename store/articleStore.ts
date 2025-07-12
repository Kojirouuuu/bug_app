// Zustand store for managing discovered bugs and photos
import { create } from 'zustand';
import { Photo, Insect } from '@/src/API';
import { Article, ArticleForFrontend } from '@/types';
import { getPhotosByUser, getInsectsByUser } from '@/lib/aws/auth';
import { getPhotoImageByPhoto, getSummaryMarkdownByPhoto } from '@/lib/aws/s3';

type ArticleStore = {
  articles: ArticleForFrontend[];
  loading: boolean;
  error: string | null;

  // Article actions
  addArticle: (article: ArticleForFrontend) => void;
  updateArticle: (id: string, article: Partial<ArticleForFrontend>) => void;
  getArticle: (id: string) => ArticleForFrontend | undefined;
  getArticlesByUser: (userID: string) => ArticleForFrontend[];

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

  // DynamoDB integration
  loadUserData: (userID: string) => Promise<void>;
  refreshUserData: (userID: string) => Promise<void>;

  // State management
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  clearError: () => void;
};

// TODO: Replace with AWS DynamoDB integration for persistence
export const useArticleStore = create<ArticleStore>((set, get) => ({
  articles: [
    {
      article: {
        photos: [
          {
            __typename: 'Photo',
            id: '1',
            url: 'https://images.pexels.com/photos/1108572/pexels-photo-1108572.jpeg?auto=compress&cs=tinysrgb&w=400',
            userID: '1',
            takenAt: new Date().toISOString(),
            location: 'お庭',
            imagePath: '/photos/1.jpg',
            summaryPath: '/photos/1.md',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            photoAnalysisId: null,
            photoInsectId: '1',
          },
        ],
        insects: [
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
      },
      image:
        'https://images.pexels.com/photos/1108572/pexels-photo-1108572.jpeg?auto=compress&cs=tinysrgb&w=400',
      summary: 'ナナホシテントウについての記事',
    },
  ],
  loading: false,
  error: null,

  // DynamoDB integration
  loadUserData: async (userID: string) => {
    try {
      set({ loading: true, error: null });

      // DynamoDBからユーザーの写真と昆虫データを取得
      const [photos, insects] = await Promise.all([
        getPhotosByUser(userID, 100),
        getInsectsByUser(userID, 100),
      ]);

      console.log('Loaded user data:', {
        photos: photos.length,
        insects: insects.length,
      });

      // 写真と昆虫を組み合わせて記事を作成
      const articles: ArticleForFrontend[] = [];

      // 写真をグループ化（同じ昆虫に関連する写真をまとめる）
      const photoGroups = new Map<string, Photo[]>();
      photos.forEach((photo) => {
        const key = photo.photoInsectId || photo.id;
        if (!photoGroups.has(key)) {
          photoGroups.set(key, []);
        }
        photoGroups.get(key)!.push(photo);
      });

      // 昆虫データをマップ化
      const insectMap = new Map<string, Insect>();
      insects.forEach((insect) => {
        insectMap.set(insect.id, insect);
      });

      // 記事を作成
      for (const [key, groupPhotos] of photoGroups) {
        const relatedInsect = insectMap.get(key);
        const mainPhoto = groupPhotos[0]; // 最初の写真をメインに使用

        const article: Article = {
          photos: groupPhotos,
          insects: relatedInsect ? [relatedInsect] : [],
        };
        const image = await getPhotoImageByPhoto(mainPhoto);
        const summary = await getSummaryMarkdownByPhoto(mainPhoto);

        articles.push({ article, image, summary });
      }

      // 昆虫のみの記事も追加（写真がない場合）
      insects.forEach((insect) => {
        if (!photoGroups.has(insect.id)) {
          const article: ArticleForFrontend = {
            article: {
              photos: [],
              insects: [insect],
            },
            image: '',
            summary: `${insect.japaneseName}についての記事`,
          };
          articles.push(article);
        }
      });

      set({ articles, loading: false });
      console.log('ArticleStore updated with', articles.length, 'articles');
    } catch (error) {
      console.error('Error loading user data:', error);
      set({
        error: 'ユーザーデータの読み込みに失敗しました',
        loading: false,
      });
    }
  },

  refreshUserData: async (userID: string) => {
    // 既存のデータをクリアしてから再読み込み
    set({ articles: [] });
    await get().loadUserData(userID);
  },

  // Article actions
  addArticle: (article: ArticleForFrontend) => {
    try {
      set((state) => ({
        articles: [article, ...state.articles],
      }));
    } catch (error) {
      console.error('Error adding article:', error);
      set({ error: '記事の追加に失敗しました' });
    }
  },

  updateArticle: (id: string, article: Partial<ArticleForFrontend>) => {
    try {
      set((state) => ({
        articles: state.articles.map((a, index) =>
          index.toString() === id ? { ...a, ...article } : a
        ),
      }));
    } catch (error) {
      console.error('Error updating article:', error);
      set({ error: '記事の更新に失敗しました' });
    }
  },

  getArticle: (id: string) => {
    try {
      return get().articles[parseInt(id)];
    } catch (error) {
      console.error('Error getting article:', error);
      return undefined;
    }
  },

  getArticlesByUser: (userID: string) => {
    try {
      return get().articles.filter(
        (article) =>
          article.article.photos.some((photo) => photo.userID === userID) ||
          article.article.insects.some((insect) => insect.userID === userID)
      );
    } catch (error) {
      console.error('Error getting articles by user:', error);
      return [];
    }
  },

  // Photo actions
  addPhoto: (photo: Photo) => {
    try {
      set((state) => ({
        articles: state.articles.map((article, index) => {
          // 新しい写真を適切な記事に追加するロジック
          // ここでは簡略化のため、最初の記事に追加
          if (index === 0) {
            return {
              ...article,
              article: {
                ...article.article,
                photos: [photo, ...article.article.photos],
              },
            };
          }
          return article;
        }),
      }));
    } catch (error) {
      console.error('Error adding photo:', error);
      set({ error: '写真の追加に失敗しました' });
    }
  },

  updatePhoto: (id: string, photo: Partial<Photo>) => {
    try {
      set((state) => ({
        articles: state.articles.map((article) => ({
          ...article,
          article: {
            ...article.article,
            photos: article.article.photos.map((p) =>
              p.id === id
                ? { ...p, ...photo, updatedAt: new Date().toISOString() }
                : p
            ),
          },
        })),
      }));
    } catch (error) {
      console.error('Error updating photo:', error);
      set({ error: '写真の更新に失敗しました' });
    }
  },

  getPhoto: (id: string) => {
    try {
      const state = get();
      for (const article of state.articles) {
        const photo = article.article.photos.find((p) => p.id === id);
        if (photo) return photo;
      }
      return undefined;
    } catch (error) {
      console.error('Error getting photo:', error);
      return undefined;
    }
  },

  getPhotosByUser: (userID: string) => {
    try {
      const state = get();
      const photos: Photo[] = [];
      for (const article of state.articles) {
        photos.push(
          ...article.article.photos.filter((photo) => photo.userID === userID)
        );
      }
      return photos;
    } catch (error) {
      console.error('Error getting photos by user:', error);
      return [];
    }
  },

  // Insect actions
  addInsect: (insect: Insect) => {
    try {
      set((state) => ({
        articles: state.articles.map((article, index) => {
          // 新しい昆虫を適切な記事に追加するロジック
          // ここでは簡略化のため、最初の記事に追加
          if (index === 0) {
            return {
              ...article,
              article: {
                ...article.article,
                insects: [insect, ...article.article.insects],
              },
            };
          }
          return article;
        }),
      }));
    } catch (error) {
      console.error('Error adding insect:', error);
      set({ error: '昆虫の追加に失敗しました' });
    }
  },

  updateInsect: (id: string, insect: Partial<Insect>) => {
    try {
      set((state) => ({
        articles: state.articles.map((article) => ({
          ...article,
          article: {
            ...article.article,
            insects: article.article.insects.map((i) =>
              i.id === id
                ? { ...i, ...insect, updatedAt: new Date().toISOString() }
                : i
            ),
          },
        })),
      }));
    } catch (error) {
      console.error('Error updating insect:', error);
      set({ error: '昆虫の更新に失敗しました' });
    }
  },

  getInsect: (id: string) => {
    try {
      const state = get();
      for (const article of state.articles) {
        const insect = article.article.insects.find((i) => i.id === id);
        if (insect) return insect;
      }
      return undefined;
    } catch (error) {
      console.error('Error getting insect:', error);
      return undefined;
    }
  },

  getInsectsByUser: (userID: string) => {
    try {
      const state = get();
      const insects: Insect[] = [];
      for (const article of state.articles) {
        insects.push(
          ...article.article.insects.filter(
            (insect) => insect.userID === userID
          )
        );
      }
      return insects;
    } catch (error) {
      console.error('Error getting insects by user:', error);
      return [];
    }
  },

  updateInsectNotes: (id: string, notes: string) => {
    try {
      set((state) => ({
        articles: state.articles.map((article) => ({
          ...article,
          article: {
            ...article.article,
            insects: article.article.insects.map((insect) =>
              insect.id === id
                ? { ...insect, notes, updatedAt: new Date().toISOString() }
                : insect
            ),
          },
        })),
      }));
    } catch (error) {
      console.error('Error updating insect notes:', error);
      set({ error: 'メモの更新に失敗しました' });
    }
  },

  // Combined actions
  getArticleWithPhoto: (photoID: string) => {
    try {
      const state = get();
      for (const article of state.articles) {
        const photo = article.article.photos.find((p) => p.id === photoID);
        if (photo) {
          const insect = article.article.insects.find(
            (i) => i.photoID === photoID
          );
          return { photo, insect };
        }
      }
      return undefined;
    } catch (error) {
      console.error('Error getting article with photo:', error);
      return undefined;
    }
  },

  getArticleWithInsect: (insectID: string) => {
    try {
      const state = get();
      for (const article of state.articles) {
        const insect = article.article.insects.find((i) => i.id === insectID);
        if (insect) {
          const photo = insect.photoID
            ? article.article.photos.find((p) => p.id === insect.photoID)
            : undefined;
          return { insect, photo };
        }
      }
      return undefined;
    } catch (error) {
      console.error('Error getting article with insect:', error);
      return undefined;
    }
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
