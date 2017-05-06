import React from 'react'
import { initStore } from '../../store'
import withRedux from 'next-redux-wrapper'
import defaultPage from '../../hocs/defaultPage'
import { show } from '../../utils/lock'

const CONTAINER_ID = 'put-lock-here'

class SignIn extends React.Component {
  componentDidMount () {
    show(CONTAINER_ID)
  }
  render () {
    return (
        <div>
            sign in PAGE
            <div id={CONTAINER_ID} />
        </div>
    )
  }
}

export default withRedux(initStore)(defaultPage(SignIn))