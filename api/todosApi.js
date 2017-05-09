/* eslint-disable no-unused-vars */
import fetch from 'isomorphic-unfetch'
import { getTokenFromLocalStorage } from '../utils/auth'

// const api = 'http://localhost:3001'
const api = 'https://nameless-scrubland-28835.herokuapp.com'

class TodosApi {
  
  static addTodo (todo) {
    // since this always happens on the server I can just get the jwt from localhost
    const token = getTokenFromLocalStorage();
    return new Promise((resolve, reject) => {
      fetch(`${api}/todos`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
	        text:todo.text,
          _creator: todo._creator
        })
      })
      .then(r => r.json())
      .then(res => {
        resolve(res)
      })
      .catch(e => {
        reject(e)
      })
    })
  }
  static getTodos () {
    return new Promise((resolve, reject) => {
      fetch(`${api}/todos`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then(r => r.json())
      .then(res => {
        resolve(res.todos)
      })
      .catch(e => {
        reject(e)
      })
    })
  }
  static getJokes (access) {
    return new Promise((resolve, reject) => {
      
      fetch(`${api}/api/jokes/celebrity`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${access.token}`
        }
      })
      .then(r => {
        const result = r.json()
        return result
      })
      .then(res => {
        resolve({jokes: res})
      })
      .catch(e => {
        reject(e)
      })
    })
  }
}

export default TodosApi
