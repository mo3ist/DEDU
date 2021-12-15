/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetQuizzesMeta
// ====================================================

export interface GetQuizzesMeta_quizzes_edges_node {
  __typename: "QuizType";
  /**
   * The ID of the object.
   */
  id: string;
}

export interface GetQuizzesMeta_quizzes_edges {
  __typename: "QuizTypeEdge";
  /**
   * The item at the end of the edge
   */
  node: GetQuizzesMeta_quizzes_edges_node | null;
}

export interface GetQuizzesMeta_quizzes {
  __typename: "QuizTypeConnection";
  /**
   * Contains the nodes in this connection.
   */
  edges: (GetQuizzesMeta_quizzes_edges | null)[];
  /**
   * Number of items in the queryset.
   */
  totalCount: number;
}

export interface GetQuizzesMeta {
  quizzes: GetQuizzesMeta_quizzes | null;
}

export interface GetQuizzesMetaVariables {
  tagTitle?: string | null;
  courseCode?: string | null;
}
