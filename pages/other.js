import React from 'react'
import { bindActionCreators } from 'redux'
import { initStore } from '../store'
import withRedux from 'next-redux-wrapper'
import Page from '../components/Page'

class Counter extends React.Component {
  static getInitialProps ({ store, isServer }) {
    // store.dispatch(serverRenderClock(isServer))
    // store.dispatch(addCount())
    return { isServer }
  }

  componentDidMount () {
    // this.timer = this.props.startClock()
  }

  render () {
    return (
      <Page title='Other Page' linkTo='/' {...this.props}/>
    )
  }
}

export default withRedux(initStore)(Counter)
