import React from 'react'
import { initStore } from '../../store'
import { logUserOut } from '../../actions/authActions'
import withRedux from 'next-redux-wrapper'
import { unsetToken } from '../../utils/auth'
import { bindActionCreators } from 'redux'

class SignOff extends React.Component {
  componentDidMount () {
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
