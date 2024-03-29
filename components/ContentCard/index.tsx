import React from 'react'
import { Box, theme, Tag, Link as ChakraLink, Flex } from '@chakra-ui/react'
import Link from 'next/link'

interface Props {
  title: string
  widthMargin: boolean
  createDate: string
  contentId: string
  onClickTag: (tag: string) => void
  tags?: string[] | undefined
}

const ContentCard: React.FC<Props> = ({
  title,
  widthMargin,
  tags,
  createDate,
  contentId,
  onClickTag,
}) => {
  return (
    <Flex
      zIndex={3}
      borderWidth={'1px'}
      borderColor={theme.colors.gray[200]}
      rounded={'lg'}
      width={`100%`}
      minHeight={'160px'}
      padding={'8px'}
      shadow={'sm'}
      mt={widthMargin ? '16px' : undefined}
      direction={'column'}
    >
      <Link href={`/posts/[id]`} as={`/posts/${contentId}`}>
        <ChakraLink color={theme.colors.teal[500]} fontSize={'24px'}>
          {title}
        </ChakraLink>
      </Link>
      <Box my={'8px'}>{createDate}</Box>
      <Box marginTop={'8px'}>
        {tags &&
          tags.map((tag, index) => (
            <Tag
              size={'sm'}
              rounded="full"
              colorScheme="teal"
              key={index}
              onClick={() => {
                onClickTag(tag)
              }}
              style={{ cursor: 'pointer' }}
              ml={index > 0 ? '4px' : undefined}
            >
              {tag}
            </Tag>
          ))}
      </Box>
      <Box marginTop={'8px'}>
        <Link href={`/posts/[id]`} as={`/posts/${contentId}`}>
          <ChakraLink color={theme.colors.teal[500]} fontSize={'16px'}>
            全文を見る
          </ChakraLink>
        </Link>
      </Box>
    </Flex>
  )
}

export default ContentCard
