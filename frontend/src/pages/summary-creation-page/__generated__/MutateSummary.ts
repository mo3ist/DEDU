/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: MutateSummary
// ====================================================

export interface MutateSummary_createSummary_summary_course {
  __typename: "CourseType";
  code: string;
}

export interface MutateSummary_createSummary_summary_tagSet_edges_node {
  __typename: "TagType";
  title: string;
}

export interface MutateSummary_createSummary_summary_tagSet_edges {
  __typename: "TagTypeEdge";
  /**
   * The item at the end of the edge
   */
  node: MutateSummary_createSummary_summary_tagSet_edges_node | null;
}

export interface MutateSummary_createSummary_summary_tagSet {
  __typename: "TagTypeConnection";
  /**
   * Contains the nodes in this connection.
   */
  edges: (MutateSummary_createSummary_summary_tagSet_edges | null)[];
}

export interface MutateSummary_createSummary_summary {
  __typename: "SummaryType";
  title: string;
  body: string;
  course: MutateSummary_createSummary_summary_course;
  tagSet: MutateSummary_createSummary_summary_tagSet | null;
}

export interface MutateSummary_createSummary {
  __typename: "CreateSummaryPayload";
  summary: MutateSummary_createSummary_summary | null;
}

export interface MutateSummary {
  createSummary: MutateSummary_createSummary | null;
}

export interface MutateSummaryVariables {
  title: string;
  body: string;
  courseCode: string;
  tags?: (string | null)[] | null;
}
