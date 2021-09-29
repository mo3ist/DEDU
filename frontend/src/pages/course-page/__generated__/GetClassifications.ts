/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { ClassificationYear } from "./../../../../__generated__/globalTypes";

// ====================================================
// GraphQL query operation: GetClassifications
// ====================================================

export interface GetClassifications_classifications_edges_node_courses_edges_node {
  __typename: "CourseType";
  /**
   * The ID of the object.
   */
  id: string;
  title: string;
  code: string;
}

export interface GetClassifications_classifications_edges_node_courses_edges {
  __typename: "CourseTypeEdge";
  /**
   * The item at the end of the edge
   */
  node: GetClassifications_classifications_edges_node_courses_edges_node | null;
}

export interface GetClassifications_classifications_edges_node_courses {
  __typename: "CourseTypeConnection";
  /**
   * Contains the nodes in this connection.
   */
  edges: (GetClassifications_classifications_edges_node_courses_edges | null)[];
}

export interface GetClassifications_classifications_edges_node {
  __typename: "ClassificationType";
  /**
   * The ID of the object.
   */
  id: string;
  year: ClassificationYear;
  courses: GetClassifications_classifications_edges_node_courses;
}

export interface GetClassifications_classifications_edges {
  __typename: "ClassificationTypeEdge";
  /**
   * The item at the end of the edge
   */
  node: GetClassifications_classifications_edges_node | null;
}

export interface GetClassifications_classifications {
  __typename: "ClassificationTypeConnection";
  /**
   * Contains the nodes in this connection.
   */
  edges: (GetClassifications_classifications_edges | null)[];
}

export interface GetClassifications {
  classifications: GetClassifications_classifications | null;
}
