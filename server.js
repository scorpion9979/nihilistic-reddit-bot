require("dotenv").config();
const Snoowrap = require("snoowrap");
const Snoostorm = require("snoostorm");

// setting up clients
const r = new Snoowrap({
    userAgent: "reddit-bot",
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    username: process.env.REDDIT_USER,
    password: process.env.REDDIT_PASS
});
const client = new Snoostorm(r);
