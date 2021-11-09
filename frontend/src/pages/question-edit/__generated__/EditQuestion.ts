/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: EditQuestion
// ====================================================

export interface EditQuestion_createQuestion_question_course {
  __typename: "CourseType";
  code: string;
}

export interface EditQuestion_createQuestion_question_tagSet_edges_node {
  __typename: "TagType";
  title: string;
}

export interface EditQuestion_createQuestion_question_tagSet_edges {
  __typename: "TagTypeEdge";
  /**
   * The item at the end of the edge
   */
  node: EditQuestion_createQuestion_question_tagSet_edges_node | null;
}

export interface EditQuestion_createQuestion_question_tagSet {
  __typename: "TagTypeConnection";
  /**
   * Contains the nodes in this connection.
   */
  edges: (EditQuestion_createQuestion_question_tagSet_edges | null)[];
}

export interface EditQuestion_createQuestion_question {
  __typename: "QuestionType";
  title: string;
  body: string;
  course: EditQuestion_createQuestion_question_course;
  tagSet: EditQuestion_createQuestion_question_tagSet | null;
}

export interface EditQuestion_createQuestion {
  __typename: "CreateQuestionPayload";
  question: EditQuestion_createQuestion_question | null;
}

export interface EditQuestion {
  createQuestion: EditQuestion_createQuestion | null;
}

export interface EditQuestionVariables {
  modId: string;
  title: string;
  body: string;
  courseCode: string;
  tags?: (string | null)[] | null;
}
