/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: CreateQuestion
// ====================================================

export interface CreateQuestion_createQuestion_question_course {
  __typename: "CourseType";
  code: string;
}

export interface CreateQuestion_createQuestion_question_tagSet_edges_node {
  __typename: "TagType";
  title: string;
}

export interface CreateQuestion_createQuestion_question_tagSet_edges {
  __typename: "TagTypeEdge";
  /**
   * The item at the end of the edge
   */
  node: CreateQuestion_createQuestion_question_tagSet_edges_node | null;
}

export interface CreateQuestion_createQuestion_question_tagSet {
  __typename: "TagTypeConnection";
  /**
   * Contains the nodes in this connection.
   */
  edges: (CreateQuestion_createQuestion_question_tagSet_edges | null)[];
}

export interface CreateQuestion_createQuestion_question {
  __typename: "QuestionType";
  title: string;
  body: string;
  course: CreateQuestion_createQuestion_question_course;
  tagSet: CreateQuestion_createQuestion_question_tagSet | null;
}

export interface CreateQuestion_createQuestion {
  __typename: "CreateQuestionPayload";
  question: CreateQuestion_createQuestion_question | null;
}

export interface CreateQuestion {
  createQuestion: CreateQuestion_createQuestion | null;
}

export interface CreateQuestionVariables {
  title: string;
  body: string;
  courseCode: string;
  tags?: (string | null)[] | null;
}
