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

const POST_FIELDS_DESCRIPTION =
  'PERFORMANCE OPTIMIZATION: Specify fields you need. DEFAULT (if omitted): ["id", "description", "username", "createdAtDate"]. ' +
  'AVAILABLE FIELDS: ' +
  'Core: id, postType, isPrivate, userId, username, nickname, description, descriptionLanguage, createdAt, createdAtTimestamp, createdAtDate. ' +
  'Engagement: collectCount, commentCount, likeCount, downloadCount, forwardCount, playCount. ' +
  'Media: videoThumbnail, videoUrl (array), duration (seconds). ' +
  'Content: hashtags (array).';

export const GetTiktokPostsByIdsSchema = Type.Object({
  postIds: Type.Array(Type.String(), { minItems: 1, maxItems: 100, description: 'Array of TikTok post IDs to fetch (1-100 IDs).' }),
  fields: Type.Optional(Type.Array(Type.String(), { description: POST_FIELDS_DESCRIPTION })),
  forceLatest: ForceLatest,
  userPrompt: UserPrompt,
  feedback: Feedback,
  _requestId: RequestId,
});

export const GetTiktokPostsByUserSchema = Type.Object({
  identifier: Type.String({ minLength: 1, description: 'User ID (numeric) or username depending on identifierType.' }),
  identifierType: IdentifierTypeEnum,
  pageNumber: PageNumber,
  pageNumberEnd: PageNumberEnd,
  tableName: TableName,
  startDate: StartDate,
  endDate: EndDate,
  fields: Type.Optional(Type.Array(Type.String(), { description: POST_FIELDS_DESCRIPTION })),
  forceLatest: ForceLatest,
  responseType: Type.Optional(ResponseTypeEnum),
  limit: Limit,
  userPrompt: UserPrompt,
  feedback: Feedback,
  _requestId: RequestId,
});

export const GetTiktokPostsByKeywordsSchema = Type.Object({
  query: Type.String({ minLength: 1, description: 'Plain text keywords or phrases to search in post descriptions. Use double quotes for exact phrases.' }),
  pageNumber: PageNumber,
  pageNumberEnd: PageNumberEnd,
  tableName: TableName,
  startDate: StartDate,
  endDate: EndDate,
  fields: Type.Optional(Type.Array(Type.String(), { description: POST_FIELDS_DESCRIPTION })),
  forceLatest: ForceLatest,
  responseType: Type.Optional(ResponseTypeEnum),
  limit: Limit,
  userPrompt: UserPrompt,
  feedback: Feedback,
  _requestId: RequestId,
});

export const GetTiktokPostsByHashtagsSchema = Type.Object({
  hashtags: Type.Array(Type.String(), { minItems: 1, maxItems: 5, description: 'Array of hashtags to search for (1-5). OR semantics. Bare alphanumeric only — no leading "#".' }),
  pageNumber: PageNumber,
  pageNumberEnd: PageNumberEnd,
  tableName: TableName,
  startDate: StartDate,
  endDate: EndDate,
  fields: Type.Optional(Type.Array(Type.String(), { description: POST_FIELDS_DESCRIPTION })),
  forceLatest: ForceLatest,
  responseType: Type.Optional(ResponseTypeEnum),
  limit: Limit,
  userPrompt: UserPrompt,
  feedback: Feedback,
  _requestId: RequestId,
});
