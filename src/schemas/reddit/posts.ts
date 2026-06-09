import { Type } from 'typebox';
import {
  ResponseTypeEnum,
  ResponseTypeFastPagingEnum,
  PageNumber,
  PageNumberEnd,
  TableName,
  StartDate,
  EndDate,
  ForceLatest,
  Limit,
  UserPrompt,
  Feedback,
  RequestId,
} from '../shared.js';

const POST_FIELDS_DESCRIPTION =
  'PERFORMANCE OPTIMIZATION: Specify fields you need. DEFAULT (if omitted): ["id", "title", "authorUsername", "subredditName", "createdAtDate"]. ' +
  'AVAILABLE FIELDS: ' +
  'Core: id, title, selftext, url, permalink, postUrl, thumbnail. ' +
  'Author: authorId, authorUsername. ' +
  'Subreddit: subredditName, subredditId. ' +
  'Engagement: score, upvotes, downvotes, upvoteRatio, commentsCount, crosspostsCount. ' +
  'Flags: isSelf, isVideo, isOriginalContent, over18, spoiler, locked, stickied, archived. ' +
  'Extra: linkFlairText, postHint, domain, crosspostParent. ' +
  'Timestamps: createdAt, createdAtTimestamp, createdAtDate.';

const COMMENT_FIELDS_DESCRIPTION =
  'PERFORMANCE OPTIMIZATION: Specify comment fields you need. DEFAULT (if omitted): ["id", "body", "authorUsername", "createdAtDate"]. ' +
  'AVAILABLE FIELDS: ' +
  'Core: id, body, parentPostId, parentId. Author: authorId, authorUsername. ' +
  'Engagement: score, upvotes, downvotes, controversiality. Meta: depth, isSubmitter, stickied.';

export const GetRedditPostsByKeywordsSchema = Type.Object({
  query: Type.String({ minLength: 1, description: 'Full-text search of post content. Searches post titles and selftext. Supports exact phrases, boolean operators (AND, OR), parenthesized groups.' }),
  pageNumber: PageNumber,
  pageNumberEnd: PageNumberEnd,
  tableName: TableName,
  startDate: StartDate,
  endDate: EndDate,
  sort: Type.Optional(Type.Union(
    [Type.Literal('relevance'), Type.Literal('hot'), Type.Literal('top'), Type.Literal('new'), Type.Literal('comments')],
    { description: 'Sort order for results. Default: relevance.' },
  )),
  time: Type.Optional(Type.Union(
    [Type.Literal('hour'), Type.Literal('day'), Type.Literal('week'), Type.Literal('month'), Type.Literal('year'), Type.Literal('all')],
    { description: 'Time filter for results. Default: all.' },
  )),
  subreddit: Type.Optional(Type.String({ description: 'Filter posts by subreddit name (without r/ prefix).' })),
  fields: Type.Optional(Type.Array(Type.String(), { description: POST_FIELDS_DESCRIPTION })),
  forceLatest: ForceLatest,
  responseType: Type.Optional(ResponseTypeEnum),
  limit: Limit,
  userPrompt: UserPrompt,
  feedback: Feedback,
  _requestId: RequestId,
});

export const GetRedditPostWithCommentsByIdSchema = Type.Object({
  postId: Type.String({ minLength: 1, description: 'Reddit post ID to fetch. Returns the post data along with its comments.' }),
  postFields: Type.Optional(Type.Array(Type.String(), { description: POST_FIELDS_DESCRIPTION })),
  commentFields: Type.Optional(Type.Array(Type.String(), { description: COMMENT_FIELDS_DESCRIPTION })),
  pageNumber: PageNumber,
  pageNumberEnd: PageNumberEnd,
  tableName: TableName,
  forceLatest: ForceLatest,
  responseType: Type.Optional(ResponseTypeFastPagingEnum),
  limit: Limit,
  userPrompt: UserPrompt,
  feedback: Feedback,
  _requestId: RequestId,
});
