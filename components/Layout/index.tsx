import { NextPage } from 'next'
import {
  Box,
  theme,
  IconButton,
  useColorMode,
  Link as ChakraLink,
} from '@chakra-ui/react'
import Head from 'next/head'
import { Global } from '@emotion/core'
import { DiGithubBadge } from 'react-icons/di'
import { FaSun, FaMoon } from 'react-icons/fa'
import { useState, useEffect } from 'react'
import dynamic from 'next/dynamic'
import Footer from '../Fotter'
import Link from 'next/link'

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
        height={'60px'}
        p={4}
        color={'white'}
        position={'sticky'}
        zIndex={200}
        top={0}
        display={'flex'}
        justifyContent={'space-between'}
      >
        <Box display={'flex'} alignItems={'center'}>
          <Link href={'/'}>
            <ChakraLink
              fontWeight={'600'}
              fontSize={'20px'}
              color={theme.colors.white}
            >
              Home
            </ChakraLink>
          </Link>
          <Link href={'/about'}>
            <ChakraLink
              fontWeight={'600'}
              fontSize={'20px'}
              ml={'16px'}
              color={theme.colors.white}
            >
              About
            </ChakraLink>
          </Link>
          <Link href={'/contents/[id]'} as={`/contents/1`}>
            <ChakraLink
              fontWeight={'600'}
              fontSize={'20px'}
              ml={'16px'}
              color={theme.colors.white}
            >
              Blog
            </ChakraLink>
          </Link>
        </Box>
        <Box display={'flex'} alignItems={'center'}>
          <IconButton
            variant={'link'}
            icon={<GithubIcon />}
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
            icon={colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
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

      .hljs{
        margin: 8px 0; 
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
