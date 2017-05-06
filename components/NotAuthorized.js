import React from 'react'
import Link from 'next/link'
import { StyleSheet, css } from 'aphrodite/no-important'

export default () => (
  <div className={css(styles.root)}>
    <h1 className={css(styles.errorH1)}>You can't see this!</h1>
    <p className={css(styles.P)}>
      You're not authenticated yet. Maybe you want to <Link href='/auth/sign-in'><a>sign in</a></Link> and see what happens?
    </p>
  </div>
)
const styles = StyleSheet.create({
  root: {
    width: '100%',
    display:'flex',
    flex: 1,
    flexDirection: 'column',
    height: 'auto',
  },
  errorH1: {
    fontSize: '50px',
    fontWeight: 200,
    lineheight: '40px',
    color: '#e74c3c'
  },
  P: {
        fontSize: '30px',
        fontWeight: 200,
        lineHeight: '40px',
        color: '#e74c3c'
      }
})