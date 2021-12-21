/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: CreateSolution
// ====================================================

export interface CreateSolution_createSolution_solution_quiz_solutionSet_edges_node {
  __typename: "SolutionType";
  /**
   * The ID of the object.
   */
  id: string;
}

export interface CreateSolution_createSolution_solution_quiz_solutionSet_edges {
  __typename: "SolutionTypeEdge";
  /**
   * The item at the end of the edge
   */
  node: CreateSolution_createSolution_solution_quiz_solutionSet_edges_node | null;
}

export interface CreateSolution_createSolution_solution_quiz_solutionSet {
  __typename: "SolutionTypeConnection";
  /**
   * Contains the nodes in this connection.
   */
  edges: (CreateSolution_createSolution_solution_quiz_solutionSet_edges | null)[];
}

export interface CreateSolution_createSolution_solution_quiz {
  __typename: "QuizType";
  /**
   * The ID of the object.
   */
  id: string;
  solutionSet: CreateSolution_createSolution_solution_quiz_solutionSet;
}

export interface CreateSolution_createSolution_solution {
  __typename: "SolutionType";
  /**
   * The ID of the object.
   */
  id: string;
  answer: string;
  correct: boolean;
  quiz: CreateSolution_createSolution_solution_quiz;
}

export interface CreateSolution_createSolution {
  __typename: "CreateSolutionPayload";
  solution: CreateSolution_createSolution_solution | null;
}

export interface CreateSolution {
  createSolution: CreateSolution_createSolution | null;
}

export interface CreateSolutionVariables {
  quiz: string;
  answer: string;
}
