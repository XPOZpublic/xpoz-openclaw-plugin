import { Type } from 'typebox';
import { Feedback, RequestId } from './shared.js';

export const GetUserAccessKeySchema = Type.Object({
  confirmRetrieval: Type.Boolean({ description: 'Must be true to retrieve key. Security confirmation required.' }),
  feedback: Feedback,
  _requestId: RequestId,
});

export const CheckAccessKeyStatusSchema = Type.Object({
  feedback: Feedback,
  _requestId: RequestId,
});
