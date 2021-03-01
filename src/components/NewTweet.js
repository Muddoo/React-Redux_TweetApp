import React, { Component } from 'react'
import { connect } from 'react-redux'
import { handleAddTweet } from '../actions/tweets'

class NewTweet extends Component {
  state = {
    text: '',
  }
  handleChange = (e) => {
    const text = e.target.value

    this.setState(() => ({
      text
    }))
  }
  handleSubmit = (e) => {
    e.preventDefault()

    const { text } = this.state;
    const {dispatch, author, id} = this.props;

    dispatch(handleAddTweet({text, author, replyingTo: id}))

    // todo: Add Tweet to Store

    console.log('New Tweet: ', text)

    this.setState(() => ({
      text: ''
    }))
  }
  render() {
    const { text } = this.state

    {/* todo: Redirect to / if submitted */}

    const tweetLeft = 280 - text.length

    return (
      <div>
        <h3 className='center'>Compose new Tweet</h3>
        <form className='new-tweet' onSubmit={this.handleSubmit}>
          <textarea
            placeholder="What's happening?"
            value={text}
            onChange={this.handleChange}
            className='textarea'
            spellCheck='false'
            maxLength={280}
            minLength={1}
            required
          />
          {tweetLeft <= 100 && (
            <div className='tweet-length'>
              {tweetLeft}
            </div>
          )}
          <button
            className='btn btn-submit'
            type='submit'
            disabled={text === ''}>
              Submit
          </button>
        </form>
      </div>
    )
  }
}

function mapStateToProps({authedUser}, {id}) {
    return {
        author: authedUser,
        id
    }
}

export default connect(mapStateToProps)(NewTweet)