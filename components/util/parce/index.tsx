import parse, { domToReact } from 'html-react-parser'
import { theme, Code, Link, Heading } from '@chakra-ui/core'
import React from 'react'

export const parseHtmlStringToReactElement = (Text: string) => {
  return parse(Text, {
    replace: (domNode) => {
      if (domNode.attribs) {
        domNode.children.filter((item) => {
          if (item.name === 'span') {
            item.attribs.style = ''
          }
        })
      }

      if (domNode.name === 'ul' || domNode.name === 'ol') {
        domNode.attribs.style = 'margin-left: 36px; margin-bottom: 4px;'
      }

      if (domNode.name === 'a') {
        return (
          <Link color={theme.colors.teal[500]} mx={'4px'}>
            {domToReact(domNode.children)}
          </Link>
        )
      }

      if (domNode.name === 'h1') {
        return (
          <Heading as={'h1'} size={'2xl'} my={'16px'}>
            {domToReact(domNode.children)}
          </Heading>
        )
      }

      if (domNode.name === 'h2') {
        return (
          <Heading as={'h2'} size={'xl'} my={'16px'}>
            {domToReact(domNode.children)}
          </Heading>
        )
      }

      if (domNode.name === 'h3') {
        return (
          <Heading as={'h3'} size={'lg'} my={'16px'}>
            {domToReact(domNode.children)}
          </Heading>
        )
      }

      if (domNode.name === 'h4') {
        return (
          <Heading as={'h4'} size={'md'} my={'8px'}>
            {domToReact(domNode.children)}
          </Heading>
        )
      }

      if (domNode.name === 'h5') {
        return (
          <Heading as={'h5'} size={'sm'} my={'4px'}>
            {domToReact(domNode.children)}
          </Heading>
        )
      }

      if (domNode.name === 'code') {
        return <Code mx={'4px'}>{domToReact(domNode.children)}</Code>
      }

      if (domNode.name === 'p') {
        domNode.attribs.className = 'paragraph'
      }
    },
  })
}
