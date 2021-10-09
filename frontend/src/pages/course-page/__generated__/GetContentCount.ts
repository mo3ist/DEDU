/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetContentCount
// ====================================================

export interface GetContentCount_courses_edges_node {
  __typename: "CourseType";
  lecturesCount: number | null;
  questionsCount: number | null;
  answersCount: number | null;
  quizzesCount: number | null;
  resourcesCount: number | null;
  summariesCount: number | null;
}

export interface GetContentCount_courses_edges {
  __typename: "CourseTypeEdge";
  /**
   * The item at the end of the edge
   */
  node: GetContentCount_courses_edges_node | null;
}

export interface GetContentCount_courses {
  __typename: "CourseTypeConnection";
  /**
   * Contains the nodes in this connection.
   */
  edges: (GetContentCount_courses_edges | null)[];
}

export interface GetContentCount {
  courses: GetContentCount_courses | null;
}

export interface GetContentCountVariables {
  id?: string | null;
}
