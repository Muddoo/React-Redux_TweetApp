import { RECEIVE_TWEETS, ADD_TWEET, TOGGLE_TWEET } from '../actions/tweets';

export default function tweets(state = {}, action) {
    switch (action.type) {
        case RECEIVE_TWEETS:
            return {
                ...state,
                ...action.tweets
            }
        case ADD_TWEET:
            const { tweet } = action;
            const replyingTo = {};
            if(tweet.replyingTo) {
                replyingTo[tweet.replyingTo] = {
                    ...state[tweet.replyingTo],
                    replies: [...state[tweet.replyingTo].replies, tweet.id]
                }
            }
            return {
                ...state,
                ...replyingTo,
                [tweet.id]: {
                    ...tweet
                }
            }
        case TOGGLE_TWEET:
            const { id, hasLiked, authedUser } = action.tweet;
            return {
                ...state,
                [id]: {
                    ...state[id],
                    likes: hasLiked ? state[id].likes.filter(u => u !== authedUser) : [...state[id].likes, authedUser]
                }
            }
        default:
            return state
    }
}