import React from 'react'
import Head from 'next/head'
import Router from 'next/router'
import withRedux from 'next-redux-wrapper'
import { toggleLogin } from '../store'
import Header from '../components/Header'
import { connect } from 'react-redux';
import { getUserFromCookie, getUserFromLocalStorage, loggedUser } from '../utils/auth'

export default (Page) => {

  class DefaultPage extends React.Component {
    static async getInitialProps (ctx) {

      // HOC runs before each page and determins if a user is logged in or not
      // Then dispatch result to redux
      const loggedUser = process.browser ? getUserFromLocalStorage() : getUserFromCookie(ctx.req)
      const isAuthenticated = await !!loggedUser
      ctx.store.dispatch(toggleLogin(isAuthenticated))
      
      const pageProps = await Page.getInitialProps && await Page.getInitialProps(ctx)

      return {
        ...pageProps,
        currentUrl: ctx.pathname,
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

    componentDidMount() {
      window.addEventListener('storage', this.logout, false)
    }

    componentWillUnmount() {
      window.removeEventListener('storage', this.logout, false)
    }

    render () {
      return (
        <div>
          <Header {...this.props}/>
          <Page {...this.props} />
        </div>
      )
    }
  }

  return connect()(DefaultPage);
}