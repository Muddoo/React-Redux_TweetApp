import React, { Component } from 'react'
import { connect } from 'react-redux'
import { handleInitialData } from '../actions/shared'
import Dashboard from './Dashboard'
import LoadingBar from 'react-redux-loading-bar'

class App extends Component {
  componentDidMount() {
    this.props.dispatch(handleInitialData())
  }
  render() {
    const {loadingBar} = this.props;
    return (
      <div>
        <LoadingBar />
        {!loadingBar.default && <Dashboard />}
      </div>
    )
  }
}

function mapStateToProps({loadingBar}) {
  return {
    loadingBar
  }
}

export default connect(mapStateToProps)(App)