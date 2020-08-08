import { NextPage, GetServerSideProps } from 'next'
import Layout from '../../components/Layout'
import {
  Box,
  Heading,
  useColorMode,
  theme,
  Button,
  Stack,
} from '@chakra-ui/core'
import { useState, useEffect } from 'react'
import { getBlogList } from '../../gateways'
import { ModelContents } from '../../gateways/type'
import { useRouter } from 'next/router'
import ContentCard from '../../components/ContentCard'
import { parseISO, format } from 'date-fns'
import Custom404 from '../404'
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa'

interface Props {
  data: ModelContents
}

const Contents: NextPage<Props> = ({ data }) => {
  if (!data) {
    return <Custom404 />
  }
  const router = useRouter()
  const { id } = router.query

  const { contents, limit, offset, totalCount } = data

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
        <Heading my={`16px`} zIndex={1}>
          投稿一覧
        </Heading>
        <Stack
          width={[`360px`, `lg`, `xl`, `3xl`]}
          borderWidth={'1px'}
          borderColor={theme.colors.gray[200]}
          rounded={'lg'}
          backgroundColor={color}
          zIndex={2}
          padding={4}
          flex={1}
          marginBottom={'24px'}
          align={'center'}
          direction={'column'}
          position={'relative'}
          spacing={8}
        >
          {contents.slice(0, 10).map((content, index) => (
            <ContentCard
              key={index}
              contentId={content.id}
              title={content.title}
              createDate={format(parseISO(content.createdAt), 'yyyy/M/d H:m')}
              tags={content.tag?.split(',')}
              onClick={(contentId) => {
                router.push(`/posts/${contentId}`)
              }}
              onClickTag={(tag) => {
                router.push({
                  pathname: `/contents/${id}`,
                  query: { tag: encodeURI(tag) },
                })
              }}
            />
          ))}

          <Box
            display={'flex'}
            justifyContent={'space-between'}
            w={'100%'}
            position={'absolute'}
            bottom={'16px'}
            px={'4px'}
          >
            <div>
              {offset !== 0 && (
                <Button
                  variantColor="teal"
                  variant="ghost"
                  onClick={() => {
                    const page = Number(id) - 1
                    router.push(`/contents/${page}`)
                  }}
                  leftIcon={FaArrowLeft}
                >
                  前の10件
                </Button>
              )}
            </div>
            <div>
              {totalCount === limit && (
                <Button
                  variantColor="teal"
                  variant="ghost"
                  onClick={() => {
                    router.back()
                  }}
                  rightIcon={FaArrowRight}
                >
                  次の10件
                </Button>
              )}
            </div>
          </Box>
        </Stack>
      </Box>
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = async ({
  params,
  query,
  res,
}) => {
  let Fetching = true
  try {
    const { data } = await getBlogList(Number(params.id), query.tag as string)
    Fetching = false
    return { props: { data: data, Fetching } }
  } catch {
    res.statusCode = 404
    return {
      props: {},
    }
  }
}

export default Contents
