/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetQuizzesIds
// ====================================================

export interface GetQuizzesIds_quizzes_edges_node {
  __typename: "QuizType";
  /**
   * The ID of the object.
   */
  id: string;
}

export interface GetQuizzesIds_quizzes_edges {
  __typename: "QuizTypeEdge";
  /**
   * The item at the end of the edge
   */
  node: GetQuizzesIds_quizzes_edges_node | null;
}

export interface GetQuizzesIds_quizzes {
  __typename: "QuizTypeConnection";
  /**
   * Contains the nodes in this connection.
   */
  edges: (GetQuizzesIds_quizzes_edges | null)[];
}

export interface GetQuizzesIds {
  quizzes: GetQuizzesIds_quizzes | null;
}

export interface GetQuizzesIdsVariables {
  tagTitle?: string | null;
  courseCode?: string | null;
}
