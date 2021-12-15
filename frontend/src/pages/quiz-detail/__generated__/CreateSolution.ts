/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: CreateSolution
// ====================================================

export interface CreateSolution_createSolution_solution {
  __typename: "SolutionType";
  /**
   * The ID of the object.
   */
  id: string;
  answer: string;
  correct: boolean;
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
