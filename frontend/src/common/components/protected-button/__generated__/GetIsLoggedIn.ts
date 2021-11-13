/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetIsLoggedIn
// ====================================================

export interface GetIsLoggedIn_users {
  __typename: "UserTypeConnection";
  isLoggedIn: boolean;
}

export interface GetIsLoggedIn {
  users: GetIsLoggedIn_users | null;
}
