/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

import * as APITypes from "../API";
type GeneratedQuery<InputType, OutputType> = string & {
  __generatedQueryInput: InputType;
  __generatedQueryOutput: OutputType;
};

export const getUser = /* GraphQL */ `query GetUser($id: ID!) {
  getUser(id: $id) {
    id
    email
    name
    password
    createdAt
    lastLogin
    region
    photos {
      nextToken
      __typename
    }
    points
    tickets {
      nextToken
      __typename
    }
    rank
    gachaResults {
      nextToken
      __typename
    }
    insects {
      nextToken
      __typename
    }
    updatedAt
    __typename
  }
}
` as GeneratedQuery<APITypes.GetUserQueryVariables, APITypes.GetUserQuery>;
export const listUsers = /* GraphQL */ `query ListUsers(
  $filter: ModelUserFilterInput
  $limit: Int
  $nextToken: String
) {
  listUsers(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      email
      name
      password
      createdAt
      lastLogin
      region
      points
      rank
      updatedAt
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<APITypes.ListUsersQueryVariables, APITypes.ListUsersQuery>;
export const getPhoto = /* GraphQL */ `query GetPhoto($id: ID!) {
  getPhoto(id: $id) {
    id
    url
    userID
    user {
      id
      email
      name
      password
      createdAt
      lastLogin
      region
      points
      rank
      updatedAt
      __typename
    }
    takenAt
    location
    analysis {
      id
      photoID
      result
      analyzedAt
      createdAt
      updatedAt
      aIAnalysisAwardedPointsId
      __typename
    }
    insect {
      id
      scientificName
      japaneseName
      family
      description
      notes
      userID
      location
      foundAt
      photoID
      createdAt
      updatedAt
      __typename
    }
    imagePath
    summaryPath
    createdAt
    updatedAt
    photoAnalysisId
    photoInsectId
    __typename
  }
}
` as GeneratedQuery<APITypes.GetPhotoQueryVariables, APITypes.GetPhotoQuery>;
export const listPhotos = /* GraphQL */ `query ListPhotos(
  $filter: ModelPhotoFilterInput
  $limit: Int
  $nextToken: String
) {
  listPhotos(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      url
      userID
      takenAt
      location
      imagePath
      summaryPath
      createdAt
      updatedAt
      photoAnalysisId
      photoInsectId
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListPhotosQueryVariables,
  APITypes.ListPhotosQuery
>;
export const getAIAnalysis = /* GraphQL */ `query GetAIAnalysis($id: ID!) {
  getAIAnalysis(id: $id) {
    id
    photoID
    photo {
      id
      url
      userID
      takenAt
      location
      imagePath
      summaryPath
      createdAt
      updatedAt
      photoAnalysisId
      photoInsectId
      __typename
    }
    result
    analyzedAt
    awardedPoints {
      id
      analysisID
      value
      awardedAt
      reason
      createdAt
      updatedAt
      __typename
    }
    createdAt
    updatedAt
    aIAnalysisAwardedPointsId
    __typename
  }
}
` as GeneratedQuery<
  APITypes.GetAIAnalysisQueryVariables,
  APITypes.GetAIAnalysisQuery
>;
export const listAIAnalyses = /* GraphQL */ `query ListAIAnalyses(
  $filter: ModelAIAnalysisFilterInput
  $limit: Int
  $nextToken: String
) {
  listAIAnalyses(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      photoID
      result
      analyzedAt
      createdAt
      updatedAt
      aIAnalysisAwardedPointsId
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListAIAnalysesQueryVariables,
  APITypes.ListAIAnalysesQuery
>;
export const getPointsAward = /* GraphQL */ `query GetPointsAward($id: ID!) {
  getPointsAward(id: $id) {
    id
    analysisID
    analysis {
      id
      photoID
      result
      analyzedAt
      createdAt
      updatedAt
      aIAnalysisAwardedPointsId
      __typename
    }
    value
    awardedAt
    reason
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedQuery<
  APITypes.GetPointsAwardQueryVariables,
  APITypes.GetPointsAwardQuery
>;
export const listPointsAwards = /* GraphQL */ `query ListPointsAwards(
  $filter: ModelPointsAwardFilterInput
  $limit: Int
  $nextToken: String
) {
  listPointsAwards(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      analysisID
      value
      awardedAt
      reason
      createdAt
      updatedAt
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListPointsAwardsQueryVariables,
  APITypes.ListPointsAwardsQuery
>;
export const getGacha = /* GraphQL */ `query GetGacha($id: ID!) {
  getGacha(id: $id) {
    id
    name
    costPoints
    availableTickets
    results {
      nextToken
      __typename
    }
    isActive
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedQuery<APITypes.GetGachaQueryVariables, APITypes.GetGachaQuery>;
export const listGachas = /* GraphQL */ `query ListGachas(
  $filter: ModelGachaFilterInput
  $limit: Int
  $nextToken: String
) {
  listGachas(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      name
      costPoints
      availableTickets
      isActive
      createdAt
      updatedAt
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListGachasQueryVariables,
  APITypes.ListGachasQuery
>;
export const getGachaResult = /* GraphQL */ `query GetGachaResult($id: ID!) {
  getGachaResult(id: $id) {
    id
    userID
    user {
      id
      email
      name
      password
      createdAt
      lastLogin
      region
      points
      rank
      updatedAt
      __typename
    }
    gachaID
    gacha {
      id
      name
      costPoints
      availableTickets
      isActive
      createdAt
      updatedAt
      __typename
    }
    exchangedPoints
    obtainedTicket {
      id
      type
      userID
      gachaResultID
      expiresAt
      isUsed
      createdAt
      updatedAt
      __typename
    }
    resultAt
    createdAt
    updatedAt
    gachaResultObtainedTicketId
    __typename
  }
}
` as GeneratedQuery<
  APITypes.GetGachaResultQueryVariables,
  APITypes.GetGachaResultQuery
>;
export const listGachaResults = /* GraphQL */ `query ListGachaResults(
  $filter: ModelGachaResultFilterInput
  $limit: Int
  $nextToken: String
) {
  listGachaResults(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      userID
      gachaID
      exchangedPoints
      resultAt
      createdAt
      updatedAt
      gachaResultObtainedTicketId
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListGachaResultsQueryVariables,
  APITypes.ListGachaResultsQuery
>;
export const getTicket = /* GraphQL */ `query GetTicket($id: ID!) {
  getTicket(id: $id) {
    id
    type
    userID
    user {
      id
      email
      name
      password
      createdAt
      lastLogin
      region
      points
      rank
      updatedAt
      __typename
    }
    gachaResultID
    gachaResult {
      id
      userID
      gachaID
      exchangedPoints
      resultAt
      createdAt
      updatedAt
      gachaResultObtainedTicketId
      __typename
    }
    expiresAt
    isUsed
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedQuery<APITypes.GetTicketQueryVariables, APITypes.GetTicketQuery>;
export const listTickets = /* GraphQL */ `query ListTickets(
  $filter: ModelTicketFilterInput
  $limit: Int
  $nextToken: String
) {
  listTickets(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      type
      userID
      gachaResultID
      expiresAt
      isUsed
      createdAt
      updatedAt
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListTicketsQueryVariables,
  APITypes.ListTicketsQuery
>;
export const getInsect = /* GraphQL */ `query GetInsect($id: ID!) {
  getInsect(id: $id) {
    id
    scientificName
    japaneseName
    family
    description
    notes
    userID
    user {
      id
      email
      name
      password
      createdAt
      lastLogin
      region
      points
      rank
      updatedAt
      __typename
    }
    location
    foundAt
    photoID
    photo {
      id
      url
      userID
      takenAt
      location
      imagePath
      summaryPath
      createdAt
      updatedAt
      photoAnalysisId
      photoInsectId
      __typename
    }
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedQuery<APITypes.GetInsectQueryVariables, APITypes.GetInsectQuery>;
export const listInsects = /* GraphQL */ `query ListInsects(
  $filter: ModelInsectFilterInput
  $limit: Int
  $nextToken: String
) {
  listInsects(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      scientificName
      japaneseName
      family
      description
      notes
      userID
      location
      foundAt
      photoID
      createdAt
      updatedAt
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListInsectsQueryVariables,
  APITypes.ListInsectsQuery
>;
export const usersByEmail = /* GraphQL */ `query UsersByEmail(
  $email: String!
  $sortDirection: ModelSortDirection
  $filter: ModelUserFilterInput
  $limit: Int
  $nextToken: String
) {
  usersByEmail(
    email: $email
    sortDirection: $sortDirection
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
      id
      email
      name
      password
      createdAt
      lastLogin
      region
      points
      rank
      updatedAt
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.UsersByEmailQueryVariables,
  APITypes.UsersByEmailQuery
>;
export const usersByName = /* GraphQL */ `query UsersByName(
  $name: String!
  $sortDirection: ModelSortDirection
  $filter: ModelUserFilterInput
  $limit: Int
  $nextToken: String
) {
  usersByName(
    name: $name
    sortDirection: $sortDirection
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
      id
      email
      name
      password
      createdAt
      lastLogin
      region
      points
      rank
      updatedAt
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.UsersByNameQueryVariables,
  APITypes.UsersByNameQuery
>;
export const usersByRegion = /* GraphQL */ `query UsersByRegion(
  $region: String!
  $sortDirection: ModelSortDirection
  $filter: ModelUserFilterInput
  $limit: Int
  $nextToken: String
) {
  usersByRegion(
    region: $region
    sortDirection: $sortDirection
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
      id
      email
      name
      password
      createdAt
      lastLogin
      region
      points
      rank
      updatedAt
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.UsersByRegionQueryVariables,
  APITypes.UsersByRegionQuery
>;
export const usersByRank = /* GraphQL */ `query UsersByRank(
  $rank: String!
  $sortDirection: ModelSortDirection
  $filter: ModelUserFilterInput
  $limit: Int
  $nextToken: String
) {
  usersByRank(
    rank: $rank
    sortDirection: $sortDirection
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
      id
      email
      name
      password
      createdAt
      lastLogin
      region
      points
      rank
      updatedAt
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.UsersByRankQueryVariables,
  APITypes.UsersByRankQuery
>;
export const photosByUserID = /* GraphQL */ `query PhotosByUserID(
  $userID: ID!
  $sortDirection: ModelSortDirection
  $filter: ModelPhotoFilterInput
  $limit: Int
  $nextToken: String
) {
  photosByUserID(
    userID: $userID
    sortDirection: $sortDirection
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
      id
      url
      userID
      takenAt
      location
      imagePath
      summaryPath
      createdAt
      updatedAt
      photoAnalysisId
      photoInsectId
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.PhotosByUserIDQueryVariables,
  APITypes.PhotosByUserIDQuery
>;
export const photosByTakenAt = /* GraphQL */ `query PhotosByTakenAt(
  $takenAt: AWSDateTime!
  $sortDirection: ModelSortDirection
  $filter: ModelPhotoFilterInput
  $limit: Int
  $nextToken: String
) {
  photosByTakenAt(
    takenAt: $takenAt
    sortDirection: $sortDirection
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
      id
      url
      userID
      takenAt
      location
      imagePath
      summaryPath
      createdAt
      updatedAt
      photoAnalysisId
      photoInsectId
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.PhotosByTakenAtQueryVariables,
  APITypes.PhotosByTakenAtQuery
>;
export const aIAnalysesByPhotoID = /* GraphQL */ `query AIAnalysesByPhotoID(
  $photoID: ID!
  $sortDirection: ModelSortDirection
  $filter: ModelAIAnalysisFilterInput
  $limit: Int
  $nextToken: String
) {
  aIAnalysesByPhotoID(
    photoID: $photoID
    sortDirection: $sortDirection
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
      id
      photoID
      result
      analyzedAt
      createdAt
      updatedAt
      aIAnalysisAwardedPointsId
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.AIAnalysesByPhotoIDQueryVariables,
  APITypes.AIAnalysesByPhotoIDQuery
>;
export const aIAnalysesByAnalyzedAt = /* GraphQL */ `query AIAnalysesByAnalyzedAt(
  $analyzedAt: AWSDateTime!
  $sortDirection: ModelSortDirection
  $filter: ModelAIAnalysisFilterInput
  $limit: Int
  $nextToken: String
) {
  aIAnalysesByAnalyzedAt(
    analyzedAt: $analyzedAt
    sortDirection: $sortDirection
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
      id
      photoID
      result
      analyzedAt
      createdAt
      updatedAt
      aIAnalysisAwardedPointsId
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.AIAnalysesByAnalyzedAtQueryVariables,
  APITypes.AIAnalysesByAnalyzedAtQuery
>;
export const pointsAwardsByAnalysisID = /* GraphQL */ `query PointsAwardsByAnalysisID(
  $analysisID: ID!
  $sortDirection: ModelSortDirection
  $filter: ModelPointsAwardFilterInput
  $limit: Int
  $nextToken: String
) {
  pointsAwardsByAnalysisID(
    analysisID: $analysisID
    sortDirection: $sortDirection
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
      id
      analysisID
      value
      awardedAt
      reason
      createdAt
      updatedAt
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.PointsAwardsByAnalysisIDQueryVariables,
  APITypes.PointsAwardsByAnalysisIDQuery
>;
export const pointsAwardsByAwardedAt = /* GraphQL */ `query PointsAwardsByAwardedAt(
  $awardedAt: AWSDateTime!
  $sortDirection: ModelSortDirection
  $filter: ModelPointsAwardFilterInput
  $limit: Int
  $nextToken: String
) {
  pointsAwardsByAwardedAt(
    awardedAt: $awardedAt
    sortDirection: $sortDirection
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
      id
      analysisID
      value
      awardedAt
      reason
      createdAt
      updatedAt
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.PointsAwardsByAwardedAtQueryVariables,
  APITypes.PointsAwardsByAwardedAtQuery
>;
export const gachasByName = /* GraphQL */ `query GachasByName(
  $name: String!
  $sortDirection: ModelSortDirection
  $filter: ModelGachaFilterInput
  $limit: Int
  $nextToken: String
) {
  gachasByName(
    name: $name
    sortDirection: $sortDirection
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
      id
      name
      costPoints
      availableTickets
      isActive
      createdAt
      updatedAt
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.GachasByNameQueryVariables,
  APITypes.GachasByNameQuery
>;
export const gachaResultsByUserID = /* GraphQL */ `query GachaResultsByUserID(
  $userID: ID!
  $sortDirection: ModelSortDirection
  $filter: ModelGachaResultFilterInput
  $limit: Int
  $nextToken: String
) {
  gachaResultsByUserID(
    userID: $userID
    sortDirection: $sortDirection
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
      id
      userID
      gachaID
      exchangedPoints
      resultAt
      createdAt
      updatedAt
      gachaResultObtainedTicketId
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.GachaResultsByUserIDQueryVariables,
  APITypes.GachaResultsByUserIDQuery
>;
export const gachaResultsByGachaID = /* GraphQL */ `query GachaResultsByGachaID(
  $gachaID: ID!
  $sortDirection: ModelSortDirection
  $filter: ModelGachaResultFilterInput
  $limit: Int
  $nextToken: String
) {
  gachaResultsByGachaID(
    gachaID: $gachaID
    sortDirection: $sortDirection
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
      id
      userID
      gachaID
      exchangedPoints
      resultAt
      createdAt
      updatedAt
      gachaResultObtainedTicketId
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.GachaResultsByGachaIDQueryVariables,
  APITypes.GachaResultsByGachaIDQuery
>;
export const gachaResultsByResultAt = /* GraphQL */ `query GachaResultsByResultAt(
  $resultAt: AWSDateTime!
  $sortDirection: ModelSortDirection
  $filter: ModelGachaResultFilterInput
  $limit: Int
  $nextToken: String
) {
  gachaResultsByResultAt(
    resultAt: $resultAt
    sortDirection: $sortDirection
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
      id
      userID
      gachaID
      exchangedPoints
      resultAt
      createdAt
      updatedAt
      gachaResultObtainedTicketId
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.GachaResultsByResultAtQueryVariables,
  APITypes.GachaResultsByResultAtQuery
>;
export const ticketsByType = /* GraphQL */ `query TicketsByType(
  $type: TicketType!
  $sortDirection: ModelSortDirection
  $filter: ModelTicketFilterInput
  $limit: Int
  $nextToken: String
) {
  ticketsByType(
    type: $type
    sortDirection: $sortDirection
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
      id
      type
      userID
      gachaResultID
      expiresAt
      isUsed
      createdAt
      updatedAt
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.TicketsByTypeQueryVariables,
  APITypes.TicketsByTypeQuery
>;
export const ticketsByUserID = /* GraphQL */ `query TicketsByUserID(
  $userID: ID!
  $sortDirection: ModelSortDirection
  $filter: ModelTicketFilterInput
  $limit: Int
  $nextToken: String
) {
  ticketsByUserID(
    userID: $userID
    sortDirection: $sortDirection
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
      id
      type
      userID
      gachaResultID
      expiresAt
      isUsed
      createdAt
      updatedAt
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.TicketsByUserIDQueryVariables,
  APITypes.TicketsByUserIDQuery
>;
export const ticketsByGachaResultID = /* GraphQL */ `query TicketsByGachaResultID(
  $gachaResultID: ID!
  $sortDirection: ModelSortDirection
  $filter: ModelTicketFilterInput
  $limit: Int
  $nextToken: String
) {
  ticketsByGachaResultID(
    gachaResultID: $gachaResultID
    sortDirection: $sortDirection
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
      id
      type
      userID
      gachaResultID
      expiresAt
      isUsed
      createdAt
      updatedAt
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.TicketsByGachaResultIDQueryVariables,
  APITypes.TicketsByGachaResultIDQuery
>;
export const ticketsByExpiresAt = /* GraphQL */ `query TicketsByExpiresAt(
  $expiresAt: AWSDate!
  $sortDirection: ModelSortDirection
  $filter: ModelTicketFilterInput
  $limit: Int
  $nextToken: String
) {
  ticketsByExpiresAt(
    expiresAt: $expiresAt
    sortDirection: $sortDirection
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
      id
      type
      userID
      gachaResultID
      expiresAt
      isUsed
      createdAt
      updatedAt
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.TicketsByExpiresAtQueryVariables,
  APITypes.TicketsByExpiresAtQuery
>;
export const insectsByScientificName = /* GraphQL */ `query InsectsByScientificName(
  $scientificName: String!
  $sortDirection: ModelSortDirection
  $filter: ModelInsectFilterInput
  $limit: Int
  $nextToken: String
) {
  insectsByScientificName(
    scientificName: $scientificName
    sortDirection: $sortDirection
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
      id
      scientificName
      japaneseName
      family
      description
      notes
      userID
      location
      foundAt
      photoID
      createdAt
      updatedAt
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.InsectsByScientificNameQueryVariables,
  APITypes.InsectsByScientificNameQuery
>;
export const insectsByJapaneseName = /* GraphQL */ `query InsectsByJapaneseName(
  $japaneseName: String!
  $sortDirection: ModelSortDirection
  $filter: ModelInsectFilterInput
  $limit: Int
  $nextToken: String
) {
  insectsByJapaneseName(
    japaneseName: $japaneseName
    sortDirection: $sortDirection
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
      id
      scientificName
      japaneseName
      family
      description
      notes
      userID
      location
      foundAt
      photoID
      createdAt
      updatedAt
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.InsectsByJapaneseNameQueryVariables,
  APITypes.InsectsByJapaneseNameQuery
>;
export const insectsByFamily = /* GraphQL */ `query InsectsByFamily(
  $family: String!
  $sortDirection: ModelSortDirection
  $filter: ModelInsectFilterInput
  $limit: Int
  $nextToken: String
) {
  insectsByFamily(
    family: $family
    sortDirection: $sortDirection
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
      id
      scientificName
      japaneseName
      family
      description
      notes
      userID
      location
      foundAt
      photoID
      createdAt
      updatedAt
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.InsectsByFamilyQueryVariables,
  APITypes.InsectsByFamilyQuery
>;
export const insectsByUserID = /* GraphQL */ `query InsectsByUserID(
  $userID: ID!
  $sortDirection: ModelSortDirection
  $filter: ModelInsectFilterInput
  $limit: Int
  $nextToken: String
) {
  insectsByUserID(
    userID: $userID
    sortDirection: $sortDirection
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
      id
      scientificName
      japaneseName
      family
      description
      notes
      userID
      location
      foundAt
      photoID
      createdAt
      updatedAt
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.InsectsByUserIDQueryVariables,
  APITypes.InsectsByUserIDQuery
>;
export const insectsByLocation = /* GraphQL */ `query InsectsByLocation(
  $location: String!
  $sortDirection: ModelSortDirection
  $filter: ModelInsectFilterInput
  $limit: Int
  $nextToken: String
) {
  insectsByLocation(
    location: $location
    sortDirection: $sortDirection
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
      id
      scientificName
      japaneseName
      family
      description
      notes
      userID
      location
      foundAt
      photoID
      createdAt
      updatedAt
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.InsectsByLocationQueryVariables,
  APITypes.InsectsByLocationQuery
>;
export const insectsByFoundAt = /* GraphQL */ `query InsectsByFoundAt(
  $foundAt: AWSDate!
  $sortDirection: ModelSortDirection
  $filter: ModelInsectFilterInput
  $limit: Int
  $nextToken: String
) {
  insectsByFoundAt(
    foundAt: $foundAt
    sortDirection: $sortDirection
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
      id
      scientificName
      japaneseName
      family
      description
      notes
      userID
      location
      foundAt
      photoID
      createdAt
      updatedAt
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.InsectsByFoundAtQueryVariables,
  APITypes.InsectsByFoundAtQuery
>;
export const insectsByPhotoID = /* GraphQL */ `query InsectsByPhotoID(
  $photoID: ID!
  $sortDirection: ModelSortDirection
  $filter: ModelInsectFilterInput
  $limit: Int
  $nextToken: String
) {
  insectsByPhotoID(
    photoID: $photoID
    sortDirection: $sortDirection
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
      id
      scientificName
      japaneseName
      family
      description
      notes
      userID
      location
      foundAt
      photoID
      createdAt
      updatedAt
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.InsectsByPhotoIDQueryVariables,
  APITypes.InsectsByPhotoIDQuery
>;
