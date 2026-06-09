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
  'Core: id, text, postId, userId, username, createdAt, createdAtTimestamp, createdAtDate. ' +
  'Engagement: likeCount.';

export const GetTiktokCommentsByPostIdSchema = Type.Object({
  postId: Type.String({ minLength: 1, description: 'TikTok post ID to fetch comments for.' }),
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
