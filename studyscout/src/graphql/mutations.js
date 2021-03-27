/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createCards = /* GraphQL */ `
  mutation CreateCards(
    $input: CreateCardsInput!
    $condition: ModelCardsConditionInput
  ) {
    createCards(input: $input, condition: $condition) {
      id
      courseName
      contentName
      hostName
      date
      time
      meetingLink
      capacity
      createdAt
      updatedAt
    }
  }
`;
export const updateCards = /* GraphQL */ `
  mutation UpdateCards(
    $input: UpdateCardsInput!
    $condition: ModelCardsConditionInput
  ) {
    updateCards(input: $input, condition: $condition) {
      id
      courseName
      contentName
      hostName
      date
      time
      meetingLink
      capacity
      createdAt
      updatedAt
    }
  }
`;
export const deleteCards = /* GraphQL */ `
  mutation DeleteCards(
    $input: DeleteCardsInput!
    $condition: ModelCardsConditionInput
  ) {
    deleteCards(input: $input, condition: $condition) {
      id
      courseName
      contentName
      hostName
      date
      time
      meetingLink
      capacity
      createdAt
      updatedAt
    }
  }
`;
