import { NextPage, GetStaticPaths, GetStaticProps } from 'next'
import Layout from '../../components/Layout'
import { Box, Heading, useColorMode, theme, Tag, Button } from '@chakra-ui/core'
import { ModelPost } from '../../gateways/type'
import Custom404 from '../404'
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import { getBlogPost } from '../../gateways'
import styled from '@emotion/styled'
import { parseHtmlStringToReactElement } from '../../components/util/parce'
import { format, parseISO } from 'date-fns'
import { FaArrowLeft } from 'react-icons/fa'
import Loading from '../../components/Loader'

const ContentTag = styled(Tag)`
  & + & {
    margin-left: 4px;
  }
`

interface Props {
  data: ModelPost
  statusCode: number
}

const Post: NextPage<Props> = ({ data, statusCode }) => {
  if (!data) {
    return <Loading loading={true} />
  }

  if (statusCode === 404) {
    return <Custom404 />
  }

  const router = useRouter()
  const { title, tag, createdAt, content } = data

  const { colorMode } = useColorMode()
  const [color, setColor] = useState(``)

  useEffect(() => {
    setColor(
      colorMode === `light` ? theme.colors.white : theme.colors.gray[800]
    )
  }, [colorMode])

  return (
    <Layout>
      <Box
        minHeight={'100vh'}
        display={'flex'}
        justifyContent={'center'}
        alignItems={'center'}
        flexDirection={'column'}
        as={'main'}
      >
        <Box
          width={[`360px`, `lg`, `xl`, `3xl`]}
          borderWidth={'1px'}
          borderColor={theme.colors.gray[200]}
          rounded={'lg'}
          backgroundColor={color}
          zIndex={2}
          padding={4}
          flex={1}
          marginBottom={'24px'}
          display={'flex'}
          flexDirection={'column'}
          marginTop={`24px`}
          position={'relative'}
        >
          <Heading as="h2" size="xl">
            {title}
          </Heading>
          <Heading as="h4" size="sm" marginTop={'8px'}>
            {format(parseISO(createdAt), 'yyyy/M/d H:m')}
          </Heading>
          <Box marginTop={'16px'}>
            {tag?.split(',').map((item, index) => (
              <ContentTag
                key={index}
                size={'sm'}
                rounded="full"
                variantColor="teal"
              >
                {item}
              </ContentTag>
            ))}
          </Box>
          <Box marginTop={'16px'} px={'16px'} flex={1} marginBottom={'28px'}>
            {parseHtmlStringToReactElement(content)}
          </Box>
          <Box display={'flex'} position={'absolute'} bottom={'4px'} px={'4px'}>
            <div>
              <Button
                variantColor="teal"
                variant="ghost"
                onClick={() => {
                  router.push(`/contents/1`)
                }}
                leftIcon={FaArrowLeft}
              >
                戻る
              </Button>
            </div>
          </Box>
        </Box>
      </Box>
    </Layout>
  )
}
export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: true,
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  try {
    const { data, status } = await getBlogPost(params.id as string)
    return { props: { data: data, statusCode: status } }
  } catch {
    return { props: { statusCode: 404 } }
  }
}

export default Post
