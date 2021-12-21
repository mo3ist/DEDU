/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { TagTagType, ModState } from "./../../../../__generated__/globalTypes";

// ====================================================
// GraphQL query operation: GetResources
// ====================================================

export interface GetResources_resources_edges_node_tagSet_edges_node {
  __typename: "TagType";
  title: string;
  tagType: TagTagType;
}

export interface GetResources_resources_edges_node_tagSet_edges {
  __typename: "TagTypeEdge";
  /**
   * The item at the end of the edge
   */
  node: GetResources_resources_edges_node_tagSet_edges_node | null;
}

export interface GetResources_resources_edges_node_tagSet {
  __typename: "TagTypeConnection";
  /**
   * Contains the nodes in this connection.
   */
  edges: (GetResources_resources_edges_node_tagSet_edges | null)[];
}

export interface GetResources_resources_edges_node_user {
  __typename: "UserType";
  name: string | null;
  profilePicture: string | null;
}

export interface GetResources_resources_edges_node_mod {
  __typename: "ModType";
  state: ModState;
}

export interface GetResources_resources_edges_node {
  __typename: "ResourceType";
  /**
   * The ID of the object.
   */
  id: string;
  title: string;
  voteCount: number | null;
  userVote: string | null;
  created: any;
  tagSet: GetResources_resources_edges_node_tagSet | null;
  user: GetResources_resources_edges_node_user;
  mod: GetResources_resources_edges_node_mod;
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
  course_Code?: string | null;
}
