/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getUser = /* GraphQL */ `
  query GetUser($id: ID!) {
    getUser(id: $id) {
      id
      Joined_Cards
      Name
      Bio
      Profile_Pic
      createdAt
      updatedAt
    }
  }
`;
export const listUsers = /* GraphQL */ `
  query ListUsers(
    $filter: ModelUserFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listUsers(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        Joined_Cards
        Name
        Bio
        Profile_Pic
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getCards = /* GraphQL */ `
  query GetCards($id: ID!) {
    getCards(id: $id) {
      id
      ContentName
      Creator
      Capacity
      HostName
      Time
      CourseName
      MeetingInfo
      createdAt
      updatedAt
    }
  }
`;
export const listCardss = /* GraphQL */ `
  query ListCardss(
    $filter: ModelCardsFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listCardss(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        ContentName
        Creator
        Capacity
        HostName
        Time
        CourseName
        MeetingInfo
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
