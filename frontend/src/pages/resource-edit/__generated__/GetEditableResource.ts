/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { TagTagType } from "./../../../../__generated__/globalTypes";

// ====================================================
// GraphQL query operation: GetEditableResource
// ====================================================

export interface GetEditableResource_resources_edges_node_tagSet_edges_node {
  __typename: "TagType";
  title: string;
  tagType: TagTagType;
}

export interface GetEditableResource_resources_edges_node_tagSet_edges {
  __typename: "TagTypeEdge";
  /**
   * The item at the end of the edge
   */
  node: GetEditableResource_resources_edges_node_tagSet_edges_node | null;
}

export interface GetEditableResource_resources_edges_node_tagSet {
  __typename: "TagTypeConnection";
  /**
   * Contains the nodes in this connection.
   */
  edges: (GetEditableResource_resources_edges_node_tagSet_edges | null)[];
}

export interface GetEditableResource_resources_edges_node_mod {
  __typename: "ModType";
  /**
   * The ID of the object.
   */
  id: string;
}

export interface GetEditableResource_resources_edges_node {
  __typename: "ResourceType";
  /**
   * The ID of the object.
   */
  id: string;
  title: string;
  body: string;
  tagSet: GetEditableResource_resources_edges_node_tagSet | null;
  mod: GetEditableResource_resources_edges_node_mod;
}

export interface GetEditableResource_resources_edges {
  __typename: "ResourceTypeEdge";
  /**
   * The item at the end of the edge
   */
  node: GetEditableResource_resources_edges_node | null;
}

export interface GetEditableResource_resources {
  __typename: "ResourceTypeConnection";
  /**
   * Contains the nodes in this connection.
   */
  edges: (GetEditableResource_resources_edges | null)[];
}

export interface GetEditableResource {
  resources: GetEditableResource_resources | null;
}

export interface GetEditableResourceVariables {
  id: string;
}
