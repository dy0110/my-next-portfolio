import React, { useState, useEffect } from 'react'
import { Box, Text, theme, useColorMode } from '@chakra-ui/react'

interface Props {}

const Footer: React.FC<Props> = () => {
  const { colorMode } = useColorMode()
  const [color, setColor] = useState(``)

  useEffect(() => {
    setColor(
      colorMode === `light` ? theme.colors.white : theme.colors.gray[800]
    )
  }, [colorMode])
  return (
    <Box
      as={'footer'}
      width={'100%'}
      height={'100px'}
      borderTop={'1px'}
      borderTopColor={theme.colors.gray[200]}
      display={'flex'}
      justifyContent={'center'}
      alignItems={'center'}
      zIndex={1}
      backgroundColor={color}
      position={'absolute'}
    >
      <Text fontSize="sm">Copyright © 2020 dy0110</Text>
    </Box>
  )
}

export default Footer
