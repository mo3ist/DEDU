/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { TagTagType } from "./../../../../__generated__/globalTypes";

// ====================================================
// GraphQL query operation: GetEditableQuestion
// ====================================================

export interface GetEditableQuestion_questions_edges_node_tagSet_edges_node {
  __typename: "TagType";
  title: string;
  tagType: TagTagType;
}

export interface GetEditableQuestion_questions_edges_node_tagSet_edges {
  __typename: "TagTypeEdge";
  /**
   * The item at the end of the edge
   */
  node: GetEditableQuestion_questions_edges_node_tagSet_edges_node | null;
}

export interface GetEditableQuestion_questions_edges_node_tagSet {
  __typename: "TagTypeConnection";
  /**
   * Contains the nodes in this connection.
   */
  edges: (GetEditableQuestion_questions_edges_node_tagSet_edges | null)[];
}

export interface GetEditableQuestion_questions_edges_node_mod {
  __typename: "ModType";
  /**
   * The ID of the object.
   */
  id: string;
}

export interface GetEditableQuestion_questions_edges_node {
  __typename: "QuestionType";
  /**
   * The ID of the object.
   */
  id: string;
  title: string;
  body: string;
  tagSet: GetEditableQuestion_questions_edges_node_tagSet | null;
  mod: GetEditableQuestion_questions_edges_node_mod;
}

export interface GetEditableQuestion_questions_edges {
  __typename: "QuestionTypeEdge";
  /**
   * The item at the end of the edge
   */
  node: GetEditableQuestion_questions_edges_node | null;
}

export interface GetEditableQuestion_questions {
  __typename: "QuestionTypeConnection";
  /**
   * Contains the nodes in this connection.
   */
  edges: (GetEditableQuestion_questions_edges | null)[];
}

export interface GetEditableQuestion {
  questions: GetEditableQuestion_questions | null;
}

export interface GetEditableQuestionVariables {
  id: string;
}
