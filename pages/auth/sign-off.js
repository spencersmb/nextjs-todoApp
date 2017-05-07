import React from 'react'
import { initStore } from '../../store'
import { logUserOut } from '../../actions/authActions'
import withRedux from 'next-redux-wrapper'
import { unsetToken } from '../../utils/auth'
import { logout } from '../../utils/lock'
import { bindActionCreators } from 'redux'
import Auth0 from '../../utils/Auth0'

class SignOff extends React.Component {
  componentDidMount () {
    unsetToken()
    // logout()
    Auth0.logout('/')
    this.props.logUserOut()
  }

  render () {
    return null
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    logUserOut: bindActionCreators(logUserOut, dispatch)
  }
}

export default withRedux(initStore, null, mapDispatchToProps)(SignOff)
