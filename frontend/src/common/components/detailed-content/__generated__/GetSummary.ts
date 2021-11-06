/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { TagTagType } from "./../../../../../__generated__/globalTypes";

// ====================================================
// GraphQL query operation: GetSummary
// ====================================================

export interface GetSummary_summaries_edges_node_tagSet_edges_node {
  __typename: "TagType";
  title: string;
  tagType: TagTagType;
}

export interface GetSummary_summaries_edges_node_tagSet_edges {
  __typename: "TagTypeEdge";
  /**
   * The item at the end of the edge
   */
  node: GetSummary_summaries_edges_node_tagSet_edges_node | null;
}

export interface GetSummary_summaries_edges_node_tagSet {
  __typename: "TagTypeConnection";
  /**
   * Contains the nodes in this connection.
   */
  edges: (GetSummary_summaries_edges_node_tagSet_edges | null)[];
}

export interface GetSummary_summaries_edges_node {
  __typename: "SummaryType";
  title: string;
  body: string;
  created: any;
  voteCount: number | null;
  tagSet: GetSummary_summaries_edges_node_tagSet | null;
}

export interface GetSummary_summaries_edges {
  __typename: "SummaryTypeEdge";
  /**
   * The item at the end of the edge
   */
  node: GetSummary_summaries_edges_node | null;
}

export interface GetSummary_summaries {
  __typename: "SummaryTypeConnection";
  /**
   * Contains the nodes in this connection.
   */
  edges: (GetSummary_summaries_edges | null)[];
}

export interface GetSummary {
  summaries: GetSummary_summaries | null;
}

export interface GetSummaryVariables {
  id?: string | null;
}
