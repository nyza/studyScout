/* eslint-disable */
// this is an auto generated file. This will be overwritten

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
