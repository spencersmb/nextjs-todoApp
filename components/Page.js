import Link from 'next/link'
import { connect } from 'react-redux'
import Clock from './Clock'
import AddCount from './AddCount'
import { StyleSheet, css } from 'aphrodite'
import Header from "./Header"

export default connect(state => state)(( { title, linkTo, lastUpdate, light, url }) => {
  return (
    <div>
      <Header url={url}/>
      <h1 className={css(styles.title)}>{title}</h1>
    </div>
  )
})

const styles = StyleSheet.create({
  title: {
    marginLeft: 5,
    color: 'red',
    fontSize: 22,
  }
})