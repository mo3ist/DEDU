/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetQuizzes
// ====================================================

export interface GetQuizzes_quizzes_edges_node_solutionSet_edges_node {
  __typename: "SolutionType";
  /**
   * The ID of the object.
   */
  id: string;
  answer: string;
  correct: boolean;
}

export interface GetQuizzes_quizzes_edges_node_solutionSet_edges {
  __typename: "SolutionTypeEdge";
  /**
   * The item at the end of the edge
   */
  node: GetQuizzes_quizzes_edges_node_solutionSet_edges_node | null;
}

export interface GetQuizzes_quizzes_edges_node_solutionSet {
  __typename: "SolutionTypeConnection";
  /**
   * Contains the nodes in this connection.
   */
  edges: (GetQuizzes_quizzes_edges_node_solutionSet_edges | null)[];
}

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
  solutionSet: GetQuizzes_quizzes_edges_node_solutionSet;
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

export interface GetQuizzes_quizzes_pageInfo {
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

export interface GetQuizzes_quizzes {
  __typename: "QuizTypeConnection";
  /**
   * Contains the nodes in this connection.
   */
  edges: (GetQuizzes_quizzes_edges | null)[];
  /**
   * Pagination data for this connection.
   */
  pageInfo: GetQuizzes_quizzes_pageInfo;
}

export interface GetQuizzes {
  quizzes: GetQuizzes_quizzes | null;
}

export interface GetQuizzesVariables {
  tagTitle?: string | null;
  courseCode?: string | null;
}
