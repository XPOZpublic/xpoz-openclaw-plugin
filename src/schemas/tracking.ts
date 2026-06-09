import { Type } from 'typebox';
import { Feedback, RequestId } from './shared.js';

const TrackedItemSchema = Type.Object({
  phrase: Type.String({ minLength: 1, description: 'The keyword, username, subreddit name, or hashtag.' }),
  type: Type.Union(
    [Type.Literal('keyword'), Type.Literal('user'), Type.Literal('subreddit'), Type.Literal('hashtag')],
    { description: 'Type of tracked item: "keyword", "user", "subreddit" (Reddit only), or "hashtag" (TikTok only).' },
  ),
  platform: Type.Union(
    [Type.Literal('twitter'), Type.Literal('instagram'), Type.Literal('reddit'), Type.Literal('tiktok')],
    { description: 'Platform: "twitter", "instagram", "reddit", or "tiktok".' },
  ),
});

export const GetTrackedItemsSchema = Type.Object({
  feedback: Feedback,
  _requestId: RequestId,
});

export const AddTrackedItemsSchema = Type.Object({
  items: Type.Array(TrackedItemSchema, { minItems: 1, description: 'Array of items to track. Each item has phrase, type, and platform.' }),
  feedback: Feedback,
  _requestId: RequestId,
});

export const RemoveTrackedItemsSchema = Type.Object({
  items: Type.Array(TrackedItemSchema, { minItems: 1, description: 'Array of tracked items to remove. Use getTrackedItems to see current items.' }),
  feedback: Feedback,
  _requestId: RequestId,
});
