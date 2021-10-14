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

export interface SearchTags_tags_pageInfo {
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

export interface SearchTags_tags {
  __typename: "TagTypeConnection";
  /**
   * Contains the nodes in this connection.
   */
  edges: (SearchTags_tags_edges | null)[];
  /**
   * Pagination data for this connection.
   */
  pageInfo: SearchTags_tags_pageInfo;
}

export interface SearchTags {
  tags: SearchTags_tags | null;
}

export interface SearchTagsVariables {
  title: string;
  tagType?: string | null;
  first?: number | null;
  after?: string | null;
  course_Code?: string | null;
}
