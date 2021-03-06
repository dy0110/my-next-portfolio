import React from 'react'
import { Box, Text, theme, useColorMode } from '@chakra-ui/react'
import { useEffect, useState } from 'react'

interface Props {
  title: string
  content: string
  onClick: () => void
}

const HomeCard: React.FC<Props> = ({ title, content, onClick }) => {
  const { colorMode } = useColorMode()
  const [color, setColor] = useState(``)

  useEffect(() => {
    setColor(
      colorMode === `light` ? theme.colors.white : theme.colors.gray[800]
    )
  }, [colorMode])

  return (
    <Box
      margin={'1rem'}
      padding={`1.5rem`}
      textAlign={`left`}
      border={`1px`}
      borderColor={theme.colors.gray[200]}
      borderStyle={`solid`}
      borderRadius={`10px`}
      transition={`color 0.15s ease, border-color 0.15s ease`}
      onClick={onClick}
      zIndex={2}
      backgroundColor={color}
      _hover={{
        color: theme.colors.teal[400],
        borderColor: theme.colors.teal[400],
      }}
      _active={{
        color: theme.colors.teal[400],
        borderColor: theme.colors.teal[400],
      }}
      _focus={{
        color: theme.colors.teal[400],
        borderColor: theme.colors.teal[400],
      }}
    >
      <Text as={'h3'} fontSize={`1.5rem`} marginBottom={`1rem`}>
        {title} &rarr;
      </Text>
      <Text>{content}</Text>
    </Box>
  )
}

export default HomeCard
