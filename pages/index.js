import React from 'react'
import { bindActionCreators} from 'redux'
import { connect } from 'react-redux'
import { initStore, startClock, addCount, serverRenderClock, getTodos } from '../store'
import withRedux from 'next-redux-wrapper'
import Page from '../components/Page'
import TodoList from '../components/todo/todoList'
import Link from 'next/link'
import Header from '../components/Header'
import defaultPage from '../hocs/defaultPage'
import PageTemplate from '../components/PageTemplateLayout'
import styled from 'styled-components'

const Title = styled.h1`
  color: red;
  font-size: 50px;

  > a{
    font-size:18px;
  }
`

class Counterfirst extends React.Component {
  static async getInitialProps ({ store, isServer }) {
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
      <div>
        <Title>Todo App</Title>
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