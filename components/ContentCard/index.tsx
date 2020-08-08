import React from 'react'
import { Box, theme, Tag, Heading } from '@chakra-ui/core'
import styled from '@emotion/styled'

const ContentTag = styled(Tag)`
  & + & {
    margin-left: 4px;
  }
  cursor: pointer;
`

const ContentBox = styled(Box)`
  & + & {
    margin-top: 16px;
  }
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
  createDate: string
  contentId: string
  onClick: (contentId: string) => void
  onClickTag: (tag: string) => void
  tags?: string[] | undefined
}

const ContentCard: React.FC<Props> = ({
  title,
  tags,
  createDate,
  contentId,
  onClick,
  onClickTag,
}) => {
  return (
    <ContentBox
      zIndex={3}
      borderWidth={'1px'}
      borderColor={theme.colors.gray[200]}
      rounded={'lg'}
      width={`100%`}
      height={'120px'}
      padding={'8px'}
      shadow={'sm'}
      onClick={() => {
        onClick(contentId)
      }}
    >
      <Heading as="h4" size="md">
        {title}
      </Heading>
      <Box my={'8px'}>{createDate}</Box>
      <Box marginTop={'8px'}>
        {tags &&
          tags.map((tag, index) => (
            <ContentTag
              size={'sm'}
              rounded="full"
              variantColor="teal"
              key={index}
              onClick={() => {
                onClickTag(tag)
              }}
            >
              {tag}
            </ContentTag>
          ))}
      </Box>
    </ContentBox>
  )
}

export default ContentCard
