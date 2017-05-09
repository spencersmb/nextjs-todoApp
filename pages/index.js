import React from 'react'
import { bindActionCreators } from 'redux'
import { initStore } from '../store'
import { getTodos } from '../actions/todoActions'
import withRedux from 'next-redux-wrapper'
import TodoList from '../components/todo/todoList'
import defaultPage from '../hocs/defaultPage'
import styled from 'styled-components'
import TodoInput from '../components/todo/todoInput'
import { injectGlobal } from 'styled-components';

injectGlobal`
	body {
		margin: 0;
	}
`;

// const rule1 = {
//   backgroundColor: 'blue',
//   '@media screen and (min-width: 250px)': {
//     backgroundColor: 'red',
//   },
// }
// const Comp = styled.div`
//     ${rule1}
//     `
// const Title = styled.h1`
//   color: red;
//   font-size: 50px;

//   > a{
//     font-size:18px;
//   }
// `
const Title = styled.h1`${{
  color: 'red',
  fontSize: '50px',
  fontFamily: 'Open Sans',
  '> a': {
    fontSize: '18px'
  }
}}`

class Counterfirst extends React.Component {
  static async getInitialProps({ store, isServer }) {
    await store.dispatch(getTodos())
    return { isServer }
  }

  componentDidMount() {
  }

  componentWillUnmount() {
  }

  render() {

    const showTodoInput = () => {
      if(this.props.user.isAuthenticated){
        return <TodoInput/>
      }
    }

    return (
      <div>
        <Title>Boilerplate App</Title>
        <p>Production Live Example</p>
        {/*{showTodoInput()}*/}
        <TodoInput/>
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
