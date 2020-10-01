'use strict';
require('dotenv').config();
const snoowrap = require('snoowrap');
const { CommentStream } = require("snoostorm");
const { DateTime } = require("luxon");
let dt = DateTime.local()
// const writeReqObjectToFile = require('./writefiles/writeFile')

const r = new snoowrap({
    userAgent: "JTC User Agent 1",
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    refreshToken: process.env.REFRESH_TOKEN
});


const stream = new CommentStream(r, {
    subreddit: "malefashionadvice",
    limit: 30,
    pollTime: 30000
});

stream.on("item", async comment => {
    // Only want posts within the hour
    let currentDate = new Date()
    let dateFormat = new Date(comment.created_utc * 1000)
    let isWithinAnHour = (currentDate - dateFormat) / 1000 / 60 / 60 < 1
    // Don't reply to your own comments
    let isAuthorTrue = ['MFA-Helper-Bot', 'JimmyTheCode'].indexOf(comment.author.name) >= 0
    // Don't reply if we've already replied to this comment
    let alreadyReplied = false;
    let expandedReplies = await comment.expandReplies({ limit: Infinity, depth: Infinity })
    if (expandedReplies.replies.some(arrayForEachReply => arrayForEachReply.author.name === 'JimmyTheCode' || arrayForEachReply.author.name === 'MFA-Helper-Bot')) {
        console.log('looks like we already replied');
        alreadyReplied = true
    }
    // What do we want to reply to? TODO: Need to check for alternatives, such as 't shirt' 'tees' 'tee'. Maybe do a .every() function for 'fit', and then do a .any() function for the optionals. I'm not sure a .any() function is a thing.d
    let terms = ['t-shirt', 'fit']
    let doesBodyInclude = terms.every(term => comment.body.includes(term))

    // console.log(isAuthorTrue, doesBodyInclude, isWithinAnHour, 'already replied?', alreadyReplied);
    // console.log(comment.body.substring(0, 20));
    console.log(`Looking at comment sent at ${new Date(comment.created_utc * 1000)}, from ${comment.author.name} : ${comment.body.substring(0, 20)}`);
    if (!isAuthorTrue && doesBodyInclude && isWithinAnHour && !alreadyReplied) {
        // writeReqObjectToFile(comment, 'GettingReplies')
        try {
            console.log(`Replying to comment: ${comment.body.substring(0, 20)}... https://www.reddit.com${comment.permalink}`);
            comment.reply(`These links might be useful from the [MFA Wiki](https://www.reddit.com/r/malefashionadvice/wiki/itemguides#wiki_clothing):\n\n*  [A Comprehensive Guide To Basic White T-Shirts](https://www.reddit.com/r/malefashionadvice/comments/clo2um/a_comprehensive_guide_to_basic_white_tshirts/)\n\n*  [Your Favorite ___ for $___: Tee Shirts](https://www.reddit.com/r/malefashionadvice/comments/f9vrkb/your_favorite_for_tee_shirts/)`)
        } catch (error) {
            console.error('comment.reply() attempt did not work', error);
        }
    }
})
