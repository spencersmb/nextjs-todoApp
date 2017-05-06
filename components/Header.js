import Link from 'next/link'
import { connect } from 'react-redux'
import { StyleSheet, css } from 'aphrodite'

// File links array based on if user is authenticated
const getAllowedLink = isAuthenticated => links
    .filter(l => !l.authRequired || (l.authRequired && isAuthenticated))
    .filter(l => !isAuthenticated || (isAuthenticated && !l.anonymousOnly))

const links = [
  { href: '/', text: 'Home' },
  { href: '/other', text: 'Other' },
  { href: '/celeb-jokes', text: 'Top Secret', authRequired: true },
  { href: '/auth/sign-in', text: 'Sign In', anonymousOnly: true },
  { href: '/auth/sign-off', text: 'Sign Off' }
]

export default connect(state => state)(({url, isAuthenticated}) => {
    const path = url.pathname
    return (
        <div className="appHeader">
        <h1>Header Component</h1>
        {getAllowedLink(isAuthenticated).map( link => {
            return (
                <Link prefetch key={link.href} href={link.href}>
                    <a className={path === link.href ? css(styles.link, styles.active) : css(styles.link)} >
                        {link.text}
                    </a>
                </Link>
            )
        })}
        </div>
    )
})

const styles = StyleSheet.create({

    link: {
        marginRight: 10,
        color: 'grey',
        fontSize: 22,
        ':hover': {
            color: 'red'
        }
    },
    active: {
        color:'blue'
    }
})