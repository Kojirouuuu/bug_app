/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

import * as APITypes from "../API";
type GeneratedMutation<InputType, OutputType> = string & {
  __generatedMutationInput: InputType;
  __generatedMutationOutput: OutputType;
};

export const createUser = /* GraphQL */ `mutation CreateUser(
  $input: CreateUserInput!
  $condition: ModelUserConditionInput
) {
  createUser(input: $input, condition: $condition) {
    id
    name
    cognitosub
    createdAt
    lastLogin
    region
    photos {
      nextToken
      startedAt
      __typename
    }
    points
    tickets {
      nextToken
      startedAt
      __typename
    }
    rank
    gachaResults {
      nextToken
      startedAt
      __typename
    }
    insects {
      nextToken
      startedAt
      __typename
    }
    updatedAt
    _version
    _deleted
    _lastChangedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.CreateUserMutationVariables,
  APITypes.CreateUserMutation
>;
export const updateUser = /* GraphQL */ `mutation UpdateUser(
  $input: UpdateUserInput!
  $condition: ModelUserConditionInput
) {
  updateUser(input: $input, condition: $condition) {
    id
    name
    cognitosub
    createdAt
    lastLogin
    region
    photos {
      nextToken
      startedAt
      __typename
    }
    points
    tickets {
      nextToken
      startedAt
      __typename
    }
    rank
    gachaResults {
      nextToken
      startedAt
      __typename
    }
    insects {
      nextToken
      startedAt
      __typename
    }
    updatedAt
    _version
    _deleted
    _lastChangedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.UpdateUserMutationVariables,
  APITypes.UpdateUserMutation
>;
export const deleteUser = /* GraphQL */ `mutation DeleteUser(
  $input: DeleteUserInput!
  $condition: ModelUserConditionInput
) {
  deleteUser(input: $input, condition: $condition) {
    id
    name
    cognitosub
    createdAt
    lastLogin
    region
    photos {
      nextToken
      startedAt
      __typename
    }
    points
    tickets {
      nextToken
      startedAt
      __typename
    }
    rank
    gachaResults {
      nextToken
      startedAt
      __typename
    }
    insects {
      nextToken
      startedAt
      __typename
    }
    updatedAt
    _version
    _deleted
    _lastChangedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.DeleteUserMutationVariables,
  APITypes.DeleteUserMutation
>;
export const createPhoto = /* GraphQL */ `mutation CreatePhoto(
  $input: CreatePhotoInput!
  $condition: ModelPhotoConditionInput
) {
  createPhoto(input: $input, condition: $condition) {
    id
    url
    userID
    user {
      id
      name
      cognitosub
      createdAt
      lastLogin
      region
      points
      rank
      updatedAt
      _version
      _deleted
      _lastChangedAt
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
      _version
      _deleted
      _lastChangedAt
      aIAnalysisAwardedPointsId
      __typename
    }
    insect {
      id
      species
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
      _version
      _deleted
      _lastChangedAt
      __typename
    }
    s3path
    createdAt
    updatedAt
    _version
    _deleted
    _lastChangedAt
    photoAnalysisId
    photoInsectId
    __typename
  }
}
` as GeneratedMutation<
  APITypes.CreatePhotoMutationVariables,
  APITypes.CreatePhotoMutation
>;
export const updatePhoto = /* GraphQL */ `mutation UpdatePhoto(
  $input: UpdatePhotoInput!
  $condition: ModelPhotoConditionInput
) {
  updatePhoto(input: $input, condition: $condition) {
    id
    url
    userID
    user {
      id
      name
      cognitosub
      createdAt
      lastLogin
      region
      points
      rank
      updatedAt
      _version
      _deleted
      _lastChangedAt
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
      _version
      _deleted
      _lastChangedAt
      aIAnalysisAwardedPointsId
      __typename
    }
    insect {
      id
      species
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
      _version
      _deleted
      _lastChangedAt
      __typename
    }
    s3path
    createdAt
    updatedAt
    _version
    _deleted
    _lastChangedAt
    photoAnalysisId
    photoInsectId
    __typename
  }
}
` as GeneratedMutation<
  APITypes.UpdatePhotoMutationVariables,
  APITypes.UpdatePhotoMutation
>;
export const deletePhoto = /* GraphQL */ `mutation DeletePhoto(
  $input: DeletePhotoInput!
  $condition: ModelPhotoConditionInput
) {
  deletePhoto(input: $input, condition: $condition) {
    id
    url
    userID
    user {
      id
      name
      cognitosub
      createdAt
      lastLogin
      region
      points
      rank
      updatedAt
      _version
      _deleted
      _lastChangedAt
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
      _version
      _deleted
      _lastChangedAt
      aIAnalysisAwardedPointsId
      __typename
    }
    insect {
      id
      species
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
      _version
      _deleted
      _lastChangedAt
      __typename
    }
    s3path
    createdAt
    updatedAt
    _version
    _deleted
    _lastChangedAt
    photoAnalysisId
    photoInsectId
    __typename
  }
}
` as GeneratedMutation<
  APITypes.DeletePhotoMutationVariables,
  APITypes.DeletePhotoMutation
>;
export const createAIAnalysis = /* GraphQL */ `mutation CreateAIAnalysis(
  $input: CreateAIAnalysisInput!
  $condition: ModelAIAnalysisConditionInput
) {
  createAIAnalysis(input: $input, condition: $condition) {
    id
    photoID
    photo {
      id
      url
      userID
      takenAt
      location
      s3path
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
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
      _version
      _deleted
      _lastChangedAt
      __typename
    }
    createdAt
    updatedAt
    _version
    _deleted
    _lastChangedAt
    aIAnalysisAwardedPointsId
    __typename
  }
}
` as GeneratedMutation<
  APITypes.CreateAIAnalysisMutationVariables,
  APITypes.CreateAIAnalysisMutation
>;
export const updateAIAnalysis = /* GraphQL */ `mutation UpdateAIAnalysis(
  $input: UpdateAIAnalysisInput!
  $condition: ModelAIAnalysisConditionInput
) {
  updateAIAnalysis(input: $input, condition: $condition) {
    id
    photoID
    photo {
      id
      url
      userID
      takenAt
      location
      s3path
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
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
      _version
      _deleted
      _lastChangedAt
      __typename
    }
    createdAt
    updatedAt
    _version
    _deleted
    _lastChangedAt
    aIAnalysisAwardedPointsId
    __typename
  }
}
` as GeneratedMutation<
  APITypes.UpdateAIAnalysisMutationVariables,
  APITypes.UpdateAIAnalysisMutation
>;
export const deleteAIAnalysis = /* GraphQL */ `mutation DeleteAIAnalysis(
  $input: DeleteAIAnalysisInput!
  $condition: ModelAIAnalysisConditionInput
) {
  deleteAIAnalysis(input: $input, condition: $condition) {
    id
    photoID
    photo {
      id
      url
      userID
      takenAt
      location
      s3path
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
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
      _version
      _deleted
      _lastChangedAt
      __typename
    }
    createdAt
    updatedAt
    _version
    _deleted
    _lastChangedAt
    aIAnalysisAwardedPointsId
    __typename
  }
}
` as GeneratedMutation<
  APITypes.DeleteAIAnalysisMutationVariables,
  APITypes.DeleteAIAnalysisMutation
>;
export const createPointsAward = /* GraphQL */ `mutation CreatePointsAward(
  $input: CreatePointsAwardInput!
  $condition: ModelPointsAwardConditionInput
) {
  createPointsAward(input: $input, condition: $condition) {
    id
    analysisID
    analysis {
      id
      photoID
      result
      analyzedAt
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      aIAnalysisAwardedPointsId
      __typename
    }
    value
    awardedAt
    reason
    createdAt
    updatedAt
    _version
    _deleted
    _lastChangedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.CreatePointsAwardMutationVariables,
  APITypes.CreatePointsAwardMutation
>;
export const updatePointsAward = /* GraphQL */ `mutation UpdatePointsAward(
  $input: UpdatePointsAwardInput!
  $condition: ModelPointsAwardConditionInput
) {
  updatePointsAward(input: $input, condition: $condition) {
    id
    analysisID
    analysis {
      id
      photoID
      result
      analyzedAt
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      aIAnalysisAwardedPointsId
      __typename
    }
    value
    awardedAt
    reason
    createdAt
    updatedAt
    _version
    _deleted
    _lastChangedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.UpdatePointsAwardMutationVariables,
  APITypes.UpdatePointsAwardMutation
>;
export const deletePointsAward = /* GraphQL */ `mutation DeletePointsAward(
  $input: DeletePointsAwardInput!
  $condition: ModelPointsAwardConditionInput
) {
  deletePointsAward(input: $input, condition: $condition) {
    id
    analysisID
    analysis {
      id
      photoID
      result
      analyzedAt
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      aIAnalysisAwardedPointsId
      __typename
    }
    value
    awardedAt
    reason
    createdAt
    updatedAt
    _version
    _deleted
    _lastChangedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.DeletePointsAwardMutationVariables,
  APITypes.DeletePointsAwardMutation
>;
export const createGacha = /* GraphQL */ `mutation CreateGacha(
  $input: CreateGachaInput!
  $condition: ModelGachaConditionInput
) {
  createGacha(input: $input, condition: $condition) {
    id
    name
    costPoints
    availableTickets
    results {
      nextToken
      startedAt
      __typename
    }
    isActive
    createdAt
    updatedAt
    _version
    _deleted
    _lastChangedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.CreateGachaMutationVariables,
  APITypes.CreateGachaMutation
>;
export const updateGacha = /* GraphQL */ `mutation UpdateGacha(
  $input: UpdateGachaInput!
  $condition: ModelGachaConditionInput
) {
  updateGacha(input: $input, condition: $condition) {
    id
    name
    costPoints
    availableTickets
    results {
      nextToken
      startedAt
      __typename
    }
    isActive
    createdAt
    updatedAt
    _version
    _deleted
    _lastChangedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.UpdateGachaMutationVariables,
  APITypes.UpdateGachaMutation
>;
export const deleteGacha = /* GraphQL */ `mutation DeleteGacha(
  $input: DeleteGachaInput!
  $condition: ModelGachaConditionInput
) {
  deleteGacha(input: $input, condition: $condition) {
    id
    name
    costPoints
    availableTickets
    results {
      nextToken
      startedAt
      __typename
    }
    isActive
    createdAt
    updatedAt
    _version
    _deleted
    _lastChangedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.DeleteGachaMutationVariables,
  APITypes.DeleteGachaMutation
>;
export const createGachaResult = /* GraphQL */ `mutation CreateGachaResult(
  $input: CreateGachaResultInput!
  $condition: ModelGachaResultConditionInput
) {
  createGachaResult(input: $input, condition: $condition) {
    id
    userID
    user {
      id
      name
      cognitosub
      createdAt
      lastLogin
      region
      points
      rank
      updatedAt
      _version
      _deleted
      _lastChangedAt
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
      _version
      _deleted
      _lastChangedAt
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
      _version
      _deleted
      _lastChangedAt
      __typename
    }
    resultAt
    createdAt
    updatedAt
    _version
    _deleted
    _lastChangedAt
    gachaResultObtainedTicketId
    __typename
  }
}
` as GeneratedMutation<
  APITypes.CreateGachaResultMutationVariables,
  APITypes.CreateGachaResultMutation
>;
export const updateGachaResult = /* GraphQL */ `mutation UpdateGachaResult(
  $input: UpdateGachaResultInput!
  $condition: ModelGachaResultConditionInput
) {
  updateGachaResult(input: $input, condition: $condition) {
    id
    userID
    user {
      id
      name
      cognitosub
      createdAt
      lastLogin
      region
      points
      rank
      updatedAt
      _version
      _deleted
      _lastChangedAt
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
      _version
      _deleted
      _lastChangedAt
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
      _version
      _deleted
      _lastChangedAt
      __typename
    }
    resultAt
    createdAt
    updatedAt
    _version
    _deleted
    _lastChangedAt
    gachaResultObtainedTicketId
    __typename
  }
}
` as GeneratedMutation<
  APITypes.UpdateGachaResultMutationVariables,
  APITypes.UpdateGachaResultMutation
>;
export const deleteGachaResult = /* GraphQL */ `mutation DeleteGachaResult(
  $input: DeleteGachaResultInput!
  $condition: ModelGachaResultConditionInput
) {
  deleteGachaResult(input: $input, condition: $condition) {
    id
    userID
    user {
      id
      name
      cognitosub
      createdAt
      lastLogin
      region
      points
      rank
      updatedAt
      _version
      _deleted
      _lastChangedAt
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
      _version
      _deleted
      _lastChangedAt
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
      _version
      _deleted
      _lastChangedAt
      __typename
    }
    resultAt
    createdAt
    updatedAt
    _version
    _deleted
    _lastChangedAt
    gachaResultObtainedTicketId
    __typename
  }
}
` as GeneratedMutation<
  APITypes.DeleteGachaResultMutationVariables,
  APITypes.DeleteGachaResultMutation
>;
export const createTicket = /* GraphQL */ `mutation CreateTicket(
  $input: CreateTicketInput!
  $condition: ModelTicketConditionInput
) {
  createTicket(input: $input, condition: $condition) {
    id
    type
    userID
    user {
      id
      name
      cognitosub
      createdAt
      lastLogin
      region
      points
      rank
      updatedAt
      _version
      _deleted
      _lastChangedAt
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
      _version
      _deleted
      _lastChangedAt
      gachaResultObtainedTicketId
      __typename
    }
    expiresAt
    isUsed
    createdAt
    updatedAt
    _version
    _deleted
    _lastChangedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.CreateTicketMutationVariables,
  APITypes.CreateTicketMutation
>;
export const updateTicket = /* GraphQL */ `mutation UpdateTicket(
  $input: UpdateTicketInput!
  $condition: ModelTicketConditionInput
) {
  updateTicket(input: $input, condition: $condition) {
    id
    type
    userID
    user {
      id
      name
      cognitosub
      createdAt
      lastLogin
      region
      points
      rank
      updatedAt
      _version
      _deleted
      _lastChangedAt
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
      _version
      _deleted
      _lastChangedAt
      gachaResultObtainedTicketId
      __typename
    }
    expiresAt
    isUsed
    createdAt
    updatedAt
    _version
    _deleted
    _lastChangedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.UpdateTicketMutationVariables,
  APITypes.UpdateTicketMutation
>;
export const deleteTicket = /* GraphQL */ `mutation DeleteTicket(
  $input: DeleteTicketInput!
  $condition: ModelTicketConditionInput
) {
  deleteTicket(input: $input, condition: $condition) {
    id
    type
    userID
    user {
      id
      name
      cognitosub
      createdAt
      lastLogin
      region
      points
      rank
      updatedAt
      _version
      _deleted
      _lastChangedAt
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
      _version
      _deleted
      _lastChangedAt
      gachaResultObtainedTicketId
      __typename
    }
    expiresAt
    isUsed
    createdAt
    updatedAt
    _version
    _deleted
    _lastChangedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.DeleteTicketMutationVariables,
  APITypes.DeleteTicketMutation
>;
export const createInsect = /* GraphQL */ `mutation CreateInsect(
  $input: CreateInsectInput!
  $condition: ModelInsectConditionInput
) {
  createInsect(input: $input, condition: $condition) {
    id
    species
    scientificName
    japaneseName
    family
    description
    notes
    userID
    user {
      id
      name
      cognitosub
      createdAt
      lastLogin
      region
      points
      rank
      updatedAt
      _version
      _deleted
      _lastChangedAt
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
      s3path
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      photoAnalysisId
      photoInsectId
      __typename
    }
    createdAt
    updatedAt
    _version
    _deleted
    _lastChangedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.CreateInsectMutationVariables,
  APITypes.CreateInsectMutation
>;
export const updateInsect = /* GraphQL */ `mutation UpdateInsect(
  $input: UpdateInsectInput!
  $condition: ModelInsectConditionInput
) {
  updateInsect(input: $input, condition: $condition) {
    id
    species
    scientificName
    japaneseName
    family
    description
    notes
    userID
    user {
      id
      name
      cognitosub
      createdAt
      lastLogin
      region
      points
      rank
      updatedAt
      _version
      _deleted
      _lastChangedAt
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
      s3path
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      photoAnalysisId
      photoInsectId
      __typename
    }
    createdAt
    updatedAt
    _version
    _deleted
    _lastChangedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.UpdateInsectMutationVariables,
  APITypes.UpdateInsectMutation
>;
export const deleteInsect = /* GraphQL */ `mutation DeleteInsect(
  $input: DeleteInsectInput!
  $condition: ModelInsectConditionInput
) {
  deleteInsect(input: $input, condition: $condition) {
    id
    species
    scientificName
    japaneseName
    family
    description
    notes
    userID
    user {
      id
      name
      cognitosub
      createdAt
      lastLogin
      region
      points
      rank
      updatedAt
      _version
      _deleted
      _lastChangedAt
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
      s3path
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      photoAnalysisId
      photoInsectId
      __typename
    }
    createdAt
    updatedAt
    _version
    _deleted
    _lastChangedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.DeleteInsectMutationVariables,
  APITypes.DeleteInsectMutation
>;
