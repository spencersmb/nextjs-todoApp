import React from 'react'
import { bindActionCreators } from 'redux'
import { initStore, getJokes } from '../store'
import withRedux from 'next-redux-wrapper'
import Page from '../components/Page'
import Link from 'next/link'
import { StyleSheet, css } from 'aphrodite/no-important'
import Header from '../components/Header'
import {getToken} from '../utils/auth'
import securePage from '../hocs/securePage'
import defaultPage from '../hocs/defaultPage'

if (typeof window !== 'undefined') {
  StyleSheet.rehydrate(window.__NEXT_DATA__.ids)
}

class CelebJokes extends React.Component {
  static async getInitialProps ({ store, isServer, req, res}) {
    const token = getToken(req);
    const state = store.getState()

    if(state.isAuthenticated){
      console.log('send dispatcher to make api call for jokes')
      // await store.dispatch(getJokes({token}))
    }
      
    return { isServer }
  }

  componentDidMount () {
    console.log(this.props)
  }

  componentWillUnmount () {
  }

  render () {
    const {jokes} = this.props
    return (
        <div className={css(styles.root)}>
            <h1 className={css(styles.title)}>Celeb Jokes Secret Route </h1>
            <ul>
                {jokes.map((joke, index) => (
                    <li key={joke.id}>{joke.joke}</li>
                ))}
            </ul>
            
        </div>
    )
  }
}

const mapStateToProps = ({jokes}) => ({jokes})
export default withRedux(initStore, mapStateToProps)(securePage(CelebJokes))
// export default withRedux(initStore, mapStateToProps)(defaultPage(CelebJokes))
// export default withRedux(initStore, mapStateToProps)(CelebJokes)

const styles = StyleSheet.create({
  root: {
    width: '100%',
    display:'flex',
    flex: 1,
    flexDirection: 'column',
    height: 'auto',
    background: 'white',

    h1:{
      color: 'blue'
    }
  },

  title: {
    marginLeft: 5,
    color: 'black',
    fontSize: 22,
    ':hover': {
      color: 'white'
    }
  }
})