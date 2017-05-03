import fetch from 'isomorphic-unfetch'

class TodosApi {
    static getTodos(){
        return new Promise((resolve, reject) => {

            fetch('https://nameless-scrubland-28835.herokuapp.com/todos', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                .then( r => r.json() )
                .then( res => {
                    resolve(res.todos)
                })
                .catch(e => {
                    reject(e)
                })
        
        });
        
    }
} 

export default TodosApi