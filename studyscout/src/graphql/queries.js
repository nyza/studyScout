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
      _version
      _deleted
      _lastChangedAt
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
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
      }
      nextToken
      startedAt
    }
  }
`;
export const syncCards = /* GraphQL */ `
  query SyncCards(
    $filter: ModelCardsFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncCards(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
        id
        ContentName
        Creator
        Capacity
        HostName
        Time
        CourseName
        MeetingInfo
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
      }
      nextToken
      startedAt
    }
  }
`;
