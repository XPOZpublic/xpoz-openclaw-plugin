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
  'PERFORMANCE OPTIMIZATION: Specify fields you need. DEFAULT (if omitted): ["id", "caption", "username", "createdAtDate"]. ' +
  'AVAILABLE FIELDS: ' +
  'Core: id, postType, userId, username, fullName, caption, createdAt, createdAtTimestamp, createdAtDate. ' +
  'Engagement: likeCount, commentCount, reshareCount, videoPlayCount. ' +
  'Media: mediaType, codeUrl, imageUrl, videoUrl, audioOnlyUrl, profilePicUrl, videoDuration, videoSubtitlesUri, subtitles. ' +
  'Location: location. ' +
  'AI: genAiChatWithAiCtaInfo, hasHighRiskGenAiInformTreatment.';

export const GetInstagramPostsByIdsSchema = Type.Object({
  postIds: Type.Array(Type.String(), { minItems: 1, maxItems: 100, description: 'Array of Instagram post strong_ids (e.g., "3606450040306139062_4836333238"). 1-100 IDs.' }),
  fields: Type.Optional(Type.Array(Type.String(), { description: POST_FIELDS_DESCRIPTION })),
  forceLatest: ForceLatest,
  userPrompt: UserPrompt,
  feedback: Feedback,
  _requestId: RequestId,
});

export const GetInstagramPostsByUserSchema = Type.Object({
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

export const GetInstagramPostsByKeywordsSchema = Type.Object({
  query: Type.String({ minLength: 1, description: 'Plain text keywords or phrases to search in post captions and subtitles. Use double quotes for exact phrases.' }),
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
