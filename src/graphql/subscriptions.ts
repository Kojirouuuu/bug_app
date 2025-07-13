/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

import * as APITypes from "../API";
type GeneratedSubscription<InputType, OutputType> = string & {
  __generatedSubscriptionInput: InputType;
  __generatedSubscriptionOutput: OutputType;
};

export const onCreateUser = /* GraphQL */ `subscription OnCreateUser($filter: ModelSubscriptionUserFilterInput) {
  onCreateUser(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnCreateUserSubscriptionVariables,
  APITypes.OnCreateUserSubscription
>;
export const onUpdateUser = /* GraphQL */ `subscription OnUpdateUser($filter: ModelSubscriptionUserFilterInput) {
  onUpdateUser(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnUpdateUserSubscriptionVariables,
  APITypes.OnUpdateUserSubscription
>;
export const onDeleteUser = /* GraphQL */ `subscription OnDeleteUser($filter: ModelSubscriptionUserFilterInput) {
  onDeleteUser(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnDeleteUserSubscriptionVariables,
  APITypes.OnDeleteUserSubscription
>;
export const onCreatePhoto = /* GraphQL */ `subscription OnCreatePhoto($filter: ModelSubscriptionPhotoFilterInput) {
  onCreatePhoto(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnCreatePhotoSubscriptionVariables,
  APITypes.OnCreatePhotoSubscription
>;
export const onUpdatePhoto = /* GraphQL */ `subscription OnUpdatePhoto($filter: ModelSubscriptionPhotoFilterInput) {
  onUpdatePhoto(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnUpdatePhotoSubscriptionVariables,
  APITypes.OnUpdatePhotoSubscription
>;
export const onDeletePhoto = /* GraphQL */ `subscription OnDeletePhoto($filter: ModelSubscriptionPhotoFilterInput) {
  onDeletePhoto(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnDeletePhotoSubscriptionVariables,
  APITypes.OnDeletePhotoSubscription
>;
export const onCreateAIAnalysis = /* GraphQL */ `subscription OnCreateAIAnalysis(
  $filter: ModelSubscriptionAIAnalysisFilterInput
) {
  onCreateAIAnalysis(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnCreateAIAnalysisSubscriptionVariables,
  APITypes.OnCreateAIAnalysisSubscription
>;
export const onUpdateAIAnalysis = /* GraphQL */ `subscription OnUpdateAIAnalysis(
  $filter: ModelSubscriptionAIAnalysisFilterInput
) {
  onUpdateAIAnalysis(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnUpdateAIAnalysisSubscriptionVariables,
  APITypes.OnUpdateAIAnalysisSubscription
>;
export const onDeleteAIAnalysis = /* GraphQL */ `subscription OnDeleteAIAnalysis(
  $filter: ModelSubscriptionAIAnalysisFilterInput
) {
  onDeleteAIAnalysis(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnDeleteAIAnalysisSubscriptionVariables,
  APITypes.OnDeleteAIAnalysisSubscription
>;
export const onCreatePointsAward = /* GraphQL */ `subscription OnCreatePointsAward(
  $filter: ModelSubscriptionPointsAwardFilterInput
) {
  onCreatePointsAward(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnCreatePointsAwardSubscriptionVariables,
  APITypes.OnCreatePointsAwardSubscription
>;
export const onUpdatePointsAward = /* GraphQL */ `subscription OnUpdatePointsAward(
  $filter: ModelSubscriptionPointsAwardFilterInput
) {
  onUpdatePointsAward(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnUpdatePointsAwardSubscriptionVariables,
  APITypes.OnUpdatePointsAwardSubscription
>;
export const onDeletePointsAward = /* GraphQL */ `subscription OnDeletePointsAward(
  $filter: ModelSubscriptionPointsAwardFilterInput
) {
  onDeletePointsAward(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnDeletePointsAwardSubscriptionVariables,
  APITypes.OnDeletePointsAwardSubscription
>;
export const onCreateGacha = /* GraphQL */ `subscription OnCreateGacha($filter: ModelSubscriptionGachaFilterInput) {
  onCreateGacha(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnCreateGachaSubscriptionVariables,
  APITypes.OnCreateGachaSubscription
>;
export const onUpdateGacha = /* GraphQL */ `subscription OnUpdateGacha($filter: ModelSubscriptionGachaFilterInput) {
  onUpdateGacha(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnUpdateGachaSubscriptionVariables,
  APITypes.OnUpdateGachaSubscription
>;
export const onDeleteGacha = /* GraphQL */ `subscription OnDeleteGacha($filter: ModelSubscriptionGachaFilterInput) {
  onDeleteGacha(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnDeleteGachaSubscriptionVariables,
  APITypes.OnDeleteGachaSubscription
>;
export const onCreateGachaResult = /* GraphQL */ `subscription OnCreateGachaResult(
  $filter: ModelSubscriptionGachaResultFilterInput
) {
  onCreateGachaResult(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnCreateGachaResultSubscriptionVariables,
  APITypes.OnCreateGachaResultSubscription
>;
export const onUpdateGachaResult = /* GraphQL */ `subscription OnUpdateGachaResult(
  $filter: ModelSubscriptionGachaResultFilterInput
) {
  onUpdateGachaResult(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnUpdateGachaResultSubscriptionVariables,
  APITypes.OnUpdateGachaResultSubscription
>;
export const onDeleteGachaResult = /* GraphQL */ `subscription OnDeleteGachaResult(
  $filter: ModelSubscriptionGachaResultFilterInput
) {
  onDeleteGachaResult(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnDeleteGachaResultSubscriptionVariables,
  APITypes.OnDeleteGachaResultSubscription
>;
export const onCreateTicket = /* GraphQL */ `subscription OnCreateTicket($filter: ModelSubscriptionTicketFilterInput) {
  onCreateTicket(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnCreateTicketSubscriptionVariables,
  APITypes.OnCreateTicketSubscription
>;
export const onUpdateTicket = /* GraphQL */ `subscription OnUpdateTicket($filter: ModelSubscriptionTicketFilterInput) {
  onUpdateTicket(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnUpdateTicketSubscriptionVariables,
  APITypes.OnUpdateTicketSubscription
>;
export const onDeleteTicket = /* GraphQL */ `subscription OnDeleteTicket($filter: ModelSubscriptionTicketFilterInput) {
  onDeleteTicket(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnDeleteTicketSubscriptionVariables,
  APITypes.OnDeleteTicketSubscription
>;
export const onCreateInsect = /* GraphQL */ `subscription OnCreateInsect($filter: ModelSubscriptionInsectFilterInput) {
  onCreateInsect(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnCreateInsectSubscriptionVariables,
  APITypes.OnCreateInsectSubscription
>;
export const onUpdateInsect = /* GraphQL */ `subscription OnUpdateInsect($filter: ModelSubscriptionInsectFilterInput) {
  onUpdateInsect(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnUpdateInsectSubscriptionVariables,
  APITypes.OnUpdateInsectSubscription
>;
export const onDeleteInsect = /* GraphQL */ `subscription OnDeleteInsect($filter: ModelSubscriptionInsectFilterInput) {
  onDeleteInsect(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnDeleteInsectSubscriptionVariables,
  APITypes.OnDeleteInsectSubscription
>;
