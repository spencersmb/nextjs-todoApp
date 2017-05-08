import React from 'react'
import Router from 'next/router'
import { bindActionCreators } from 'redux'
import withRedux from 'next-redux-wrapper'
import { initStore } from '../../store'
import { authenticateUser } from '../../actions/authActions'
import { setToken, checkSecret, extractInfoFromHash, getUserFromLocalStorage } from '../../utils/auth'

class SignedIn extends React.Component {
  static getInitialProps ({ store, isServer, push }) {
    return { isServer }
  }

  // Deprecated
  // static propTypes = {
  //   url: PropTypes.object.isRequired
  // }

  componentDidMount () {
    console.log('signed in page hit')
    const {token, secret} = extractInfoFromHash()
    if (!checkSecret(secret) || !token) {
      console.error('Something happened with the Sign In request')
    }
    setToken(token)
    const user = getUserFromLocalStorage()
    console.log(user);
    this.props.authenticateUser(user)
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
