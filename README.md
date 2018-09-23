# nihilistic-reddit-bot

This is a Node.js Reddit bot that captures comments with negative sentiment, and replies to them with nihlism.

## Setup

Start by setting up the required environment variables either in a local .env file or as Heroku config vars.

```
# API info
CLIENT_ID=***
CLIENT_SECRET=***
REDDIT_USER=***
REDDIT_PASS=***
# Comment stream setting
RESULTS=25
# Sentiment settings
METRIC_THRESHOLD=-15
WORD_COUNT_THRESHOLD=80
# Subreddit(s) to stream comments from
SUBREDDIT=subreddit1+subreddit2+...
```

## Build

```
$ npm install
```

## Usage
```
$ npm start
```

## Related

 - [snoostorm][1] - An event based library for streaming from the Reddit API Built on top of snoowrap
 - [snoowrap][2] - A JavaScript wrapper for the Reddit API
 - [sentiment][3] - AFINN-based sentiment analysis for Node.js

[1]: https://github.com/MayorMonty/Snoostorm
[2]: https://github.com/not-an-aardvark/snoowrap
[3]: https://github.com/thisandagain/sentiment
