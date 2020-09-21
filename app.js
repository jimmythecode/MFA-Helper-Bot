require('dotenv').config();
const Snoowrap = require('snoowrap');
const { CommentStream } = require("snoostorm");
const writeReqObjectToFile = require('./writefiles/writeFile')


const r = new Snoowrap({
    userAgent: process.env.USER_AGENT,
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    username: process.env.REDDIT_USER,
    password: process.env.REDDIT_PASS
});

const stream = new CommentStream(r, {
    subreddit: "testingground4bots",
    limit: 20,
    pollTime: 1000,
});

stream.on("item", comment => {
    if (comment.author.name === 'JimmyTheCode') {
        console.log("running the stream");
        // writeReqObjectToFile(comment, 'comment3.json')
        if (comment.body === 't-shirt') {
            comment.reply('got-shirt');
        }
    }
})
/////////////////////
// https://dev.to/seiyria/making-a-reddit-reply-bot-f55 - this guy does a bot that listens live