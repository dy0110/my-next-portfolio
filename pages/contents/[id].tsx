import { NextPage, GetServerSideProps } from 'next'
import Layout from '../../components/Layout'
import { Box, Heading, useColorMode, theme, Button, Tag } from '@chakra-ui/core'
import { useState, useEffect } from 'react'
import { getBlogList } from '../../gateways'
import { ModelContents } from '../../gateways/type'
import ErrorPage from 'next/error'
import { useRouter } from 'next/router'
import styled from '@emotion/styled'

const ContentTag = styled(Tag)`
  & + & {
    margin-left: 4px;
  }
`

interface Props {
  data: ModelContents
}

const Contents: NextPage<Props> = ({ data }) => {
  if (!data) {
    return <ErrorPage statusCode={404} />
  }
  const router = useRouter()
  const { id } = router.query

  console.log(data)
  // sliceメソッド使う
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
        <Heading marginBottom={`16px`} zIndex={1}>
          投稿一覧
        </Heading>
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
          alignItems={'center'}
          flexDirection={'column'}
          position={'relative'}
        >
          <Box
            zIndex={3}
            borderWidth={'1px'}
            borderColor={theme.colors.gray[200]}
            rounded={'lg'}
            width={`100%`}
            height={'120px'}
            padding={'8px'}
            shadow={'sm'}
          >
            <Heading as="h4" size="md">
              ブログタイトル
            </Heading>
            <Box my={'8px'}>2020/8/7 11:20</Box>
            <Box marginTop={'8px'}>
              <ContentTag size={'sm'} rounded="full" variantColor="teal">
                タグ１
              </ContentTag>
              <ContentTag size={'sm'} rounded="full" variantColor="teal">
                タグ２
              </ContentTag>
              <ContentTag size={'sm'} rounded="full" variantColor="teal">
                タグ３
              </ContentTag>
            </Box>
          </Box>
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
                >
                  前へ
                </Button>
              )}
            </div>
            <div>
              {totalCount === limit && (
                <Button
                  variantColor="teal"
                  variant="ghost"
                  onClick={() => {
                    const page = Number(id) + 1
                    router.push(`/contents/${page}`)
                  }}
                >
                  次へ
                </Button>
              )}
            </div>
          </Box>
        </Box>
      </Box>
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = async ({
  params,
  res,
}) => {
  try {
    const { data } = await getBlogList(Number(params.id))
    return { props: { data: data } }
  } catch {
    res.statusCode = 404
    return {
      props: {},
    }
  }
}

export default Contents
