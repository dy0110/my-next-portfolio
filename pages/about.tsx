import { NextPage } from 'next'
import Layout from '../components/Layout'
import { Box, Image, theme, useColorMode, Heading } from '@chakra-ui/core'
import { useState, useEffect } from 'react'
import { getProfile } from '../gateways'
import { ModelProfile } from '../gateways/type'
import { parseHtmlStringToReactElement } from '../components/util/parce'

interface Props {
  profile: ModelProfile
}

const About: NextPage<Props> = ({ profile }) => {
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
          プロフィール
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
        >
          <Image
            margin={`auto`}
            src={profile.image.url}
            rounded={'full'}
            size={`240px`}
          />
          <Box p={4}>
            <Box
              mt="1"
              fontWeight="semibold"
              as="h3"
              lineHeight="tight"
              isTruncated
            >
              {profile.name}
            </Box>
            <Box mt="1" as="h4" lineHeight="tight" isTruncated>
              生年月日: {profile.birthday}
            </Box>
            <Box mt="1" as="h4" lineHeight="tight" isTruncated>
              出身: {profile.from}
            </Box>

            <Box mt="4">
              {parseHtmlStringToReactElement(profile.Introduction)}
            </Box>
            <Box
              mt="4"
              fontWeight="semibold"
              as="h3"
              lineHeight="tight"
              isTruncated
            >
              スキル
            </Box>
            <Box mt="1">{parseHtmlStringToReactElement(profile.skills)}</Box>
            <Box
              mt="4"
              fontWeight="semibold"
              as="h3"
              lineHeight="tight"
              isTruncated
            >
              興味のあること
            </Box>
            <Box mt="1">{parseHtmlStringToReactElement(profile.Interest)}</Box>
          </Box>
        </Box>
      </Box>
    </Layout>
  )
}

export const getStaticProps = async () => {
  const { data } = await getProfile()
  return { props: { profile: data } }
}

export default About
