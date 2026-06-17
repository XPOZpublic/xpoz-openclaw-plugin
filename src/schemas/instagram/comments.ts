import { Type } from 'typebox';
import {
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

const COMMENT_FIELDS_DESCRIPTION =
  'PERFORMANCE OPTIMIZATION: Specify fields you need. DEFAULT (if omitted): ["id", "text", "username", "createdAtDate"]. ' +
  'AVAILABLE FIELDS: ' +
  'Core: id, text, parentPostId, parentPostUserId, type, parentCommentId, repliedToCommentId, childCommentCount, userId, username, fullName, createdAt, createdAtTimestamp, createdAtDate. ' +
  'Engagement: likeCount. ' +
  'Status: status, isSpam, hasTranslation.';

export const GetInstagramCommentsByPostIdSchema = Type.Object({
  postId: Type.String({ description: 'Instagram post strong_id (e.g., "3606450040306139062_4836333238").' }),
  pageNumber: PageNumber,
  pageNumberEnd: PageNumberEnd,
  tableName: TableName,
  startDate: StartDate,
  endDate: EndDate,
  fields: Type.Optional(Type.Array(Type.String(), { description: COMMENT_FIELDS_DESCRIPTION })),
  forceLatest: ForceLatest,
  responseType: Type.Optional(ResponseTypeEnum),
  limit: Limit,
  userPrompt: UserPrompt,
  feedback: Feedback,
  _requestId: RequestId,
});
