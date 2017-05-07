import React, { PropTypes } from 'react'
import Router from 'next/router'
import { bindActionCreators} from 'redux'
import withRedux from 'next-redux-wrapper'
import { connect } from 'react-redux'
import { initStore } from '../../store'
import { authenticateUser } from '../../actions/authActions'
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
    const {token, secret} = extractInfoFromHash()
    if (!checkSecret(secret) || !token) {
      console.error('Something happened with the Sign In request')
    }
    setToken(token)
    this.props.authenticateUser()
    Router.push('/celeb-jokes')
  }

  render () {
    return null
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    authenticateUser: bindActionCreators(authenticateUser, dispatch)
  }
}

export default withRedux(initStore, null, mapDispatchToProps)(SignedIn)