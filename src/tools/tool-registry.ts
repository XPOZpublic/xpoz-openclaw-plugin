import { TOOL_NAMES } from '../consts/tools.consts.js';
import type { ToolDefinition } from '../types/plugin.types.js';

import { GetTwitterUserSchema, GetTwitterUsersSchema, SearchTwitterUsersSchema, GetTwitterUserConnectionsSchema, GetTwitterPostInteractingUsersSchema, GetTwitterUsersByKeywordsSchema } from '../schemas/twitter/users.js';
import { GetTwitterPostsByIdsSchema, GetTwitterPostsByAuthorSchema, GetTwitterPostsByKeywordsSchema, GetTwitterPostRetweetsSchema, GetTwitterPostQuotesSchema, GetTwitterPostCommentsSchema, CountTweetsSchema } from '../schemas/twitter/posts.js';

import { GetInstagramUserSchema, SearchInstagramUsersSchema, GetInstagramUserConnectionsSchema, GetInstagramPostInteractingUsersSchema, GetInstagramUsersByKeywordsSchema } from '../schemas/instagram/users.js';
import { GetInstagramPostsByIdsSchema, GetInstagramPostsByUserSchema, GetInstagramPostsByKeywordsSchema } from '../schemas/instagram/posts.js';
import { GetInstagramCommentsByPostIdSchema } from '../schemas/instagram/comments.js';

import { GetRedditUserSchema, SearchRedditUsersSchema, GetRedditUsersByKeywordsSchema } from '../schemas/reddit/users.js';
import { GetRedditPostsByKeywordsSchema, GetRedditPostWithCommentsByIdSchema } from '../schemas/reddit/posts.js';
import { GetRedditCommentsByKeywordsSchema } from '../schemas/reddit/comments.js';
import { SearchRedditSubredditsSchema, GetRedditSubredditWithPostsByNameSchema, GetRedditSubredditsByKeywordsSchema } from '../schemas/reddit/subreddits.js';

import { GetTiktokUserSchema, SearchTiktokUsersSchema, GetTiktokUsersByKeywordsSchema, GetTiktokUsersByHashtagsSchema } from '../schemas/tiktok/users.js';
import { GetTiktokPostsByIdsSchema, GetTiktokPostsByUserSchema, GetTiktokPostsByKeywordsSchema, GetTiktokPostsByHashtagsSchema } from '../schemas/tiktok/posts.js';
import { GetTiktokCommentsByPostIdSchema } from '../schemas/tiktok/comments.js';

import { CheckOperationStatusSchema, CancelOperationSchema } from '../schemas/operations.js';
import { GetUserAccessKeySchema, CheckAccessKeyStatusSchema } from '../schemas/auth.js';
import { GetTrackedItemsSchema, AddTrackedItemsSchema, RemoveTrackedItemsSchema } from '../schemas/tracking.js';
import { GetAccountDetailsSchema } from '../schemas/account.js';

export const TOOL_REGISTRY: ToolDefinition[] = [
  {
    name: TOOL_NAMES.TWITTER.USERS.GET_TWITTER_USER,
    description: 'Get Twitter user profile by ID or username. Use identifierType="id" for numeric user ID, identifierType="username" for username. For username: use ONLY when you have the precise username. For person names or fuzzy search, use searchTwitterUsers instead. Optional fields parameter for performance (default: ["id", "username", "name"]).',
    parameters: GetTwitterUserSchema,
  },
  {
    name: TOOL_NAMES.TWITTER.USERS.GET_TWITTER_USERS,
    description: 'Get one or more Twitter user profiles by IDs or usernames (1-100 per request). Use identifierType="id" for numeric user IDs, identifierType="username" for usernames. All identifiers must be the same type. For single user: pass array of 1. Returns only found users, omitting not-found identifiers.',
    parameters: GetTwitterUsersSchema,
  },
  {
    name: TOOL_NAMES.TWITTER.USERS.SEARCH_TWITTER_USERS,
    description: 'Search users by person name, partial username, or fuzzy match using real-time external API. PRIMARY USE: When given person\'s name, partial info, or uncertain username. NOT for: Exact username lookup (use getTwitterUser when username is certain). Returns array of matching users (default 10, max 10).',
    parameters: SearchTwitterUsersSchema,
  },
  {
    name: TOOL_NAMES.TWITTER.USERS.GET_TWITTER_USER_CONNECTIONS,
    description: 'Get Twitter user connections (followers or following). FAST (default): Returns up to 300 results directly. PAGING: Async paginated results, returns operationId for polling. CSV: Async single CSV download.',
    parameters: GetTwitterUserConnectionsSchema,
  },
  {
    name: TOOL_NAMES.TWITTER.USERS.GET_TWITTER_USERS_BY_KEYWORDS,
    description: 'Search for USERS who authored tweets/comments/quotes/retweets matching keywords. Returns unique, deduplicated user profiles. FAST/PAGING/CSV response modes. QUERY SYNTAX: Plain keywords, quoted phrases, boolean operators (AND, OR, NOT), parenthesized groups.',
    parameters: GetTwitterUsersByKeywordsSchema,
  },

  {
    name: TOOL_NAMES.TWITTER.POSTS.GET_TWITTER_POSTS_BY_IDS,
    description: 'Get multiple Twitter posts by numeric IDs (1-100). First searches database, then external API for missing/stale data.',
    parameters: GetTwitterPostsByIdsSchema,
  },
  {
    name: TOOL_NAMES.TWITTER.POSTS.GET_TWITTER_POSTS_BY_AUTHOR,
    description: 'Get posts from author by username. FAST/PAGING/CSV response modes. First searches database, then external API if stale.',
    parameters: GetTwitterPostsByAuthorSchema,
  },
  {
    name: TOOL_NAMES.TWITTER.POSTS.GET_TWITTER_POSTS_BY_KEYWORDS,
    description: 'Search posts by keywords. FAST/PAGING/CSV response modes. QUERY SYNTAX: Plain keywords, quoted phrases, boolean operators (AND, OR, NOT), parenthesized groups. Filters: language, authorId/authorUsername, date range, filterOutRetweets.',
    parameters: GetTwitterPostsByKeywordsSchema,
  },
  {
    name: TOOL_NAMES.TWITTER.POSTS.GET_TWITTER_POST_RETWEETS,
    description: 'Get retweets of specific post. FAST/PAGING response modes. Database-only search for historical data.',
    parameters: GetTwitterPostRetweetsSchema,
  },
  {
    name: TOOL_NAMES.TWITTER.POSTS.GET_TWITTER_POST_QUOTES,
    description: 'Get quote posts of specific post. FAST/PAGING/CSV response modes. First searches database, then external API if stale (>10 days).',
    parameters: GetTwitterPostQuotesSchema,
  },
  {
    name: TOOL_NAMES.TWITTER.POSTS.GET_TWITTER_POST_COMMENTS,
    description: 'Get comments (replies) to specific post. FAST/PAGING/CSV response modes. First searches database, then external API if stale (>10 days).',
    parameters: GetTwitterPostCommentsSchema,
  },
  {
    name: TOOL_NAMES.TWITTER.POSTS.GET_TWITTER_POST_INTERACTING_USERS,
    description: 'Get users who interacted with a specific Twitter post. INTERACTION TYPES: "commenters", "quoters", "retweeters". FAST/PAGING/CSV response modes.',
    parameters: GetTwitterPostInteractingUsersSchema,
  },
  {
    name: TOOL_NAMES.TWITTER.POSTS.COUNT_TWEETS,
    description: 'Count tweets containing a specific phrase within a date range. Returns total count directly. Default startDate: 6 months ago.',
    parameters: CountTweetsSchema,
  },

  {
    name: TOOL_NAMES.INSTAGRAM.USERS.GET_INSTAGRAM_USER,
    description: 'Get Instagram user profile by ID or username. For person names or fuzzy search, use searchInstagramUsers instead.',
    parameters: GetInstagramUserSchema,
  },
  {
    name: TOOL_NAMES.INSTAGRAM.USERS.SEARCH_INSTAGRAM_USERS,
    description: 'Search users by person name, partial username, or fuzzy match using real-time external API. Returns array of matching users (default 10, max 10).',
    parameters: SearchInstagramUsersSchema,
  },
  {
    name: TOOL_NAMES.INSTAGRAM.USERS.GET_INSTAGRAM_USER_CONNECTIONS,
    description: 'Get Instagram user connections (followers or following). FAST/PAGING response modes.',
    parameters: GetInstagramUserConnectionsSchema,
  },
  {
    name: TOOL_NAMES.INSTAGRAM.USERS.GET_INSTAGRAM_POST_INTERACTING_USERS,
    description: 'Get USER PROFILES of people who interacted with an Instagram post. INTERACTION TYPES: "commenters", "likers". NOT FOR COMMENT TEXT — use getInstagramCommentsByPostId for that.',
    parameters: GetInstagramPostInteractingUsersSchema,
  },
  {
    name: TOOL_NAMES.INSTAGRAM.USERS.GET_INSTAGRAM_USERS_BY_KEYWORDS,
    description: 'Search for USERS who authored Instagram posts matching keywords. Returns unique, deduplicated user profiles. FAST/PAGING/CSV response modes.',
    parameters: GetInstagramUsersByKeywordsSchema,
  },

  {
    name: TOOL_NAMES.INSTAGRAM.POSTS.GET_INSTAGRAM_POSTS_BY_IDS,
    description: 'Get multiple Instagram posts by IDs (1-100). IMPORTANT: postIds must be in strong_id format (e.g., "3606450040306139062_4836333238").',
    parameters: GetInstagramPostsByIdsSchema,
  },
  {
    name: TOOL_NAMES.INSTAGRAM.POSTS.GET_INSTAGRAM_POSTS_BY_USER,
    description: 'Get posts from Instagram user by ID or username. FAST/PAGING/CSV response modes.',
    parameters: GetInstagramPostsByUserSchema,
  },
  {
    name: TOOL_NAMES.INSTAGRAM.POSTS.GET_INSTAGRAM_POSTS_BY_KEYWORDS,
    description: 'Search Instagram posts by keywords in captions and video subtitles. FAST/PAGING/CSV response modes. QUERY SYNTAX supported.',
    parameters: GetInstagramPostsByKeywordsSchema,
  },

  {
    name: TOOL_NAMES.INSTAGRAM.COMMENTS.GET_INSTAGRAM_COMMENTS_BY_POST_ID,
    description: 'Get COMMENT CONTENT (text, likes) for an Instagram post. IMPORTANT: postId must be in strong_id format. NOT FOR USER PROFILES — use getInstagramPostInteractingUsers for that.',
    parameters: GetInstagramCommentsByPostIdSchema,
  },

  {
    name: TOOL_NAMES.REDDIT.USERS.GET_REDDIT_USER,
    description: 'Get Reddit user profile by username (without u/ prefix). Returns karma breakdown, account status, profile info.',
    parameters: GetRedditUserSchema,
  },
  {
    name: TOOL_NAMES.REDDIT.USERS.SEARCH_REDDIT_USERS,
    description: 'Search Reddit users by name, username, or profile description. Returns array of matching users (default 50, max 50).',
    parameters: SearchRedditUsersSchema,
  },
  {
    name: TOOL_NAMES.REDDIT.USERS.GET_REDDIT_USERS_BY_KEYWORDS,
    description: 'Search for USERS who authored Reddit posts matching keywords. Returns unique, deduplicated user profiles. FAST/PAGING/CSV response modes.',
    parameters: GetRedditUsersByKeywordsSchema,
  },

  {
    name: TOOL_NAMES.REDDIT.POSTS.GET_REDDIT_POSTS_BY_KEYWORDS,
    description: 'Search Reddit posts by keywords in titles and selftext. FAST/PAGING/CSV response modes. FILTERS: sort (relevance, hot, top, new, comments), time (hour, day, week, month, year, all), subreddit.',
    parameters: GetRedditPostsByKeywordsSchema,
  },
  {
    name: TOOL_NAMES.REDDIT.POSTS.GET_REDDIT_POST_WITH_COMMENTS_BY_ID,
    description: 'Get Reddit post by ID with its comments. Returns both post data and comments. FAST/PAGING response modes. Use postFields/commentFields for field selection.',
    parameters: GetRedditPostWithCommentsByIdSchema,
  },

  {
    name: TOOL_NAMES.REDDIT.COMMENTS.GET_REDDIT_COMMENTS_BY_KEYWORDS,
    description: 'Search Reddit comments by keywords in comment body text. FAST/PAGING/CSV response modes. Database-only search.',
    parameters: GetRedditCommentsByKeywordsSchema,
  },

  {
    name: TOOL_NAMES.REDDIT.SUBREDDITS.SEARCH_REDDIT_SUBREDDITS,
    description: 'Search Reddit subreddits by keywords using real-time external API. Returns array of matching subreddits (default 50, max 50).',
    parameters: SearchRedditSubredditsSchema,
  },
  {
    name: TOOL_NAMES.REDDIT.SUBREDDITS.GET_REDDIT_SUBREDDIT_WITH_POSTS_BY_NAME,
    description: 'Get Reddit subreddit by name with its posts. FAST/PAGING response modes. Use subredditFields/postFields for field selection.',
    parameters: GetRedditSubredditWithPostsByNameSchema,
  },
  {
    name: TOOL_NAMES.REDDIT.SUBREDDITS.GET_REDDIT_SUBREDDITS_BY_KEYWORDS,
    description: 'Search for SUBREDDITS where Reddit posts match keywords. Returns unique, deduplicated subreddit profiles. FAST/PAGING response modes.',
    parameters: GetRedditSubredditsByKeywordsSchema,
  },

  {
    name: TOOL_NAMES.TIKTOK.USERS.GET_TIKTOK_USER,
    description: 'Get TikTok user profile by ID or username. For person names or fuzzy search, use searchTiktokUsers instead.',
    parameters: GetTiktokUserSchema,
  },
  {
    name: TOOL_NAMES.TIKTOK.USERS.SEARCH_TIKTOK_USERS,
    description: 'Search TikTok users by name or username via external API. Returns array of matching users (default 10, max 10).',
    parameters: SearchTiktokUsersSchema,
  },
  {
    name: TOOL_NAMES.TIKTOK.USERS.GET_TIKTOK_USERS_BY_KEYWORDS,
    description: 'Search for USERS who authored TikTok posts matching keywords. Returns unique, deduplicated user profiles. FAST/PAGING/CSV response modes.',
    parameters: GetTiktokUsersByKeywordsSchema,
  },
  {
    name: TOOL_NAMES.TIKTOK.USERS.GET_TIKTOK_USERS_BY_HASHTAGS,
    description: 'Search for USERS who authored TikTok posts tagged with specific hashtags. Pass hashtags as bare strings without "#". OR semantics. FAST/PAGING/CSV response modes.',
    parameters: GetTiktokUsersByHashtagsSchema,
  },

  {
    name: TOOL_NAMES.TIKTOK.POSTS.GET_TIKTOK_POSTS_BY_IDS,
    description: 'Get multiple TikTok posts by IDs (1-100). First searches database, then external API for missing/stale data.',
    parameters: GetTiktokPostsByIdsSchema,
  },
  {
    name: TOOL_NAMES.TIKTOK.POSTS.GET_TIKTOK_POSTS_BY_USER,
    description: 'Get posts from TikTok user by ID or username. FAST/PAGING/CSV response modes. First searches database, then external API if stale.',
    parameters: GetTiktokPostsByUserSchema,
  },
  {
    name: TOOL_NAMES.TIKTOK.POSTS.GET_TIKTOK_POSTS_BY_KEYWORDS,
    description: 'Search TikTok posts by keywords in descriptions. FAST/PAGING/CSV response modes. QUERY SYNTAX supported.',
    parameters: GetTiktokPostsByKeywordsSchema,
  },
  {
    name: TOOL_NAMES.TIKTOK.POSTS.GET_TIKTOK_POSTS_BY_HASHTAGS,
    description: 'Search TikTok posts by hashtags. Searches the hashtags column directly (NOT descriptions). Pass hashtags as bare strings without "#". OR semantics. FAST/PAGING/CSV response modes.',
    parameters: GetTiktokPostsByHashtagsSchema,
  },

  {
    name: TOOL_NAMES.TIKTOK.COMMENTS.GET_TIKTOK_COMMENTS_BY_POST_ID,
    description: 'Get COMMENT CONTENT (text, likes) for a TikTok post. FAST/PAGING/CSV response modes.',
    parameters: GetTiktokCommentsByPostIdSchema,
  },

  {
    name: TOOL_NAMES.OPERATIONS.CHECK_OPERATION_STATUS,
    description: 'Poll an async operation and retrieve results or CSV download URL. Use after any tool call with responseType="paging" or "csv". Keep polling until status is success/no_data/error/cancelled. Wait 5 seconds between polls.',
    parameters: CheckOperationStatusSchema,
  },
  {
    name: TOOL_NAMES.OPERATIONS.CANCEL_OPERATION,
    description: 'Cancel a running operation. Returns confirmation. Use checkOperationStatus to verify cancellation completed.',
    parameters: CancelOperationSchema,
  },

  {
    name: TOOL_NAMES.AUTH.GET_USER_ACCESS_KEY,
    description: 'Retrieve authenticated user access key. Required: confirmRetrieval=true.',
    parameters: GetUserAccessKeySchema,
  },
  {
    name: TOOL_NAMES.AUTH.CHECK_ACCESS_KEY_STATUS,
    description: 'Check access key status without revealing key.',
    parameters: CheckAccessKeyStatusSchema,
  },

  {
    name: TOOL_NAMES.TRACKING.GET_TRACKED_ITEMS,
    description: 'Get tracked keywords and users. Returns: phrase, type (keyword/user/subreddit/hashtag), platform (twitter/instagram/reddit/tiktok).',
    parameters: GetTrackedItemsSchema,
  },
  {
    name: TOOL_NAMES.TRACKING.ADD_TRACKED_ITEMS,
    description: 'Add keywords/users to track. Accepts array of items with phrase, type, platform. Returns error if plan limit exceeded.',
    parameters: AddTrackedItemsSchema,
  },
  {
    name: TOOL_NAMES.TRACKING.REMOVE_TRACKED_ITEMS,
    description: 'Remove tracked keywords/users. Use getTrackedItems first to see current items.',
    parameters: RemoveTrackedItemsSchema,
  },

  {
    name: TOOL_NAMES.ACCOUNT.GET_ACCOUNT_DETAILS,
    description: 'Get authenticated user\'s account details: plan (name, features), billing (period, next renewal), and usage (credits remaining).',
    parameters: GetAccountDetailsSchema,
  },
];
