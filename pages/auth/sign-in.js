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
// import Auth0 from '../../utils/Auth0'
const CONTAINER_ID = 'put-lock-here'
//.auth0-lock.auth0-lock .auth0-lock-widget - overflow-y
class SignIn extends React.Component {

  constructor (props) {
    super(props)
  }

  componentDidMount () {
    show(CONTAINER_ID)

  }
  render () {
    return (
      <div>
        <div id={CONTAINER_ID} />
      </div>
    )
  }
}

export default withRedux(initStore)(defaultPage(SignIn))
