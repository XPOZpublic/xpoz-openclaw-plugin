import { Type } from 'typebox';
import { Feedback, RequestId } from './shared.js';

export const CheckOperationStatusSchema = Type.Object({
  operationId: Type.String({ description: 'The operation ID to check status for.' }),
  feedback: Feedback,
  _requestId: RequestId,
});

export const CancelOperationSchema = Type.Object({
  operationId: Type.String({ description: 'The operation ID to cancel.' }),
  feedback: Feedback,
  _requestId: RequestId,
});
