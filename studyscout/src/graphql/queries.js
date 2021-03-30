/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getCards = /* GraphQL */ `
  query GetCards($id: ID!) {
    getCards(id: $id) {
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
      owner
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
        courseName
        contentName
        hostName
        date
        time
        meetingLink
        capacity
        createdAt
        updatedAt
        owner
      }
      nextToken
    }
  }
`;
export const getUser = /* GraphQL */ `
  query GetUser($id: ID!) {
    getUser(id: $id) {
      id
      username
      avatar {
        bucket
        region
        key
      }
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
        username
        avatar {
          bucket
          region
          key
        }
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
