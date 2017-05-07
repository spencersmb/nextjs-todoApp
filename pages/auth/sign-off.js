import React from 'react'
import { initStore } from '../../store'
import { logUser_out } from '../../actions/authActions'
import withRedux from 'next-redux-wrapper'
import { unsetToken } from '../../utils/auth'
import { logout } from '../../utils/lock'
import { bindActionCreators} from 'redux'

class SignOff extends React.Component {
  componentDidMount () {
    unsetToken()
    logout()
    this.props.logUser_out()
  }

  render () {
    return null
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    logUser_out: bindActionCreators(logUser_out, dispatch)
  }
}

export default withRedux(initStore, null, mapDispatchToProps)(SignOff)