/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { TagTagType } from "./../../../../__generated__/globalTypes";

// ====================================================
// GraphQL query operation: GetDetailedResource
// ====================================================

export interface GetDetailedResource_resources_edges_node_tagSet_edges_node {
  __typename: "TagType";
  title: string;
  tagType: TagTagType;
}

export interface GetDetailedResource_resources_edges_node_tagSet_edges {
  __typename: "TagTypeEdge";
  /**
   * The item at the end of the edge
   */
  node: GetDetailedResource_resources_edges_node_tagSet_edges_node | null;
}

export interface GetDetailedResource_resources_edges_node_tagSet {
  __typename: "TagTypeConnection";
  /**
   * Contains the nodes in this connection.
   */
  edges: (GetDetailedResource_resources_edges_node_tagSet_edges | null)[];
}

export interface GetDetailedResource_resources_edges_node {
  __typename: "ResourceType";
  /**
   * The ID of the object.
   */
  id: string;
  title: string;
  body: string;
  created: any;
  voteCount: number | null;
  tagSet: GetDetailedResource_resources_edges_node_tagSet | null;
}

export interface GetDetailedResource_resources_edges {
  __typename: "ResourceTypeEdge";
  /**
   * The item at the end of the edge
   */
  node: GetDetailedResource_resources_edges_node | null;
}

export interface GetDetailedResource_resources {
  __typename: "ResourceTypeConnection";
  /**
   * Contains the nodes in this connection.
   */
  edges: (GetDetailedResource_resources_edges | null)[];
}

export interface GetDetailedResource {
  resources: GetDetailedResource_resources | null;
}

export interface GetDetailedResourceVariables {
  id?: string | null;
}
