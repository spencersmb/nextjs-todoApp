import React from 'react'
import { connect } from 'react-redux'

class TodoList extends React.Component {
  componentDidMount () {

  }

  render () {
    const {todos} = this.props

    return (
      <div>
        <ul>
          {todos.map(todo => <li key={todo._id}>{todo.text}</li>)}
        </ul>
      </div>

    )
  }
}

const mapStateToProps = ({todos}) => ({todos})

export default connect(mapStateToProps)(TodoList)
