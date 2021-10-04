/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetSyllabusTags
// ====================================================

export interface GetSyllabusTags_tags_edges_node {
  __typename: "TagType";
  title: string;
  body: string | null;
}

export interface GetSyllabusTags_tags_edges {
  __typename: "TagTypeEdge";
  /**
   * The item at the end of the edge
   */
  node: GetSyllabusTags_tags_edges_node | null;
}

export interface GetSyllabusTags_tags {
  __typename: "TagTypeConnection";
  /**
   * Contains the nodes in this connection.
   */
  edges: (GetSyllabusTags_tags_edges | null)[];
}

export interface GetSyllabusTags {
  tags: GetSyllabusTags_tags | null;
}

export interface GetSyllabusTagsVariables {
  title?: string | null;
}
