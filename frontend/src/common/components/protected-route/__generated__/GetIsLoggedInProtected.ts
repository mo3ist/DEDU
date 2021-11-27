/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetIsLoggedInProtected
// ====================================================

export interface GetIsLoggedInProtected_users_currentUser {
  __typename: "CurrentUser";
  id: string;
}

export interface GetIsLoggedInProtected_users {
  __typename: "UserTypeConnection";
  currentUser: GetIsLoggedInProtected_users_currentUser | null;
}

export interface GetIsLoggedInProtected {
  users: GetIsLoggedInProtected_users | null;
}
