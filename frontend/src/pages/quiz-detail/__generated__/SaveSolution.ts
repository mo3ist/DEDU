/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: SaveSolution
// ====================================================

export interface SaveSolution_solutions_edges_node_quiz {
  __typename: "QuizType";
  /**
   * The ID of the object.
   */
  id: string;
}

export interface SaveSolution_solutions_edges_node {
  __typename: "SolutionType";
  /**
   * The ID of the object.
   */
  id: string;
  answer: string;
  quiz: SaveSolution_solutions_edges_node_quiz;
  correct: boolean;
}

export interface SaveSolution_solutions_edges {
  __typename: "SolutionTypeEdge";
  /**
   * The item at the end of the edge
   */
  node: SaveSolution_solutions_edges_node | null;
}

export interface SaveSolution_solutions {
  __typename: "SolutionTypeConnection";
  /**
   * Contains the nodes in this connection.
   */
  edges: (SaveSolution_solutions_edges | null)[];
}

export interface SaveSolution {
  solutions: SaveSolution_solutions | null;
}

export interface SaveSolutionVariables {
  id: string;
}
