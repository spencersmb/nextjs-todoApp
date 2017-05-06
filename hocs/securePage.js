import React, { PropTypes } from 'react'

import NotAuthorized from '../components/NotAuthorized'
import defaultPage from './defaultPage'
import { connect } from 'react-redux'

const securePageHoc = Page => class SecurePage extends React.Component {
    static async getInitialProps (ctx) {
        const state = ctx.store.getState()
        const pageProps = await Page.getInitialProps && await Page.getInitialProps(ctx)
        return {
            ...pageProps,
            isAuthenticated: state.isAuthenticated
        }
    }
    //depricated
    // static propTypes = {
    //     isAuthenticated: PropTypes.bool.isRequired
    // }
    render () {
        console.log(this.props)
        if (!this.props.isAuthenticated) {
            return <NotAuthorized />
        }
        return <Page {...this.props} />
    }
}

// Takes in Page(component) and returns our HOC passing in Page to the 2nd HOC
export default Page => connect()(defaultPage(securePageHoc(Page)))