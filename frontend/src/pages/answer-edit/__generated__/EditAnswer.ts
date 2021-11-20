/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: EditAnswer
// ====================================================

export interface EditAnswer_createAnswer_answer_course {
  __typename: "CourseType";
  code: string;
}

export interface EditAnswer_createAnswer_answer_tagSet_edges_node {
  __typename: "TagType";
  title: string;
}

export interface EditAnswer_createAnswer_answer_tagSet_edges {
  __typename: "TagTypeEdge";
  /**
   * The item at the end of the edge
   */
  node: EditAnswer_createAnswer_answer_tagSet_edges_node | null;
}

export interface EditAnswer_createAnswer_answer_tagSet {
  __typename: "TagTypeConnection";
  /**
   * Contains the nodes in this connection.
   */
  edges: (EditAnswer_createAnswer_answer_tagSet_edges | null)[];
}

export interface EditAnswer_createAnswer_answer {
  __typename: "AnswerType";
  body: string;
  course: EditAnswer_createAnswer_answer_course;
  tagSet: EditAnswer_createAnswer_answer_tagSet | null;
}

export interface EditAnswer_createAnswer {
  __typename: "CreateAnswerPayload";
  answer: EditAnswer_createAnswer_answer | null;
}

export interface EditAnswer {
  createAnswer: EditAnswer_createAnswer | null;
}

export interface EditAnswerVariables {
  modId: string;
  questionId: string;
  body: string;
  courseCode: string;
  tags?: (string | null)[] | null;
}
