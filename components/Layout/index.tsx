import { NextPage } from 'next'
import { useRouter } from 'next/router'
import {
  Box,
  theme,
  IconButton,
  useColorMode,
  Button,
  Link as ChakraLink,
} from '@chakra-ui/core'
import Head from 'next/head'
import { Global } from '@emotion/core'
import { DiGithubBadge } from 'react-icons/di'
import { FaSun, FaMoon } from 'react-icons/fa'
import { useState, useEffect } from 'react'
import dynamic from 'next/dynamic'
import Footer from '../Fotter'
import Link from 'next/link'
import styled from '@emotion/styled'

const LayoutLink = styled(ChakraLink)`
  font-weight: 600;
  font-size: 20px;
  & + & {
    margin-left: 16px;
  }
`

const ParticlesNoSSR = dynamic(() => import('../Particles'), {
  ssr: false,
})

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
  const router = useRouter()

  const { colorMode, toggleColorMode } = useColorMode()
  const [headerColor, setHeaderColor] = useState(``)
  const [textColor, setTextColor] = useState(``)

  useEffect(() => {
    setHeaderColor(
      colorMode === `light` ? theme.colors.teal[400] : theme.colors.gray[800]
    )
    setTextColor(
      colorMode === `light` ? theme.colors.gray[600] : theme.colors.white
    )
  }, [colorMode])

  return (
    <>
      <Head>
        <title>dy0110 Portfolio</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Box
        as={'header'}
        bg={headerColor}
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
          <Link href={'/'}>
            <LayoutLink color={theme.colors.white}>Home</LayoutLink>
          </Link>
          <Link href={'/about'}>
            <LayoutLink color={theme.colors.white}>About</LayoutLink>
          </Link>
          <Link href={'/contents/[id]'} as={`/contents/1`}>
            <LayoutLink color={theme.colors.white}>Blog</LayoutLink>
          </Link>
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
      <ParticlesNoSSR />
      {children}
      <Footer />
      <Global
        styles={`
      html,
      body {
        padding: 0;
        margin: 0;
        font-family: Roboto;
        color: ${textColor};
      }

      #tsParticles{
       min-height:100vh;
        width: 100%;
        position: fixed;
      }

      @media (max-width: 600px) {
        .grid {
          width: 100%;
          flex-direction: column;
        }
      }
     `}
      />
    </>
  )
}

export default Layout
