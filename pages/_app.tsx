import React, { useState, useEffect } from 'react'
import { AppProps } from 'next/app'
import {
  ThemeProvider,
  CSSReset,
  ColorModeProvider,
  theme,
} from '@chakra-ui/core'
import Router from 'next/router' //TODO ローディングを作る
import BounceLoader from 'react-spinners/BounceLoader'
import styled from '@emotion/styled'

export const Loader = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
  opacity: 0.8;
  position: fixed;
  top: 0;
  left: 0;
  background: ${theme.colors.white};
`

const App: React.FC<AppProps> = ({ Component, pageProps }) => {
  const [loading, setLoading] = useState(false)

  const handleRouteChangeStart = () => {
    setLoading(true)
  }
  const handleRouteChangeEnd = () => {
    setLoading(false)
  }

  useEffect(() => {
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
        {loading ? (
          <Loader>
            <BounceLoader
              size={150}
              color={theme.colors.teal[400]}
              loading={loading}
            />
          </Loader>
        ) : (
          <Component {...pageProps} />
        )}
      </ColorModeProvider>
    </ThemeProvider>
  )
}

export default App
