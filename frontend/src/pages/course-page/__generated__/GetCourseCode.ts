/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetCourseCode
// ====================================================

export interface GetCourseCode_courses_edges_node {
  __typename: "CourseType";
  code: string;
}

export interface GetCourseCode_courses_edges {
  __typename: "CourseTypeEdge";
  /**
   * The item at the end of the edge
   */
  node: GetCourseCode_courses_edges_node | null;
}

export interface GetCourseCode_courses {
  __typename: "CourseTypeConnection";
  /**
   * Contains the nodes in this connection.
   */
  edges: (GetCourseCode_courses_edges | null)[];
}

export interface GetCourseCode {
  courses: GetCourseCode_courses | null;
}

export interface GetCourseCodeVariables {
  id?: string | null;
}
