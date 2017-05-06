import React, { PropTypes } from 'react'
import Router from 'next/router'
import { bindActionCreators} from 'redux'
import withRedux from 'next-redux-wrapper'
import { connect } from 'react-redux'
import { initStore, authenticateUser, getJokes } from '../../store'

import { setToken, checkSecret, extractInfoFromHash } from '../../utils/auth'

class SignedIn extends React.Component {

  static getInitialProps ({ store, isServer, push }) {
    
    return { isServer }
  }
  //Deprecated
  // static propTypes = {
  //   url: PropTypes.object.isRequired
  // }

  componentDidMount () {
    console.log('signed in page')
    const {token, secret} = extractInfoFromHash()
    if (!checkSecret(secret) || !token) {
      console.error('Something happened with the Sign In request')
    }
    setToken(token)
    this.props.authenticateUser()
    this.props.getJokes()
    Router.push('/celeb-jokes')
  }
  render () {
    return null
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    authenticateUser: bindActionCreators(authenticateUser, dispatch),
    getJokes: bindActionCreators(getJokes, dispatch)
  }
}

export default withRedux(initStore, null, mapDispatchToProps)(SignedIn)