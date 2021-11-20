/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: CreateAnswer
// ====================================================

export interface CreateAnswer_createAnswer_answer_question {
  __typename: "QuestionType";
  /**
   * The ID of the object.
   */
  id: string;
}

export interface CreateAnswer_createAnswer_answer_course {
  __typename: "CourseType";
  code: string;
}

export interface CreateAnswer_createAnswer_answer_tagSet_edges_node {
  __typename: "TagType";
  title: string;
}

export interface CreateAnswer_createAnswer_answer_tagSet_edges {
  __typename: "TagTypeEdge";
  /**
   * The item at the end of the edge
   */
  node: CreateAnswer_createAnswer_answer_tagSet_edges_node | null;
}

export interface CreateAnswer_createAnswer_answer_tagSet {
  __typename: "TagTypeConnection";
  /**
   * Contains the nodes in this connection.
   */
  edges: (CreateAnswer_createAnswer_answer_tagSet_edges | null)[];
}

export interface CreateAnswer_createAnswer_answer {
  __typename: "AnswerType";
  /**
   * The ID of the object.
   */
  id: string;
  body: string;
  question: CreateAnswer_createAnswer_answer_question;
  course: CreateAnswer_createAnswer_answer_course;
  tagSet: CreateAnswer_createAnswer_answer_tagSet | null;
}

export interface CreateAnswer_createAnswer {
  __typename: "CreateAnswerPayload";
  answer: CreateAnswer_createAnswer_answer | null;
}

export interface CreateAnswer {
  createAnswer: CreateAnswer_createAnswer | null;
}

export interface CreateAnswerVariables {
  questionId: string;
  body: string;
  courseCode: string;
  tags?: (string | null)[] | null;
}
