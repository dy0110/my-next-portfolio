import React from 'react'
import styled from '@emotion/styled'
import { theme } from '@chakra-ui/core'
import BounceLoader from 'react-spinners/BounceLoader'

export const Loader = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
  opacity: 0.8;
  position: fixed;
  top: 0;
  left: 0;
  background: ${theme.colors.white};
  z-index: 10;
`
interface Props {
  loading: boolean
}

const Loading: React.FC<Props> = ({ loading }) => {
  return (
    loading && (
      <Loader>
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
