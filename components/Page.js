import Link from 'next/link'
import { connect } from 'react-redux'
import Clock from './Clock'
import AddCount from './AddCount'
import { StyleSheet, css } from 'aphrodite'

if (typeof window !== 'undefined') {
  StyleSheet.rehydrate(window.__NEXT_DATA__.ids)
}

export default connect(state => state)(({ title, linkTo, lastUpdate, light }) => {
  return (
    <div>
      <h1 className={css(styles.title)}>{title}</h1>
      <Clock lastUpdate={lastUpdate} light={light} />
      <AddCount />
      <nav>
        <Link href={linkTo}><a>Navigate</a></Link>
      </nav>
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