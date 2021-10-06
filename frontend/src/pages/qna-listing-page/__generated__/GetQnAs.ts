/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetQnAs
// ====================================================

export interface GetQnAs_questions_edges_node {
  __typename: "QuestionType";
  title: string;
}

export interface GetQnAs_questions_edges {
  __typename: "QuestionTypeEdge";
  /**
   * The item at the end of the edge
   */
  node: GetQnAs_questions_edges_node | null;
}

export interface GetQnAs_questions_pageInfo {
  __typename: "PageInfo";
  /**
   * When paginating backwards, the cursor to continue.
   */
  startCursor: string | null;
  /**
   * When paginating forwards, the cursor to continue.
   */
  endCursor: string | null;
  /**
   * When paginating forwards, are there more items?
   */
  hasNextPage: boolean;
  /**
   * When paginating backwards, are there more items?
   */
  hasPreviousPage: boolean;
}

export interface GetQnAs_questions {
  __typename: "QuestionTypeConnection";
  /**
   * Contains the nodes in this connection.
   */
  edges: (GetQnAs_questions_edges | null)[];
  /**
   * Pagination data for this connection.
   */
  pageInfo: GetQnAs_questions_pageInfo;
}

export interface GetQnAs {
  questions: GetQnAs_questions | null;
}

export interface GetQnAsVariables {
  first?: number | null;
  after?: string | null;
  tag_Title?: string | null;
}
