/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { ModState } from "./../../../../__generated__/globalTypes";

// ====================================================
// GraphQL query operation: GetQuestionAnswers
// ====================================================

export interface GetQuestionAnswers_answers_edges_node_user {
  __typename: "UserType";
  name: string | null;
  profilePicture: string | null;
}

export interface GetQuestionAnswers_answers_edges_node_mod {
  __typename: "ModType";
  /**
   * The ID of the object.
   */
  id: string;
  state: ModState;
}

export interface GetQuestionAnswers_answers_edges_node {
  __typename: "AnswerType";
  /**
   * The ID of the object.
   */
  id: string;
  body: string;
  voteCount: number | null;
  userVote: string | null;
  created: any;
  user: GetQuestionAnswers_answers_edges_node_user;
  mod: GetQuestionAnswers_answers_edges_node_mod;
}

export interface GetQuestionAnswers_answers_edges {
  __typename: "AnswerTypeEdge";
  /**
   * The item at the end of the edge
   */
  node: GetQuestionAnswers_answers_edges_node | null;
}

export interface GetQuestionAnswers_answers_pageInfo {
  __typename: "PageInfo";
  /**
   * When paginating backwards, the cursor to continue.
   */
  startCursor: string | null;
  /**
   * When paginating forwards, the cursor to continue.
   */
  endCursor: string | null;
  /**
   * When paginating forwards, are there more items?
   */
  hasNextPage: boolean;
  /**
   * When paginating backwards, are there more items?
   */
  hasPreviousPage: boolean;
}

export interface GetQuestionAnswers_answers {
  __typename: "AnswerTypeConnection";
  /**
   * Contains the nodes in this connection.
   */
  edges: (GetQuestionAnswers_answers_edges | null)[];
  /**
   * Pagination data for this connection.
   */
  pageInfo: GetQuestionAnswers_answers_pageInfo;
}

export interface GetQuestionAnswers {
  answers: GetQuestionAnswers_answers | null;
}

export interface GetQuestionAnswersVariables {
  first?: number | null;
  after?: string | null;
  questionId: string;
}
