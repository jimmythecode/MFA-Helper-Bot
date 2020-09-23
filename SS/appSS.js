require('dotenv').config();
const Snoowrap = require('snoowrap');
const { CommentStream } = require("snoostorm");
// const writeReqObjectToFile = require('./writefiles/writeFile')


const r = new Snoowrap({
    // userAgent: process.env.USER_AGENT,
    userAgent: "JTC User Agent 1",
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    username: process.env.REDDIT_USER,
    password: process.env.REDDIT_PASS,
    refreshToken: process.env.REFRESH_TOKEN
});

const stream = new CommentStream(r, {
    subreddit: "testingground4bots",
    limit: 5,
    pollTime: 3000
});

stream.on("item", comment => {
    if (comment.author.name === 'JimmyTheCode') {
        console.log("running the stream");
        // writeReqObjectToFile(comment, 'comment3.json')
        if (comment.body === 't-shirt') {
            try {
                comment.reply('got-shirt');
            } catch (error) {
                console.error('comment.reply() attempt did not work', error);
            }
        }
    }
})

// // Alternatively, just pass in a username and password for script-type apps.
// const otherRequester = new snoowrap({
//     userAgent: "JTC User Agent 1",
//     clientId: process.env.CLIENT_ID,
//     clientSecret: process.env.CLIENT_SECRET,
//     username: process.env.REDDIT_USER,
//     password: process.env.REDDIT_PASS,
// });

/////////////////////
// https://dev.to/seiyria/making-a-reddit-reply-bot-f55 - this guy does a bot that listens live