import { StyleSheet, css } from 'aphrodite'

export default ({ lastUpdate, light }) => {
  return (
    <div className={light ? css(styles.clock, styles.light) : css(styles.clock, styles.dark)}>
      {format(new Date(lastUpdate))}
    </div>
  )
}

const format = t => `${pad(t.getUTCHours())}:${pad(t.getUTCMinutes())}:${pad(t.getUTCSeconds())}`

const pad = n => n < 10 ? `0${n}` : n

const styles = StyleSheet.create({
  clock: {
    padding: '15px',
    display: 'inline-block',
    color: '#82FA58',
    fontSize: '22px'
  },
  dark: {
    backgroundColor: '#000'
  },
  light: {
    backgroundColor: '#999'
  }
})
