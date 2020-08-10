import { NextPage, GetStaticPaths, GetStaticProps } from 'next'
import Layout from '../../components/Layout'
import { Box, useColorMode, theme, Button, Stack } from '@chakra-ui/core'
import { useState, useEffect } from 'react'
import { getBlogList } from '../../gateways'
import { ModelContents } from '../../gateways/type'
import { useRouter } from 'next/router'
import ContentCard from '../../components/ContentCard'
import { parseISO, format } from 'date-fns'
import Custom404 from '../404'
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa'
import Loading from '../../components/Loader'

interface Props {
  data: ModelContents
  statusCode: number
}

const Contents: NextPage<Props> = ({ data, statusCode }) => {
  if (!data) {
    return <Loading loading={true} />
  }

  if (statusCode === 404) {
    return <Custom404 />
  }

  const router = useRouter()
  const [id, tag] = router.query.id as string[]

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
        <Stack
          width={[`360px`, `lg`, `xl`, `3xl`]}
          borderWidth={'1px'}
          borderColor={theme.colors.gray[200]}
          rounded={'lg'}
          backgroundColor={color}
          zIndex={2}
          paddingTop={12}
          paddingBottom={4}
          px={4}
          flex={1}
          my={'24px'}
          align={'center'}
          direction={'column'}
          position={'relative'}
          spacing={8}
        >
          <Box position={'absolute'} left={'12px'} top={`4px`}>
            {tag ? ` タグ: ${tag} ${contents.length}件` : `投稿一覧`}
          </Box>
          {contents.slice(0, 10).map((content, index) => (
            <ContentCard
              key={index}
              contentId={content.id}
              title={content.title}
              createDate={format(parseISO(content.createdAt), 'yyyy/M/d H:m')}
              tags={content.tag?.split(',')}
              onClickTag={(tag) => {
                router.push(`/contents/${id}/${tag}`)
              }}
            />
          ))}

          <Box
            display={'flex'}
            justifyContent={'space-between'}
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

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [{ params: { id: ['1'] } }],
    fallback: true,
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  try {
    const [id, tag] = params.id as string[]
    const { data, status } = await getBlogList(Number(id), tag)
    return { props: { data: data, statusCode: status } }
  } catch {
    return {
      props: { statusCode: 404 },
    }
  }
}

export default Contents
