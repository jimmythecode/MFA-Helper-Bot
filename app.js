'use strict';
require('dotenv').config();
const snoowrap = require('snoowrap');
const { CommentStream } = require("snoostorm");

const r = new snoowrap({
    userAgent: "JTC User Agent 1",
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    refreshToken: process.env.REFRESH_TOKEN
});


const stream = new CommentStream(r, {
    subreddit: "testingground4bots",
    limit: 5,
    pollTime: 3000
});

stream.on("item", comment => {
    console.log("running the stream");
    if (comment.author.name === 'JimmyTheCode') {
 
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
