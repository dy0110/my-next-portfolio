import { NextPage } from 'next'
import { Box, Text, theme } from '@chakra-ui/core'

interface Props {}

const Footer: NextPage<Props> = () => (
  <Box
    as={'footer'}
    width={'100%'}
    height={'100px'}
    borderTop={'1px'}
    borderTopColor={theme.colors.gray[200]}
    display={'flex'}
    justifyContent={'center'}
    alignItems={'center'}
  >
    <Text fontSize="sm">Copyright © 2020 dy0110</Text>
  </Box>
)

export default Footer
