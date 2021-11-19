/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { AttachmentAttmType, TagTagType } from "./../../../../__generated__/globalTypes";

// ====================================================
// GraphQL query operation: GetDetailedLecture
// ====================================================

export interface GetDetailedLecture_lectures_edges_node_attachmentSet_edges_node {
  __typename: "AttachmentType";
  url: string | null;
  attmType: AttachmentAttmType;
}

export interface GetDetailedLecture_lectures_edges_node_attachmentSet_edges {
  __typename: "AttachmentTypeEdge";
  /**
   * The item at the end of the edge
   */
  node: GetDetailedLecture_lectures_edges_node_attachmentSet_edges_node | null;
}

export interface GetDetailedLecture_lectures_edges_node_attachmentSet {
  __typename: "AttachmentTypeConnection";
  /**
   * Contains the nodes in this connection.
   */
  edges: (GetDetailedLecture_lectures_edges_node_attachmentSet_edges | null)[];
}

export interface GetDetailedLecture_lectures_edges_node_tagSet_edges_node {
  __typename: "TagType";
  title: string;
  tagType: TagTagType;
}

export interface GetDetailedLecture_lectures_edges_node_tagSet_edges {
  __typename: "TagTypeEdge";
  /**
   * The item at the end of the edge
   */
  node: GetDetailedLecture_lectures_edges_node_tagSet_edges_node | null;
}

export interface GetDetailedLecture_lectures_edges_node_tagSet {
  __typename: "TagTypeConnection";
  /**
   * Contains the nodes in this connection.
   */
  edges: (GetDetailedLecture_lectures_edges_node_tagSet_edges | null)[];
}

export interface GetDetailedLecture_lectures_edges_node_teachers_edges_node {
  __typename: "TeacherType";
  title: string;
}

export interface GetDetailedLecture_lectures_edges_node_teachers_edges {
  __typename: "TeacherTypeEdge";
  /**
   * The item at the end of the edge
   */
  node: GetDetailedLecture_lectures_edges_node_teachers_edges_node | null;
}

export interface GetDetailedLecture_lectures_edges_node_teachers {
  __typename: "TeacherTypeConnection";
  /**
   * Contains the nodes in this connection.
   */
  edges: (GetDetailedLecture_lectures_edges_node_teachers_edges | null)[];
}

export interface GetDetailedLecture_lectures_edges_node {
  __typename: "LectureType";
  /**
   * The ID of the object.
   */
  id: string;
  title: string;
  body: string;
  attachmentSet: GetDetailedLecture_lectures_edges_node_attachmentSet | null;
  tagSet: GetDetailedLecture_lectures_edges_node_tagSet | null;
  teachers: GetDetailedLecture_lectures_edges_node_teachers;
}

export interface GetDetailedLecture_lectures_edges {
  __typename: "LectureTypeEdge";
  /**
   * The item at the end of the edge
   */
  node: GetDetailedLecture_lectures_edges_node | null;
}

export interface GetDetailedLecture_lectures {
  __typename: "LectureTypeConnection";
  /**
   * Contains the nodes in this connection.
   */
  edges: (GetDetailedLecture_lectures_edges | null)[];
}

export interface GetDetailedLecture {
  lectures: GetDetailedLecture_lectures | null;
}

export interface GetDetailedLectureVariables {
  id: string;
  courseCode: string;
}
