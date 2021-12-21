/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { TagTagType, ModState } from "./../../../../__generated__/globalTypes";

// ====================================================
// GraphQL query operation: GetQuestions
// ====================================================

export interface GetQuestions_questions_edges_node_tagSet_edges_node {
  __typename: "TagType";
  title: string;
  tagType: TagTagType;
}

export interface GetQuestions_questions_edges_node_tagSet_edges {
  __typename: "TagTypeEdge";
  /**
   * The item at the end of the edge
   */
  node: GetQuestions_questions_edges_node_tagSet_edges_node | null;
}

export interface GetQuestions_questions_edges_node_tagSet {
  __typename: "TagTypeConnection";
  /**
   * Contains the nodes in this connection.
   */
  edges: (GetQuestions_questions_edges_node_tagSet_edges | null)[];
}

export interface GetQuestions_questions_edges_node_user {
  __typename: "UserType";
  name: string | null;
  profilePicture: string | null;
}

export interface GetQuestions_questions_edges_node_mod {
  __typename: "ModType";
  state: ModState;
}

export interface GetQuestions_questions_edges_node {
  __typename: "QuestionType";
  /**
   * The ID of the object.
   */
  id: string;
  title: string;
  voteCount: number | null;
  userVote: string | null;
  answerCount: number | null;
  created: any;
  tagSet: GetQuestions_questions_edges_node_tagSet | null;
  user: GetQuestions_questions_edges_node_user;
  mod: GetQuestions_questions_edges_node_mod;
}

export interface GetQuestions_questions_edges {
  __typename: "QuestionTypeEdge";
  /**
   * The item at the end of the edge
   */
  node: GetQuestions_questions_edges_node | null;
}

export interface GetQuestions_questions_pageInfo {
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

export interface GetQuestions_questions {
  __typename: "QuestionTypeConnection";
  /**
   * Contains the nodes in this connection.
   */
  edges: (GetQuestions_questions_edges | null)[];
  /**
   * Pagination data for this connection.
   */
  pageInfo: GetQuestions_questions_pageInfo;
}

export interface GetQuestions {
  questions: GetQuestions_questions | null;
}

export interface GetQuestionsVariables {
  first?: number | null;
  after?: string | null;
  tag_Title?: string | null;
  course_Code?: string | null;
}
