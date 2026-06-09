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
  'PERFORMANCE OPTIMIZATION: Specify fields you need. DEFAULT (if omitted): ["id", "username", "name"]. ' +
  'AVAILABLE FIELDS: ' +
  'Core: id, username, name, description, location, verified, verifiedType, isVerified, protected, status. ' +
  'Engagement: followersCount, followingCount, tweetCount, listedCount, likesCount, mediaCount, pinnedTweetId. ' +
  'Profile: profileImageUrl, profileBannerUrl, profileInterstitialType, accountBasedIn, locationAccurate, label, labelType. ' +
  'Metadata: source, nLang, nLangsFiltered. ' +
  'Account History: verifiedSinceDatetime, usernameChanges, lastUsernameChangeDatetime. ' +
  'Timestamps: modifiedAt, createdAt.';

const KEYWORDS_USER_FIELDS_DESCRIPTION =
  'PERFORMANCE OPTIMIZATION: Specify fields you need. DEFAULT (if omitted): ["id", "username", "name"]. ' +
  'Includes all user fields plus aggregations from matching tweets: aggRelevance, relevantTweetsCount, relevantTweetsImpressionsSum, relevantTweetsLikesSum, relevantTweetsQuotesSum, relevantTweetsRepliesSum, relevantTweetsRetweetsSum.';

export const GetTwitterUserSchema = Type.Object({
  identifier: Type.String({ minLength: 1, description: 'User ID (numeric) or username depending on identifierType.' }),
  identifierType: IdentifierTypeEnum,
  fields: Type.Optional(Type.Array(Type.String(), { description: USER_FIELDS_DESCRIPTION })),
  userPrompt: UserPrompt,
  feedback: Feedback,
  _requestId: RequestId,
});

export const GetTwitterUsersSchema = Type.Object({
  identifiers: Type.Array(Type.String({ minLength: 1 }), { minItems: 1, maxItems: 100, description: 'Array of user IDs (numeric) or usernames (1-100).' }),
  identifierType: IdentifierTypeEnum,
  fields: Type.Optional(Type.Array(Type.String(), { description: USER_FIELDS_DESCRIPTION })),
  forceLatest: ForceLatest,
  userPrompt: UserPrompt,
  feedback: Feedback,
  _requestId: RequestId,
});

export const SearchTwitterUsersSchema = Type.Object({
  name: Type.String({ minLength: 1, description: 'Search query for Twitter users. Supports partial name or username matching.' }),
  limit: Type.Optional(Type.Number({ minimum: 1, description: 'Maximum number of users to return.' })),
  fields: Type.Optional(Type.Array(Type.String(), { description: USER_FIELDS_DESCRIPTION })),
  userPrompt: UserPrompt,
  feedback: Feedback,
  _requestId: RequestId,
});

export const GetTwitterUserConnectionsSchema = Type.Object({
  username: Type.String({ minLength: 1, description: 'Twitter username (without @ symbol).' }),
  connectionType: ConnectionTypeEnum,
  pageNumber: PageNumber,
  pageNumberEnd: PageNumberEnd,
  tableName: TableName,
  fields: Type.Optional(Type.Array(Type.String(), { description: USER_FIELDS_DESCRIPTION })),
  forceLatest: ForceLatest,
  responseType: Type.Optional(ResponseTypeEnum),
  limit: Limit,
  userPrompt: UserPrompt,
  feedback: Feedback,
  _requestId: RequestId,
});

export const GetTwitterPostInteractingUsersSchema = Type.Object({
  postId: Type.String({ description: 'Numeric Twitter post ID.' }),
  interactionType: Type.Union(
    [Type.Literal('commenters'), Type.Literal('quoters'), Type.Literal('retweeters')],
    { description: 'Type of interaction: "commenters" (replied), "quoters" (quoted), "retweeters" (retweeted).' },
  ),
  responseType: Type.Optional(ResponseTypeEnum),
  limit: Limit,
  startDate: StartDate,
  endDate: EndDate,
  pageNumber: PageNumber,
  pageNumberEnd: PageNumberEnd,
  tableName: TableName,
  fields: Type.Optional(Type.Array(Type.String(), { description: USER_FIELDS_DESCRIPTION })),
  forceLatest: ForceLatest,
  userPrompt: UserPrompt,
  feedback: Feedback,
  _requestId: RequestId,
});

export const GetTwitterUsersByKeywordsSchema = Type.Object({
  query: Type.String({ minLength: 1, description: 'Full-text search of tweet content to find users who authored matching posts. Supports exact phrases, boolean operators (AND, OR, NOT), parenthesized groups.' }),
  responseType: Type.Optional(ResponseTypeEnum),
  limit: Limit,
  pageNumber: PageNumber,
  pageNumberEnd: PageNumberEnd,
  tableName: TableName,
  startDate: StartDate,
  endDate: EndDate,
  language: Type.Optional(Type.String({ description: 'Filter by language code.' })),
  fields: Type.Optional(Type.Array(Type.String(), { description: KEYWORDS_USER_FIELDS_DESCRIPTION })),
  forceLatest: ForceLatest,
  userPrompt: UserPrompt,
  feedback: Feedback,
  _requestId: RequestId,
});
