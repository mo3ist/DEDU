/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: EditSummary
// ====================================================

export interface EditSummary_createSummary_summary_course {
  __typename: "CourseType";
  code: string;
}

export interface EditSummary_createSummary_summary_tagSet_edges_node {
  __typename: "TagType";
  title: string;
}

export interface EditSummary_createSummary_summary_tagSet_edges {
  __typename: "TagTypeEdge";
  /**
   * The item at the end of the edge
   */
  node: EditSummary_createSummary_summary_tagSet_edges_node | null;
}

export interface EditSummary_createSummary_summary_tagSet {
  __typename: "TagTypeConnection";
  /**
   * Contains the nodes in this connection.
   */
  edges: (EditSummary_createSummary_summary_tagSet_edges | null)[];
}

export interface EditSummary_createSummary_summary {
  __typename: "SummaryType";
  title: string;
  body: string;
  course: EditSummary_createSummary_summary_course;
  tagSet: EditSummary_createSummary_summary_tagSet | null;
}

export interface EditSummary_createSummary {
  __typename: "CreateSummaryPayload";
  summary: EditSummary_createSummary_summary | null;
}

export interface EditSummary {
  createSummary: EditSummary_createSummary | null;
}

export interface EditSummaryVariables {
  modId: string;
  title: string;
  body: string;
  courseCode: string;
  tags?: (string | null)[] | null;
}
