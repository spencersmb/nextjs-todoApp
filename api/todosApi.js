import fetch from 'isomorphic-unfetch'
import auth from '../utils/auth'

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
    static getJokes(access){
        console.log(access.token)
        return new Promise((resolve, reject) => {

            fetch('http://localhost:3001/api/jokes/celebrity', {
                    method: 'GET',
                    headers: { 
                         Authorization: `Bearer ${access.token}`,
                    } 
                })
                .then( r => {
                    const result = r.json()
                    return result
                } )
                .then( res => {
                    resolve({jokes: res})
                    console.log('api resp 200');
                })
                .catch(e => {
                    reject(e)
                    // console.log(e)
                })
        
        });
        
    }
} 

export default TodosApi