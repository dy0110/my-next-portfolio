import React, { useState, useEffect } from 'react'
import { AppProps } from 'next/app'
import { ChakraProvider } from '@chakra-ui/react'
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
    <ChakraProvider>
      {loading ? <Loading loading={loading} /> : <Component {...pageProps} />}
    </ChakraProvider>
  )
}

export default App
