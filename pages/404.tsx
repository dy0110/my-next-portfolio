import { NextPage } from 'next'
import { Box, Heading, Button } from '@chakra-ui/react'
import { useRouter } from 'next/router'

interface Props {}

const Custom404: NextPage<Props> = () => {
  const router = useRouter()
  return (
    <Box
      minHeight={'100vh'}
      display={'flex'}
      justifyContent={'center'}
      alignItems={'center'}
      flexDirection={'column'}
      as={'main'}
    >
      <Heading as={`h1`} size={'xl'}>
        404 - Page Not Found
      </Heading>
      <Button
        marginTop={'16px'}
        variantColor={'teal'}
        size={'lg'}
        variant={'ghost'}
        onClick={() => {
          router.push('/')
        }}
      >
        トップへ戻る
      </Button>
    </Box>
  )
}

export default Custom404
