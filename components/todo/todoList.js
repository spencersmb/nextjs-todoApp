import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { toggleTodo } from '../../store'
import fetch from 'isomorphic-unfetch'
class TodoList extends React.Component {

  componentDidMount () {
    console.log('props from todo-list:')
    console.log(this.props);
  }

  render () {

    const {todos} = this.props;

    return (
      <div>
        <ul>
            {todos.map(todo => <li>{todo.text}</li>)}
        </ul>
      </div>

    )
  }
}

const mapStateToProps = ({todos}) => ({todos})

// const mapDispatchToProps = (dispatch) => {
//   return {
//     toggleTodo: bindActionCreators(toggleTodo, dispatch),
//   }
// }

export default connect(mapStateToProps)(TodoList)