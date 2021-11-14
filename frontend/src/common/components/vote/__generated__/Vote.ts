/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { VoteValue } from "./../../../../../__generated__/globalTypes";

// ====================================================
// GraphQL mutation operation: Vote
// ====================================================

export interface Vote_createVote_vote_contentObject_LectureType {
  __typename: "LectureType" | "QuizType";
}

export interface Vote_createVote_vote_contentObject_SummaryType {
  __typename: "SummaryType";
  /**
   * The ID of the object.
   */
  id: string;
  voteCount: number | null;
  userVote: string | null;
}

export interface Vote_createVote_vote_contentObject_ResourceType {
  __typename: "ResourceType";
  /**
   * The ID of the object.
   */
  id: string;
  voteCount: number | null;
  userVote: string | null;
}

export interface Vote_createVote_vote_contentObject_QuestionType {
  __typename: "QuestionType";
  /**
   * The ID of the object.
   */
  id: string;
  voteCount: number | null;
  userVote: string | null;
}

export interface Vote_createVote_vote_contentObject_AnswerType {
  __typename: "AnswerType";
  /**
   * The ID of the object.
   */
  id: string;
  voteCount: number | null;
  userVote: string | null;
}

export type Vote_createVote_vote_contentObject = Vote_createVote_vote_contentObject_LectureType | Vote_createVote_vote_contentObject_SummaryType | Vote_createVote_vote_contentObject_ResourceType | Vote_createVote_vote_contentObject_QuestionType | Vote_createVote_vote_contentObject_AnswerType;

export interface Vote_createVote_vote {
  __typename: "VoteType";
  /**
   * The ID of the object.
   */
  id: string;
  value: VoteValue;
  contentObject: Vote_createVote_vote_contentObject | null;
}

export interface Vote_createVote {
  __typename: "CreateVotePayload";
  vote: Vote_createVote_vote | null;
}

export interface Vote {
  createVote: Vote_createVote | null;
}

export interface VoteVariables {
  contentId: string;
  value: string;
}
