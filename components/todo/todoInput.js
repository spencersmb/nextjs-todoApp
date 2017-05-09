import React from 'react'
import { connect } from 'react-redux'
import { Field, reduxForm, reset } from 'redux-form'
import { bindActionCreators } from 'redux'
import { addTodo } from '../../actions/todoActions'


class TodoInput extends React.Component {

  constructor(props){
    super(props)
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  handleFormSubmit({todo}){
   
   const newTodo = {
     text: todo,
     _creator: this.props.user.user_id
   }

   this.props.addTodo(newTodo)
   this.props.reset();
  }

  render () {
    const { handleSubmit, pristine, reset, submitting } = this.props

    return (
      <div>
        <form className="auth-form" onSubmit={handleSubmit(this.handleFormSubmit)}>
            
          <label>Add Todo:</label>
          <Field name="todo" component="input" type="text"/>
          
          <button action="submit" className="btn btn-primary">Add Todo</button>
        </form>
        
      </div>
    )
  }
}

//CORRECT WAY TO USE REDUX + REDUX-FORM v6 and above 
const TodoForm = reduxForm({  form: 'simple' })(TodoInput);

const mapStateToProps = (state, ownProps) => {
  return{
    user:state.user
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addTodo: bindActionCreators(addTodo, dispatch),
    reset: bindActionCreators(reset, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TodoForm)
