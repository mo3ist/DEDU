/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetCourseOutline
// ====================================================

export interface GetCourseOutline_courses_edges_node {
  __typename: "CourseType";
  title: string;
  outline: string;
}

export interface GetCourseOutline_courses_edges {
  __typename: "CourseTypeEdge";
  /**
   * The item at the end of the edge
   */
  node: GetCourseOutline_courses_edges_node | null;
}

export interface GetCourseOutline_courses {
  __typename: "CourseTypeConnection";
  /**
   * Contains the nodes in this connection.
   */
  edges: (GetCourseOutline_courses_edges | null)[];
}

export interface GetCourseOutline {
  courses: GetCourseOutline_courses | null;
}

export interface GetCourseOutlineVariables {
  id?: string | null;
}
