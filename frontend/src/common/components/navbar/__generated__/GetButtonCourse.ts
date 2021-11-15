/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetButtonCourse
// ====================================================

export interface GetButtonCourse_courses_edges_node_classificationSet_edges_node {
  __typename: "ClassificationType";
  /**
   * The ID of the object.
   */
  id: string;
  code: string;
  title: string;
}

export interface GetButtonCourse_courses_edges_node_classificationSet_edges {
  __typename: "ClassificationTypeEdge";
  /**
   * The item at the end of the edge
   */
  node: GetButtonCourse_courses_edges_node_classificationSet_edges_node | null;
}

export interface GetButtonCourse_courses_edges_node_classificationSet {
  __typename: "ClassificationTypeConnection";
  /**
   * Contains the nodes in this connection.
   */
  edges: (GetButtonCourse_courses_edges_node_classificationSet_edges | null)[];
}

export interface GetButtonCourse_courses_edges_node {
  __typename: "CourseType";
  /**
   * The ID of the object.
   */
  id: string;
  title: string;
  code: string;
  classificationSet: GetButtonCourse_courses_edges_node_classificationSet;
}

export interface GetButtonCourse_courses_edges {
  __typename: "CourseTypeEdge";
  /**
   * The item at the end of the edge
   */
  node: GetButtonCourse_courses_edges_node | null;
}

export interface GetButtonCourse_courses {
  __typename: "CourseTypeConnection";
  /**
   * Contains the nodes in this connection.
   */
  edges: (GetButtonCourse_courses_edges | null)[];
}

export interface GetButtonCourse {
  courses: GetButtonCourse_courses | null;
}

export interface GetButtonCourseVariables {
  courseCode: string;
}
