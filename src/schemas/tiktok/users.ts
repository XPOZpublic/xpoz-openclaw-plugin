import { Type } from 'typebox';
import {
  IdentifierTypeEnum,
  ResponseTypeEnum,
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

const USER_FIELDS_DESCRIPTION =
  'PERFORMANCE OPTIMIZATION: Specify fields you need. DEFAULT (if omitted): ["id", "username", "nickname"]. ' +
  'AVAILABLE FIELDS: ' +
  'Core: id, username, nickname, signature, secUid, avatar, isPrivate, isVerified. ' +
  'Engagement: followerCount, followingCount, likeCount, postCount. ' +
  'Meta: language, region, createdAt, usernameModifyTime.';

const KEYWORDS_USER_FIELDS_DESCRIPTION =
  'PERFORMANCE OPTIMIZATION: Specify fields you need. DEFAULT (if omitted): ["id", "username", "nickname"]. ' +
  'Includes all user fields plus aggregations: aggRelevance, relevantPostsCount, relevantPostsLikesSum, relevantPostsCommentsSum, relevantPostsPlaysSum, relevantPostsForwardsSum.';

export const GetTiktokUserSchema = Type.Object({
  identifier: Type.String({ minLength: 1, description: 'User ID (numeric) or username depending on identifierType.' }),
  identifierType: IdentifierTypeEnum,
  fields: Type.Optional(Type.Array(Type.String(), { description: USER_FIELDS_DESCRIPTION })),
  userPrompt: UserPrompt,
  feedback: Feedback,
  _requestId: RequestId,
});

export const SearchTiktokUsersSchema = Type.Object({
  name: Type.String({ minLength: 1, description: 'Search query for TikTok users. Supports partial name or username matching.' }),
  limit: Type.Optional(Type.Number({ minimum: 1, description: 'Maximum number of users to return.' })),
  fields: Type.Optional(Type.Array(Type.String(), { description: USER_FIELDS_DESCRIPTION })),
  userPrompt: UserPrompt,
  feedback: Feedback,
  _requestId: RequestId,
});

export const GetTiktokUsersByKeywordsSchema = Type.Object({
  query: Type.String({ minLength: 1, description: 'Full-text search of TikTok post descriptions to find users who authored matching posts. Supports exact phrases, boolean operators (AND, OR, NOT), parenthesized groups.' }),
  responseType: Type.Optional(ResponseTypeEnum),
  limit: Limit,
  pageNumber: PageNumber,
  pageNumberEnd: PageNumberEnd,
  tableName: TableName,
  startDate: StartDate,
  endDate: EndDate,
  fields: Type.Optional(Type.Array(Type.String(), { description: KEYWORDS_USER_FIELDS_DESCRIPTION })),
  forceLatest: ForceLatest,
  userPrompt: UserPrompt,
  feedback: Feedback,
  _requestId: RequestId,
});

export const GetTiktokUsersByHashtagsSchema = Type.Object({
  hashtags: Type.Array(Type.String(), { minItems: 1, maxItems: 5, description: 'Array of hashtags to search for (1-5). OR semantics. Bare alphanumeric only — no leading "#".' }),
  responseType: Type.Optional(ResponseTypeEnum),
  limit: Limit,
  pageNumber: PageNumber,
  pageNumberEnd: PageNumberEnd,
  tableName: TableName,
  startDate: StartDate,
  endDate: EndDate,
  fields: Type.Optional(Type.Array(Type.String(), { description: KEYWORDS_USER_FIELDS_DESCRIPTION })),
  forceLatest: ForceLatest,
  userPrompt: UserPrompt,
  feedback: Feedback,
  _requestId: RequestId,
});
