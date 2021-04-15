/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateCards = /* GraphQL */ `
  subscription OnCreateCards($owner: String!) {
    onCreateCards(owner: $owner) {
      id
      courseName
      contentName
      hostName
      date
      time
      meetingLink
      capacity
      emailID
      createdAt
      updatedAt
      owner
    }
  }
`;
export const onUpdateCards = /* GraphQL */ `
  subscription OnUpdateCards($owner: String!) {
    onUpdateCards(owner: $owner) {
      id
      courseName
      contentName
      hostName
      date
      time
      meetingLink
      capacity
      emailID
      createdAt
      updatedAt
      owner
    }
  }
`;
export const onDeleteCards = /* GraphQL */ `
  subscription OnDeleteCards($owner: String!) {
    onDeleteCards(owner: $owner) {
      id
      courseName
      contentName
      hostName
      date
      time
      meetingLink
      capacity
      emailID
      createdAt
      updatedAt
      owner
    }
  }
`;
export const onCreateUser = /* GraphQL */ `
  subscription OnCreateUser {
    onCreateUser {
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
export const onUpdateUser = /* GraphQL */ `
  subscription OnUpdateUser {
    onUpdateUser {
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
export const onDeleteUser = /* GraphQL */ `
  subscription OnDeleteUser {
    onDeleteUser {
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
