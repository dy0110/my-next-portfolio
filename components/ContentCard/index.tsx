import React from 'react'
import { Box, theme, Tag, Heading } from '@chakra-ui/core'
import { formatDate } from '../util/date'
import styled from '@emotion/styled'

const ContentTag = styled(Tag)`
  & + & {
    margin-left: 4px;
  }
`

interface Props {
  title: string
  createDate: string
  id: string
  tags?: string[] | undefined
}

const ContentCard: React.FC<Props> = ({ title, tags, createDate, id }) => {
  return (
    <Box
      zIndex={3}
      borderWidth={'1px'}
      borderColor={theme.colors.gray[200]}
      rounded={'lg'}
      width={`100%`}
      height={'120px'}
      padding={'8px'}
      shadow={'sm'}
      onClick={() => {
        console.log(id)
      }}
    >
      <Heading as="h4" size="md">
        {title}
      </Heading>
      <Box my={'8px'}>{formatDate(createDate)}</Box>
      <Box marginTop={'8px'}>
        {tags.map((tag, index) => (
          <ContentTag
            size={'sm'}
            rounded="full"
            variantColor="teal"
            key={index}
            onClick={() => {
              console.log(tag)
            }}
          >
            タグ１
          </ContentTag>
        ))}
      </Box>
    </Box>
  )
}

export default ContentCard
