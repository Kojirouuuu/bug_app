import { ModelInit, MutableModel, __modelMeta__, ManagedIdentifier } from "@aws-amplify/datastore";
// @ts-ignore
import { LazyLoading, LazyLoadingDisabled, AsyncCollection, AsyncItem } from "@aws-amplify/datastore";

export enum TicketType {
  COMMON_GACHA_TICKET = "COMMON_GACHA_TICKET",
  RARE_GACHA_TICKET = "RARE_GACHA_TICKET",
  LEGENDARY_GACHA_TICKET = "LEGENDARY_GACHA_TICKET",
  ITEM_TICKET = "ITEM_TICKET",
  EVENT_TICKET = "EVENT_TICKET"
}



type EagerUser = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<User, 'id'>;
    readOnlyFields: 'updatedAt';
  };
  readonly id: string;
  readonly name: string;
  readonly cognitosub?: string | null;
  readonly createdAt: string;
  readonly lastLogin?: string | null;
  readonly region?: string | null;
  readonly photos?: (Photo | null)[] | null;
  readonly points: number;
  readonly tickets?: (Ticket | null)[] | null;
  readonly rank?: string | null;
  readonly gachaResults?: (GachaResult | null)[] | null;
  readonly insects?: (Insect | null)[] | null;
  readonly updatedAt?: string | null;
}

type LazyUser = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<User, 'id'>;
    readOnlyFields: 'updatedAt';
  };
  readonly id: string;
  readonly name: string;
  readonly cognitosub?: string | null;
  readonly createdAt: string;
  readonly lastLogin?: string | null;
  readonly region?: string | null;
  readonly photos: AsyncCollection<Photo>;
  readonly points: number;
  readonly tickets: AsyncCollection<Ticket>;
  readonly rank?: string | null;
  readonly gachaResults: AsyncCollection<GachaResult>;
  readonly insects: AsyncCollection<Insect>;
  readonly updatedAt?: string | null;
}

export declare type User = LazyLoading extends LazyLoadingDisabled ? EagerUser : LazyUser

export declare const User: (new (init: ModelInit<User>) => User) & {
  copyOf(source: User, mutator: (draft: MutableModel<User>) => MutableModel<User> | void): User;
}

type EagerPhoto = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Photo, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly url: string;
  readonly userID: string;
  readonly user?: User | null;
  readonly takenAt: string;
  readonly location?: string | null;
  readonly analysis?: AIAnalysis | null;
  readonly insect?: Insect | null;
  readonly s3path: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  readonly photoAnalysisId?: string | null;
  readonly photoInsectId?: string | null;
}

type LazyPhoto = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Photo, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly url: string;
  readonly userID: string;
  readonly user: AsyncItem<User | undefined>;
  readonly takenAt: string;
  readonly location?: string | null;
  readonly analysis: AsyncItem<AIAnalysis | undefined>;
  readonly insect: AsyncItem<Insect | undefined>;
  readonly s3path: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  readonly photoAnalysisId?: string | null;
  readonly photoInsectId?: string | null;
}

export declare type Photo = LazyLoading extends LazyLoadingDisabled ? EagerPhoto : LazyPhoto

export declare const Photo: (new (init: ModelInit<Photo>) => Photo) & {
  copyOf(source: Photo, mutator: (draft: MutableModel<Photo>) => MutableModel<Photo> | void): Photo;
}

type EagerAIAnalysis = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<AIAnalysis, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly photoID: string;
  readonly photo?: Photo | null;
  readonly result: string;
  readonly analyzedAt: string;
  readonly awardedPoints?: PointsAward | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  readonly aIAnalysisAwardedPointsId?: string | null;
}

type LazyAIAnalysis = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<AIAnalysis, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly photoID: string;
  readonly photo: AsyncItem<Photo | undefined>;
  readonly result: string;
  readonly analyzedAt: string;
  readonly awardedPoints: AsyncItem<PointsAward | undefined>;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  readonly aIAnalysisAwardedPointsId?: string | null;
}

export declare type AIAnalysis = LazyLoading extends LazyLoadingDisabled ? EagerAIAnalysis : LazyAIAnalysis

export declare const AIAnalysis: (new (init: ModelInit<AIAnalysis>) => AIAnalysis) & {
  copyOf(source: AIAnalysis, mutator: (draft: MutableModel<AIAnalysis>) => MutableModel<AIAnalysis> | void): AIAnalysis;
}

type EagerPointsAward = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<PointsAward, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly analysisID?: string | null;
  readonly analysis?: AIAnalysis | null;
  readonly value: number;
  readonly awardedAt: string;
  readonly reason?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyPointsAward = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<PointsAward, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly analysisID?: string | null;
  readonly analysis: AsyncItem<AIAnalysis | undefined>;
  readonly value: number;
  readonly awardedAt: string;
  readonly reason?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type PointsAward = LazyLoading extends LazyLoadingDisabled ? EagerPointsAward : LazyPointsAward

export declare const PointsAward: (new (init: ModelInit<PointsAward>) => PointsAward) & {
  copyOf(source: PointsAward, mutator: (draft: MutableModel<PointsAward>) => MutableModel<PointsAward> | void): PointsAward;
}

type EagerGacha = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Gacha, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly name: string;
  readonly costPoints: number;
  readonly availableTickets?: TicketType[] | Array<keyof typeof TicketType> | null;
  readonly results?: (GachaResult | null)[] | null;
  readonly isActive?: boolean | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyGacha = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Gacha, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly name: string;
  readonly costPoints: number;
  readonly availableTickets?: TicketType[] | Array<keyof typeof TicketType> | null;
  readonly results: AsyncCollection<GachaResult>;
  readonly isActive?: boolean | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Gacha = LazyLoading extends LazyLoadingDisabled ? EagerGacha : LazyGacha

export declare const Gacha: (new (init: ModelInit<Gacha>) => Gacha) & {
  copyOf(source: Gacha, mutator: (draft: MutableModel<Gacha>) => MutableModel<Gacha> | void): Gacha;
}

type EagerGachaResult = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<GachaResult, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly userID: string;
  readonly user?: User | null;
  readonly gachaID: string;
  readonly gacha?: Gacha | null;
  readonly exchangedPoints: number;
  readonly obtainedTicket?: Ticket | null;
  readonly resultAt: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  readonly gachaResultObtainedTicketId?: string | null;
}

type LazyGachaResult = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<GachaResult, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly userID: string;
  readonly user: AsyncItem<User | undefined>;
  readonly gachaID: string;
  readonly gacha: AsyncItem<Gacha | undefined>;
  readonly exchangedPoints: number;
  readonly obtainedTicket: AsyncItem<Ticket | undefined>;
  readonly resultAt: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  readonly gachaResultObtainedTicketId?: string | null;
}

export declare type GachaResult = LazyLoading extends LazyLoadingDisabled ? EagerGachaResult : LazyGachaResult

export declare const GachaResult: (new (init: ModelInit<GachaResult>) => GachaResult) & {
  copyOf(source: GachaResult, mutator: (draft: MutableModel<GachaResult>) => MutableModel<GachaResult> | void): GachaResult;
}

type EagerTicket = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Ticket, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly type: TicketType | keyof typeof TicketType;
  readonly userID: string;
  readonly user?: User | null;
  readonly gachaResultID?: string | null;
  readonly gachaResult?: GachaResult | null;
  readonly expiresAt?: string | null;
  readonly isUsed?: boolean | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyTicket = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Ticket, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly type: TicketType | keyof typeof TicketType;
  readonly userID: string;
  readonly user: AsyncItem<User | undefined>;
  readonly gachaResultID?: string | null;
  readonly gachaResult: AsyncItem<GachaResult | undefined>;
  readonly expiresAt?: string | null;
  readonly isUsed?: boolean | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Ticket = LazyLoading extends LazyLoadingDisabled ? EagerTicket : LazyTicket

export declare const Ticket: (new (init: ModelInit<Ticket>) => Ticket) & {
  copyOf(source: Ticket, mutator: (draft: MutableModel<Ticket>) => MutableModel<Ticket> | void): Ticket;
}

type EagerInsect = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Insect, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly scientificName: string;
  readonly japaneseName: string;
  readonly family: string;
  readonly description?: string | null;
  readonly notes?: string | null;
  readonly userID?: string | null;
  readonly user?: User | null;
  readonly location?: string | null;
  readonly foundAt: string;
  readonly photoID?: string | null;
  readonly photo?: Photo | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyInsect = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Insect, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly scientificName: string;
  readonly japaneseName: string;
  readonly family: string;
  readonly description?: string | null;
  readonly notes?: string | null;
  readonly userID?: string | null;
  readonly user: AsyncItem<User | undefined>;
  readonly location?: string | null;
  readonly foundAt: string;
  readonly photoID?: string | null;
  readonly photo: AsyncItem<Photo | undefined>;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Insect = LazyLoading extends LazyLoadingDisabled ? EagerInsect : LazyInsect

export declare const Insect: (new (init: ModelInit<Insect>) => Insect) & {
  copyOf(source: Insect, mutator: (draft: MutableModel<Insect>) => MutableModel<Insect> | void): Insect;
}