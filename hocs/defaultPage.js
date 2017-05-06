import React from 'react'
import Head from 'next/head'
import Router from 'next/router'
import withRedux from 'next-redux-wrapper'
import { initStore, checkUserLogin, toggleLogin} from '../store'
import Header from '../components/Header'
import { connect } from 'react-redux';
import { getUserFromCookie, getUserFromLocalStorage, loggedUser } from '../utils/auth'

export default (Page) => {

  class DefaultPage extends React.Component {
    static async getInitialProps (ctx) {
      const loggedUser = process.browser ? getUserFromLocalStorage() : getUserFromCookie(ctx.req)
      const isAuthenticated = await !!loggedUser
      console.log('Default page auth check', isAuthenticated);
      
      // const loggedIn = await loggedUser(ctx)
      // await ctx.store.dispatch(checkUserLogin(isAuthenticated))
      ctx.store.dispatch(toggleLogin(isAuthenticated))
      
      const pageProps = await Page.getInitialProps && await Page.getInitialProps(ctx)

      return {
        ...pageProps,
        currentUrl: ctx.pathname,
      }
    }

    constructor (props) {
      super(props)
      console.log("props from default HOC")
      
      this.logout = this.logout.bind(this)
    }

    logout (eve) {
      alert('logout event listener')
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
  // return withRedux(initStore)(DefaultPage)
}

/*export default Page => class DefaultPage extends React.Component {
  static getInitialProps (ctx) {
    const loggedUser = process.browser ? getUserFromLocalStorage() : getUserFromCookie(ctx.req)
    const pageProps = Page.getInitialProps && Page.getInitialProps(ctx)
    return {
      ...pageProps,
      loggedUser,
      currentUrl: ctx.pathname,
      isAuthenticated: !!loggedUser
    }
  }

  constructor (props) {
    super(props)
    console.log("props from default HOC")
    console.log(this.props);
    this.logout = this.logout.bind(this)
  }

  logout (eve) {
    alert('logout event listener')
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
        <div className='app'>
          <div>
              default Page HOC
            <Page {...this.props} />
          </div>
        </div>
      </div>
    )
  }
}*/