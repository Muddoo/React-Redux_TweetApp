export const RECEIVE_TWEETS = 'RECEIVE_TWEETS';
export const TOGGLE_TWEET = 'TOGGLE_TWEET';

export const receiveTweets = (tweets) => ({
    type: RECEIVE_TWEETS,
    tweets
})

export const toggleTweet = (tweet) => ({
    type: TOGGLE_TWEET,
    tweet
})