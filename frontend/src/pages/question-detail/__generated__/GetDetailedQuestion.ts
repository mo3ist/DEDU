/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { TagTagType, ModState } from "./../../../../__generated__/globalTypes";

// ====================================================
// GraphQL query operation: GetDetailedQuestion
// ====================================================

export interface GetDetailedQuestion_questions_edges_node_tagSet_edges_node {
  __typename: "TagType";
  title: string;
  tagType: TagTagType;
}

export interface GetDetailedQuestion_questions_edges_node_tagSet_edges {
  __typename: "TagTypeEdge";
  /**
   * The item at the end of the edge
   */
  node: GetDetailedQuestion_questions_edges_node_tagSet_edges_node | null;
}

export interface GetDetailedQuestion_questions_edges_node_tagSet {
  __typename: "TagTypeConnection";
  /**
   * Contains the nodes in this connection.
   */
  edges: (GetDetailedQuestion_questions_edges_node_tagSet_edges | null)[];
}

export interface GetDetailedQuestion_questions_edges_node_user {
  __typename: "UserType";
  name: string | null;
  profilePicture: string | null;
}

export interface GetDetailedQuestion_questions_edges_node_mod {
  __typename: "ModType";
  /**
   * The ID of the object.
   */
  id: string;
  state: ModState;
}

export interface GetDetailedQuestion_questions_edges_node {
  __typename: "QuestionType";
  /**
   * The ID of the object.
   */
  id: string;
  title: string;
  body: string;
  created: any;
  voteCount: number | null;
  userVote: string | null;
  tagSet: GetDetailedQuestion_questions_edges_node_tagSet | null;
  user: GetDetailedQuestion_questions_edges_node_user;
  mod: GetDetailedQuestion_questions_edges_node_mod;
}

export interface GetDetailedQuestion_questions_edges {
  __typename: "QuestionTypeEdge";
  /**
   * The item at the end of the edge
   */
  node: GetDetailedQuestion_questions_edges_node | null;
}

export interface GetDetailedQuestion_questions {
  __typename: "QuestionTypeConnection";
  /**
   * Contains the nodes in this connection.
   */
  edges: (GetDetailedQuestion_questions_edges | null)[];
}

export interface GetDetailedQuestion {
  questions: GetDetailedQuestion_questions | null;
}

export interface GetDetailedQuestionVariables {
  id?: string | null;
}
