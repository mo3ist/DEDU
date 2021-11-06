/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: MutateQuestion
// ====================================================

export interface MutateQuestion_createQuestion_question_course {
  __typename: "CourseType";
  code: string;
}

export interface MutateQuestion_createQuestion_question_tagSet_edges_node {
  __typename: "TagType";
  title: string;
}

export interface MutateQuestion_createQuestion_question_tagSet_edges {
  __typename: "TagTypeEdge";
  /**
   * The item at the end of the edge
   */
  node: MutateQuestion_createQuestion_question_tagSet_edges_node | null;
}

export interface MutateQuestion_createQuestion_question_tagSet {
  __typename: "TagTypeConnection";
  /**
   * Contains the nodes in this connection.
   */
  edges: (MutateQuestion_createQuestion_question_tagSet_edges | null)[];
}

export interface MutateQuestion_createQuestion_question {
  __typename: "QuestionType";
  title: string;
  body: string;
  course: MutateQuestion_createQuestion_question_course;
  tagSet: MutateQuestion_createQuestion_question_tagSet | null;
}

export interface MutateQuestion_createQuestion {
  __typename: "CreateQuestionPayload";
  question: MutateQuestion_createQuestion_question | null;
}

export interface MutateQuestion {
  createQuestion: MutateQuestion_createQuestion | null;
}

export interface MutateQuestionVariables {
  title: string;
  body: string;
  course: string;
  tags?: (string | null)[] | null;
}
