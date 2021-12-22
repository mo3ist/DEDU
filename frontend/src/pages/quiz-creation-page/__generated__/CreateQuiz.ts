/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: CreateQuiz
// ====================================================

export interface CreateQuiz_createQuiz_quiz_solutionSet_edges_node {
  __typename: "SolutionType";
  /**
   * The ID of the object.
   */
  id: string;
}

export interface CreateQuiz_createQuiz_quiz_solutionSet_edges {
  __typename: "SolutionTypeEdge";
  /**
   * The item at the end of the edge
   */
  node: CreateQuiz_createQuiz_quiz_solutionSet_edges_node | null;
}

export interface CreateQuiz_createQuiz_quiz_solutionSet {
  __typename: "SolutionTypeConnection";
  /**
   * Contains the nodes in this connection.
   */
  edges: (CreateQuiz_createQuiz_quiz_solutionSet_edges | null)[];
}

export interface CreateQuiz_createQuiz_quiz {
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
  solutionSet: CreateQuiz_createQuiz_quiz_solutionSet;
}

export interface CreateQuiz_createQuiz {
  __typename: "CreateQuizPayload";
  quiz: CreateQuiz_createQuiz_quiz | null;
}

export interface CreateQuiz {
  createQuiz: CreateQuiz_createQuiz | null;
}

export interface CreateQuizVariables {
  title: string;
  a?: string | null;
  b?: string | null;
  c?: string | null;
  d?: string | null;
  answer: string;
  courseCode: string;
  tags?: (string | null)[] | null;
}
