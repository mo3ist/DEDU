/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { TagTagType } from "./../../../../../__generated__/globalTypes";

// ====================================================
// GraphQL query operation: GetResource
// ====================================================

export interface GetResource_resources_edges_node_tagSet_edges_node {
  __typename: "TagType";
  title: string;
  tagType: TagTagType;
}

export interface GetResource_resources_edges_node_tagSet_edges {
  __typename: "TagTypeEdge";
  /**
   * The item at the end of the edge
   */
  node: GetResource_resources_edges_node_tagSet_edges_node | null;
}

export interface GetResource_resources_edges_node_tagSet {
  __typename: "TagTypeConnection";
  /**
   * Contains the nodes in this connection.
   */
  edges: (GetResource_resources_edges_node_tagSet_edges | null)[];
}

export interface GetResource_resources_edges_node {
  __typename: "ResourceType";
  title: string;
  body: string;
  created: any;
  voteCount: number | null;
  tagSet: GetResource_resources_edges_node_tagSet | null;
}

export interface GetResource_resources_edges {
  __typename: "ResourceTypeEdge";
  /**
   * The item at the end of the edge
   */
  node: GetResource_resources_edges_node | null;
}

export interface GetResource_resources {
  __typename: "ResourceTypeConnection";
  /**
   * Contains the nodes in this connection.
   */
  edges: (GetResource_resources_edges | null)[];
}

export interface GetResource {
  resources: GetResource_resources | null;
}

export interface GetResourceVariables {
  id?: string | null;
}
