/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { LectureLectureType, TagTagType, AttachmentAttmType } from "./../../../../__generated__/globalTypes";

// ====================================================
// GraphQL query operation: GetLectures
// ====================================================

export interface GetLectures_lectures_edges_node_tagSet_edges_node {
  __typename: "TagType";
  title: string;
  body: string | null;
  tagType: TagTagType;
}

export interface GetLectures_lectures_edges_node_tagSet_edges {
  __typename: "TagTypeEdge";
  /**
   * The item at the end of the edge
   */
  node: GetLectures_lectures_edges_node_tagSet_edges_node | null;
}

export interface GetLectures_lectures_edges_node_tagSet {
  __typename: "TagTypeConnection";
  /**
   * Contains the nodes in this connection.
   */
  edges: (GetLectures_lectures_edges_node_tagSet_edges | null)[];
}

export interface GetLectures_lectures_edges_node_teachers_edges_node {
  __typename: "TeacherType";
  title: string;
}

export interface GetLectures_lectures_edges_node_teachers_edges {
  __typename: "TeacherTypeEdge";
  /**
   * The item at the end of the edge
   */
  node: GetLectures_lectures_edges_node_teachers_edges_node | null;
}

export interface GetLectures_lectures_edges_node_teachers {
  __typename: "TeacherTypeConnection";
  /**
   * Contains the nodes in this connection.
   */
  edges: (GetLectures_lectures_edges_node_teachers_edges | null)[];
}

export interface GetLectures_lectures_edges_node_attachmentSet_edges_node {
  __typename: "AttachmentType";
  title: string;
  attmType: AttachmentAttmType;
}

export interface GetLectures_lectures_edges_node_attachmentSet_edges {
  __typename: "AttachmentTypeEdge";
  /**
   * The item at the end of the edge
   */
  node: GetLectures_lectures_edges_node_attachmentSet_edges_node | null;
}

export interface GetLectures_lectures_edges_node_attachmentSet {
  __typename: "AttachmentTypeConnection";
  /**
   * Contains the nodes in this connection.
   */
  edges: (GetLectures_lectures_edges_node_attachmentSet_edges | null)[];
}

export interface GetLectures_lectures_edges_node {
  __typename: "LectureType";
  title: string;
  body: string;
  lectureType: LectureLectureType;
  created: any;
  questionCount: number | null;
  summaryCount: number | null;
  resourceCount: number | null;
  tagSet: GetLectures_lectures_edges_node_tagSet | null;
  teachers: GetLectures_lectures_edges_node_teachers;
  attachmentSet: GetLectures_lectures_edges_node_attachmentSet | null;
}

export interface GetLectures_lectures_edges {
  __typename: "LectureTypeEdge";
  /**
   * The item at the end of the edge
   */
  node: GetLectures_lectures_edges_node | null;
}

export interface GetLectures_lectures_pageInfo {
  __typename: "PageInfo";
  /**
   * When paginating backwards, the cursor to continue.
   */
  startCursor: string | null;
  /**
   * When paginating forwards, the cursor to continue.
   */
  endCursor: string | null;
  /**
   * When paginating forwards, are there more items?
   */
  hasNextPage: boolean;
  /**
   * When paginating backwards, are there more items?
   */
  hasPreviousPage: boolean;
}

export interface GetLectures_lectures {
  __typename: "LectureTypeConnection";
  /**
   * Contains the nodes in this connection.
   */
  edges: (GetLectures_lectures_edges | null)[];
  /**
   * Pagination data for this connection.
   */
  pageInfo: GetLectures_lectures_pageInfo;
}

export interface GetLectures {
  lectures: GetLectures_lectures | null;
}

export interface GetLecturesVariables {
  tagTitle?: string | null;
  courseCode?: string | null;
  first?: number | null;
  after?: string | null;
}
