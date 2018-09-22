require("dotenv").config();
const Snoowrap = require("snoowrap");
const Snoostorm = require("snoostorm");
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

// perform callback for every comment
comments.on("comment", (comment) => {
    if (comment.body === ":(") {
        let randomIndex = Math.floor(Math.random() * replies.length);
        comment.reply(replies[randomIndex])
               .catch(function() {
                   console.log("Rate limit reached, hang in there...");
                });
    }
});
