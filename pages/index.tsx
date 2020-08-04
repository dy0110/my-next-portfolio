import React from 'react'
import { NextPage } from 'next'
import { Box, Heading, Text, Code } from '@chakra-ui/core'
import Layout from '../components/Layout/index'
import HomeCard from '../components/HomeCard/index'
import Footer from '../components/Fotter'
import { useRouter } from 'next/router'

export const Home: NextPage = () => {
  const router = useRouter()

  return (
    <Layout>
      <Box
        zIndex={1}
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
          zIndex={100}
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
            <HomeCard
              title={`About`}
              content={`製作者についてはこちら`}
              onClick={() => {
                router.push('/about')
              }}
            />
            <HomeCard
              title={`Blog`}
              content={`ブログについてはこちら`}
              onClick={() => {
                router.push('/posts')
              }}
            />
          </Box>
        </Box>
      </Box>
      <Footer />
    </Layout>
  )
}

export default Home
