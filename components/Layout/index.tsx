import { NextPage } from 'next'
import { Box, theme, Heading, IconButton, useColorMode } from '@chakra-ui/core'
import Head from 'next/head'
import { Global } from '@emotion/core'
import { DiGithubBadge } from 'react-icons/di'
import { FaSun, FaMoon } from 'react-icons/fa'
import { useState, useEffect } from 'react'

const GithubIcon = (): JSX.Element => {
  return <Box as={DiGithubBadge} size={'36px'} color={theme.colors.white} />
}

const SunIcon = (): JSX.Element => {
  return <Box as={FaSun} size={'36px'} color={theme.colors.white} />
}

const MoonIcon = (): JSX.Element => {
  return <Box as={FaMoon} size={'24px'} color={theme.colors.white} />
}

interface Props {}

const Layout: NextPage<Props> = ({ children }) => {
  const { colorMode, toggleColorMode } = useColorMode()
  const [color, setColor] = useState(``)
  useEffect(() => {
    setColor(colorMode === `light` ? theme.colors.teal[300] : colorMode)
  }, [colorMode])

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Box
        as={'header'}
        bg={color}
        w="100%"
        p={4}
        color={'white'}
        position={'sticky'}
        zIndex={200}
        top={0}
        display={'flex'}
        justifyContent={'space-between'}
      >
        <Box>
          <Heading size="xl">This is the Header</Heading>
        </Box>
        <Box>
          <IconButton
            variant={'link'}
            icon={GithubIcon}
            aria-label={`github-icon`}
            onClick={() => {
              window.open('https://github.com/dy0110')
            }}
            h={'36px'}
            width={'36px'}
          />
          <IconButton
            marginLeft={4}
            variant={'link'}
            icon={colorMode === 'light' ? MoonIcon : SunIcon}
            aria-label={`toggle-color-mode`}
            onClick={toggleColorMode}
            h={'36px'}
            width={'36px'}
          />
        </Box>
      </Box>
      <div>{children}</div>
      <Global
        styles={`
      html,
      body {
        padding: 0;
        margin: 0;
        font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,
          Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
      }
     `}
      />
    </>
  )
}

export default Layout
