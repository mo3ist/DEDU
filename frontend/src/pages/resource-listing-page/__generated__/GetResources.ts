/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetResources
// ====================================================

export interface GetResources_resources_edges_node {
  __typename: "ResourceType";
  title: string;
}

export interface GetResources_resources_edges {
  __typename: "ResourceTypeEdge";
  /**
   * The item at the end of the edge
   */
  node: GetResources_resources_edges_node | null;
}

export interface GetResources_resources_pageInfo {
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

export interface GetResources_resources {
  __typename: "ResourceTypeConnection";
  /**
   * Contains the nodes in this connection.
   */
  edges: (GetResources_resources_edges | null)[];
  /**
   * Pagination data for this connection.
   */
  pageInfo: GetResources_resources_pageInfo;
}

export interface GetResources {
  resources: GetResources_resources | null;
}

export interface GetResourcesVariables {
  first?: number | null;
  after?: string | null;
  tag_Title?: string | null;
}
