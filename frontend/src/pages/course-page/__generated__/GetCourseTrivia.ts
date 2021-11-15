/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { TeacherTeacherType } from "./../../../../__generated__/globalTypes";

// ====================================================
// GraphQL query operation: GetCourseTrivia
// ====================================================

export interface GetCourseTrivia_courses_edges_node_attachmentSet_edges_node {
  __typename: "AttachmentType";
  file: string | null;
}

export interface GetCourseTrivia_courses_edges_node_attachmentSet_edges {
  __typename: "AttachmentTypeEdge";
  /**
   * The item at the end of the edge
   */
  node: GetCourseTrivia_courses_edges_node_attachmentSet_edges_node | null;
}

export interface GetCourseTrivia_courses_edges_node_attachmentSet {
  __typename: "AttachmentTypeConnection";
  /**
   * Contains the nodes in this connection.
   */
  edges: (GetCourseTrivia_courses_edges_node_attachmentSet_edges | null)[];
}

export interface GetCourseTrivia_courses_edges_node_teachers_edges_node {
  __typename: "TeacherType";
  /**
   * The ID of the object.
   */
  id: string;
  title: string;
  teacherType: TeacherTeacherType;
}

export interface GetCourseTrivia_courses_edges_node_teachers_edges {
  __typename: "TeacherTypeEdge";
  /**
   * The item at the end of the edge
   */
  node: GetCourseTrivia_courses_edges_node_teachers_edges_node | null;
}

export interface GetCourseTrivia_courses_edges_node_teachers {
  __typename: "TeacherTypeConnection";
  /**
   * Contains the nodes in this connection.
   */
  edges: (GetCourseTrivia_courses_edges_node_teachers_edges | null)[];
}

export interface GetCourseTrivia_courses_edges_node {
  __typename: "CourseType";
  /**
   * The ID of the object.
   */
  id: string;
  title: string;
  description: string;
  attachmentSet: GetCourseTrivia_courses_edges_node_attachmentSet | null;
  contribs: number | null;
  contribsUsers: number | null;
  teachers: GetCourseTrivia_courses_edges_node_teachers | null;
}

export interface GetCourseTrivia_courses_edges {
  __typename: "CourseTypeEdge";
  /**
   * The item at the end of the edge
   */
  node: GetCourseTrivia_courses_edges_node | null;
}

export interface GetCourseTrivia_courses {
  __typename: "CourseTypeConnection";
  /**
   * Contains the nodes in this connection.
   */
  edges: (GetCourseTrivia_courses_edges | null)[];
}

export interface GetCourseTrivia {
  courses: GetCourseTrivia_courses | null;
}

export interface GetCourseTriviaVariables {
  id?: string | null;
}
