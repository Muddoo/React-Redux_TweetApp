import { saveLikeToggle, saveTweet } from '../utils/api'
import {showLoading, hideLoading} from 'react-redux-loading-bar'
export const RECEIVE_TWEETS = 'RECEIVE_TWEETS'
export const ADD_TWEET = 'ADD_TWEET'
export const TOGGLE_TWEET = 'TOGGLE_TWEET'

export const receiveTweets = (tweets) => ({
    type: RECEIVE_TWEETS,
    tweets
})

const addTweet = (tweet) => ({
    type: ADD_TWEET,
    tweet
})

const toggleTweet = (tweet) => ({
    type: TOGGLE_TWEET,
    tweet
})

export function handleAddTweet(info) {
    return (dispatch) => {
        dispatch(showLoading());
        saveTweet(info).then(newTweet => {
            dispatch(addTweet(newTweet))
            dispatch(hideLoading())
        })
    }
}

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