import { Type } from 'typebox';
import {
  IdentifierTypeEnum,
  ConnectionTypeEnum,
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

const USER_FIELDS_DESCRIPTION =
  'PERFORMANCE OPTIMIZATION: Specify fields you need. DEFAULT (if omitted): ["id", "username", "fullName"]. ' +
  'AVAILABLE FIELDS: ' +
  'Core: id, username, fullName, biography, isPrivate, isVerified. ' +
  'Engagement: followerCount, followingCount, mediaCount. ' +
  'Profile: profilePicUrl, profilePicId, profileUrl, externalUrl, hasAnonymousProfilePicture.';

const KEYWORDS_USER_FIELDS_DESCRIPTION =
  'PERFORMANCE OPTIMIZATION: Specify fields you need. DEFAULT (if omitted): ["id", "username", "fullName"]. ' +
  'Includes all user fields plus aggregations from matching posts: aggRelevance, relevantPostsCount, relevantPostsLikesSum, relevantPostsCommentsSum, relevantPostsResharesSum, relevantPostsVideoPlaysSum.';

export const GetInstagramUserSchema = Type.Object({
  identifier: Type.String({ minLength: 1, description: 'User ID (numeric) or username depending on identifierType.' }),
  identifierType: IdentifierTypeEnum,
  fields: Type.Optional(Type.Array(Type.String(), { description: USER_FIELDS_DESCRIPTION })),
  userPrompt: UserPrompt,
  feedback: Feedback,
  _requestId: RequestId,
});

export const SearchInstagramUsersSchema = Type.Object({
  name: Type.String({ minLength: 1, description: 'Search query for Instagram users. Supports partial name or username matching.' }),
  limit: Type.Optional(Type.Number({ minimum: 1, maximum: 10, description: 'Maximum number of users to return. Default: 10, Max: 10.' })),
  fields: Type.Optional(Type.Array(Type.String(), { description: USER_FIELDS_DESCRIPTION })),
  userPrompt: UserPrompt,
  feedback: Feedback,
  _requestId: RequestId,
});

export const GetInstagramUserConnectionsSchema = Type.Object({
  username: Type.String({ minLength: 1, description: 'Instagram username (without @ symbol).' }),
  connectionType: ConnectionTypeEnum,
  pageNumber: PageNumber,
  pageNumberEnd: PageNumberEnd,
  tableName: TableName,
  fields: Type.Optional(Type.Array(Type.String(), { description: USER_FIELDS_DESCRIPTION })),
  forceLatest: ForceLatest,
  responseType: Type.Optional(ResponseTypeFastPagingEnum),
  limit: Limit,
  userPrompt: UserPrompt,
  feedback: Feedback,
  _requestId: RequestId,
});

export const GetInstagramPostInteractingUsersSchema = Type.Object({
  postId: Type.String({ description: 'Instagram post strong_id (e.g., "3606450040306139062_4836333238").' }),
  interactionType: Type.Union(
    [Type.Literal('commenters'), Type.Literal('likers')],
    { description: 'Type of interaction: "commenters" (commented) or "likers" (liked).' },
  ),
  responseType: Type.Optional(ResponseTypeFastPagingEnum),
  limit: Limit,
  pageNumber: PageNumber,
  pageNumberEnd: PageNumberEnd,
  tableName: TableName,
  fields: Type.Optional(Type.Array(Type.String(), { description: USER_FIELDS_DESCRIPTION })),
  forceLatest: ForceLatest,
  userPrompt: UserPrompt,
  feedback: Feedback,
  _requestId: RequestId,
});

export const GetInstagramUsersByKeywordsSchema = Type.Object({
  query: Type.String({ minLength: 1, description: 'Full-text search of Instagram post captions to find users who authored matching posts. Supports exact phrases, boolean operators (AND, OR, NOT), parenthesized groups.' }),
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
