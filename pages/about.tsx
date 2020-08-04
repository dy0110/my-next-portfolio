import { NextPage } from 'next'
import Layout from '../components/Layout'
import { Box, Image, theme, useColorMode, Heading } from '@chakra-ui/core'
import { useState, useEffect } from 'react'

interface Props {}

const About: NextPage<Props> = () => {
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
        zIndex={1}
        minHeight={'100vh'}
        display={'flex'}
        justifyContent={'center'}
        alignItems={'center'}
        flexDirection={'column'}
        as={'main'}
      >
        <Heading marginBottom={`16px`}>プロフィール</Heading>
        <Box
          size={'3xl'}
          height={`52rem`}
          borderWidth={'1px'}
          borderColor={theme.colors.gray[200]}
          rounded={'lg'}
          backgroundColor={color}
          zIndex={2}
          padding={4}
        >
          <Image
            margin={`auto`}
            src={'/image/profile.png'}
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
              dy0110
            </Box>
            <Box mt="1" as="h4" lineHeight="tight" isTruncated>
              生年月日: 1995/1/10
            </Box>
            <Box mt="1" as="h4" lineHeight="tight" isTruncated>
              出身: 宮城県
            </Box>

            <Box mt="4">
              都内のスタートアップ企業で働くフロントエンドエンジニア(17卒)
              <br />
              <br />
              新卒でSI企業に未経験で入社、jQueryを使ったWebサイトのフロント側の実装やハイブリッドアプリ(Cordova)の開発に携わりました。
              <br />
              しかし、レガシーな開発環境や深夜残業が常態化していたのもあって退職、現職でフロントエンドエンジニアとしてReactのプロダクト開発に従事しています。
              <br />
              好きなことは コードを書くこと/ プラモデル/ ゲーム/ サッカー です。
              特にプラモデルに関しては完成品をSNSに投稿して楽しんでいます。
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
            <Box mt="1">
              フロントエンド: HTML, CSS, JavaScript(ES6), jQuery, Vue,
              React/Next.js, TypeScript, Bootstrap, Redux
              <br />
              その他: Git, Cordova
            </Box>
            <Box
              mt="4"
              fontWeight="semibold"
              as="h3"
              lineHeight="tight"
              isTruncated
            >
              興味のあること
            </Box>
            <Box mt="1">
              フロントエンド: graphql, web components ,WebAssembly
              <br />
              バックエンド: なにか言語を習得したい(Goとか)
              <br />
              その他: Rust, Ionic, ReactNative
            </Box>
          </Box>
        </Box>
      </Box>
    </Layout>
  )
}

export default About
