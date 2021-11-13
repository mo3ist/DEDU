/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetIsLoggedInProtected
// ====================================================

export interface GetIsLoggedInProtected_users {
  __typename: "UserTypeConnection";
  isLoggedIn: boolean;
}

export interface GetIsLoggedInProtected {
  users: GetIsLoggedInProtected_users | null;
}
