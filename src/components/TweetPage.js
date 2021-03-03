import React,{ Component } from 'react'
import Tweet from './Tweet'
import NewTweet from './NewTweet'
import { connect } from 'react-redux'

class TweetPage extends Component {
    render () {
        const { tweet, id } = this.props;
        console.log(this.props)
        return (
            <div>
                <Tweet id={id} />
                <NewTweet id={id} />
                {tweet.replies && tweet.replies.map(replyId => <Tweet key={replyId} id={replyId} />)}
            </div>
        )
    }
}

function mapStateToProps({tweets}, {match}) {
    const { id } = match.params
    return {
        tweet: tweets[id] ? {
            ...tweets[id],
            replies: tweets[id].replies.sort((a,b) => tweets[b].timestamp - tweets[a].timestamp)
        } : {},
        id: match.params.id
    }
}

export default connect(mapStateToProps)(TweetPage)