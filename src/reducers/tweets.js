import { RECEIVE_TWEETS, TOGGLE_TWEET } from '../actions/tweets';

export default function tweets(state = {}, action) {
    switch (action.type) {
        case RECEIVE_TWEETS:
            return {
                ...state,
                ...action.tweets
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