/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: GetAccessToken
// ====================================================

export interface GetAccessToken_socialAuth {
  __typename: "SocialAuthJWTPayload";
  token: string | null;
}

export interface GetAccessToken {
  /**
   * Social Auth for JSON Web Token (JWT)
   */
  socialAuth: GetAccessToken_socialAuth | null;
}

export interface GetAccessTokenVariables {
  accessToken: string;
}
