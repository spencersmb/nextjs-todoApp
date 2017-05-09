import { connect } from 'react-redux'
import Header from './Header'
import styled from 'styled-components'

const Other = styled.h2`${{
  color: 'green',
  fontSize: '40px',
  fontFamily: 'Open Sans',
  '> a': {
    fontSize: '18px'
  }
}}`
export default connect(state => state)(({ title, linkTo, lastUpdate, light}) => {
  return (
    <div>
      <Other>{title}</Other>
      <p>Simple Page template</p>
      <div>
        <p><a href='http://redux.js.org/docs/basics/Reducers.html'>Reducers</a> are at the heart of Redux, and they give us a clean and predictable way to change the state of our application. When using Reducers, we need to make sure that no data gets mutated. This gives us the benefit of being able to inspect every previous state of the data in our app, and it’s an important concept in Redux.</p>
      </div>
    </div>
  )
})
