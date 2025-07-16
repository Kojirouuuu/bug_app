import { create } from 'zustand';

export enum TicketType {
  COMMON_GACHA_TICKET = 'COMMON_GACHA_TICKET',
  RARE_GACHA_TICKET = 'RARE_GACHA_TICKET',
  LEGENDARY_GACHA_TICKET = 'LEGENDARY_GACHA_TICKET',
  ITEM_TICKET = 'ITEM_TICKET',
  EVENT_TICKET = 'EVENT_TICKET',
}

interface Ticket {
  id: string;
  type: TicketType;
  userID: string;
  gachaResultID?: string;
  expiresAt?: string;
  isUsed?: boolean;
}

interface GachaResult {
  id: string;
  userID: string;
  gachaID: string;
  exchangedPoints: number;
  obtainedTicket?: Ticket;
  resultAt: string;
  result: 'jackpot' | 'win' | 'lose';
}

interface Insect {
  id: string;
  scientificName: string;
  japaneseName: string;
  family: string;
  description?: string;
  notes?: string;
  userID?: string;
  location?: string;
  foundAt: string;
  photoID?: string;
}

interface Gacha {
  id: string;
  name: string;
  costPoints: number;
  availableTickets: TicketType[];
  isActive?: boolean;
}

interface GachaStore {
  tickets: Ticket[];
  gachaHistory: GachaResult[];
  discoveredInsects: Insect[];
  availableGachas: Gacha[];
  currentUser: string | null;
  
  performGacha: (gachaId: string, userId: string) => Promise<GachaResult>;
  addTicket: (ticket: Ticket) => void;
  discoverInsect: (insect: Insect) => void;
  addGachaResult: (result: GachaResult) => void;
  setCurrentUser: (userId: string) => void;
  initializeGachas: () => void;
}

export const useGachaStore = create<GachaStore>((set, get) => ({
  tickets: [],
  gachaHistory: [],
  discoveredInsects: [],
  availableGachas: [],
  currentUser: null,

  performGacha: async (gachaId: string, userId: string) => {
    const random = Math.random();
    let result: 'jackpot' | 'win' | 'lose';
    let obtainedTicket: Ticket | undefined;
    let discoveredInsect: Insect | undefined;

    if (random < 0.01) { // 1% jackpot
      result = 'jackpot';
      obtainedTicket = {
        id: Date.now().toString(),
        type: TicketType.LEGENDARY_GACHA_TICKET,
        userID: userId,
        expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
        isUsed: false,
      };
      discoveredInsect = {
        id: Date.now().toString(),
        scientificName: 'Papilio machaon',
        japaneseName: 'アゲハチョウ',
        family: 'Papilionidae',
        foundAt: new Date().toISOString().split('T')[0],
        userID: userId,
        description: '大当たりで見つけた美しい蝶！',
      };
    } else if (random < 0.20) { // 19% win
      result = 'win';
      obtainedTicket = {
        id: Date.now().toString(),
        type: TicketType.RARE_GACHA_TICKET,
        userID: userId,
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
        isUsed: false,
      };
      discoveredInsect = {
        id: Date.now().toString(),
        scientificName: 'Coccinella septempunctata',
        japaneseName: 'ナナホシテントウ',
        family: 'Coccinellidae',
        foundAt: new Date().toISOString().split('T')[0],
        userID: userId,
        description: 'ガチャで見つけた幸運の虫！',
      };
    } else { // 80% lose
      result = 'lose';
    }

    const gachaResult: GachaResult = {
      id: Date.now().toString(),
      userID: userId,
      gachaID: gachaId,
      exchangedPoints: 100,
      obtainedTicket,
      resultAt: new Date().toISOString(),
      result,
    };

    set((state) => ({
      gachaHistory: [...state.gachaHistory, gachaResult],
      tickets: obtainedTicket ? [...state.tickets, obtainedTicket] : state.tickets,
      discoveredInsects: discoveredInsect ? [...state.discoveredInsects, discoveredInsect] : state.discoveredInsects,
    }));

    return gachaResult;
  },

  addTicket: (ticket: Ticket) => {
    set((state) => ({
      tickets: [...state.tickets, ticket],
    }));
  },

  discoverInsect: (insect: Insect) => {
    set((state) => ({
      discoveredInsects: [...state.discoveredInsects, insect],
    }));
  },

  addGachaResult: (result: GachaResult) => {
    set((state) => ({
      gachaHistory: [...state.gachaHistory, result],
    }));
  },

  setCurrentUser: (userId: string) => {
    set({ currentUser: userId });
  },

  initializeGachas: () => {
    const defaultGachas: Gacha[] = [
      {
        id: 'basic-gacha',
        name: '基本ガチャ',
        costPoints: 100,
        availableTickets: [TicketType.COMMON_GACHA_TICKET, TicketType.RARE_GACHA_TICKET, TicketType.LEGENDARY_GACHA_TICKET],
        isActive: true,
      },
    ];
    set({ availableGachas: defaultGachas });
  },
}));