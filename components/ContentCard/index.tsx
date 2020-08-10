import React from 'react'
import { Box, theme, Tag, Link as ChakraLink, Icon } from '@chakra-ui/core'
import styled from '@emotion/styled'
import Link from 'next/link'
import { FaArrowRight } from 'react-icons/fa'

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
`

const TitleLink = styled(ChakraLink)`
  font-size: 24px;
`

const BottomLink = styled(ChakraLink)`
  font-size: 16px;
`

interface Props {
  title: string
  createDate: string
  contentId: string
  onClickTag: (tag: string) => void
  tags?: string[] | undefined
}

const ContentCard: React.FC<Props> = ({
  title,
  tags,
  createDate,
  contentId,
  onClickTag,
}) => {
  return (
    <ContentBox
      zIndex={3}
      borderWidth={'1px'}
      borderColor={theme.colors.gray[200]}
      rounded={'lg'}
      width={`100%`}
      height={'160px'}
      padding={'8px'}
      shadow={'sm'}
      position={'relative'}
    >
      <Link href={`/posts/[id]`} as={`/posts/${contentId}`}>
        <TitleLink color={theme.colors.teal[500]}>{title}</TitleLink>
      </Link>
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
      <Box position={'absolute'} left={`8px`} bottom={`8px`}>
        <Link href={`/posts/[id]`} as={`/posts/${contentId}`}>
          <BottomLink color={theme.colors.teal[500]}>全文を見る</BottomLink>
        </Link>
      </Box>
    </ContentBox>
  )
}

export default ContentCard
