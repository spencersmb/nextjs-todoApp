import Document, { Head, Main, NextScript } from 'next/document'
import withRedux from 'next-redux-wrapper'
import { initStore } from '../store'
import { ServerStyleSheet } from 'styled-components'

class MyDocument extends Document {
  render () {
    const sheet = new ServerStyleSheet()
    const main = sheet.collectStyles(<Main />)
    const styleTags = sheet.getStyleElement()

    return (
      <html>
        <Head>
          <link async href='//fonts.googleapis.com/css?family=Open+Sans' rel='stylesheet' type='text/css'></link>
          <title>My page</title>
          {styleTags}
        </Head>
        <body>
          {main}
          <NextScript />
        </body>
      </html>
    )
  }
}

export default withRedux(initStore)(MyDocument)
