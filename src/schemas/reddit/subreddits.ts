import { Type } from 'typebox';
import {
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

const SUBREDDIT_FIELDS_DESCRIPTION =
  'PERFORMANCE OPTIMIZATION: Specify fields you need. DEFAULT (if omitted): ["id", "displayName", "title", "subscribersCount"]. ' +
  'AVAILABLE FIELDS: ' +
  'Core: id, displayName, title, publicDescription, description. ' +
  'Stats: subscribersCount, activeUserCount. ' +
  'Meta: subredditType, over18, lang, url, subredditUrl. ' +
  'Images: iconImg, bannerImg, headerImg, communityIcon. ' +
  'Timestamps: createdAt, createdAtTimestamp, createdAtDate.';

const KEYWORDS_SUBREDDIT_FIELDS_DESCRIPTION =
  'PERFORMANCE OPTIMIZATION: Specify fields you need. DEFAULT (if omitted): ["id", "displayName", "title", "subscribersCount"]. ' +
  'Includes all subreddit fields plus aggregations: aggRelevance, relevantPostsCount, relevantPostsUpvotesSum, relevantPostsCommentsCountSum.';

const POST_FIELDS_DESCRIPTION =
  'PERFORMANCE OPTIMIZATION: Specify post fields you need. DEFAULT (if omitted): ["id", "title", "authorUsername", "subredditName", "createdAtDate"]. ' +
  'Core: id, title, selftext, url, permalink. Author: authorId, authorUsername. Engagement: score, upvotes, commentsCount.';

export const SearchRedditSubredditsSchema = Type.Object({
  query: Type.String({ minLength: 1, description: 'Search query for Reddit subreddits. Searches subreddit names and descriptions.' }),
  limit: Type.Optional(Type.Number({ minimum: 1, description: 'Maximum number of subreddits to return.' })),
  fields: Type.Optional(Type.Array(Type.String(), { description: SUBREDDIT_FIELDS_DESCRIPTION })),
  userPrompt: UserPrompt,
  feedback: Feedback,
  _requestId: RequestId,
});

export const GetRedditSubredditWithPostsByNameSchema = Type.Object({
  subredditName: Type.String({ description: 'Reddit subreddit name to fetch (without r/ prefix). Returns the subreddit data along with its posts.' }),
  subredditFields: Type.Optional(Type.Array(Type.String(), { description: SUBREDDIT_FIELDS_DESCRIPTION })),
  postFields: Type.Optional(Type.Array(Type.String(), { description: POST_FIELDS_DESCRIPTION })),
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

export const GetRedditSubredditsByKeywordsSchema = Type.Object({
  query: Type.String({ minLength: 1, description: 'Full-text search of Reddit post content to find subreddits where matching posts were made. Supports exact phrases, boolean operators (AND, OR, NOT), parenthesized groups.' }),
  pageNumber: PageNumber,
  pageNumberEnd: PageNumberEnd,
  tableName: TableName,
  startDate: StartDate,
  endDate: EndDate,
  fields: Type.Optional(Type.Array(Type.String(), { description: KEYWORDS_SUBREDDIT_FIELDS_DESCRIPTION })),
  forceLatest: ForceLatest,
  responseType: Type.Optional(ResponseTypeFastPagingEnum),
  limit: Limit,
  userPrompt: UserPrompt,
  feedback: Feedback,
  _requestId: RequestId,
});
