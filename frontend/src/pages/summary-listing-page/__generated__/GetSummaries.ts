/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { TagTagType } from "./../../../../__generated__/globalTypes";

// ====================================================
// GraphQL query operation: GetSummaries
// ====================================================

export interface GetSummaries_summaries_edges_node_tagSet_edges_node {
  __typename: "TagType";
  title: string;
  tagType: TagTagType;
}

export interface GetSummaries_summaries_edges_node_tagSet_edges {
  __typename: "TagTypeEdge";
  /**
   * The item at the end of the edge
   */
  node: GetSummaries_summaries_edges_node_tagSet_edges_node | null;
}

export interface GetSummaries_summaries_edges_node_tagSet {
  __typename: "TagTypeConnection";
  /**
   * Contains the nodes in this connection.
   */
  edges: (GetSummaries_summaries_edges_node_tagSet_edges | null)[];
}

export interface GetSummaries_summaries_edges_node_user {
  __typename: "UserType";
  name: string | null;
  profilePicture: string | null;
}

export interface GetSummaries_summaries_edges_node {
  __typename: "SummaryType";
  /**
   * The ID of the object.
   */
  id: string;
  title: string;
  voteCount: number | null;
  userVote: string | null;
  created: any;
  tagSet: GetSummaries_summaries_edges_node_tagSet | null;
  user: GetSummaries_summaries_edges_node_user;
}

export interface GetSummaries_summaries_edges {
  __typename: "SummaryTypeEdge";
  /**
   * The item at the end of the edge
   */
  node: GetSummaries_summaries_edges_node | null;
}

export interface GetSummaries_summaries_pageInfo {
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

export interface GetSummaries_summaries {
  __typename: "SummaryTypeConnection";
  /**
   * Contains the nodes in this connection.
   */
  edges: (GetSummaries_summaries_edges | null)[];
  /**
   * Pagination data for this connection.
   */
  pageInfo: GetSummaries_summaries_pageInfo;
}

export interface GetSummaries {
  summaries: GetSummaries_summaries | null;
}

export interface GetSummariesVariables {
  first?: number | null;
  after?: string | null;
  tag_Title?: string | null;
  course_Code?: string | null;
}
