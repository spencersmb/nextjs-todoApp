import React from 'react'
import { initStore } from '../store'
import withRedux from 'next-redux-wrapper'
import Page from '../components/Page'

class Counter extends React.Component {
  static getInitialProps ({ store, isServer }) {
    return { isServer }
  }

  componentDidMount () {
    // this.timer = this.props.startClock()
  }

  render () {
    return (
      <Page title='Other Page' linkTo='/' {...this.props} />
    )
  }
}

export default withRedux(initStore)(Counter)
