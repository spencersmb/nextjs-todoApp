import React from 'react'
import { initStore } from '../../store'
import withRedux from 'next-redux-wrapper'
import { bindActionCreators } from 'redux'
import defaultPage from '../../hocs/defaultPage'
import { show } from '../../utils/lock'
import Router from 'next/router'
const config = require('../../config.json')
const Auth0Lock = require('auth0-lock').default
import jwtDecode from 'jwt-decode'
import Cookie from 'js-cookie'
import { authenticateUser } from '../../actions/authActions'
import { getUserFromLocalStorage } from '../../utils/auth'
import Auth0 from '../../utils/Auth0'

class SignIn extends React.Component {

  constructor (props) {
    super(props)
    this.auth0 = new Auth0(this.props.authenticateUser)
  }

  componentDidMount () {

    this.auth0.login()

  }
  render () {
    return (
      <div>
            sign in PAGE
            <div id='put-lock-here' />
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    authenticateUser: bindActionCreators(authenticateUser, dispatch)
  }
}

export default withRedux(initStore, null, mapDispatchToProps)(defaultPage(SignIn))
