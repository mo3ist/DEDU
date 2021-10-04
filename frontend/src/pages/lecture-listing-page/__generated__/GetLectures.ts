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
  tagSet: GetLectures_lectures_edges_node_tagSet | null;
  attachmentSet: GetLectures_lectures_edges_node_attachmentSet | null;
}

export interface GetLectures_lectures_edges {
  __typename: "LectureTypeEdge";
  /**
   * The item at the end of the edge
   */
  node: GetLectures_lectures_edges_node | null;
}

export interface GetLectures_lectures {
  __typename: "LectureTypeConnection";
  /**
   * Contains the nodes in this connection.
   */
  edges: (GetLectures_lectures_edges | null)[];
}

export interface GetLectures {
  lectures: GetLectures_lectures | null;
}

export interface GetLecturesVariables {
  tag_Title?: string | null;
}
