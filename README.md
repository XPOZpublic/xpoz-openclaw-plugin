# Xpoz — OpenClaw Plugin

Social media intelligence tools for Twitter/X, Instagram, Reddit, and TikTok. Access user profiles, posts, comments, engagement data, and keyword search across platforms — all from your OpenClaw agent.

## Installation

```bash
openclaw plugins install clawhub:xpoz/openclaw-plugin
```

## Configuration

You need a Xpoz API access key. Get one at [xpoz.ai](https://xpoz.ai).

```bash
openclaw config set plugins.entries.xpoz.config.accessKey "your-access-key"
openclaw gateway restart
```

## Tools (48)

### Twitter/X

| Tool | Description |
|---|---|
| `getTwitterUser` | Get user profile by ID or username |
| `getTwitterUsers` | Get multiple user profiles (1-100) |
| `searchTwitterUsers` | Search users by name or partial username |
| `getTwitterUserConnections` | Get followers or following list |
| `getTwitterUsersByKeywords` | Find users who posted about specific topics |
| `getTwitterPostsByIds` | Get posts by ID(s) |
| `getTwitterPostsByAuthor` | Get posts by author username |
| `getTwitterPostsByKeywords` | Search posts by keywords |
| `getTwitterPostRetweets` | Get retweets of a post |
| `getTwitterPostQuotes` | Get quote posts of a post |
| `getTwitterPostComments` | Get replies to a post |
| `getTwitterPostInteractingUsers` | Get users who interacted with a post |
| `countTweets` | Count tweets matching a phrase |

### Instagram

| Tool | Description |
|---|---|
| `getInstagramUser` | Get user profile by ID or username |
| `searchInstagramUsers` | Search users by name or partial username |
| `getInstagramUserConnections` | Get followers or following list |
| `getInstagramPostInteractingUsers` | Get users who liked or commented on a post |
| `getInstagramUsersByKeywords` | Find users who posted about specific topics |
| `getInstagramPostsByIds` | Get posts by ID(s) |
| `getInstagramPostsByUser` | Get posts by user |
| `getInstagramPostsByKeywords` | Search posts by keywords |
| `getInstagramCommentsByPostId` | Get comments on a post |

### Reddit

| Tool | Description |
|---|---|
| `getRedditUser` | Get user profile by username |
| `searchRedditUsers` | Search users by name or username |
| `getRedditUsersByKeywords` | Find users who posted about specific topics |
| `getRedditPostsByKeywords` | Search posts by keywords |
| `getRedditPostWithCommentsById` | Get a post with its comments |
| `getRedditCommentsByKeywords` | Search comments by keywords |
| `searchRedditSubreddits` | Search subreddits by name |
| `getRedditSubredditWithPostsByName` | Get subreddit with its posts |
| `getRedditSubredditsByKeywords` | Find subreddits by post content |

### TikTok

| Tool | Description |
|---|---|
| `getTiktokUser` | Get user profile by ID or username |
| `searchTiktokUsers` | Search users by name or username |
| `getTiktokUsersByKeywords` | Find users who posted about specific topics |
| `getTiktokUsersByHashtags` | Find users who posted with specific hashtags |
| `getTiktokPostsByIds` | Get posts by ID(s) |
| `getTiktokPostsByUser` | Get posts by user |
| `getTiktokPostsByKeywords` | Search posts by keywords |
| `getTiktokPostsByHashtags` | Search posts by hashtags |
| `getTiktokCommentsByPostId` | Get comments on a post |

### Utility

| Tool | Description |
|---|---|
| `checkOperationStatus` | Poll async operations for results |
| `cancelOperation` | Cancel a running operation |
| `getUserAccessKey` | Retrieve your API access key |
| `checkAccessKeyStatus` | Check access key status |
| `getTrackedItems` | Get tracked keywords and users |
| `addTrackedItems` | Add keywords/users to track |
| `removeTrackedItems` | Remove tracked keywords/users |
| `getAccountDetails` | Get account plan, billing, and usage |

## Response Modes

Most search and listing tools support three response modes via the `responseType` parameter:

- **`fast`** (default) — Returns up to 300 results directly in one call
- **`paging`** — Async paginated results (100/page), poll with `checkOperationStatus`
- **`csv`** — Async CSV export, poll for S3 download link

## Companion X/Twitter workflow

Xpoz is the cross-platform intelligence layer for Twitter/X, Instagram, Reddit,
and TikTok. If an OpenClaw workflow also needs account-backed X/Twitter
operations outside this plugin, pair it with TweetClaw as a separate plugin:

- Use Xpoz for broad social discovery, profile lookup, post search, comments,
  tracked items, and CSV exports across supported platforms.
- Use TweetClaw for X/Twitter-specific source packets, reply context, monitor
  events, media checks, giveaway workflows, and approval-gated post or reply
  actions.
- Keep write-like actions in the plugin that owns the connected account and
  require an operator review step before publishing.

This keeps Xpoz focused on social intelligence while letting teams add
TweetClaw only when their agent needs X/Twitter account-backed workflows.

## Query Syntax

Keyword search tools support:

- Plain keywords: `bitcoin`, `climate change`
- Quoted phrases: `"deep learning"`
- Boolean operators: `AI AND crypto`, `bitcoin OR ethereum`, `politics NOT sports`
- Parenthesized groups: `(startup OR entrepreneur) NOT "venture capital"`

## Links

- [Xpoz Platform](https://xpoz.ai)
- [Xpoz MCP Documentation](https://xpoz.ai/docs)
- [OpenClaw](https://openclaw.ai)
