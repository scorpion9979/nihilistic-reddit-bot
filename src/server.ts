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
    subreddit: process.env.SUBREDDIT,
    results: Number(process.env.RESULTS)
};

// create comment stream with given options
const comments = client.CommentStream(streamOpts);

// create a new sentiment
const sentiment = new Sentiment(null);

// perform callback for every comment
comments.on("comment", (comment: any) => {
    let metricThreshold = Number(process.env.METRIC_THRESHOLD);
    let wordCountThreshold = Number(process.env.WORD_COUNT_THRESHOLD);
    let result = sentiment.analyze(comment.body, null, null);
    let metric = result.score + result.comparative;
    let wordCount = result.tokens.length;
    if (metric < metricThreshold && wordCount < wordCountThreshold) {
        let randomIndex = Math.floor(Math.random() * replies.length);
        let reply = replies[randomIndex];
        console.log("\nReplying to: \"" + comment.body + "\"\nwith: \"" + reply + "\"\n");
        comment.reply(reply + "\n"
                      + "\n" + "_chill out, bro. I'm a bot. | "
                      + "[source code](https://github.com/scorpion9979/nihilistic-reddit-bot)_")
               .catch(function(err: Error) {
                   console.log("\nCaught error: " + err.message + "\nHang tight!");
                });
    }
});
