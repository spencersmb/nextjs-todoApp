import React from 'react'
import { bindActionCreators} from 'redux'
import { connect } from 'react-redux'
import { initStore, startClock, addCount, serverRenderClock, getTodos } from '../store'
import withRedux from 'next-redux-wrapper'
import Page from '../components/Page'
import TodoList from '../components/todo/todoList'
import Link from 'next/link'
import { StyleSheet, css } from 'aphrodite/no-important'
import Header from '../components/Header'
import defaultPage from '../hocs/defaultPage'
import PageTemplate from '../components/PageTemplateLayout'

if (typeof window !== 'undefined') {
  StyleSheet.rehydrate(window.__NEXT_DATA__.ids)
}

class Counterfirst extends React.Component {
  static async getInitialProps ({ store, isServer }) {
    console.log('index get initial props')
    await store.dispatch(getTodos())
    return { isServer }
  }

  componentDidMount () {
    // console.log("ndex props")
    // console.log(this.props)
  }

  componentWillUnmount () {
  }

  render () {
    return (
      <div className={css(styles.root)}>
        <h1 className={css(styles.title)}>Todo App </h1>
        <p>Production Live Example</p>
        <TodoList />
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addCount: bindActionCreators(addCount, dispatch),
    startClock: bindActionCreators(startClock, dispatch),
    getTodos: bindActionCreators(getTodos, dispatch)
  }
}

// export default withRedux(initStore, null, mapDispatchToProps)(Counterfirst)
// export default connect(null, mapDispatchToProps)(defaultPage(Counterfirst))
export default withRedux(initStore, null, mapDispatchToProps)(defaultPage(Counterfirst))

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