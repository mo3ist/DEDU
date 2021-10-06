/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: SearchTags
// ====================================================

export interface SearchTags_tags_edges_node {
  __typename: "TagType";
  title: string;
}

export interface SearchTags_tags_edges {
  __typename: "TagTypeEdge";
  /**
   * The item at the end of the edge
   */
  node: SearchTags_tags_edges_node | null;
}

export interface SearchTags_tags {
  __typename: "TagTypeConnection";
  /**
   * Contains the nodes in this connection.
   */
  edges: (SearchTags_tags_edges | null)[];
}

export interface SearchTags {
  tags: SearchTags_tags | null;
}

export interface SearchTagsVariables {
  title: string;
}
