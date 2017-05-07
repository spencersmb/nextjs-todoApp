import React from 'react'
import { bindActionCreators } from 'redux'
import { initStore } from '../store'
import { getTodos } from '../actions/todoActions'
import withRedux from 'next-redux-wrapper'
import TodoList from '../components/todo/todoList'
import defaultPage from '../hocs/defaultPage'
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
  }

  componentWillUnmount () {
  }

  render () {
    return (
      <div>
        <Title>Boilerplate App</Title>
        <p>Production Live Example</p>
        <TodoList />
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getTodos: bindActionCreators(getTodos, dispatch)
  }
}

export default withRedux(initStore, null, mapDispatchToProps)(defaultPage(Counterfirst))
