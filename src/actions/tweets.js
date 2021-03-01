import { saveLikeToggle } from '../utils/api'
export const RECEIVE_TWEETS = 'RECEIVE_TWEETS'
export const TOGGLE_TWEET = 'TOGGLE_TWEET'

export const receiveTweets = (tweets) => ({
    type: RECEIVE_TWEETS,
    tweets
})

const toggleTweet = (tweet) => ({
    type: TOGGLE_TWEET,
    tweet
})

export function handleToggleTweet(info) {
    return (dispatch) => {
        dispatch(toggleTweet(info))
        saveLikeToggle(info).catch(e => {
            console.warn('Error in handleToggleTweet: ', e);
            alert('The was an error liking the tweet. Try again.');
            dispatch(toggleTweet({...info, hasLiked: !info.hasLiked}))
        })
    }
}