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

const USER_FIELDS_DESCRIPTION =
  'PERFORMANCE OPTIMIZATION: Specify fields you need. DEFAULT (if omitted): ["id", "username", "totalKarma"]. ' +
  'AVAILABLE FIELDS: ' +
  'Core: id, username, profileUrl, profilePicUrl, snoovatarImg. ' +
  'Karma: linkKarma, commentKarma, totalKarma, awardeeKarma, awarderKarma. ' +
  'Status: isGold, isMod, isEmployee, hasVerifiedEmail, isSuspended, verified, isBlocked, acceptFollowers, hasSubscribed, hideFromRobots, prefShowSnoovatar. ' +
  'Profile: profileDescription, profileBannerUrl, profileTitle. ' +
  'Timestamps: createdAt, createdAtTimestamp, createdAtDate.';

const KEYWORDS_USER_FIELDS_DESCRIPTION =
  'PERFORMANCE OPTIMIZATION: Specify fields you need. DEFAULT (if omitted): ["id", "username", "totalKarma"]. ' +
  'Includes all user fields plus aggregations: aggRelevance, relevantPostsCount, relevantPostsUpvotesSum, relevantPostsCommentsCountSum.';

export const GetRedditUserSchema = Type.Object({
  username: Type.String({ minLength: 1, description: 'Reddit username (without u/ prefix).' }),
  fields: Type.Optional(Type.Array(Type.String(), { description: USER_FIELDS_DESCRIPTION })),
  userPrompt: UserPrompt,
  feedback: Feedback,
  _requestId: RequestId,
});

export const SearchRedditUsersSchema = Type.Object({
  name: Type.String({ minLength: 1, description: 'Search query for Reddit users. Can be username, name, or keywords from profile.' }),
  limit: Type.Optional(Type.Number({ minimum: 1, description: 'Maximum number of users to return.' })),
  fields: Type.Optional(Type.Array(Type.String(), { description: USER_FIELDS_DESCRIPTION })),
  userPrompt: UserPrompt,
  feedback: Feedback,
  _requestId: RequestId,
});

export const GetRedditUsersByKeywordsSchema = Type.Object({
  query: Type.String({ minLength: 1, description: 'Full-text search of Reddit post titles and content to find users who authored matching posts. Supports exact phrases, boolean operators (AND, OR, NOT), parenthesized groups.' }),
  responseType: Type.Optional(ResponseTypeEnum),
  limit: Limit,
  pageNumber: PageNumber,
  pageNumberEnd: PageNumberEnd,
  tableName: TableName,
  startDate: StartDate,
  endDate: EndDate,
  subreddit: Type.Optional(Type.String({ description: 'Filter results to a specific subreddit (without r/ prefix).' })),
  fields: Type.Optional(Type.Array(Type.String(), { description: KEYWORDS_USER_FIELDS_DESCRIPTION })),
  forceLatest: ForceLatest,
  userPrompt: UserPrompt,
  feedback: Feedback,
  _requestId: RequestId,
});
