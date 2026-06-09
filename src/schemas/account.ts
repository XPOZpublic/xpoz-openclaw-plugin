import { Type } from 'typebox';
import { Feedback, RequestId } from './shared.js';

export const GetAccountDetailsSchema = Type.Object({
  feedback: Feedback,
  _requestId: RequestId,
});
