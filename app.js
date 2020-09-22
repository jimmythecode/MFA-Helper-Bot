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
    pollTime: 1000
});

stream.on("item", comment => {
    console.log("node env: ", process.env.NODE_ENV);
    let currentDate = new Date()
    let dateFormat = new Date(comment.created_utc * 1000)
    // console.log(dateFormat, ();
    let isAuthorTrue = comment.author.name === 'JimmyTheCode'
    let terms = ['t-shirt', 'fit']
    let doesBodyInclude = terms.every(term => comment.body.includes(term))
    let isWithinAnHour = (currentDate - dateFormat) / 1000 / 60 / 60 < 1

    console.log(isAuthorTrue, doesBodyInclude, isWithinAnHour);
    if (isAuthorTrue && doesBodyInclude && isWithinAnHour) {
        try {
            comment.reply(`Hi, this an automatic response because you said these words: [${terms}]\n\nThese links might be useful from the [MFA Wiki](https://www.reddit.com/r/malefashionadvice/wiki/itemguides#wiki_clothing):\n\n*  [A Comprehensive Guide To Basic White T-Shirts](https://www.reddit.com/r/malefashionadvice/comments/clo2um/a_comprehensive_guide_to_basic_white_tshirts/)\n\n*  [Your Favorite ___ for $___: Tee Shirts](https://www.reddit.com/r/malefashionadvice/comments/f9vrkb/your_favorite_for_tee_shirts/)\n\nThis post was sent at: ${dt.toLocaleString(DateTime.DATETIME_MED)} From: ${process.env.NODE_ENV}`)
        } catch (error) {
            console.error('comment.reply() attempt did not work', error);
        }
    }
})
