/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetIsLoggedIn
// ====================================================

export interface GetIsLoggedIn_users_currentUser {
  __typename: "CurrentUser";
  id: string;
}

export interface GetIsLoggedIn_users {
  __typename: "UserTypeConnection";
  currentUser: GetIsLoggedIn_users_currentUser | null;
}

export interface GetIsLoggedIn {
  users: GetIsLoggedIn_users | null;
}
