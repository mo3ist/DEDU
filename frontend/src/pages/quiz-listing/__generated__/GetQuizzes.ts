/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetQuizzes
// ====================================================

export interface GetQuizzes_quizzes_edges_node_user {
  __typename: "UserType";
  name: string | null;
  profilePicture: string | null;
}

export interface GetQuizzes_quizzes_edges_node {
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
  voteCount: number | null;
  userVote: string | null;
  created: any;
  userAnswer: string;
  user: GetQuizzes_quizzes_edges_node_user;
}

export interface GetQuizzes_quizzes_edges {
  __typename: "QuizTypeEdge";
  /**
   * The item at the end of the edge
   */
  node: GetQuizzes_quizzes_edges_node | null;
}

export interface GetQuizzes_quizzes {
  __typename: "QuizTypeConnection";
  /**
   * Contains the nodes in this connection.
   */
  edges: (GetQuizzes_quizzes_edges | null)[];
}

export interface GetQuizzes {
  quizzes: GetQuizzes_quizzes | null;
}

export interface GetQuizzesVariables {
  tagTitle?: string | null;
  courseCode?: string | null;
}
