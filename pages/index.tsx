import React from 'react'
import { NextPage } from 'next'
import { Box, Heading, Text, Code } from '@chakra-ui/core'
import Layout from '../components/Layout/index'
import HomeCard from '../components/HomeCard/index'

export const Home: NextPage = () => (
  <Layout>
    <Box
      minHeight={'100vh'}
      display={'flex'}
      justifyContent={'center'}
      alignItems={'center'}
      flexDirection={'column'}
    >
      <Box
        as={'main'}
        flex={'1'}
        display={'flex'}
        justifyContent={'center'}
        alignItems={'center'}
        flexDirection={'column'}
        paddingLeft={'16px'}
        paddingRight={'16px'}
      >
        <Heading as={'h1'} fontSize={'84px'}>
          Welcome to My Portfolio!
        </Heading>
        <Text fontSize="2xl" marginTop={`16px`}>
          このサイトは <Code>dy0110</Code> のポートフォリオです
        </Text>

        <Box
          display={'flex'}
          justifyContent={'center'}
          alignItems={'center'}
          maxWidth={`800px`}
          marginTop={'32px'}
          className={`grid`}
        >
          <HomeCard title={`About`} content={`製作者についてはこちら`} />
          <HomeCard title={`Blog`} content={`ブログについてはこちら`} />
        </Box>
      </Box>

      <footer>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <img src="/vercel.svg" alt="Vercel Logo" className="logo" />
        </a>
      </footer>

      <style jsx>{`
        footer {
          width: 100%;
          height: 100px;
          border-top: 1px solid #eaeaea;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        footer img {
          margin-left: 0.5rem;
        }

        footer a {
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .logo {
          height: 1em;
        }
      `}</style>
    </Box>
  </Layout>
)

export default Home
