import React from 'react'
import Router from 'next/router'
import { validateUserToken, refreshUser } from '../actions/authActions'
import Header from '../components/Header'
import { connect } from 'react-redux'
import { getUserFromCookie, getUserFromLocalStorage, checkTokenExpiry, getCookie } from '../utils/auth'

export default (Page) => {
  class DefaultPage extends React.Component {
    static async getInitialProps (ctx) {

      // HOC runs before each page and determins if a user is logged in or not
      // Then dispatch result to redux
      const loggedUser = process.browser ? getUserFromLocalStorage() : getUserFromCookie(ctx.req)
      
      ctx.store.dispatch(validateUserToken(loggedUser))
      const state = ctx.store.getState()

      if(!state.user.user_id && state.user.isAuthenticated){
        console.log('needs refresh')
        const cookieToken = getCookie(ctx.req)
        loggedUser.token = cookieToken
        ctx.store.dispatch(refreshUser(loggedUser))
      }

      // send props to the parent > child container
      const pageProps = await Page.getInitialProps && await Page.getInitialProps(ctx)

      return {
        ...pageProps,
        currentUrl: ctx.pathname
      }
    }

    constructor (props) {
      super(props)
      this.logout = this.logout.bind(this)
    }

    logout (eve) {
      if (eve.key === 'logout') {
        Router.push(`/?logout=${eve.newValue}`)
      }
    }

    componentDidMount () {
      window.addEventListener('storage', this.logout, false)
    }

    componentWillUnmount () {
      window.removeEventListener('storage', this.logout, false)
    }

    render () {
      return (
        <div>
          <Header {...this.props} />
          <Page {...this.props} />
        </div>
      )
    }
  }

  const mapStateToProps = (state, ownProps) => {
    return {
      user: state.user
    }
  }

  return connect(mapStateToProps)(DefaultPage)
}
