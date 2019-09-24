// @flow
require("dotenv").config();
// flowlint-next-line untyped-import:off
const Snoowrap = require("snoowrap");
// flowlint-next-line untyped-import:off
const Snoostorm = require("snoostorm");
// flowlint-next-line untyped-import:off
const Sentiment = require("sentiment");
// flowlint-next-line untyped-import:off
const replies = require("./replies");

// setting up clients
const r = new Snoowrap({
    userAgent: "reddit-bot",
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    username: process.env.REDDIT_USER,
    password: process.env.REDDIT_PASS
});
const client = new Snoostorm(r);

// configuring streaming options
const streamOpts = {
    subreddit: process.env.SUBREDDIT,
    results: parseInt(process.env.RESULTS, 10)
};

// create comment stream with given options
const comments = client.CommentStream(streamOpts);

// create a new sentiment
const sentiment = new Sentiment();

// perform callback for every comment
comments.on("comment", (comment) => {
    let metricThreshold = process.env.METRIC_THRESHOLD;
    let wordCountThreshold = process.env.WORD_COUNT_THRESHOLD;
    let result = sentiment.analyze(comment.body);
    let metric = result.score + result.comparative;
    let wordCount = result.tokens.length;
    if (metric < metricThreshold && wordCount < wordCountThreshold) {
        let randomIndex = Math.floor(Math.random() * replies.length);
        let reply = replies[randomIndex];
        console.log("\nReplying to: \"" + comment.body + "\"\nwith: \"" + reply + "\"\n");
        comment.reply(reply + "\n"
                      + "\n" + "_I'm a bot created by \\/u/scorpion9979 | "
                      + "[source code](https://github.com/scorpion9979/nihilistic-reddit-bot)_")
               .catch(function(err) {
                   console.log("\nCaught error: " + err.message + "\nHang tight!");
                });
    }
});