/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createUser = /* GraphQL */ `
  mutation CreateUser(
    $input: CreateUserInput!
    $condition: ModelUserConditionInput
  ) {
    createUser(input: $input, condition: $condition) {
      id
      Joined_Cards
      Name
      Bio
      Profile_Pic
      email
      createdAt
      updatedAt
    }
  }
`;
export const updateUser = /* GraphQL */ `
  mutation UpdateUser(
    $input: UpdateUserInput!
    $condition: ModelUserConditionInput
  ) {
    updateUser(input: $input, condition: $condition) {
      id
      Joined_Cards
      Name
      Bio
      Profile_Pic
      email
      createdAt
      updatedAt
    }
  }
`;
export const deleteUser = /* GraphQL */ `
  mutation DeleteUser(
    $input: DeleteUserInput!
    $condition: ModelUserConditionInput
  ) {
    deleteUser(input: $input, condition: $condition) {
      id
      Joined_Cards
      Name
      Bio
      Profile_Pic
      email
      createdAt
      updatedAt
    }
  }
`;
export const createCards = /* GraphQL */ `
  mutation CreateCards(
    $input: CreateCardsInput!
    $condition: ModelCardsConditionInput
  ) {
    createCards(input: $input, condition: $condition) {
      id
      ContentName
      Creator
      Capacity
      HostName
      Time
      CourseName
      MeetingInfo
      count
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
      ContentName
      Creator
      Capacity
      HostName
      Time
      CourseName
      MeetingInfo
      count
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
      ContentName
      Creator
      Capacity
      HostName
      Time
      CourseName
      MeetingInfo
      count
      createdAt
      updatedAt
    }
  }
`;
