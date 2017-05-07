import Link from 'next/link'
import { connect } from 'react-redux'
import Clock from './Clock'
import AddCount from './AddCount'
import Header from "./Header"

export default connect(state => state)(( { title, linkTo, lastUpdate, light, url }) => {
  return (
    <div>
      <Header url={url}/>
      <h1>{title}</h1>
      <div>
        <p><a href="http://redux.js.org/docs/basics/Reducers.html">Reducers</a> are at the heart of Redux, and they give us a clean and predictable way to change the state of our application. When using Reducers, we need to make sure that no data gets mutated. This gives us the benefit of being able to inspect every previous state of the data in our app, and it’s an important concept in Redux.</p>
      </div>
    </div>
  )
})