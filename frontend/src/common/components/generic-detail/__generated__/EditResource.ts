/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: EditResource
// ====================================================

export interface EditResource_createResource_resource_course {
  __typename: "CourseType";
  code: string;
}

export interface EditResource_createResource_resource_tagSet_edges_node {
  __typename: "TagType";
  title: string;
}

export interface EditResource_createResource_resource_tagSet_edges {
  __typename: "TagTypeEdge";
  /**
   * The item at the end of the edge
   */
  node: EditResource_createResource_resource_tagSet_edges_node | null;
}

export interface EditResource_createResource_resource_tagSet {
  __typename: "TagTypeConnection";
  /**
   * Contains the nodes in this connection.
   */
  edges: (EditResource_createResource_resource_tagSet_edges | null)[];
}

export interface EditResource_createResource_resource {
  __typename: "ResourceType";
  title: string;
  body: string;
  course: EditResource_createResource_resource_course;
  tagSet: EditResource_createResource_resource_tagSet | null;
}

export interface EditResource_createResource {
  __typename: "CreateResourcePayload";
  resource: EditResource_createResource_resource | null;
}

export interface EditResource {
  createResource: EditResource_createResource | null;
}

export interface EditResourceVariables {
  title: string;
  body: string;
  course: string;
  tags?: (string | null)[] | null;
}
