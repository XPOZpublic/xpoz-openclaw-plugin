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

const TWEET_FIELDS_DESCRIPTION =
  'PERFORMANCE OPTIMIZATION: Specify fields you need. DEFAULT (if omitted): ["id", "text", "authorUsername", "createdAtDate"]. ' +
  'AVAILABLE FIELDS: ' +
  'Core: id, text, authorId, authorUsername, createdAt, createdAtDate. ' +
  'Engagement: retweetCount, replyCount, likeCount, quoteCount, impressionCount, bookmarkCount. ' +
  'Metadata: lang, possiblySensitive, suspended, deleted, source, isRetweet, status, grokGeneratedContent. ' +
  'Relations: conversationId, quotedTweetId, retweetedTweetId, replyToTweetId, replyToUserId, replyToUsername, originalTweetId, editedTweets. ' +
  'Content: hashtags, mentions, mediaUrls, urls. ' +
  'Birdwatch: hasBirdwatchNotes, birdwatchNotesId, birdwatchNotesText, birdwatchNotesUrl. ' +
  'Location: country, region, city.';

export const GetTwitterPostsByIdsSchema = Type.Object({
  postIds: Type.Array(Type.String(), { minItems: 1, maxItems: 100, description: 'Array of numeric Twitter post IDs (1-100 IDs).' }),
  fields: Type.Optional(Type.Array(Type.String(), { description: TWEET_FIELDS_DESCRIPTION })),
  forceLatest: ForceLatest,
  userPrompt: UserPrompt,
  feedback: Feedback,
  _requestId: RequestId,
});

export const GetTwitterPostsByAuthorSchema = Type.Object({
  username: Type.String({ minLength: 1, description: 'Twitter username (handle) of the author.' }),
  pageNumber: PageNumber,
  pageNumberEnd: PageNumberEnd,
  tableName: TableName,
  startDate: StartDate,
  endDate: EndDate,
  fields: Type.Optional(Type.Array(Type.String(), { description: TWEET_FIELDS_DESCRIPTION })),
  forceLatest: ForceLatest,
  responseType: Type.Optional(ResponseTypeEnum),
  limit: Limit,
  userPrompt: UserPrompt,
  feedback: Feedback,
  _requestId: RequestId,
});

export const GetTwitterPostsByKeywordsSchema = Type.Object({
  query: Type.String({ minLength: 1, description: 'Full-text search of post content. Supports exact phrases, boolean operators (AND, OR, NOT), parenthesized groups. Do NOT use from:username — use authorUsername parameter instead.' }),
  pageNumber: PageNumber,
  pageNumberEnd: PageNumberEnd,
  tableName: TableName,
  startDate: StartDate,
  endDate: EndDate,
  authorUsername: Type.Optional(Type.String({ description: 'Filter posts by author username.' })),
  authorId: Type.Optional(Type.String({ description: 'Filter posts by author ID (numeric string).' })),
  language: Type.Optional(Type.String({ description: 'Filter by language code.' })),
  filterOutRetweets: Type.Optional(Type.Boolean({ description: 'Exclude retweets from results. Default: false.' })),
  fields: Type.Optional(Type.Array(Type.String(), { description: TWEET_FIELDS_DESCRIPTION })),
  forceLatest: ForceLatest,
  responseType: Type.Optional(ResponseTypeEnum),
  limit: Limit,
  userPrompt: UserPrompt,
  feedback: Feedback,
  _requestId: RequestId,
});

export const GetTwitterPostRetweetsSchema = Type.Object({
  postId: Type.String({ description: 'Numeric Twitter post ID.' }),
  pageNumber: PageNumber,
  pageNumberEnd: PageNumberEnd,
  tableName: TableName,
  startDate: StartDate,
  endDate: EndDate,
  fields: Type.Optional(Type.Array(Type.String(), { description: TWEET_FIELDS_DESCRIPTION })),
  responseType: Type.Optional(ResponseTypeFastPagingEnum),
  limit: Limit,
  userPrompt: UserPrompt,
  feedback: Feedback,
  _requestId: RequestId,
});

export const GetTwitterPostQuotesSchema = Type.Object({
  postId: Type.String({ description: 'Numeric Twitter post ID.' }),
  pageNumber: PageNumber,
  pageNumberEnd: PageNumberEnd,
  tableName: TableName,
  startDate: StartDate,
  fields: Type.Optional(Type.Array(Type.String(), { description: TWEET_FIELDS_DESCRIPTION })),
  forceLatest: ForceLatest,
  responseType: Type.Optional(ResponseTypeEnum),
  limit: Limit,
  userPrompt: UserPrompt,
  feedback: Feedback,
  _requestId: RequestId,
});

export const GetTwitterPostCommentsSchema = Type.Object({
  postId: Type.String({ description: 'Numeric Twitter post ID.' }),
  pageNumber: PageNumber,
  pageNumberEnd: PageNumberEnd,
  tableName: TableName,
  startDate: StartDate,
  fields: Type.Optional(Type.Array(Type.String(), { description: TWEET_FIELDS_DESCRIPTION })),
  forceLatest: ForceLatest,
  responseType: Type.Optional(ResponseTypeEnum),
  limit: Limit,
  userPrompt: UserPrompt,
  feedback: Feedback,
  _requestId: RequestId,
});

export const CountTweetsSchema = Type.Object({
  phrase: Type.String({ minLength: 1, description: 'Count only tweets containing the phrase.' }),
  startDate: Type.Optional(Type.String({ description: 'Start date in YYYY-MM-DD format. Default: 6 months ago.' })),
  endDate: Type.Optional(Type.String({ description: 'End date in YYYY-MM-DD format. Default: current date.' })),
  userPrompt: UserPrompt,
  feedback: Feedback,
  _requestId: RequestId,
});
