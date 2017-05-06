
import Link from 'next/link'
import Head from 'next/head'
import { connect } from 'react-redux'
import defaultPage from '../hocs/defaultPage'

export default connect()( ( { children, title = 'This is the default title' } ) => 
    (
    <div className="pageTemplate">
        <h1>Page Template</h1>
        { children }
    </div>
    )
)