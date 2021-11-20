/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetEditableAnswer
// ====================================================

export interface GetEditableAnswer_answers_edges_node_mod {
  __typename: "ModType";
  /**
   * The ID of the object.
   */
  id: string;
}

export interface GetEditableAnswer_answers_edges_node_question {
  __typename: "QuestionType";
  /**
   * The ID of the object.
   */
  id: string;
}

export interface GetEditableAnswer_answers_edges_node {
  __typename: "AnswerType";
  /**
   * The ID of the object.
   */
  id: string;
  body: string;
  mod: GetEditableAnswer_answers_edges_node_mod;
  question: GetEditableAnswer_answers_edges_node_question;
}

export interface GetEditableAnswer_answers_edges {
  __typename: "AnswerTypeEdge";
  /**
   * The item at the end of the edge
   */
  node: GetEditableAnswer_answers_edges_node | null;
}

export interface GetEditableAnswer_answers {
  __typename: "AnswerTypeConnection";
  /**
   * Contains the nodes in this connection.
   */
  edges: (GetEditableAnswer_answers_edges | null)[];
}

export interface GetEditableAnswer {
  answers: GetEditableAnswer_answers | null;
}

export interface GetEditableAnswerVariables {
  id: string;
}
