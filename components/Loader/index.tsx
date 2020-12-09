import React from 'react'
import styled from '@emotion/styled'
import { theme, useColorMode } from '@chakra-ui/core'
import BounceLoader from 'react-spinners/BounceLoader'

interface LoaderProps {
  colorMode: 'light' | 'dark'
}

export const Loader = styled.div<LoaderProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
  opacity: 0.8;
  position: fixed;
  top: 0;
  left: 0;
  background: ${({ colorMode }) =>
    colorMode === 'light' ? theme.colors.white : theme.colors.gray[800]};
  z-index: 10;
`
interface Props {
  loading: boolean
}

const Loading: React.FC<Props> = ({ loading }) => {
  const { colorMode } = useColorMode()
  return (
    loading && (
      <Loader colorMode={colorMode}>
        <BounceLoader
          size={150}
          color={theme.colors.teal[400]}
          loading={loading}
        />
      </Loader>
    )
  )
}

export default Loading
