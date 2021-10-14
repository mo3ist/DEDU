/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetTags
// ====================================================

export interface GetTags_tags_edges_node {
  __typename: "TagType";
  title: string;
  body: string | null;
}

export interface GetTags_tags_edges {
  __typename: "TagTypeEdge";
  /**
   * The item at the end of the edge
   */
  node: GetTags_tags_edges_node | null;
}

export interface GetTags_tags {
  __typename: "TagTypeConnection";
  /**
   * Contains the nodes in this connection.
   */
  edges: (GetTags_tags_edges | null)[];
}

export interface GetTags {
  tags: GetTags_tags | null;
}

export interface GetTagsVariables {
  title?: string | null;
  courseCode?: string | null;
  tagType?: string | null;
}
