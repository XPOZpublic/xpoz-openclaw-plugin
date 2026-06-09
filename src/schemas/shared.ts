import { Type } from 'typebox';

export const IdentifierTypeEnum = Type.Union(
  [Type.Literal('id'), Type.Literal('username')],
  { description: 'Type of identifier provided. Use "id" for numeric ID, "username" for username.' },
);

export const ConnectionTypeEnum = Type.Union(
  [Type.Literal('followers'), Type.Literal('following')],
  { description: 'Type of connection to retrieve. "followers" for users who follow this account, "following" for users this account follows.' },
);

export const ResponseTypeEnum = Type.Union(
  [Type.Literal('fast'), Type.Literal('paging'), Type.Literal('csv')],
  {
    description:
      'Response mode. "fast" (default): returns up to 300 results directly. ' +
      '"paging": async paginated results (100/page), poll via checkOperationStatus. ' +
      '"csv": async single CSV download, poll for S3 link.',
  },
);

export const ResponseTypeFastPagingEnum = Type.Union(
  [Type.Literal('fast'), Type.Literal('paging')],
  { description: 'Response mode. "fast" (default): returns up to 300 results directly. "paging": async paginated results (100/page).' },
);

export const PageNumber = Type.Optional(
  Type.Number({ minimum: 1, description: 'Page number to fetch (1-indexed). Must be provided with tableName to fetch subsequent pages. Omit for first page.' }),
);

export const PageNumberEnd = Type.Optional(
  Type.Number({ minimum: 1, description: 'Optional ending page number for fetching multiple consecutive pages at once (e.g., pageNumber=1, pageNumberEnd=5 fetches pages 1-5). Must be >= pageNumber.' }),
);

export const TableName = Type.Optional(
  Type.String({ description: 'Cached table name from previous pagination request. Required when fetching pageNumber > 1. Returned in first page response.' }),
);

export const StartDate = Type.Optional(Type.String({ description: 'Start date filter (YYYY-MM-DD format)' }));
export const EndDate = Type.Optional(Type.String({ description: 'End date filter (YYYY-MM-DD format)' }));

export const ForceLatest = Type.Optional(
  Type.Boolean({
    description:
      'USE SPARINGLY: Force fetching the latest data from the API, bypassing cache checks. ' +
      'Only use when explicitly required. WARNING: Increases latency and API costs. Default: false.',
  }),
);

export const Limit = Type.Optional(
  Type.Number({
    minimum: 1,
    maximum: 500000,
    description: 'Max results to return. Fast mode: capped at 300 (default: 300). Paging/CSV modes: caps total exported rows (default: all, max 500K).',
  }),
);

export const UserPrompt = Type.Optional(
  Type.String({
    description: 'CRITICAL FOR ACCURACY: Include the complete user question to enable query optimization and context-aware filtering.',
  }),
);

export const Feedback = Type.Optional(
  Type.String({
    description:
      'Optional. Any free-form feedback you want to share — about this tool, other tools, the platform overall, or anything else. ' +
      'Feedback does NOT have to be about the current tool: you can use this field to comment on a different tool you used earlier, ' +
      'flag missing functionality, request a new tool, or share general impressions. ' +
      'Captured for product feedback; does not affect tool behavior.',
  }),
);

export const RequestId = Type.Optional(
  Type.String({ description: 'Client-generated request ID for tracking and correlation.' }),
);
