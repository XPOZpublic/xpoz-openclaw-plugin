import { Type } from 'typebox';
import {
  ResponseTypeEnum,
  PageNumber,
  PageNumberEnd,
  TableName,
  StartDate,
  EndDate,
  Limit,
  Feedback,
  RequestId,
} from '../shared.js';

const COMMENT_FIELDS_DESCRIPTION =
  'PERFORMANCE OPTIMIZATION: Specify comment fields you need. DEFAULT (if omitted): ["id", "body", "authorUsername", "createdAtDate"]. ' +
  'AVAILABLE FIELDS: ' +
  'Core: id, body, parentPostId, parentId. Author: authorId, authorUsername. Subreddit: postSubredditName, postSubredditId. ' +
  'Engagement: score, upvotes, downvotes, controversiality. Meta: depth, isSubmitter, stickied, collapsed, edited, distinguished. ' +
  'Timestamps: createdAt, createdAtTimestamp, createdAtDate.';

export const GetRedditCommentsByKeywordsSchema = Type.Object({
  query: Type.String({ minLength: 1, description: 'Full-text search of comment body text. Supports exact phrases, boolean operators (AND, OR), parenthesized groups.' }),
  pageNumber: PageNumber,
  pageNumberEnd: PageNumberEnd,
  tableName: TableName,
  startDate: StartDate,
  endDate: EndDate,
  subreddit: Type.Optional(Type.String({ description: 'Filter comments by subreddit name (without r/ prefix).' })),
  fields: Type.Optional(Type.Array(Type.String(), { description: COMMENT_FIELDS_DESCRIPTION })),
  responseType: Type.Optional(ResponseTypeEnum),
  limit: Limit,
  feedback: Feedback,
  _requestId: RequestId,
});
