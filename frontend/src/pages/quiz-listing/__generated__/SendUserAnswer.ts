/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: SendUserAnswer
// ====================================================

export interface SendUserAnswer_quizzes_edges_node {
  __typename: "QuizType";
  /**
   * The ID of the object.
   */
  id: string;
  userAnswer: string;
}

export interface SendUserAnswer_quizzes_edges {
  __typename: "QuizTypeEdge";
  /**
   * The item at the end of the edge
   */
  node: SendUserAnswer_quizzes_edges_node | null;
}

export interface SendUserAnswer_quizzes {
  __typename: "QuizTypeConnection";
  /**
   * Contains the nodes in this connection.
   */
  edges: (SendUserAnswer_quizzes_edges | null)[];
}

export interface SendUserAnswer {
  quizzes: SendUserAnswer_quizzes | null;
}

export interface SendUserAnswerVariables {
  id: string;
}
