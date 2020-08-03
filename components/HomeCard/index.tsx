import { NextPage } from 'next'
import { Box, Text, theme } from '@chakra-ui/core'
import styled from '@emotion/styled'

const StyledBox = styled(Box)`
  :hover,
  :active,
  :focus {
    color: ${theme.colors.teal[400]};
    border-color: ${theme.colors.teal[400]};
  }
  transition: color 0.15s ease, border-color 0.15s ease;
`

interface Props {
  title: string
  content: string
  onClick: () => void
}

const HomeCard: NextPage<Props> = ({ title, content, onClick }) => {
  return (
    <StyledBox
      margin={'1rem'}
      padding={`1.5rem`}
      textAlign={`left`}
      border={`1px`}
      borderColor={`#eaeaea`}
      borderStyle={`solid`}
      borderRadius={`10px`}
      transition={`color 0.15s ease, border-color 0.15s ease`}
      onClick={onClick}
    >
      <Text as={'h3'} fontSize={`1.5rem`} marginBottom={`1rem`}>
        {title} &rarr;
      </Text>
      <Text>{content}</Text>
    </StyledBox>
  )
}

export default HomeCard
