require("dotenv").config();
const Snoowrap = require("snoowrap");
const Snoostorm = require("snoostorm");
const Sentiment = require("sentiment");
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
    subreddit: "all",
    results: 25
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
        console.log("Replying to: \"" + comment.body + "\"\nwith: \"" + reply + "\"");
        comment.reply(reply + "\n"
                      + "\n---\n" + "I'm a bot created by \\/u/scorpion9979 | "
                      + "[source code](https://github.com/scorpion9979/nihilistic-reddit-bot)")
               .catch(function(err) {
                   console.log(err);
                });
    }
});
