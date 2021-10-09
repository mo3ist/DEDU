/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetCourseId
// ====================================================

export interface GetCourseId_classifications_edges_node_courses_edges_node {
  __typename: "CourseType";
  /**
   * The ID of the object.
   */
  id: string;
}

export interface GetCourseId_classifications_edges_node_courses_edges {
  __typename: "CourseTypeEdge";
  /**
   * The item at the end of the edge
   */
  node: GetCourseId_classifications_edges_node_courses_edges_node | null;
}

export interface GetCourseId_classifications_edges_node_courses {
  __typename: "CourseTypeConnection";
  /**
   * Contains the nodes in this connection.
   */
  edges: (GetCourseId_classifications_edges_node_courses_edges | null)[];
}

export interface GetCourseId_classifications_edges_node {
  __typename: "ClassificationType";
  /**
   * The ID of the object.
   */
  id: string;
  courses: GetCourseId_classifications_edges_node_courses;
}

export interface GetCourseId_classifications_edges {
  __typename: "ClassificationTypeEdge";
  /**
   * The item at the end of the edge
   */
  node: GetCourseId_classifications_edges_node | null;
}

export interface GetCourseId_classifications {
  __typename: "ClassificationTypeConnection";
  /**
   * Contains the nodes in this connection.
   */
  edges: (GetCourseId_classifications_edges | null)[];
}

export interface GetCourseId {
  classifications: GetCourseId_classifications | null;
}
