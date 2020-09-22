'use strict';
require('dotenv').config();
const snoowrap = require('snoowrap');
const { CommentStream } = require("snoostorm");
const { DateTime } = require("luxon");
let dt = DateTime.local()

const r = new snoowrap({
    userAgent: "JTC User Agent 1",
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    refreshToken: process.env.REFRESH_TOKEN
});


const stream = new CommentStream(r, {
    subreddit: "testingground4bots",
    limit: 1,
    pollTime: 6000
});

stream.on("item", comment => {
    console.log("running the stream");
    console.log("node env: ", process.env.NODE_ENV);
    console.log('current time: ',dt.toLocaleString(DateTime.DATETIME_MED));
    console.log(`got-shirt  ...n //n \n Hello
    also hello`);

    if (comment.author.name === 'JimmyTheCode') {
 
        // writeReqObjectToFile(comment, 'comment3.json')
        if (comment.body === 't-shirt') {
            try {
                comment.reply(`this is a bot response
                about something.
                [now we're trying a link](https://www.reddit.com/comments/ih2kag)
                ${dt.toLocaleString(DateTime.DATETIME_MED)}`)
            } catch (error) {
                console.error('comment.reply() attempt did not work', error);
            }
        }
    }
})
