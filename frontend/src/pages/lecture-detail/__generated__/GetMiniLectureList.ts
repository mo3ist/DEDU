/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { LectureLectureType } from "./../../../../__generated__/globalTypes";

// ====================================================
// GraphQL query operation: GetMiniLectureList
// ====================================================

export interface GetMiniLectureList_lectures_edges_node {
  __typename: "LectureType";
  /**
   * The ID of the object.
   */
  id: string;
  title: string;
  lectureType: LectureLectureType;
}

export interface GetMiniLectureList_lectures_edges {
  __typename: "LectureTypeEdge";
  /**
   * The item at the end of the edge
   */
  node: GetMiniLectureList_lectures_edges_node | null;
}

export interface GetMiniLectureList_lectures_pageInfo {
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

export interface GetMiniLectureList_lectures {
  __typename: "LectureTypeConnection";
  /**
   * Contains the nodes in this connection.
   */
  edges: (GetMiniLectureList_lectures_edges | null)[];
  /**
   * Pagination data for this connection.
   */
  pageInfo: GetMiniLectureList_lectures_pageInfo;
}

export interface GetMiniLectureList {
  lectures: GetMiniLectureList_lectures | null;
}

export interface GetMiniLectureListVariables {
  courseCode: string;
}
