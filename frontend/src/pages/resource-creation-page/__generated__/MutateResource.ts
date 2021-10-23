/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: MutateResource
// ====================================================

export interface MutateResource_createResource_resource_course {
  __typename: "CourseType";
  code: string;
}

export interface MutateResource_createResource_resource_user {
  __typename: "UserType";
  email: string;
}

export interface MutateResource_createResource_resource_tagSet_edges_node {
  __typename: "TagType";
  title: string;
}

export interface MutateResource_createResource_resource_tagSet_edges {
  __typename: "TagTypeEdge";
  /**
   * The item at the end of the edge
   */
  node: MutateResource_createResource_resource_tagSet_edges_node | null;
}

export interface MutateResource_createResource_resource_tagSet {
  __typename: "TagTypeConnection";
  /**
   * Contains the nodes in this connection.
   */
  edges: (MutateResource_createResource_resource_tagSet_edges | null)[];
}

export interface MutateResource_createResource_resource {
  __typename: "ResourceType";
  title: string;
  body: string;
  course: MutateResource_createResource_resource_course;
  user: MutateResource_createResource_resource_user;
  tagSet: MutateResource_createResource_resource_tagSet | null;
}

export interface MutateResource_createResource {
  __typename: "CreateResourcePayload";
  resource: MutateResource_createResource_resource | null;
}

export interface MutateResource {
  createResource: MutateResource_createResource | null;
}

export interface MutateResourceVariables {
  title: string;
  body: string;
  course: string;
  tags?: (string | null)[] | null;
}
