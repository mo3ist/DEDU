/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { TagTagType } from "./../../../../../__generated__/globalTypes";

// ====================================================
// GraphQL query operation: GetQuestion
// ====================================================

export interface GetQuestion_questions_edges_node_tagSet_edges_node {
  __typename: "TagType";
  title: string;
  tagType: TagTagType;
}

export interface GetQuestion_questions_edges_node_tagSet_edges {
  __typename: "TagTypeEdge";
  /**
   * The item at the end of the edge
   */
  node: GetQuestion_questions_edges_node_tagSet_edges_node | null;
}

export interface GetQuestion_questions_edges_node_tagSet {
  __typename: "TagTypeConnection";
  /**
   * Contains the nodes in this connection.
   */
  edges: (GetQuestion_questions_edges_node_tagSet_edges | null)[];
}

export interface GetQuestion_questions_edges_node {
  __typename: "QuestionType";
  title: string;
  body: string;
  created: any;
  voteCount: number | null;
  tagSet: GetQuestion_questions_edges_node_tagSet | null;
}

export interface GetQuestion_questions_edges {
  __typename: "QuestionTypeEdge";
  /**
   * The item at the end of the edge
   */
  node: GetQuestion_questions_edges_node | null;
}

export interface GetQuestion_questions {
  __typename: "QuestionTypeConnection";
  /**
   * Contains the nodes in this connection.
   */
  edges: (GetQuestion_questions_edges | null)[];
}

export interface GetQuestion {
  questions: GetQuestion_questions | null;
}

export interface GetQuestionVariables {
  id?: string | null;
}
