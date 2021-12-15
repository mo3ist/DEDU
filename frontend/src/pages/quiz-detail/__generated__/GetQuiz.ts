/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetQuiz
// ====================================================

export interface GetQuiz_quizzes_edges_node_solutionSet_edges_node {
  __typename: "SolutionType";
  /**
   * The ID of the object.
   */
  id: string;
  answer: string;
  correct: boolean;
}

export interface GetQuiz_quizzes_edges_node_solutionSet_edges {
  __typename: "SolutionTypeEdge";
  /**
   * The item at the end of the edge
   */
  node: GetQuiz_quizzes_edges_node_solutionSet_edges_node | null;
}

export interface GetQuiz_quizzes_edges_node_solutionSet {
  __typename: "SolutionTypeConnection";
  /**
   * Contains the nodes in this connection.
   */
  edges: (GetQuiz_quizzes_edges_node_solutionSet_edges | null)[];
}

export interface GetQuiz_quizzes_edges_node_user {
  __typename: "UserType";
  name: string | null;
  profilePicture: string | null;
}

export interface GetQuiz_quizzes_edges_node {
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
  solutionSet: GetQuiz_quizzes_edges_node_solutionSet;
  voteCount: number | null;
  userVote: string | null;
  created: any;
  user: GetQuiz_quizzes_edges_node_user;
}

export interface GetQuiz_quizzes_edges {
  __typename: "QuizTypeEdge";
  /**
   * The item at the end of the edge
   */
  node: GetQuiz_quizzes_edges_node | null;
}

export interface GetQuiz_quizzes {
  __typename: "QuizTypeConnection";
  /**
   * Contains the nodes in this connection.
   */
  edges: (GetQuiz_quizzes_edges | null)[];
}

export interface GetQuiz {
  quizzes: GetQuiz_quizzes | null;
}

export interface GetQuizVariables {
  id?: string | null;
}
