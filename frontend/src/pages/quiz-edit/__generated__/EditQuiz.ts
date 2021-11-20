/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: EditQuiz
// ====================================================

export interface EditQuiz_createQuiz_quiz {
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
}

export interface EditQuiz_createQuiz {
  __typename: "CreateQuizPayload";
  quiz: EditQuiz_createQuiz_quiz | null;
}

export interface EditQuiz {
  createQuiz: EditQuiz_createQuiz | null;
}

export interface EditQuizVariables {
  modId: string;
  title: string;
  a?: string | null;
  b?: string | null;
  c?: string | null;
  d?: string | null;
  answer: string;
  courseCode: string;
  tags?: (string | null)[] | null;
}
