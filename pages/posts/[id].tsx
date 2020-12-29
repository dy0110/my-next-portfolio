import { NextPage, GetStaticPaths, GetStaticProps } from 'next'
import Layout from '../../components/Layout'
import {
  Box,
  Heading,
  useColorMode,
  theme,
  Tag,
  Button,
  useToast,
} from '@chakra-ui/react'
import { ModelPost } from '../../gateways/type'
import Custom404 from '../404'
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import { getBlogPost, getPreviewBlogPost } from '../../gateways'
import styled from '@emotion/styled'
import { parseHtmlStringToReactElement } from '../../util/parce'
import { format, parseISO } from 'date-fns'
import ja from 'date-fns/locale/ja'
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
  preview: boolean
}

const Post: NextPage<Props> = ({ data, statusCode, preview }) => {
  const toast = useToast()
  const router = useRouter()
  const { colorMode } = useColorMode()
  const [color, setColor] = useState(``)

  useEffect(() => {
    setColor(
      colorMode === `light` ? theme.colors.white : theme.colors.gray[800]
    )
  }, [colorMode])

  useEffect(() => {
    if (preview) {
      toast({
        position: 'top',
        title: '記事のプレビュー中',
        status: 'error',
        duration: null,
        isClosable: false,
      })
    }
  }, [preview])

  if (!data) {
    return <Loading loading={true} />
  }

  if (statusCode === 404) {
    return <Custom404 />
  }

  const { title, tag, createdAt, content, updatedAt } = data

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
            作成日：
            {format(parseISO(createdAt), 'yyyy/MM/dd HH:mm', {
              locale: ja,
            })}
          </Heading>
          <Heading as="h4" size="sm" marginTop={'8px'}>
            更新日：
            {format(parseISO(updatedAt), 'yyyy/MM/dd HH:mm', {
              locale: ja,
            })}
          </Heading>
          <Box marginTop={'16px'}>
            {tag?.split(',').map((item, index) => (
              <ContentTag
                key={index}
                size={'sm'}
                rounded="full"
                colorScheme="teal"
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
                  preview ? router.push(`/api/clearPreview`) : router.back()
                }}
                leftIcon={<FaArrowLeft />}
              >
                {preview ? '閉じる' : '戻る'}
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

export const getStaticProps: GetStaticProps = async ({
  params,
  preview,
  previewData,
}) => {
  try {
    if (preview) {
      const { data, status } = await getPreviewBlogPost(
        params.id as string,
        previewData.draftKey
      )
      return { props: { data: data, statusCode: status, preview: true } }
    } else {
      const { data, status } = await getBlogPost(params.id as string)
      return { props: { data: data, statusCode: status, preview: false } }
    }
  } catch {
    return { props: { statusCode: 404 } }
  }
}

export default Post
