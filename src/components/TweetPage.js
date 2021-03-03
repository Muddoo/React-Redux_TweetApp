import React,{ Component } from 'react'
import Tweet from './Tweet'
import NewTweet from './NewTweet'
import { connect } from 'react-redux'

class TweetPage extends Component {
    render () {
        const { tweets, id } = this.props;
        console.log(this.props)
        return (
            <div>
                <Tweet id={id} />
                <NewTweet id={id} />
                {tweets[id] && tweets[id].replies.map(replyId => <Tweet key={replyId} id={replyId} />)}
            </div>
        )
    }
}

function mapStateToProps({tweets}, {match}) {
    return {
        tweets,
        id: match.params.id
    }
}

export default connect(mapStateToProps)(TweetPage)