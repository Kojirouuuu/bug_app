/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type CreateUserInput = {
  id?: string | null,
  email: string,
  name: string,
  password: string,
  createdAt?: string | null,
  lastLogin?: string | null,
  region?: string | null,
  points: number,
  rank?: string | null,
};

export type ModelUserConditionInput = {
  email?: ModelStringInput | null,
  name?: ModelStringInput | null,
  password?: ModelStringInput | null,
  createdAt?: ModelStringInput | null,
  lastLogin?: ModelStringInput | null,
  region?: ModelStringInput | null,
  points?: ModelIntInput | null,
  rank?: ModelStringInput | null,
  and?: Array< ModelUserConditionInput | null > | null,
  or?: Array< ModelUserConditionInput | null > | null,
  not?: ModelUserConditionInput | null,
  updatedAt?: ModelStringInput | null,
};

export type ModelStringInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export enum ModelAttributeTypes {
  binary = "binary",
  binarySet = "binarySet",
  bool = "bool",
  list = "list",
  map = "map",
  number = "number",
  numberSet = "numberSet",
  string = "string",
  stringSet = "stringSet",
  _null = "_null",
}


export type ModelSizeInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
};

export type ModelIntInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
};

export type User = {
  __typename: "User",
  id: string,
  email: string,
  name: string,
  password: string,
  createdAt: string,
  lastLogin?: string | null,
  region?: string | null,
  photos?: ModelPhotoConnection | null,
  points: number,
  tickets?: ModelTicketConnection | null,
  rank?: string | null,
  gachaResults?: ModelGachaResultConnection | null,
  insects?: ModelInsectConnection | null,
  updatedAt: string,
};

export type ModelPhotoConnection = {
  __typename: "ModelPhotoConnection",
  items:  Array<Photo | null >,
  nextToken?: string | null,
};

export type Photo = {
  __typename: "Photo",
  id: string,
  url: string,
  userID: string,
  user?: User | null,
  takenAt: string,
  location?: string | null,
  analysis?: AIAnalysis | null,
  insect?: Insect | null,
  imagePath: string,
  summaryPath: string,
  createdAt: string,
  updatedAt: string,
  photoAnalysisId?: string | null,
  photoInsectId?: string | null,
};

export type AIAnalysis = {
  __typename: "AIAnalysis",
  id: string,
  photoID: string,
  photo?: Photo | null,
  result: string,
  analyzedAt: string,
  awardedPoints?: PointsAward | null,
  createdAt: string,
  updatedAt: string,
  aIAnalysisAwardedPointsId?: string | null,
};

export type PointsAward = {
  __typename: "PointsAward",
  id: string,
  analysisID?: string | null,
  analysis?: AIAnalysis | null,
  value: number,
  awardedAt: string,
  reason?: string | null,
  createdAt: string,
  updatedAt: string,
};

export type Insect = {
  __typename: "Insect",
  id: string,
  scientificName: string,
  japaneseName: string,
  family: string,
  description?: string | null,
  notes?: string | null,
  userID?: string | null,
  user?: User | null,
  location?: string | null,
  foundAt: string,
  photoID?: string | null,
  photo?: Photo | null,
  createdAt: string,
  updatedAt: string,
};

export type ModelTicketConnection = {
  __typename: "ModelTicketConnection",
  items:  Array<Ticket | null >,
  nextToken?: string | null,
};

export type Ticket = {
  __typename: "Ticket",
  id: string,
  type: TicketType,
  userID: string,
  user?: User | null,
  gachaResultID?: string | null,
  gachaResult?: GachaResult | null,
  expiresAt?: string | null,
  isUsed?: boolean | null,
  createdAt: string,
  updatedAt: string,
};

export enum TicketType {
  COMMON_GACHA_TICKET = "COMMON_GACHA_TICKET",
  RARE_GACHA_TICKET = "RARE_GACHA_TICKET",
  LEGENDARY_GACHA_TICKET = "LEGENDARY_GACHA_TICKET",
  ITEM_TICKET = "ITEM_TICKET",
  EVENT_TICKET = "EVENT_TICKET",
}


export type GachaResult = {
  __typename: "GachaResult",
  id: string,
  userID: string,
  user?: User | null,
  gachaID: string,
  gacha?: Gacha | null,
  exchangedPoints: number,
  obtainedTicket?: Ticket | null,
  resultAt: string,
  createdAt: string,
  updatedAt: string,
  gachaResultObtainedTicketId?: string | null,
};

export type Gacha = {
  __typename: "Gacha",
  id: string,
  name: string,
  costPoints: number,
  availableTickets?: Array< TicketType > | null,
  results?: ModelGachaResultConnection | null,
  isActive?: boolean | null,
  createdAt: string,
  updatedAt: string,
};

export type ModelGachaResultConnection = {
  __typename: "ModelGachaResultConnection",
  items:  Array<GachaResult | null >,
  nextToken?: string | null,
};

export type ModelInsectConnection = {
  __typename: "ModelInsectConnection",
  items:  Array<Insect | null >,
  nextToken?: string | null,
};

export type UpdateUserInput = {
  id: string,
  email?: string | null,
  name?: string | null,
  password?: string | null,
  createdAt?: string | null,
  lastLogin?: string | null,
  region?: string | null,
  points?: number | null,
  rank?: string | null,
};

export type DeleteUserInput = {
  id: string,
};

export type CreatePhotoInput = {
  id?: string | null,
  url: string,
  userID: string,
  takenAt: string,
  location?: string | null,
  imagePath: string,
  summaryPath: string,
  photoAnalysisId?: string | null,
  photoInsectId?: string | null,
};

export type ModelPhotoConditionInput = {
  url?: ModelStringInput | null,
  userID?: ModelIDInput | null,
  takenAt?: ModelStringInput | null,
  location?: ModelStringInput | null,
  imagePath?: ModelStringInput | null,
  summaryPath?: ModelStringInput | null,
  and?: Array< ModelPhotoConditionInput | null > | null,
  or?: Array< ModelPhotoConditionInput | null > | null,
  not?: ModelPhotoConditionInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  photoAnalysisId?: ModelIDInput | null,
  photoInsectId?: ModelIDInput | null,
};

export type ModelIDInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export type UpdatePhotoInput = {
  id: string,
  url?: string | null,
  userID?: string | null,
  takenAt?: string | null,
  location?: string | null,
  imagePath?: string | null,
  summaryPath?: string | null,
  photoAnalysisId?: string | null,
  photoInsectId?: string | null,
};

export type DeletePhotoInput = {
  id: string,
};

export type CreateAIAnalysisInput = {
  id?: string | null,
  photoID: string,
  result: string,
  analyzedAt: string,
  aIAnalysisAwardedPointsId?: string | null,
};

export type ModelAIAnalysisConditionInput = {
  photoID?: ModelIDInput | null,
  result?: ModelStringInput | null,
  analyzedAt?: ModelStringInput | null,
  and?: Array< ModelAIAnalysisConditionInput | null > | null,
  or?: Array< ModelAIAnalysisConditionInput | null > | null,
  not?: ModelAIAnalysisConditionInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  aIAnalysisAwardedPointsId?: ModelIDInput | null,
};

export type UpdateAIAnalysisInput = {
  id: string,
  photoID?: string | null,
  result?: string | null,
  analyzedAt?: string | null,
  aIAnalysisAwardedPointsId?: string | null,
};

export type DeleteAIAnalysisInput = {
  id: string,
};

export type CreatePointsAwardInput = {
  id?: string | null,
  analysisID?: string | null,
  value: number,
  awardedAt: string,
  reason?: string | null,
};

export type ModelPointsAwardConditionInput = {
  analysisID?: ModelIDInput | null,
  value?: ModelIntInput | null,
  awardedAt?: ModelStringInput | null,
  reason?: ModelStringInput | null,
  and?: Array< ModelPointsAwardConditionInput | null > | null,
  or?: Array< ModelPointsAwardConditionInput | null > | null,
  not?: ModelPointsAwardConditionInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
};

export type UpdatePointsAwardInput = {
  id: string,
  analysisID?: string | null,
  value?: number | null,
  awardedAt?: string | null,
  reason?: string | null,
};

export type DeletePointsAwardInput = {
  id: string,
};

export type CreateGachaInput = {
  id?: string | null,
  name: string,
  costPoints: number,
  availableTickets?: Array< TicketType > | null,
  isActive?: boolean | null,
};

export type ModelGachaConditionInput = {
  name?: ModelStringInput | null,
  costPoints?: ModelIntInput | null,
  availableTickets?: ModelTicketTypeListInput | null,
  isActive?: ModelBooleanInput | null,
  and?: Array< ModelGachaConditionInput | null > | null,
  or?: Array< ModelGachaConditionInput | null > | null,
  not?: ModelGachaConditionInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
};

export type ModelTicketTypeListInput = {
  eq?: Array< TicketType | null > | null,
  ne?: Array< TicketType | null > | null,
  contains?: TicketType | null,
  notContains?: TicketType | null,
};

export type ModelBooleanInput = {
  ne?: boolean | null,
  eq?: boolean | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
};

export type UpdateGachaInput = {
  id: string,
  name?: string | null,
  costPoints?: number | null,
  availableTickets?: Array< TicketType > | null,
  isActive?: boolean | null,
};

export type DeleteGachaInput = {
  id: string,
};

export type CreateGachaResultInput = {
  id?: string | null,
  userID: string,
  gachaID: string,
  exchangedPoints: number,
  resultAt: string,
  gachaResultObtainedTicketId?: string | null,
};

export type ModelGachaResultConditionInput = {
  userID?: ModelIDInput | null,
  gachaID?: ModelIDInput | null,
  exchangedPoints?: ModelIntInput | null,
  resultAt?: ModelStringInput | null,
  and?: Array< ModelGachaResultConditionInput | null > | null,
  or?: Array< ModelGachaResultConditionInput | null > | null,
  not?: ModelGachaResultConditionInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  gachaResultObtainedTicketId?: ModelIDInput | null,
};

export type UpdateGachaResultInput = {
  id: string,
  userID?: string | null,
  gachaID?: string | null,
  exchangedPoints?: number | null,
  resultAt?: string | null,
  gachaResultObtainedTicketId?: string | null,
};

export type DeleteGachaResultInput = {
  id: string,
};

export type CreateTicketInput = {
  id?: string | null,
  type: TicketType,
  userID: string,
  gachaResultID?: string | null,
  expiresAt?: string | null,
  isUsed?: boolean | null,
};

export type ModelTicketConditionInput = {
  type?: ModelTicketTypeInput | null,
  userID?: ModelIDInput | null,
  gachaResultID?: ModelIDInput | null,
  expiresAt?: ModelStringInput | null,
  isUsed?: ModelBooleanInput | null,
  and?: Array< ModelTicketConditionInput | null > | null,
  or?: Array< ModelTicketConditionInput | null > | null,
  not?: ModelTicketConditionInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
};

export type ModelTicketTypeInput = {
  eq?: TicketType | null,
  ne?: TicketType | null,
};

export type UpdateTicketInput = {
  id: string,
  type?: TicketType | null,
  userID?: string | null,
  gachaResultID?: string | null,
  expiresAt?: string | null,
  isUsed?: boolean | null,
};

export type DeleteTicketInput = {
  id: string,
};

export type CreateInsectInput = {
  id?: string | null,
  scientificName: string,
  japaneseName: string,
  family: string,
  description?: string | null,
  notes?: string | null,
  userID?: string | null,
  location?: string | null,
  foundAt: string,
  photoID?: string | null,
};

export type ModelInsectConditionInput = {
  scientificName?: ModelStringInput | null,
  japaneseName?: ModelStringInput | null,
  family?: ModelStringInput | null,
  description?: ModelStringInput | null,
  notes?: ModelStringInput | null,
  userID?: ModelIDInput | null,
  location?: ModelStringInput | null,
  foundAt?: ModelStringInput | null,
  photoID?: ModelIDInput | null,
  and?: Array< ModelInsectConditionInput | null > | null,
  or?: Array< ModelInsectConditionInput | null > | null,
  not?: ModelInsectConditionInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
};

export type UpdateInsectInput = {
  id: string,
  scientificName?: string | null,
  japaneseName?: string | null,
  family?: string | null,
  description?: string | null,
  notes?: string | null,
  userID?: string | null,
  location?: string | null,
  foundAt?: string | null,
  photoID?: string | null,
};

export type DeleteInsectInput = {
  id: string,
};

export type ModelUserFilterInput = {
  id?: ModelIDInput | null,
  email?: ModelStringInput | null,
  name?: ModelStringInput | null,
  password?: ModelStringInput | null,
  createdAt?: ModelStringInput | null,
  lastLogin?: ModelStringInput | null,
  region?: ModelStringInput | null,
  points?: ModelIntInput | null,
  rank?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  and?: Array< ModelUserFilterInput | null > | null,
  or?: Array< ModelUserFilterInput | null > | null,
  not?: ModelUserFilterInput | null,
};

export type ModelUserConnection = {
  __typename: "ModelUserConnection",
  items:  Array<User | null >,
  nextToken?: string | null,
};

export type ModelPhotoFilterInput = {
  id?: ModelIDInput | null,
  url?: ModelStringInput | null,
  userID?: ModelIDInput | null,
  takenAt?: ModelStringInput | null,
  location?: ModelStringInput | null,
  imagePath?: ModelStringInput | null,
  summaryPath?: ModelStringInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  and?: Array< ModelPhotoFilterInput | null > | null,
  or?: Array< ModelPhotoFilterInput | null > | null,
  not?: ModelPhotoFilterInput | null,
  photoAnalysisId?: ModelIDInput | null,
  photoInsectId?: ModelIDInput | null,
};

export type ModelAIAnalysisFilterInput = {
  id?: ModelIDInput | null,
  photoID?: ModelIDInput | null,
  result?: ModelStringInput | null,
  analyzedAt?: ModelStringInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  and?: Array< ModelAIAnalysisFilterInput | null > | null,
  or?: Array< ModelAIAnalysisFilterInput | null > | null,
  not?: ModelAIAnalysisFilterInput | null,
  aIAnalysisAwardedPointsId?: ModelIDInput | null,
};

export type ModelAIAnalysisConnection = {
  __typename: "ModelAIAnalysisConnection",
  items:  Array<AIAnalysis | null >,
  nextToken?: string | null,
};

export type ModelPointsAwardFilterInput = {
  id?: ModelIDInput | null,
  analysisID?: ModelIDInput | null,
  value?: ModelIntInput | null,
  awardedAt?: ModelStringInput | null,
  reason?: ModelStringInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  and?: Array< ModelPointsAwardFilterInput | null > | null,
  or?: Array< ModelPointsAwardFilterInput | null > | null,
  not?: ModelPointsAwardFilterInput | null,
};

export type ModelPointsAwardConnection = {
  __typename: "ModelPointsAwardConnection",
  items:  Array<PointsAward | null >,
  nextToken?: string | null,
};

export type ModelGachaFilterInput = {
  id?: ModelIDInput | null,
  name?: ModelStringInput | null,
  costPoints?: ModelIntInput | null,
  availableTickets?: ModelTicketTypeListInput | null,
  isActive?: ModelBooleanInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  and?: Array< ModelGachaFilterInput | null > | null,
  or?: Array< ModelGachaFilterInput | null > | null,
  not?: ModelGachaFilterInput | null,
};

export type ModelGachaConnection = {
  __typename: "ModelGachaConnection",
  items:  Array<Gacha | null >,
  nextToken?: string | null,
};

export type ModelGachaResultFilterInput = {
  id?: ModelIDInput | null,
  userID?: ModelIDInput | null,
  gachaID?: ModelIDInput | null,
  exchangedPoints?: ModelIntInput | null,
  resultAt?: ModelStringInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  and?: Array< ModelGachaResultFilterInput | null > | null,
  or?: Array< ModelGachaResultFilterInput | null > | null,
  not?: ModelGachaResultFilterInput | null,
  gachaResultObtainedTicketId?: ModelIDInput | null,
};

export type ModelTicketFilterInput = {
  id?: ModelIDInput | null,
  type?: ModelTicketTypeInput | null,
  userID?: ModelIDInput | null,
  gachaResultID?: ModelIDInput | null,
  expiresAt?: ModelStringInput | null,
  isUsed?: ModelBooleanInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  and?: Array< ModelTicketFilterInput | null > | null,
  or?: Array< ModelTicketFilterInput | null > | null,
  not?: ModelTicketFilterInput | null,
};

export type ModelInsectFilterInput = {
  id?: ModelIDInput | null,
  scientificName?: ModelStringInput | null,
  japaneseName?: ModelStringInput | null,
  family?: ModelStringInput | null,
  description?: ModelStringInput | null,
  notes?: ModelStringInput | null,
  userID?: ModelIDInput | null,
  location?: ModelStringInput | null,
  foundAt?: ModelStringInput | null,
  photoID?: ModelIDInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  and?: Array< ModelInsectFilterInput | null > | null,
  or?: Array< ModelInsectFilterInput | null > | null,
  not?: ModelInsectFilterInput | null,
};

export enum ModelSortDirection {
  ASC = "ASC",
  DESC = "DESC",
}


export type ModelSubscriptionUserFilterInput = {
  id?: ModelSubscriptionIDInput | null,
  email?: ModelSubscriptionStringInput | null,
  name?: ModelSubscriptionStringInput | null,
  password?: ModelSubscriptionStringInput | null,
  createdAt?: ModelSubscriptionStringInput | null,
  lastLogin?: ModelSubscriptionStringInput | null,
  region?: ModelSubscriptionStringInput | null,
  points?: ModelSubscriptionIntInput | null,
  rank?: ModelSubscriptionStringInput | null,
  updatedAt?: ModelSubscriptionStringInput | null,
  and?: Array< ModelSubscriptionUserFilterInput | null > | null,
  or?: Array< ModelSubscriptionUserFilterInput | null > | null,
};

export type ModelSubscriptionIDInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  in?: Array< string | null > | null,
  notIn?: Array< string | null > | null,
};

export type ModelSubscriptionStringInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  in?: Array< string | null > | null,
  notIn?: Array< string | null > | null,
};

export type ModelSubscriptionIntInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
  in?: Array< number | null > | null,
  notIn?: Array< number | null > | null,
};

export type ModelSubscriptionPhotoFilterInput = {
  id?: ModelSubscriptionIDInput | null,
  url?: ModelSubscriptionStringInput | null,
  userID?: ModelSubscriptionIDInput | null,
  takenAt?: ModelSubscriptionStringInput | null,
  location?: ModelSubscriptionStringInput | null,
  imagePath?: ModelSubscriptionStringInput | null,
  summaryPath?: ModelSubscriptionStringInput | null,
  createdAt?: ModelSubscriptionStringInput | null,
  updatedAt?: ModelSubscriptionStringInput | null,
  and?: Array< ModelSubscriptionPhotoFilterInput | null > | null,
  or?: Array< ModelSubscriptionPhotoFilterInput | null > | null,
  photoAnalysisId?: ModelSubscriptionIDInput | null,
  photoInsectId?: ModelSubscriptionIDInput | null,
};

export type ModelSubscriptionAIAnalysisFilterInput = {
  id?: ModelSubscriptionIDInput | null,
  photoID?: ModelSubscriptionIDInput | null,
  result?: ModelSubscriptionStringInput | null,
  analyzedAt?: ModelSubscriptionStringInput | null,
  createdAt?: ModelSubscriptionStringInput | null,
  updatedAt?: ModelSubscriptionStringInput | null,
  and?: Array< ModelSubscriptionAIAnalysisFilterInput | null > | null,
  or?: Array< ModelSubscriptionAIAnalysisFilterInput | null > | null,
  aIAnalysisAwardedPointsId?: ModelSubscriptionIDInput | null,
};

export type ModelSubscriptionPointsAwardFilterInput = {
  id?: ModelSubscriptionIDInput | null,
  analysisID?: ModelSubscriptionIDInput | null,
  value?: ModelSubscriptionIntInput | null,
  awardedAt?: ModelSubscriptionStringInput | null,
  reason?: ModelSubscriptionStringInput | null,
  createdAt?: ModelSubscriptionStringInput | null,
  updatedAt?: ModelSubscriptionStringInput | null,
  and?: Array< ModelSubscriptionPointsAwardFilterInput | null > | null,
  or?: Array< ModelSubscriptionPointsAwardFilterInput | null > | null,
};

export type ModelSubscriptionGachaFilterInput = {
  id?: ModelSubscriptionIDInput | null,
  name?: ModelSubscriptionStringInput | null,
  costPoints?: ModelSubscriptionIntInput | null,
  availableTickets?: ModelSubscriptionStringInput | null,
  isActive?: ModelSubscriptionBooleanInput | null,
  createdAt?: ModelSubscriptionStringInput | null,
  updatedAt?: ModelSubscriptionStringInput | null,
  and?: Array< ModelSubscriptionGachaFilterInput | null > | null,
  or?: Array< ModelSubscriptionGachaFilterInput | null > | null,
};

export type ModelSubscriptionBooleanInput = {
  ne?: boolean | null,
  eq?: boolean | null,
};

export type ModelSubscriptionGachaResultFilterInput = {
  id?: ModelSubscriptionIDInput | null,
  userID?: ModelSubscriptionIDInput | null,
  gachaID?: ModelSubscriptionIDInput | null,
  exchangedPoints?: ModelSubscriptionIntInput | null,
  resultAt?: ModelSubscriptionStringInput | null,
  createdAt?: ModelSubscriptionStringInput | null,
  updatedAt?: ModelSubscriptionStringInput | null,
  and?: Array< ModelSubscriptionGachaResultFilterInput | null > | null,
  or?: Array< ModelSubscriptionGachaResultFilterInput | null > | null,
  gachaResultObtainedTicketId?: ModelSubscriptionIDInput | null,
};

export type ModelSubscriptionTicketFilterInput = {
  id?: ModelSubscriptionIDInput | null,
  type?: ModelSubscriptionStringInput | null,
  userID?: ModelSubscriptionIDInput | null,
  gachaResultID?: ModelSubscriptionIDInput | null,
  expiresAt?: ModelSubscriptionStringInput | null,
  isUsed?: ModelSubscriptionBooleanInput | null,
  createdAt?: ModelSubscriptionStringInput | null,
  updatedAt?: ModelSubscriptionStringInput | null,
  and?: Array< ModelSubscriptionTicketFilterInput | null > | null,
  or?: Array< ModelSubscriptionTicketFilterInput | null > | null,
};

export type ModelSubscriptionInsectFilterInput = {
  id?: ModelSubscriptionIDInput | null,
  scientificName?: ModelSubscriptionStringInput | null,
  japaneseName?: ModelSubscriptionStringInput | null,
  family?: ModelSubscriptionStringInput | null,
  description?: ModelSubscriptionStringInput | null,
  notes?: ModelSubscriptionStringInput | null,
  userID?: ModelSubscriptionIDInput | null,
  location?: ModelSubscriptionStringInput | null,
  foundAt?: ModelSubscriptionStringInput | null,
  photoID?: ModelSubscriptionIDInput | null,
  createdAt?: ModelSubscriptionStringInput | null,
  updatedAt?: ModelSubscriptionStringInput | null,
  and?: Array< ModelSubscriptionInsectFilterInput | null > | null,
  or?: Array< ModelSubscriptionInsectFilterInput | null > | null,
};

export type CreateUserMutationVariables = {
  input: CreateUserInput,
  condition?: ModelUserConditionInput | null,
};

export type CreateUserMutation = {
  createUser?:  {
    __typename: "User",
    id: string,
    email: string,
    name: string,
    password: string,
    createdAt: string,
    lastLogin?: string | null,
    region?: string | null,
    photos?:  {
      __typename: "ModelPhotoConnection",
      nextToken?: string | null,
    } | null,
    points: number,
    tickets?:  {
      __typename: "ModelTicketConnection",
      nextToken?: string | null,
    } | null,
    rank?: string | null,
    gachaResults?:  {
      __typename: "ModelGachaResultConnection",
      nextToken?: string | null,
    } | null,
    insects?:  {
      __typename: "ModelInsectConnection",
      nextToken?: string | null,
    } | null,
    updatedAt: string,
  } | null,
};

export type UpdateUserMutationVariables = {
  input: UpdateUserInput,
  condition?: ModelUserConditionInput | null,
};

export type UpdateUserMutation = {
  updateUser?:  {
    __typename: "User",
    id: string,
    email: string,
    name: string,
    password: string,
    createdAt: string,
    lastLogin?: string | null,
    region?: string | null,
    photos?:  {
      __typename: "ModelPhotoConnection",
      nextToken?: string | null,
    } | null,
    points: number,
    tickets?:  {
      __typename: "ModelTicketConnection",
      nextToken?: string | null,
    } | null,
    rank?: string | null,
    gachaResults?:  {
      __typename: "ModelGachaResultConnection",
      nextToken?: string | null,
    } | null,
    insects?:  {
      __typename: "ModelInsectConnection",
      nextToken?: string | null,
    } | null,
    updatedAt: string,
  } | null,
};

export type DeleteUserMutationVariables = {
  input: DeleteUserInput,
  condition?: ModelUserConditionInput | null,
};

export type DeleteUserMutation = {
  deleteUser?:  {
    __typename: "User",
    id: string,
    email: string,
    name: string,
    password: string,
    createdAt: string,
    lastLogin?: string | null,
    region?: string | null,
    photos?:  {
      __typename: "ModelPhotoConnection",
      nextToken?: string | null,
    } | null,
    points: number,
    tickets?:  {
      __typename: "ModelTicketConnection",
      nextToken?: string | null,
    } | null,
    rank?: string | null,
    gachaResults?:  {
      __typename: "ModelGachaResultConnection",
      nextToken?: string | null,
    } | null,
    insects?:  {
      __typename: "ModelInsectConnection",
      nextToken?: string | null,
    } | null,
    updatedAt: string,
  } | null,
};

export type CreatePhotoMutationVariables = {
  input: CreatePhotoInput,
  condition?: ModelPhotoConditionInput | null,
};

export type CreatePhotoMutation = {
  createPhoto?:  {
    __typename: "Photo",
    id: string,
    url: string,
    userID: string,
    user?:  {
      __typename: "User",
      id: string,
      email: string,
      name: string,
      password: string,
      createdAt: string,
      lastLogin?: string | null,
      region?: string | null,
      points: number,
      rank?: string | null,
      updatedAt: string,
    } | null,
    takenAt: string,
    location?: string | null,
    analysis?:  {
      __typename: "AIAnalysis",
      id: string,
      photoID: string,
      result: string,
      analyzedAt: string,
      createdAt: string,
      updatedAt: string,
      aIAnalysisAwardedPointsId?: string | null,
    } | null,
    insect?:  {
      __typename: "Insect",
      id: string,
      scientificName: string,
      japaneseName: string,
      family: string,
      description?: string | null,
      notes?: string | null,
      userID?: string | null,
      location?: string | null,
      foundAt: string,
      photoID?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    imagePath: string,
    summaryPath: string,
    createdAt: string,
    updatedAt: string,
    photoAnalysisId?: string | null,
    photoInsectId?: string | null,
  } | null,
};

export type UpdatePhotoMutationVariables = {
  input: UpdatePhotoInput,
  condition?: ModelPhotoConditionInput | null,
};

export type UpdatePhotoMutation = {
  updatePhoto?:  {
    __typename: "Photo",
    id: string,
    url: string,
    userID: string,
    user?:  {
      __typename: "User",
      id: string,
      email: string,
      name: string,
      password: string,
      createdAt: string,
      lastLogin?: string | null,
      region?: string | null,
      points: number,
      rank?: string | null,
      updatedAt: string,
    } | null,
    takenAt: string,
    location?: string | null,
    analysis?:  {
      __typename: "AIAnalysis",
      id: string,
      photoID: string,
      result: string,
      analyzedAt: string,
      createdAt: string,
      updatedAt: string,
      aIAnalysisAwardedPointsId?: string | null,
    } | null,
    insect?:  {
      __typename: "Insect",
      id: string,
      scientificName: string,
      japaneseName: string,
      family: string,
      description?: string | null,
      notes?: string | null,
      userID?: string | null,
      location?: string | null,
      foundAt: string,
      photoID?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    imagePath: string,
    summaryPath: string,
    createdAt: string,
    updatedAt: string,
    photoAnalysisId?: string | null,
    photoInsectId?: string | null,
  } | null,
};

export type DeletePhotoMutationVariables = {
  input: DeletePhotoInput,
  condition?: ModelPhotoConditionInput | null,
};

export type DeletePhotoMutation = {
  deletePhoto?:  {
    __typename: "Photo",
    id: string,
    url: string,
    userID: string,
    user?:  {
      __typename: "User",
      id: string,
      email: string,
      name: string,
      password: string,
      createdAt: string,
      lastLogin?: string | null,
      region?: string | null,
      points: number,
      rank?: string | null,
      updatedAt: string,
    } | null,
    takenAt: string,
    location?: string | null,
    analysis?:  {
      __typename: "AIAnalysis",
      id: string,
      photoID: string,
      result: string,
      analyzedAt: string,
      createdAt: string,
      updatedAt: string,
      aIAnalysisAwardedPointsId?: string | null,
    } | null,
    insect?:  {
      __typename: "Insect",
      id: string,
      scientificName: string,
      japaneseName: string,
      family: string,
      description?: string | null,
      notes?: string | null,
      userID?: string | null,
      location?: string | null,
      foundAt: string,
      photoID?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    imagePath: string,
    summaryPath: string,
    createdAt: string,
    updatedAt: string,
    photoAnalysisId?: string | null,
    photoInsectId?: string | null,
  } | null,
};

export type CreateAIAnalysisMutationVariables = {
  input: CreateAIAnalysisInput,
  condition?: ModelAIAnalysisConditionInput | null,
};

export type CreateAIAnalysisMutation = {
  createAIAnalysis?:  {
    __typename: "AIAnalysis",
    id: string,
    photoID: string,
    photo?:  {
      __typename: "Photo",
      id: string,
      url: string,
      userID: string,
      takenAt: string,
      location?: string | null,
      imagePath: string,
      summaryPath: string,
      createdAt: string,
      updatedAt: string,
      photoAnalysisId?: string | null,
      photoInsectId?: string | null,
    } | null,
    result: string,
    analyzedAt: string,
    awardedPoints?:  {
      __typename: "PointsAward",
      id: string,
      analysisID?: string | null,
      value: number,
      awardedAt: string,
      reason?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    createdAt: string,
    updatedAt: string,
    aIAnalysisAwardedPointsId?: string | null,
  } | null,
};

export type UpdateAIAnalysisMutationVariables = {
  input: UpdateAIAnalysisInput,
  condition?: ModelAIAnalysisConditionInput | null,
};

export type UpdateAIAnalysisMutation = {
  updateAIAnalysis?:  {
    __typename: "AIAnalysis",
    id: string,
    photoID: string,
    photo?:  {
      __typename: "Photo",
      id: string,
      url: string,
      userID: string,
      takenAt: string,
      location?: string | null,
      imagePath: string,
      summaryPath: string,
      createdAt: string,
      updatedAt: string,
      photoAnalysisId?: string | null,
      photoInsectId?: string | null,
    } | null,
    result: string,
    analyzedAt: string,
    awardedPoints?:  {
      __typename: "PointsAward",
      id: string,
      analysisID?: string | null,
      value: number,
      awardedAt: string,
      reason?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    createdAt: string,
    updatedAt: string,
    aIAnalysisAwardedPointsId?: string | null,
  } | null,
};

export type DeleteAIAnalysisMutationVariables = {
  input: DeleteAIAnalysisInput,
  condition?: ModelAIAnalysisConditionInput | null,
};

export type DeleteAIAnalysisMutation = {
  deleteAIAnalysis?:  {
    __typename: "AIAnalysis",
    id: string,
    photoID: string,
    photo?:  {
      __typename: "Photo",
      id: string,
      url: string,
      userID: string,
      takenAt: string,
      location?: string | null,
      imagePath: string,
      summaryPath: string,
      createdAt: string,
      updatedAt: string,
      photoAnalysisId?: string | null,
      photoInsectId?: string | null,
    } | null,
    result: string,
    analyzedAt: string,
    awardedPoints?:  {
      __typename: "PointsAward",
      id: string,
      analysisID?: string | null,
      value: number,
      awardedAt: string,
      reason?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    createdAt: string,
    updatedAt: string,
    aIAnalysisAwardedPointsId?: string | null,
  } | null,
};

export type CreatePointsAwardMutationVariables = {
  input: CreatePointsAwardInput,
  condition?: ModelPointsAwardConditionInput | null,
};

export type CreatePointsAwardMutation = {
  createPointsAward?:  {
    __typename: "PointsAward",
    id: string,
    analysisID?: string | null,
    analysis?:  {
      __typename: "AIAnalysis",
      id: string,
      photoID: string,
      result: string,
      analyzedAt: string,
      createdAt: string,
      updatedAt: string,
      aIAnalysisAwardedPointsId?: string | null,
    } | null,
    value: number,
    awardedAt: string,
    reason?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdatePointsAwardMutationVariables = {
  input: UpdatePointsAwardInput,
  condition?: ModelPointsAwardConditionInput | null,
};

export type UpdatePointsAwardMutation = {
  updatePointsAward?:  {
    __typename: "PointsAward",
    id: string,
    analysisID?: string | null,
    analysis?:  {
      __typename: "AIAnalysis",
      id: string,
      photoID: string,
      result: string,
      analyzedAt: string,
      createdAt: string,
      updatedAt: string,
      aIAnalysisAwardedPointsId?: string | null,
    } | null,
    value: number,
    awardedAt: string,
    reason?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeletePointsAwardMutationVariables = {
  input: DeletePointsAwardInput,
  condition?: ModelPointsAwardConditionInput | null,
};

export type DeletePointsAwardMutation = {
  deletePointsAward?:  {
    __typename: "PointsAward",
    id: string,
    analysisID?: string | null,
    analysis?:  {
      __typename: "AIAnalysis",
      id: string,
      photoID: string,
      result: string,
      analyzedAt: string,
      createdAt: string,
      updatedAt: string,
      aIAnalysisAwardedPointsId?: string | null,
    } | null,
    value: number,
    awardedAt: string,
    reason?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type CreateGachaMutationVariables = {
  input: CreateGachaInput,
  condition?: ModelGachaConditionInput | null,
};

export type CreateGachaMutation = {
  createGacha?:  {
    __typename: "Gacha",
    id: string,
    name: string,
    costPoints: number,
    availableTickets?: Array< TicketType > | null,
    results?:  {
      __typename: "ModelGachaResultConnection",
      nextToken?: string | null,
    } | null,
    isActive?: boolean | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdateGachaMutationVariables = {
  input: UpdateGachaInput,
  condition?: ModelGachaConditionInput | null,
};

export type UpdateGachaMutation = {
  updateGacha?:  {
    __typename: "Gacha",
    id: string,
    name: string,
    costPoints: number,
    availableTickets?: Array< TicketType > | null,
    results?:  {
      __typename: "ModelGachaResultConnection",
      nextToken?: string | null,
    } | null,
    isActive?: boolean | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeleteGachaMutationVariables = {
  input: DeleteGachaInput,
  condition?: ModelGachaConditionInput | null,
};

export type DeleteGachaMutation = {
  deleteGacha?:  {
    __typename: "Gacha",
    id: string,
    name: string,
    costPoints: number,
    availableTickets?: Array< TicketType > | null,
    results?:  {
      __typename: "ModelGachaResultConnection",
      nextToken?: string | null,
    } | null,
    isActive?: boolean | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type CreateGachaResultMutationVariables = {
  input: CreateGachaResultInput,
  condition?: ModelGachaResultConditionInput | null,
};

export type CreateGachaResultMutation = {
  createGachaResult?:  {
    __typename: "GachaResult",
    id: string,
    userID: string,
    user?:  {
      __typename: "User",
      id: string,
      email: string,
      name: string,
      password: string,
      createdAt: string,
      lastLogin?: string | null,
      region?: string | null,
      points: number,
      rank?: string | null,
      updatedAt: string,
    } | null,
    gachaID: string,
    gacha?:  {
      __typename: "Gacha",
      id: string,
      name: string,
      costPoints: number,
      availableTickets?: Array< TicketType > | null,
      isActive?: boolean | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    exchangedPoints: number,
    obtainedTicket?:  {
      __typename: "Ticket",
      id: string,
      type: TicketType,
      userID: string,
      gachaResultID?: string | null,
      expiresAt?: string | null,
      isUsed?: boolean | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    resultAt: string,
    createdAt: string,
    updatedAt: string,
    gachaResultObtainedTicketId?: string | null,
  } | null,
};

export type UpdateGachaResultMutationVariables = {
  input: UpdateGachaResultInput,
  condition?: ModelGachaResultConditionInput | null,
};

export type UpdateGachaResultMutation = {
  updateGachaResult?:  {
    __typename: "GachaResult",
    id: string,
    userID: string,
    user?:  {
      __typename: "User",
      id: string,
      email: string,
      name: string,
      password: string,
      createdAt: string,
      lastLogin?: string | null,
      region?: string | null,
      points: number,
      rank?: string | null,
      updatedAt: string,
    } | null,
    gachaID: string,
    gacha?:  {
      __typename: "Gacha",
      id: string,
      name: string,
      costPoints: number,
      availableTickets?: Array< TicketType > | null,
      isActive?: boolean | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    exchangedPoints: number,
    obtainedTicket?:  {
      __typename: "Ticket",
      id: string,
      type: TicketType,
      userID: string,
      gachaResultID?: string | null,
      expiresAt?: string | null,
      isUsed?: boolean | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    resultAt: string,
    createdAt: string,
    updatedAt: string,
    gachaResultObtainedTicketId?: string | null,
  } | null,
};

export type DeleteGachaResultMutationVariables = {
  input: DeleteGachaResultInput,
  condition?: ModelGachaResultConditionInput | null,
};

export type DeleteGachaResultMutation = {
  deleteGachaResult?:  {
    __typename: "GachaResult",
    id: string,
    userID: string,
    user?:  {
      __typename: "User",
      id: string,
      email: string,
      name: string,
      password: string,
      createdAt: string,
      lastLogin?: string | null,
      region?: string | null,
      points: number,
      rank?: string | null,
      updatedAt: string,
    } | null,
    gachaID: string,
    gacha?:  {
      __typename: "Gacha",
      id: string,
      name: string,
      costPoints: number,
      availableTickets?: Array< TicketType > | null,
      isActive?: boolean | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    exchangedPoints: number,
    obtainedTicket?:  {
      __typename: "Ticket",
      id: string,
      type: TicketType,
      userID: string,
      gachaResultID?: string | null,
      expiresAt?: string | null,
      isUsed?: boolean | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    resultAt: string,
    createdAt: string,
    updatedAt: string,
    gachaResultObtainedTicketId?: string | null,
  } | null,
};

export type CreateTicketMutationVariables = {
  input: CreateTicketInput,
  condition?: ModelTicketConditionInput | null,
};

export type CreateTicketMutation = {
  createTicket?:  {
    __typename: "Ticket",
    id: string,
    type: TicketType,
    userID: string,
    user?:  {
      __typename: "User",
      id: string,
      email: string,
      name: string,
      password: string,
      createdAt: string,
      lastLogin?: string | null,
      region?: string | null,
      points: number,
      rank?: string | null,
      updatedAt: string,
    } | null,
    gachaResultID?: string | null,
    gachaResult?:  {
      __typename: "GachaResult",
      id: string,
      userID: string,
      gachaID: string,
      exchangedPoints: number,
      resultAt: string,
      createdAt: string,
      updatedAt: string,
      gachaResultObtainedTicketId?: string | null,
    } | null,
    expiresAt?: string | null,
    isUsed?: boolean | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdateTicketMutationVariables = {
  input: UpdateTicketInput,
  condition?: ModelTicketConditionInput | null,
};

export type UpdateTicketMutation = {
  updateTicket?:  {
    __typename: "Ticket",
    id: string,
    type: TicketType,
    userID: string,
    user?:  {
      __typename: "User",
      id: string,
      email: string,
      name: string,
      password: string,
      createdAt: string,
      lastLogin?: string | null,
      region?: string | null,
      points: number,
      rank?: string | null,
      updatedAt: string,
    } | null,
    gachaResultID?: string | null,
    gachaResult?:  {
      __typename: "GachaResult",
      id: string,
      userID: string,
      gachaID: string,
      exchangedPoints: number,
      resultAt: string,
      createdAt: string,
      updatedAt: string,
      gachaResultObtainedTicketId?: string | null,
    } | null,
    expiresAt?: string | null,
    isUsed?: boolean | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeleteTicketMutationVariables = {
  input: DeleteTicketInput,
  condition?: ModelTicketConditionInput | null,
};

export type DeleteTicketMutation = {
  deleteTicket?:  {
    __typename: "Ticket",
    id: string,
    type: TicketType,
    userID: string,
    user?:  {
      __typename: "User",
      id: string,
      email: string,
      name: string,
      password: string,
      createdAt: string,
      lastLogin?: string | null,
      region?: string | null,
      points: number,
      rank?: string | null,
      updatedAt: string,
    } | null,
    gachaResultID?: string | null,
    gachaResult?:  {
      __typename: "GachaResult",
      id: string,
      userID: string,
      gachaID: string,
      exchangedPoints: number,
      resultAt: string,
      createdAt: string,
      updatedAt: string,
      gachaResultObtainedTicketId?: string | null,
    } | null,
    expiresAt?: string | null,
    isUsed?: boolean | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type CreateInsectMutationVariables = {
  input: CreateInsectInput,
  condition?: ModelInsectConditionInput | null,
};

export type CreateInsectMutation = {
  createInsect?:  {
    __typename: "Insect",
    id: string,
    scientificName: string,
    japaneseName: string,
    family: string,
    description?: string | null,
    notes?: string | null,
    userID?: string | null,
    user?:  {
      __typename: "User",
      id: string,
      email: string,
      name: string,
      password: string,
      createdAt: string,
      lastLogin?: string | null,
      region?: string | null,
      points: number,
      rank?: string | null,
      updatedAt: string,
    } | null,
    location?: string | null,
    foundAt: string,
    photoID?: string | null,
    photo?:  {
      __typename: "Photo",
      id: string,
      url: string,
      userID: string,
      takenAt: string,
      location?: string | null,
      imagePath: string,
      summaryPath: string,
      createdAt: string,
      updatedAt: string,
      photoAnalysisId?: string | null,
      photoInsectId?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdateInsectMutationVariables = {
  input: UpdateInsectInput,
  condition?: ModelInsectConditionInput | null,
};

export type UpdateInsectMutation = {
  updateInsect?:  {
    __typename: "Insect",
    id: string,
    scientificName: string,
    japaneseName: string,
    family: string,
    description?: string | null,
    notes?: string | null,
    userID?: string | null,
    user?:  {
      __typename: "User",
      id: string,
      email: string,
      name: string,
      password: string,
      createdAt: string,
      lastLogin?: string | null,
      region?: string | null,
      points: number,
      rank?: string | null,
      updatedAt: string,
    } | null,
    location?: string | null,
    foundAt: string,
    photoID?: string | null,
    photo?:  {
      __typename: "Photo",
      id: string,
      url: string,
      userID: string,
      takenAt: string,
      location?: string | null,
      imagePath: string,
      summaryPath: string,
      createdAt: string,
      updatedAt: string,
      photoAnalysisId?: string | null,
      photoInsectId?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeleteInsectMutationVariables = {
  input: DeleteInsectInput,
  condition?: ModelInsectConditionInput | null,
};

export type DeleteInsectMutation = {
  deleteInsect?:  {
    __typename: "Insect",
    id: string,
    scientificName: string,
    japaneseName: string,
    family: string,
    description?: string | null,
    notes?: string | null,
    userID?: string | null,
    user?:  {
      __typename: "User",
      id: string,
      email: string,
      name: string,
      password: string,
      createdAt: string,
      lastLogin?: string | null,
      region?: string | null,
      points: number,
      rank?: string | null,
      updatedAt: string,
    } | null,
    location?: string | null,
    foundAt: string,
    photoID?: string | null,
    photo?:  {
      __typename: "Photo",
      id: string,
      url: string,
      userID: string,
      takenAt: string,
      location?: string | null,
      imagePath: string,
      summaryPath: string,
      createdAt: string,
      updatedAt: string,
      photoAnalysisId?: string | null,
      photoInsectId?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type GetUserQueryVariables = {
  id: string,
};

export type GetUserQuery = {
  getUser?:  {
    __typename: "User",
    id: string,
    email: string,
    name: string,
    password: string,
    createdAt: string,
    lastLogin?: string | null,
    region?: string | null,
    photos?:  {
      __typename: "ModelPhotoConnection",
      nextToken?: string | null,
    } | null,
    points: number,
    tickets?:  {
      __typename: "ModelTicketConnection",
      nextToken?: string | null,
    } | null,
    rank?: string | null,
    gachaResults?:  {
      __typename: "ModelGachaResultConnection",
      nextToken?: string | null,
    } | null,
    insects?:  {
      __typename: "ModelInsectConnection",
      nextToken?: string | null,
    } | null,
    updatedAt: string,
  } | null,
};

export type ListUsersQueryVariables = {
  filter?: ModelUserFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListUsersQuery = {
  listUsers?:  {
    __typename: "ModelUserConnection",
    items:  Array< {
      __typename: "User",
      id: string,
      email: string,
      name: string,
      password: string,
      createdAt: string,
      lastLogin?: string | null,
      region?: string | null,
      points: number,
      rank?: string | null,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type GetPhotoQueryVariables = {
  id: string,
};

export type GetPhotoQuery = {
  getPhoto?:  {
    __typename: "Photo",
    id: string,
    url: string,
    userID: string,
    user?:  {
      __typename: "User",
      id: string,
      email: string,
      name: string,
      password: string,
      createdAt: string,
      lastLogin?: string | null,
      region?: string | null,
      points: number,
      rank?: string | null,
      updatedAt: string,
    } | null,
    takenAt: string,
    location?: string | null,
    analysis?:  {
      __typename: "AIAnalysis",
      id: string,
      photoID: string,
      result: string,
      analyzedAt: string,
      createdAt: string,
      updatedAt: string,
      aIAnalysisAwardedPointsId?: string | null,
    } | null,
    insect?:  {
      __typename: "Insect",
      id: string,
      scientificName: string,
      japaneseName: string,
      family: string,
      description?: string | null,
      notes?: string | null,
      userID?: string | null,
      location?: string | null,
      foundAt: string,
      photoID?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    imagePath: string,
    summaryPath: string,
    createdAt: string,
    updatedAt: string,
    photoAnalysisId?: string | null,
    photoInsectId?: string | null,
  } | null,
};

export type ListPhotosQueryVariables = {
  filter?: ModelPhotoFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListPhotosQuery = {
  listPhotos?:  {
    __typename: "ModelPhotoConnection",
    items:  Array< {
      __typename: "Photo",
      id: string,
      url: string,
      userID: string,
      takenAt: string,
      location?: string | null,
      imagePath: string,
      summaryPath: string,
      createdAt: string,
      updatedAt: string,
      photoAnalysisId?: string | null,
      photoInsectId?: string | null,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type GetAIAnalysisQueryVariables = {
  id: string,
};

export type GetAIAnalysisQuery = {
  getAIAnalysis?:  {
    __typename: "AIAnalysis",
    id: string,
    photoID: string,
    photo?:  {
      __typename: "Photo",
      id: string,
      url: string,
      userID: string,
      takenAt: string,
      location?: string | null,
      imagePath: string,
      summaryPath: string,
      createdAt: string,
      updatedAt: string,
      photoAnalysisId?: string | null,
      photoInsectId?: string | null,
    } | null,
    result: string,
    analyzedAt: string,
    awardedPoints?:  {
      __typename: "PointsAward",
      id: string,
      analysisID?: string | null,
      value: number,
      awardedAt: string,
      reason?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    createdAt: string,
    updatedAt: string,
    aIAnalysisAwardedPointsId?: string | null,
  } | null,
};

export type ListAIAnalysesQueryVariables = {
  filter?: ModelAIAnalysisFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListAIAnalysesQuery = {
  listAIAnalyses?:  {
    __typename: "ModelAIAnalysisConnection",
    items:  Array< {
      __typename: "AIAnalysis",
      id: string,
      photoID: string,
      result: string,
      analyzedAt: string,
      createdAt: string,
      updatedAt: string,
      aIAnalysisAwardedPointsId?: string | null,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type GetPointsAwardQueryVariables = {
  id: string,
};

export type GetPointsAwardQuery = {
  getPointsAward?:  {
    __typename: "PointsAward",
    id: string,
    analysisID?: string | null,
    analysis?:  {
      __typename: "AIAnalysis",
      id: string,
      photoID: string,
      result: string,
      analyzedAt: string,
      createdAt: string,
      updatedAt: string,
      aIAnalysisAwardedPointsId?: string | null,
    } | null,
    value: number,
    awardedAt: string,
    reason?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListPointsAwardsQueryVariables = {
  filter?: ModelPointsAwardFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListPointsAwardsQuery = {
  listPointsAwards?:  {
    __typename: "ModelPointsAwardConnection",
    items:  Array< {
      __typename: "PointsAward",
      id: string,
      analysisID?: string | null,
      value: number,
      awardedAt: string,
      reason?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type GetGachaQueryVariables = {
  id: string,
};

export type GetGachaQuery = {
  getGacha?:  {
    __typename: "Gacha",
    id: string,
    name: string,
    costPoints: number,
    availableTickets?: Array< TicketType > | null,
    results?:  {
      __typename: "ModelGachaResultConnection",
      nextToken?: string | null,
    } | null,
    isActive?: boolean | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListGachasQueryVariables = {
  filter?: ModelGachaFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListGachasQuery = {
  listGachas?:  {
    __typename: "ModelGachaConnection",
    items:  Array< {
      __typename: "Gacha",
      id: string,
      name: string,
      costPoints: number,
      availableTickets?: Array< TicketType > | null,
      isActive?: boolean | null,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type GetGachaResultQueryVariables = {
  id: string,
};

export type GetGachaResultQuery = {
  getGachaResult?:  {
    __typename: "GachaResult",
    id: string,
    userID: string,
    user?:  {
      __typename: "User",
      id: string,
      email: string,
      name: string,
      password: string,
      createdAt: string,
      lastLogin?: string | null,
      region?: string | null,
      points: number,
      rank?: string | null,
      updatedAt: string,
    } | null,
    gachaID: string,
    gacha?:  {
      __typename: "Gacha",
      id: string,
      name: string,
      costPoints: number,
      availableTickets?: Array< TicketType > | null,
      isActive?: boolean | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    exchangedPoints: number,
    obtainedTicket?:  {
      __typename: "Ticket",
      id: string,
      type: TicketType,
      userID: string,
      gachaResultID?: string | null,
      expiresAt?: string | null,
      isUsed?: boolean | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    resultAt: string,
    createdAt: string,
    updatedAt: string,
    gachaResultObtainedTicketId?: string | null,
  } | null,
};

export type ListGachaResultsQueryVariables = {
  filter?: ModelGachaResultFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListGachaResultsQuery = {
  listGachaResults?:  {
    __typename: "ModelGachaResultConnection",
    items:  Array< {
      __typename: "GachaResult",
      id: string,
      userID: string,
      gachaID: string,
      exchangedPoints: number,
      resultAt: string,
      createdAt: string,
      updatedAt: string,
      gachaResultObtainedTicketId?: string | null,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type GetTicketQueryVariables = {
  id: string,
};

export type GetTicketQuery = {
  getTicket?:  {
    __typename: "Ticket",
    id: string,
    type: TicketType,
    userID: string,
    user?:  {
      __typename: "User",
      id: string,
      email: string,
      name: string,
      password: string,
      createdAt: string,
      lastLogin?: string | null,
      region?: string | null,
      points: number,
      rank?: string | null,
      updatedAt: string,
    } | null,
    gachaResultID?: string | null,
    gachaResult?:  {
      __typename: "GachaResult",
      id: string,
      userID: string,
      gachaID: string,
      exchangedPoints: number,
      resultAt: string,
      createdAt: string,
      updatedAt: string,
      gachaResultObtainedTicketId?: string | null,
    } | null,
    expiresAt?: string | null,
    isUsed?: boolean | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListTicketsQueryVariables = {
  filter?: ModelTicketFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListTicketsQuery = {
  listTickets?:  {
    __typename: "ModelTicketConnection",
    items:  Array< {
      __typename: "Ticket",
      id: string,
      type: TicketType,
      userID: string,
      gachaResultID?: string | null,
      expiresAt?: string | null,
      isUsed?: boolean | null,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type GetInsectQueryVariables = {
  id: string,
};

export type GetInsectQuery = {
  getInsect?:  {
    __typename: "Insect",
    id: string,
    scientificName: string,
    japaneseName: string,
    family: string,
    description?: string | null,
    notes?: string | null,
    userID?: string | null,
    user?:  {
      __typename: "User",
      id: string,
      email: string,
      name: string,
      password: string,
      createdAt: string,
      lastLogin?: string | null,
      region?: string | null,
      points: number,
      rank?: string | null,
      updatedAt: string,
    } | null,
    location?: string | null,
    foundAt: string,
    photoID?: string | null,
    photo?:  {
      __typename: "Photo",
      id: string,
      url: string,
      userID: string,
      takenAt: string,
      location?: string | null,
      imagePath: string,
      summaryPath: string,
      createdAt: string,
      updatedAt: string,
      photoAnalysisId?: string | null,
      photoInsectId?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListInsectsQueryVariables = {
  filter?: ModelInsectFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListInsectsQuery = {
  listInsects?:  {
    __typename: "ModelInsectConnection",
    items:  Array< {
      __typename: "Insect",
      id: string,
      scientificName: string,
      japaneseName: string,
      family: string,
      description?: string | null,
      notes?: string | null,
      userID?: string | null,
      location?: string | null,
      foundAt: string,
      photoID?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type UsersByEmailQueryVariables = {
  email: string,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelUserFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type UsersByEmailQuery = {
  usersByEmail?:  {
    __typename: "ModelUserConnection",
    items:  Array< {
      __typename: "User",
      id: string,
      email: string,
      name: string,
      password: string,
      createdAt: string,
      lastLogin?: string | null,
      region?: string | null,
      points: number,
      rank?: string | null,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type UsersByNameQueryVariables = {
  name: string,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelUserFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type UsersByNameQuery = {
  usersByName?:  {
    __typename: "ModelUserConnection",
    items:  Array< {
      __typename: "User",
      id: string,
      email: string,
      name: string,
      password: string,
      createdAt: string,
      lastLogin?: string | null,
      region?: string | null,
      points: number,
      rank?: string | null,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type UsersByRegionQueryVariables = {
  region: string,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelUserFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type UsersByRegionQuery = {
  usersByRegion?:  {
    __typename: "ModelUserConnection",
    items:  Array< {
      __typename: "User",
      id: string,
      email: string,
      name: string,
      password: string,
      createdAt: string,
      lastLogin?: string | null,
      region?: string | null,
      points: number,
      rank?: string | null,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type UsersByRankQueryVariables = {
  rank: string,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelUserFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type UsersByRankQuery = {
  usersByRank?:  {
    __typename: "ModelUserConnection",
    items:  Array< {
      __typename: "User",
      id: string,
      email: string,
      name: string,
      password: string,
      createdAt: string,
      lastLogin?: string | null,
      region?: string | null,
      points: number,
      rank?: string | null,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type PhotosByUserIDQueryVariables = {
  userID: string,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelPhotoFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type PhotosByUserIDQuery = {
  photosByUserID?:  {
    __typename: "ModelPhotoConnection",
    items:  Array< {
      __typename: "Photo",
      id: string,
      url: string,
      userID: string,
      takenAt: string,
      location?: string | null,
      imagePath: string,
      summaryPath: string,
      createdAt: string,
      updatedAt: string,
      photoAnalysisId?: string | null,
      photoInsectId?: string | null,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type PhotosByTakenAtQueryVariables = {
  takenAt: string,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelPhotoFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type PhotosByTakenAtQuery = {
  photosByTakenAt?:  {
    __typename: "ModelPhotoConnection",
    items:  Array< {
      __typename: "Photo",
      id: string,
      url: string,
      userID: string,
      takenAt: string,
      location?: string | null,
      imagePath: string,
      summaryPath: string,
      createdAt: string,
      updatedAt: string,
      photoAnalysisId?: string | null,
      photoInsectId?: string | null,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type AIAnalysesByPhotoIDQueryVariables = {
  photoID: string,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelAIAnalysisFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type AIAnalysesByPhotoIDQuery = {
  aIAnalysesByPhotoID?:  {
    __typename: "ModelAIAnalysisConnection",
    items:  Array< {
      __typename: "AIAnalysis",
      id: string,
      photoID: string,
      result: string,
      analyzedAt: string,
      createdAt: string,
      updatedAt: string,
      aIAnalysisAwardedPointsId?: string | null,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type AIAnalysesByAnalyzedAtQueryVariables = {
  analyzedAt: string,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelAIAnalysisFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type AIAnalysesByAnalyzedAtQuery = {
  aIAnalysesByAnalyzedAt?:  {
    __typename: "ModelAIAnalysisConnection",
    items:  Array< {
      __typename: "AIAnalysis",
      id: string,
      photoID: string,
      result: string,
      analyzedAt: string,
      createdAt: string,
      updatedAt: string,
      aIAnalysisAwardedPointsId?: string | null,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type PointsAwardsByAnalysisIDQueryVariables = {
  analysisID: string,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelPointsAwardFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type PointsAwardsByAnalysisIDQuery = {
  pointsAwardsByAnalysisID?:  {
    __typename: "ModelPointsAwardConnection",
    items:  Array< {
      __typename: "PointsAward",
      id: string,
      analysisID?: string | null,
      value: number,
      awardedAt: string,
      reason?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type PointsAwardsByAwardedAtQueryVariables = {
  awardedAt: string,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelPointsAwardFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type PointsAwardsByAwardedAtQuery = {
  pointsAwardsByAwardedAt?:  {
    __typename: "ModelPointsAwardConnection",
    items:  Array< {
      __typename: "PointsAward",
      id: string,
      analysisID?: string | null,
      value: number,
      awardedAt: string,
      reason?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type GachasByNameQueryVariables = {
  name: string,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelGachaFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type GachasByNameQuery = {
  gachasByName?:  {
    __typename: "ModelGachaConnection",
    items:  Array< {
      __typename: "Gacha",
      id: string,
      name: string,
      costPoints: number,
      availableTickets?: Array< TicketType > | null,
      isActive?: boolean | null,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type GachaResultsByUserIDQueryVariables = {
  userID: string,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelGachaResultFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type GachaResultsByUserIDQuery = {
  gachaResultsByUserID?:  {
    __typename: "ModelGachaResultConnection",
    items:  Array< {
      __typename: "GachaResult",
      id: string,
      userID: string,
      gachaID: string,
      exchangedPoints: number,
      resultAt: string,
      createdAt: string,
      updatedAt: string,
      gachaResultObtainedTicketId?: string | null,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type GachaResultsByGachaIDQueryVariables = {
  gachaID: string,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelGachaResultFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type GachaResultsByGachaIDQuery = {
  gachaResultsByGachaID?:  {
    __typename: "ModelGachaResultConnection",
    items:  Array< {
      __typename: "GachaResult",
      id: string,
      userID: string,
      gachaID: string,
      exchangedPoints: number,
      resultAt: string,
      createdAt: string,
      updatedAt: string,
      gachaResultObtainedTicketId?: string | null,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type GachaResultsByResultAtQueryVariables = {
  resultAt: string,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelGachaResultFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type GachaResultsByResultAtQuery = {
  gachaResultsByResultAt?:  {
    __typename: "ModelGachaResultConnection",
    items:  Array< {
      __typename: "GachaResult",
      id: string,
      userID: string,
      gachaID: string,
      exchangedPoints: number,
      resultAt: string,
      createdAt: string,
      updatedAt: string,
      gachaResultObtainedTicketId?: string | null,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type TicketsByTypeQueryVariables = {
  type: TicketType,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelTicketFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type TicketsByTypeQuery = {
  ticketsByType?:  {
    __typename: "ModelTicketConnection",
    items:  Array< {
      __typename: "Ticket",
      id: string,
      type: TicketType,
      userID: string,
      gachaResultID?: string | null,
      expiresAt?: string | null,
      isUsed?: boolean | null,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type TicketsByUserIDQueryVariables = {
  userID: string,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelTicketFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type TicketsByUserIDQuery = {
  ticketsByUserID?:  {
    __typename: "ModelTicketConnection",
    items:  Array< {
      __typename: "Ticket",
      id: string,
      type: TicketType,
      userID: string,
      gachaResultID?: string | null,
      expiresAt?: string | null,
      isUsed?: boolean | null,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type TicketsByGachaResultIDQueryVariables = {
  gachaResultID: string,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelTicketFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type TicketsByGachaResultIDQuery = {
  ticketsByGachaResultID?:  {
    __typename: "ModelTicketConnection",
    items:  Array< {
      __typename: "Ticket",
      id: string,
      type: TicketType,
      userID: string,
      gachaResultID?: string | null,
      expiresAt?: string | null,
      isUsed?: boolean | null,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type TicketsByExpiresAtQueryVariables = {
  expiresAt: string,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelTicketFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type TicketsByExpiresAtQuery = {
  ticketsByExpiresAt?:  {
    __typename: "ModelTicketConnection",
    items:  Array< {
      __typename: "Ticket",
      id: string,
      type: TicketType,
      userID: string,
      gachaResultID?: string | null,
      expiresAt?: string | null,
      isUsed?: boolean | null,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type InsectsByScientificNameQueryVariables = {
  scientificName: string,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelInsectFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type InsectsByScientificNameQuery = {
  insectsByScientificName?:  {
    __typename: "ModelInsectConnection",
    items:  Array< {
      __typename: "Insect",
      id: string,
      scientificName: string,
      japaneseName: string,
      family: string,
      description?: string | null,
      notes?: string | null,
      userID?: string | null,
      location?: string | null,
      foundAt: string,
      photoID?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type InsectsByJapaneseNameQueryVariables = {
  japaneseName: string,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelInsectFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type InsectsByJapaneseNameQuery = {
  insectsByJapaneseName?:  {
    __typename: "ModelInsectConnection",
    items:  Array< {
      __typename: "Insect",
      id: string,
      scientificName: string,
      japaneseName: string,
      family: string,
      description?: string | null,
      notes?: string | null,
      userID?: string | null,
      location?: string | null,
      foundAt: string,
      photoID?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type InsectsByFamilyQueryVariables = {
  family: string,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelInsectFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type InsectsByFamilyQuery = {
  insectsByFamily?:  {
    __typename: "ModelInsectConnection",
    items:  Array< {
      __typename: "Insect",
      id: string,
      scientificName: string,
      japaneseName: string,
      family: string,
      description?: string | null,
      notes?: string | null,
      userID?: string | null,
      location?: string | null,
      foundAt: string,
      photoID?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type InsectsByUserIDQueryVariables = {
  userID: string,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelInsectFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type InsectsByUserIDQuery = {
  insectsByUserID?:  {
    __typename: "ModelInsectConnection",
    items:  Array< {
      __typename: "Insect",
      id: string,
      scientificName: string,
      japaneseName: string,
      family: string,
      description?: string | null,
      notes?: string | null,
      userID?: string | null,
      location?: string | null,
      foundAt: string,
      photoID?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type InsectsByLocationQueryVariables = {
  location: string,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelInsectFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type InsectsByLocationQuery = {
  insectsByLocation?:  {
    __typename: "ModelInsectConnection",
    items:  Array< {
      __typename: "Insect",
      id: string,
      scientificName: string,
      japaneseName: string,
      family: string,
      description?: string | null,
      notes?: string | null,
      userID?: string | null,
      location?: string | null,
      foundAt: string,
      photoID?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type InsectsByFoundAtQueryVariables = {
  foundAt: string,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelInsectFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type InsectsByFoundAtQuery = {
  insectsByFoundAt?:  {
    __typename: "ModelInsectConnection",
    items:  Array< {
      __typename: "Insect",
      id: string,
      scientificName: string,
      japaneseName: string,
      family: string,
      description?: string | null,
      notes?: string | null,
      userID?: string | null,
      location?: string | null,
      foundAt: string,
      photoID?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type InsectsByPhotoIDQueryVariables = {
  photoID: string,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelInsectFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type InsectsByPhotoIDQuery = {
  insectsByPhotoID?:  {
    __typename: "ModelInsectConnection",
    items:  Array< {
      __typename: "Insect",
      id: string,
      scientificName: string,
      japaneseName: string,
      family: string,
      description?: string | null,
      notes?: string | null,
      userID?: string | null,
      location?: string | null,
      foundAt: string,
      photoID?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type OnCreateUserSubscriptionVariables = {
  filter?: ModelSubscriptionUserFilterInput | null,
};

export type OnCreateUserSubscription = {
  onCreateUser?:  {
    __typename: "User",
    id: string,
    email: string,
    name: string,
    password: string,
    createdAt: string,
    lastLogin?: string | null,
    region?: string | null,
    photos?:  {
      __typename: "ModelPhotoConnection",
      nextToken?: string | null,
    } | null,
    points: number,
    tickets?:  {
      __typename: "ModelTicketConnection",
      nextToken?: string | null,
    } | null,
    rank?: string | null,
    gachaResults?:  {
      __typename: "ModelGachaResultConnection",
      nextToken?: string | null,
    } | null,
    insects?:  {
      __typename: "ModelInsectConnection",
      nextToken?: string | null,
    } | null,
    updatedAt: string,
  } | null,
};

export type OnUpdateUserSubscriptionVariables = {
  filter?: ModelSubscriptionUserFilterInput | null,
};

export type OnUpdateUserSubscription = {
  onUpdateUser?:  {
    __typename: "User",
    id: string,
    email: string,
    name: string,
    password: string,
    createdAt: string,
    lastLogin?: string | null,
    region?: string | null,
    photos?:  {
      __typename: "ModelPhotoConnection",
      nextToken?: string | null,
    } | null,
    points: number,
    tickets?:  {
      __typename: "ModelTicketConnection",
      nextToken?: string | null,
    } | null,
    rank?: string | null,
    gachaResults?:  {
      __typename: "ModelGachaResultConnection",
      nextToken?: string | null,
    } | null,
    insects?:  {
      __typename: "ModelInsectConnection",
      nextToken?: string | null,
    } | null,
    updatedAt: string,
  } | null,
};

export type OnDeleteUserSubscriptionVariables = {
  filter?: ModelSubscriptionUserFilterInput | null,
};

export type OnDeleteUserSubscription = {
  onDeleteUser?:  {
    __typename: "User",
    id: string,
    email: string,
    name: string,
    password: string,
    createdAt: string,
    lastLogin?: string | null,
    region?: string | null,
    photos?:  {
      __typename: "ModelPhotoConnection",
      nextToken?: string | null,
    } | null,
    points: number,
    tickets?:  {
      __typename: "ModelTicketConnection",
      nextToken?: string | null,
    } | null,
    rank?: string | null,
    gachaResults?:  {
      __typename: "ModelGachaResultConnection",
      nextToken?: string | null,
    } | null,
    insects?:  {
      __typename: "ModelInsectConnection",
      nextToken?: string | null,
    } | null,
    updatedAt: string,
  } | null,
};

export type OnCreatePhotoSubscriptionVariables = {
  filter?: ModelSubscriptionPhotoFilterInput | null,
};

export type OnCreatePhotoSubscription = {
  onCreatePhoto?:  {
    __typename: "Photo",
    id: string,
    url: string,
    userID: string,
    user?:  {
      __typename: "User",
      id: string,
      email: string,
      name: string,
      password: string,
      createdAt: string,
      lastLogin?: string | null,
      region?: string | null,
      points: number,
      rank?: string | null,
      updatedAt: string,
    } | null,
    takenAt: string,
    location?: string | null,
    analysis?:  {
      __typename: "AIAnalysis",
      id: string,
      photoID: string,
      result: string,
      analyzedAt: string,
      createdAt: string,
      updatedAt: string,
      aIAnalysisAwardedPointsId?: string | null,
    } | null,
    insect?:  {
      __typename: "Insect",
      id: string,
      scientificName: string,
      japaneseName: string,
      family: string,
      description?: string | null,
      notes?: string | null,
      userID?: string | null,
      location?: string | null,
      foundAt: string,
      photoID?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    imagePath: string,
    summaryPath: string,
    createdAt: string,
    updatedAt: string,
    photoAnalysisId?: string | null,
    photoInsectId?: string | null,
  } | null,
};

export type OnUpdatePhotoSubscriptionVariables = {
  filter?: ModelSubscriptionPhotoFilterInput | null,
};

export type OnUpdatePhotoSubscription = {
  onUpdatePhoto?:  {
    __typename: "Photo",
    id: string,
    url: string,
    userID: string,
    user?:  {
      __typename: "User",
      id: string,
      email: string,
      name: string,
      password: string,
      createdAt: string,
      lastLogin?: string | null,
      region?: string | null,
      points: number,
      rank?: string | null,
      updatedAt: string,
    } | null,
    takenAt: string,
    location?: string | null,
    analysis?:  {
      __typename: "AIAnalysis",
      id: string,
      photoID: string,
      result: string,
      analyzedAt: string,
      createdAt: string,
      updatedAt: string,
      aIAnalysisAwardedPointsId?: string | null,
    } | null,
    insect?:  {
      __typename: "Insect",
      id: string,
      scientificName: string,
      japaneseName: string,
      family: string,
      description?: string | null,
      notes?: string | null,
      userID?: string | null,
      location?: string | null,
      foundAt: string,
      photoID?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    imagePath: string,
    summaryPath: string,
    createdAt: string,
    updatedAt: string,
    photoAnalysisId?: string | null,
    photoInsectId?: string | null,
  } | null,
};

export type OnDeletePhotoSubscriptionVariables = {
  filter?: ModelSubscriptionPhotoFilterInput | null,
};

export type OnDeletePhotoSubscription = {
  onDeletePhoto?:  {
    __typename: "Photo",
    id: string,
    url: string,
    userID: string,
    user?:  {
      __typename: "User",
      id: string,
      email: string,
      name: string,
      password: string,
      createdAt: string,
      lastLogin?: string | null,
      region?: string | null,
      points: number,
      rank?: string | null,
      updatedAt: string,
    } | null,
    takenAt: string,
    location?: string | null,
    analysis?:  {
      __typename: "AIAnalysis",
      id: string,
      photoID: string,
      result: string,
      analyzedAt: string,
      createdAt: string,
      updatedAt: string,
      aIAnalysisAwardedPointsId?: string | null,
    } | null,
    insect?:  {
      __typename: "Insect",
      id: string,
      scientificName: string,
      japaneseName: string,
      family: string,
      description?: string | null,
      notes?: string | null,
      userID?: string | null,
      location?: string | null,
      foundAt: string,
      photoID?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    imagePath: string,
    summaryPath: string,
    createdAt: string,
    updatedAt: string,
    photoAnalysisId?: string | null,
    photoInsectId?: string | null,
  } | null,
};

export type OnCreateAIAnalysisSubscriptionVariables = {
  filter?: ModelSubscriptionAIAnalysisFilterInput | null,
};

export type OnCreateAIAnalysisSubscription = {
  onCreateAIAnalysis?:  {
    __typename: "AIAnalysis",
    id: string,
    photoID: string,
    photo?:  {
      __typename: "Photo",
      id: string,
      url: string,
      userID: string,
      takenAt: string,
      location?: string | null,
      imagePath: string,
      summaryPath: string,
      createdAt: string,
      updatedAt: string,
      photoAnalysisId?: string | null,
      photoInsectId?: string | null,
    } | null,
    result: string,
    analyzedAt: string,
    awardedPoints?:  {
      __typename: "PointsAward",
      id: string,
      analysisID?: string | null,
      value: number,
      awardedAt: string,
      reason?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    createdAt: string,
    updatedAt: string,
    aIAnalysisAwardedPointsId?: string | null,
  } | null,
};

export type OnUpdateAIAnalysisSubscriptionVariables = {
  filter?: ModelSubscriptionAIAnalysisFilterInput | null,
};

export type OnUpdateAIAnalysisSubscription = {
  onUpdateAIAnalysis?:  {
    __typename: "AIAnalysis",
    id: string,
    photoID: string,
    photo?:  {
      __typename: "Photo",
      id: string,
      url: string,
      userID: string,
      takenAt: string,
      location?: string | null,
      imagePath: string,
      summaryPath: string,
      createdAt: string,
      updatedAt: string,
      photoAnalysisId?: string | null,
      photoInsectId?: string | null,
    } | null,
    result: string,
    analyzedAt: string,
    awardedPoints?:  {
      __typename: "PointsAward",
      id: string,
      analysisID?: string | null,
      value: number,
      awardedAt: string,
      reason?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    createdAt: string,
    updatedAt: string,
    aIAnalysisAwardedPointsId?: string | null,
  } | null,
};

export type OnDeleteAIAnalysisSubscriptionVariables = {
  filter?: ModelSubscriptionAIAnalysisFilterInput | null,
};

export type OnDeleteAIAnalysisSubscription = {
  onDeleteAIAnalysis?:  {
    __typename: "AIAnalysis",
    id: string,
    photoID: string,
    photo?:  {
      __typename: "Photo",
      id: string,
      url: string,
      userID: string,
      takenAt: string,
      location?: string | null,
      imagePath: string,
      summaryPath: string,
      createdAt: string,
      updatedAt: string,
      photoAnalysisId?: string | null,
      photoInsectId?: string | null,
    } | null,
    result: string,
    analyzedAt: string,
    awardedPoints?:  {
      __typename: "PointsAward",
      id: string,
      analysisID?: string | null,
      value: number,
      awardedAt: string,
      reason?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    createdAt: string,
    updatedAt: string,
    aIAnalysisAwardedPointsId?: string | null,
  } | null,
};

export type OnCreatePointsAwardSubscriptionVariables = {
  filter?: ModelSubscriptionPointsAwardFilterInput | null,
};

export type OnCreatePointsAwardSubscription = {
  onCreatePointsAward?:  {
    __typename: "PointsAward",
    id: string,
    analysisID?: string | null,
    analysis?:  {
      __typename: "AIAnalysis",
      id: string,
      photoID: string,
      result: string,
      analyzedAt: string,
      createdAt: string,
      updatedAt: string,
      aIAnalysisAwardedPointsId?: string | null,
    } | null,
    value: number,
    awardedAt: string,
    reason?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdatePointsAwardSubscriptionVariables = {
  filter?: ModelSubscriptionPointsAwardFilterInput | null,
};

export type OnUpdatePointsAwardSubscription = {
  onUpdatePointsAward?:  {
    __typename: "PointsAward",
    id: string,
    analysisID?: string | null,
    analysis?:  {
      __typename: "AIAnalysis",
      id: string,
      photoID: string,
      result: string,
      analyzedAt: string,
      createdAt: string,
      updatedAt: string,
      aIAnalysisAwardedPointsId?: string | null,
    } | null,
    value: number,
    awardedAt: string,
    reason?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeletePointsAwardSubscriptionVariables = {
  filter?: ModelSubscriptionPointsAwardFilterInput | null,
};

export type OnDeletePointsAwardSubscription = {
  onDeletePointsAward?:  {
    __typename: "PointsAward",
    id: string,
    analysisID?: string | null,
    analysis?:  {
      __typename: "AIAnalysis",
      id: string,
      photoID: string,
      result: string,
      analyzedAt: string,
      createdAt: string,
      updatedAt: string,
      aIAnalysisAwardedPointsId?: string | null,
    } | null,
    value: number,
    awardedAt: string,
    reason?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnCreateGachaSubscriptionVariables = {
  filter?: ModelSubscriptionGachaFilterInput | null,
};

export type OnCreateGachaSubscription = {
  onCreateGacha?:  {
    __typename: "Gacha",
    id: string,
    name: string,
    costPoints: number,
    availableTickets?: Array< TicketType > | null,
    results?:  {
      __typename: "ModelGachaResultConnection",
      nextToken?: string | null,
    } | null,
    isActive?: boolean | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateGachaSubscriptionVariables = {
  filter?: ModelSubscriptionGachaFilterInput | null,
};

export type OnUpdateGachaSubscription = {
  onUpdateGacha?:  {
    __typename: "Gacha",
    id: string,
    name: string,
    costPoints: number,
    availableTickets?: Array< TicketType > | null,
    results?:  {
      __typename: "ModelGachaResultConnection",
      nextToken?: string | null,
    } | null,
    isActive?: boolean | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteGachaSubscriptionVariables = {
  filter?: ModelSubscriptionGachaFilterInput | null,
};

export type OnDeleteGachaSubscription = {
  onDeleteGacha?:  {
    __typename: "Gacha",
    id: string,
    name: string,
    costPoints: number,
    availableTickets?: Array< TicketType > | null,
    results?:  {
      __typename: "ModelGachaResultConnection",
      nextToken?: string | null,
    } | null,
    isActive?: boolean | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnCreateGachaResultSubscriptionVariables = {
  filter?: ModelSubscriptionGachaResultFilterInput | null,
};

export type OnCreateGachaResultSubscription = {
  onCreateGachaResult?:  {
    __typename: "GachaResult",
    id: string,
    userID: string,
    user?:  {
      __typename: "User",
      id: string,
      email: string,
      name: string,
      password: string,
      createdAt: string,
      lastLogin?: string | null,
      region?: string | null,
      points: number,
      rank?: string | null,
      updatedAt: string,
    } | null,
    gachaID: string,
    gacha?:  {
      __typename: "Gacha",
      id: string,
      name: string,
      costPoints: number,
      availableTickets?: Array< TicketType > | null,
      isActive?: boolean | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    exchangedPoints: number,
    obtainedTicket?:  {
      __typename: "Ticket",
      id: string,
      type: TicketType,
      userID: string,
      gachaResultID?: string | null,
      expiresAt?: string | null,
      isUsed?: boolean | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    resultAt: string,
    createdAt: string,
    updatedAt: string,
    gachaResultObtainedTicketId?: string | null,
  } | null,
};

export type OnUpdateGachaResultSubscriptionVariables = {
  filter?: ModelSubscriptionGachaResultFilterInput | null,
};

export type OnUpdateGachaResultSubscription = {
  onUpdateGachaResult?:  {
    __typename: "GachaResult",
    id: string,
    userID: string,
    user?:  {
      __typename: "User",
      id: string,
      email: string,
      name: string,
      password: string,
      createdAt: string,
      lastLogin?: string | null,
      region?: string | null,
      points: number,
      rank?: string | null,
      updatedAt: string,
    } | null,
    gachaID: string,
    gacha?:  {
      __typename: "Gacha",
      id: string,
      name: string,
      costPoints: number,
      availableTickets?: Array< TicketType > | null,
      isActive?: boolean | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    exchangedPoints: number,
    obtainedTicket?:  {
      __typename: "Ticket",
      id: string,
      type: TicketType,
      userID: string,
      gachaResultID?: string | null,
      expiresAt?: string | null,
      isUsed?: boolean | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    resultAt: string,
    createdAt: string,
    updatedAt: string,
    gachaResultObtainedTicketId?: string | null,
  } | null,
};

export type OnDeleteGachaResultSubscriptionVariables = {
  filter?: ModelSubscriptionGachaResultFilterInput | null,
};

export type OnDeleteGachaResultSubscription = {
  onDeleteGachaResult?:  {
    __typename: "GachaResult",
    id: string,
    userID: string,
    user?:  {
      __typename: "User",
      id: string,
      email: string,
      name: string,
      password: string,
      createdAt: string,
      lastLogin?: string | null,
      region?: string | null,
      points: number,
      rank?: string | null,
      updatedAt: string,
    } | null,
    gachaID: string,
    gacha?:  {
      __typename: "Gacha",
      id: string,
      name: string,
      costPoints: number,
      availableTickets?: Array< TicketType > | null,
      isActive?: boolean | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    exchangedPoints: number,
    obtainedTicket?:  {
      __typename: "Ticket",
      id: string,
      type: TicketType,
      userID: string,
      gachaResultID?: string | null,
      expiresAt?: string | null,
      isUsed?: boolean | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    resultAt: string,
    createdAt: string,
    updatedAt: string,
    gachaResultObtainedTicketId?: string | null,
  } | null,
};

export type OnCreateTicketSubscriptionVariables = {
  filter?: ModelSubscriptionTicketFilterInput | null,
};

export type OnCreateTicketSubscription = {
  onCreateTicket?:  {
    __typename: "Ticket",
    id: string,
    type: TicketType,
    userID: string,
    user?:  {
      __typename: "User",
      id: string,
      email: string,
      name: string,
      password: string,
      createdAt: string,
      lastLogin?: string | null,
      region?: string | null,
      points: number,
      rank?: string | null,
      updatedAt: string,
    } | null,
    gachaResultID?: string | null,
    gachaResult?:  {
      __typename: "GachaResult",
      id: string,
      userID: string,
      gachaID: string,
      exchangedPoints: number,
      resultAt: string,
      createdAt: string,
      updatedAt: string,
      gachaResultObtainedTicketId?: string | null,
    } | null,
    expiresAt?: string | null,
    isUsed?: boolean | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateTicketSubscriptionVariables = {
  filter?: ModelSubscriptionTicketFilterInput | null,
};

export type OnUpdateTicketSubscription = {
  onUpdateTicket?:  {
    __typename: "Ticket",
    id: string,
    type: TicketType,
    userID: string,
    user?:  {
      __typename: "User",
      id: string,
      email: string,
      name: string,
      password: string,
      createdAt: string,
      lastLogin?: string | null,
      region?: string | null,
      points: number,
      rank?: string | null,
      updatedAt: string,
    } | null,
    gachaResultID?: string | null,
    gachaResult?:  {
      __typename: "GachaResult",
      id: string,
      userID: string,
      gachaID: string,
      exchangedPoints: number,
      resultAt: string,
      createdAt: string,
      updatedAt: string,
      gachaResultObtainedTicketId?: string | null,
    } | null,
    expiresAt?: string | null,
    isUsed?: boolean | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteTicketSubscriptionVariables = {
  filter?: ModelSubscriptionTicketFilterInput | null,
};

export type OnDeleteTicketSubscription = {
  onDeleteTicket?:  {
    __typename: "Ticket",
    id: string,
    type: TicketType,
    userID: string,
    user?:  {
      __typename: "User",
      id: string,
      email: string,
      name: string,
      password: string,
      createdAt: string,
      lastLogin?: string | null,
      region?: string | null,
      points: number,
      rank?: string | null,
      updatedAt: string,
    } | null,
    gachaResultID?: string | null,
    gachaResult?:  {
      __typename: "GachaResult",
      id: string,
      userID: string,
      gachaID: string,
      exchangedPoints: number,
      resultAt: string,
      createdAt: string,
      updatedAt: string,
      gachaResultObtainedTicketId?: string | null,
    } | null,
    expiresAt?: string | null,
    isUsed?: boolean | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnCreateInsectSubscriptionVariables = {
  filter?: ModelSubscriptionInsectFilterInput | null,
};

export type OnCreateInsectSubscription = {
  onCreateInsect?:  {
    __typename: "Insect",
    id: string,
    scientificName: string,
    japaneseName: string,
    family: string,
    description?: string | null,
    notes?: string | null,
    userID?: string | null,
    user?:  {
      __typename: "User",
      id: string,
      email: string,
      name: string,
      password: string,
      createdAt: string,
      lastLogin?: string | null,
      region?: string | null,
      points: number,
      rank?: string | null,
      updatedAt: string,
    } | null,
    location?: string | null,
    foundAt: string,
    photoID?: string | null,
    photo?:  {
      __typename: "Photo",
      id: string,
      url: string,
      userID: string,
      takenAt: string,
      location?: string | null,
      imagePath: string,
      summaryPath: string,
      createdAt: string,
      updatedAt: string,
      photoAnalysisId?: string | null,
      photoInsectId?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateInsectSubscriptionVariables = {
  filter?: ModelSubscriptionInsectFilterInput | null,
};

export type OnUpdateInsectSubscription = {
  onUpdateInsect?:  {
    __typename: "Insect",
    id: string,
    scientificName: string,
    japaneseName: string,
    family: string,
    description?: string | null,
    notes?: string | null,
    userID?: string | null,
    user?:  {
      __typename: "User",
      id: string,
      email: string,
      name: string,
      password: string,
      createdAt: string,
      lastLogin?: string | null,
      region?: string | null,
      points: number,
      rank?: string | null,
      updatedAt: string,
    } | null,
    location?: string | null,
    foundAt: string,
    photoID?: string | null,
    photo?:  {
      __typename: "Photo",
      id: string,
      url: string,
      userID: string,
      takenAt: string,
      location?: string | null,
      imagePath: string,
      summaryPath: string,
      createdAt: string,
      updatedAt: string,
      photoAnalysisId?: string | null,
      photoInsectId?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteInsectSubscriptionVariables = {
  filter?: ModelSubscriptionInsectFilterInput | null,
};

export type OnDeleteInsectSubscription = {
  onDeleteInsect?:  {
    __typename: "Insect",
    id: string,
    scientificName: string,
    japaneseName: string,
    family: string,
    description?: string | null,
    notes?: string | null,
    userID?: string | null,
    user?:  {
      __typename: "User",
      id: string,
      email: string,
      name: string,
      password: string,
      createdAt: string,
      lastLogin?: string | null,
      region?: string | null,
      points: number,
      rank?: string | null,
      updatedAt: string,
    } | null,
    location?: string | null,
    foundAt: string,
    photoID?: string | null,
    photo?:  {
      __typename: "Photo",
      id: string,
      url: string,
      userID: string,
      takenAt: string,
      location?: string | null,
      imagePath: string,
      summaryPath: string,
      createdAt: string,
      updatedAt: string,
      photoAnalysisId?: string | null,
      photoInsectId?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};
