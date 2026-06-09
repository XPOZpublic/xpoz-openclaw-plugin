export const TOOL_NAMES = {
  TWITTER: {
    USERS: {
      GET_TWITTER_USER: 'getTwitterUser',
      GET_TWITTER_USERS: 'getTwitterUsers',
      SEARCH_TWITTER_USERS: 'searchTwitterUsers',
      GET_TWITTER_USER_CONNECTIONS: 'getTwitterUserConnections',
      GET_TWITTER_USERS_BY_KEYWORDS: 'getTwitterUsersByKeywords',
    },
    POSTS: {
      GET_TWITTER_POSTS_BY_IDS: 'getTwitterPostsByIds',
      GET_TWITTER_POSTS_BY_AUTHOR: 'getTwitterPostsByAuthor',
      GET_TWITTER_POSTS_BY_KEYWORDS: 'getTwitterPostsByKeywords',
      GET_TWITTER_POST_RETWEETS: 'getTwitterPostRetweets',
      GET_TWITTER_POST_QUOTES: 'getTwitterPostQuotes',
      GET_TWITTER_POST_COMMENTS: 'getTwitterPostComments',
      GET_TWITTER_POST_INTERACTING_USERS: 'getTwitterPostInteractingUsers',
      COUNT_TWEETS: 'countTweets',
    },
  },
  INSTAGRAM: {
    USERS: {
      GET_INSTAGRAM_USER: 'getInstagramUser',
      SEARCH_INSTAGRAM_USERS: 'searchInstagramUsers',
      GET_INSTAGRAM_USER_CONNECTIONS: 'getInstagramUserConnections',
      GET_INSTAGRAM_POST_INTERACTING_USERS: 'getInstagramPostInteractingUsers',
      GET_INSTAGRAM_USERS_BY_KEYWORDS: 'getInstagramUsersByKeywords',
    },
    POSTS: {
      GET_INSTAGRAM_POSTS_BY_IDS: 'getInstagramPostsByIds',
      GET_INSTAGRAM_POSTS_BY_USER: 'getInstagramPostsByUser',
      GET_INSTAGRAM_POSTS_BY_KEYWORDS: 'getInstagramPostsByKeywords',
    },
    COMMENTS: {
      GET_INSTAGRAM_COMMENTS_BY_POST_ID: 'getInstagramCommentsByPostId',
    },
  },
  REDDIT: {
    USERS: {
      GET_REDDIT_USER: 'getRedditUser',
      SEARCH_REDDIT_USERS: 'searchRedditUsers',
      GET_REDDIT_USERS_BY_KEYWORDS: 'getRedditUsersByKeywords',
    },
    POSTS: {
      GET_REDDIT_POSTS_BY_KEYWORDS: 'getRedditPostsByKeywords',
      GET_REDDIT_POST_WITH_COMMENTS_BY_ID: 'getRedditPostWithCommentsById',
    },
    COMMENTS: {
      GET_REDDIT_COMMENTS_BY_KEYWORDS: 'getRedditCommentsByKeywords',
    },
    SUBREDDITS: {
      SEARCH_REDDIT_SUBREDDITS: 'searchRedditSubreddits',
      GET_REDDIT_SUBREDDIT_WITH_POSTS_BY_NAME: 'getRedditSubredditWithPostsByName',
      GET_REDDIT_SUBREDDITS_BY_KEYWORDS: 'getRedditSubredditsByKeywords',
    },
  },
  TIKTOK: {
    USERS: {
      GET_TIKTOK_USER: 'getTiktokUser',
      SEARCH_TIKTOK_USERS: 'searchTiktokUsers',
      GET_TIKTOK_USERS_BY_KEYWORDS: 'getTiktokUsersByKeywords',
      GET_TIKTOK_USERS_BY_HASHTAGS: 'getTiktokUsersByHashtags',
    },
    POSTS: {
      GET_TIKTOK_POSTS_BY_IDS: 'getTiktokPostsByIds',
      GET_TIKTOK_POSTS_BY_USER: 'getTiktokPostsByUser',
      GET_TIKTOK_POSTS_BY_KEYWORDS: 'getTiktokPostsByKeywords',
      GET_TIKTOK_POSTS_BY_HASHTAGS: 'getTiktokPostsByHashtags',
    },
    COMMENTS: {
      GET_TIKTOK_COMMENTS_BY_POST_ID: 'getTiktokCommentsByPostId',
    },
  },
  OPERATIONS: {
    CHECK_OPERATION_STATUS: 'checkOperationStatus',
    CANCEL_OPERATION: 'cancelOperation',
  },
  AUTH: {
    GET_USER_ACCESS_KEY: 'getUserAccessKey',
    CHECK_ACCESS_KEY_STATUS: 'checkAccessKeyStatus',
  },
  TRACKING: {
    GET_TRACKED_ITEMS: 'getTrackedItems',
    ADD_TRACKED_ITEMS: 'addTrackedItems',
    REMOVE_TRACKED_ITEMS: 'removeTrackedItems',
  },
  ACCOUNT: {
    GET_ACCOUNT_DETAILS: 'getAccountDetails',
  },
} as const;
