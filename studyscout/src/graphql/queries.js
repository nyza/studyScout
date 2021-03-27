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
      }
      nextToken
    }
  }
`;
