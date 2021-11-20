/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: CreateQuiz
// ====================================================

export interface CreateQuiz_createQuiz_quiz {
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

export interface CreateQuiz_createQuiz {
  __typename: "CreateQuizPayload";
  quiz: CreateQuiz_createQuiz_quiz | null;
}

export interface CreateQuiz {
  createQuiz: CreateQuiz_createQuiz | null;
}

export interface CreateQuizVariables {
  title: string;
  a?: string | null;
  b?: string | null;
  c?: string | null;
  d?: string | null;
  answer: string;
  courseCode: string;
  tags?: (string | null)[] | null;
}
