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
      createdAt
      updatedAt
      owner
    }
  }
`;
export const onCreateTodo = /* GraphQL */ `
  subscription OnCreateTodo($owner: String!) {
    onCreateTodo(owner: $owner) {
      id
      name
      description
      createdAt
      updatedAt
      owner
    }
  }
`;
export const onUpdateTodo = /* GraphQL */ `
  subscription OnUpdateTodo($owner: String!) {
    onUpdateTodo(owner: $owner) {
      id
      name
      description
      createdAt
      updatedAt
      owner
    }
  }
`;
export const onDeleteTodo = /* GraphQL */ `
  subscription OnDeleteTodo($owner: String!) {
    onDeleteTodo(owner: $owner) {
      id
      name
      description
      createdAt
      updatedAt
      owner
    }
  }
`;
