/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { TagTagType } from "./../../../../__generated__/globalTypes";

// ====================================================
// GraphQL query operation: GetEditableQuiz
// ====================================================

export interface GetEditableQuiz_quizzes_edges_node_tagSet_edges_node {
  __typename: "TagType";
  title: string;
  tagType: TagTagType;
}

export interface GetEditableQuiz_quizzes_edges_node_tagSet_edges {
  __typename: "TagTypeEdge";
  /**
   * The item at the end of the edge
   */
  node: GetEditableQuiz_quizzes_edges_node_tagSet_edges_node | null;
}

export interface GetEditableQuiz_quizzes_edges_node_tagSet {
  __typename: "TagTypeConnection";
  /**
   * Contains the nodes in this connection.
   */
  edges: (GetEditableQuiz_quizzes_edges_node_tagSet_edges | null)[];
}

export interface GetEditableQuiz_quizzes_edges_node_mod {
  __typename: "ModType";
  /**
   * The ID of the object.
   */
  id: string;
}

export interface GetEditableQuiz_quizzes_edges_node {
  __typename: "QuizType";
  /**
   * The ID of the object.
   */
  id: string;
  title: string | null;
  a: string | null;
  b: string | null;
  c: string | null;
  d: string | null;
  answer: string;
  tagSet: GetEditableQuiz_quizzes_edges_node_tagSet | null;
  mod: GetEditableQuiz_quizzes_edges_node_mod;
}

export interface GetEditableQuiz_quizzes_edges {
  __typename: "QuizTypeEdge";
  /**
   * The item at the end of the edge
   */
  node: GetEditableQuiz_quizzes_edges_node | null;
}

export interface GetEditableQuiz_quizzes {
  __typename: "QuizTypeConnection";
  /**
   * Contains the nodes in this connection.
   */
  edges: (GetEditableQuiz_quizzes_edges | null)[];
}

export interface GetEditableQuiz {
  quizzes: GetEditableQuiz_quizzes | null;
}

export interface GetEditableQuizVariables {
  id: string;
}
