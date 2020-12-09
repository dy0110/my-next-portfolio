import React, { useState, useEffect } from 'react'
import { AppProps } from 'next/app'
import { ThemeProvider, CSSReset, ColorModeProvider } from '@chakra-ui/core'
import Router from 'next/router'
import Loading from '../components/Loader'
import hljs from 'highlight.js'
import 'highlight.js/styles/atom-one-dark.css'

const App: React.FC<AppProps> = ({ Component, pageProps }) => {
  const [loading, setLoading] = useState(false)

  const handleRouteChangeStart = () => {
    setLoading(true)
  }
  const handleRouteChangeEnd = () => {
    setLoading(false)
  }

  useEffect(() => {
    hljs.initHighlightingOnLoad()
    Router.events.on('routeChangeStart', handleRouteChangeStart)
    Router.events.on('routeChangeComplete', handleRouteChangeEnd)
    Router.events.on('routeChangeError', handleRouteChangeEnd)
    return () => {
      Router.events.off('routeChangeStart', handleRouteChangeStart)
      Router.events.off('routeChangeComplete', handleRouteChangeEnd)
      Router.events.off('routeChangeError', handleRouteChangeEnd)
    }
  }, [])

  return (
    <ThemeProvider>
      <ColorModeProvider>
        <CSSReset />
        {loading ? <Loading loading={loading} /> : <Component {...pageProps} />}
      </ColorModeProvider>
    </ThemeProvider>
  )
}

export default App
