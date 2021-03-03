import React, { Component } from 'react'
import { connect } from 'react-redux'
import { handleAddTweet } from '../actions/tweets'
import { Redirect } from 'react-router-dom'

class NewTweet extends Component {
  state = {
    text: '',
    toHome: false
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

    this.setState(() => ({
      text: '',
      toHome: id ? false : true
    }))
  }
  render() {
    const { text, toHome } = this.state
    const tweetLeft = 280 - text.length

    return (
      <div>
        <h3 className='center'>{this.props.id ? this.props.parentAuthor ? `Reply to "${this.props.parentAuthor}"` : '' : 'Compose new Tweet'}</h3>
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
        {toHome && <Redirect to='/' />}
      </div>
    )
  }
}

function mapStateToProps({tweets, users, authedUser}, {id}) {
    return {
        author: authedUser,
        id,
        parentAuthor: id && Object.values(users).find(user => user?.id === tweets[id]?.author)?.name
    }
}

export default connect(mapStateToProps)(NewTweet)