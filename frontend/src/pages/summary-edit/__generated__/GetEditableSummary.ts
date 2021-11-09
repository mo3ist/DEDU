/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { TagTagType } from "./../../../../__generated__/globalTypes";

// ====================================================
// GraphQL query operation: GetEditableSummary
// ====================================================

export interface GetEditableSummary_summaries_edges_node_tagSet_edges_node {
  __typename: "TagType";
  title: string;
  tagType: TagTagType;
}

export interface GetEditableSummary_summaries_edges_node_tagSet_edges {
  __typename: "TagTypeEdge";
  /**
   * The item at the end of the edge
   */
  node: GetEditableSummary_summaries_edges_node_tagSet_edges_node | null;
}

export interface GetEditableSummary_summaries_edges_node_tagSet {
  __typename: "TagTypeConnection";
  /**
   * Contains the nodes in this connection.
   */
  edges: (GetEditableSummary_summaries_edges_node_tagSet_edges | null)[];
}

export interface GetEditableSummary_summaries_edges_node_mod {
  __typename: "ModType";
  /**
   * The ID of the object.
   */
  id: string;
}

export interface GetEditableSummary_summaries_edges_node {
  __typename: "SummaryType";
  /**
   * The ID of the object.
   */
  id: string;
  title: string;
  body: string;
  tagSet: GetEditableSummary_summaries_edges_node_tagSet | null;
  mod: GetEditableSummary_summaries_edges_node_mod;
}

export interface GetEditableSummary_summaries_edges {
  __typename: "SummaryTypeEdge";
  /**
   * The item at the end of the edge
   */
  node: GetEditableSummary_summaries_edges_node | null;
}

export interface GetEditableSummary_summaries {
  __typename: "SummaryTypeConnection";
  /**
   * Contains the nodes in this connection.
   */
  edges: (GetEditableSummary_summaries_edges | null)[];
}

export interface GetEditableSummary {
  summaries: GetEditableSummary_summaries | null;
}

export interface GetEditableSummaryVariables {
  id: string;
}
