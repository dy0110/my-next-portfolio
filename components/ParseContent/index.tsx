import React from 'react'
import { theme, Code, Link, Heading } from '@chakra-ui/react'
import ReactHtmlParser, {
  convertNodeToElement,
  processNodes,
} from 'react-html-parser'

interface Props {
  text: string
}

const ParseContent: React.FC<Props> = ({ text }) => {
  const transform = (node, index) => {
    if (node.type === 'tag' && node.name === 'a') {
      return (
        <Link color={theme.colors.teal[500]} mx={'4px'} key={index}>
          {processNodes(node.children, transform)}
        </Link>
      )
    }

    if (node.type === 'tag' && node.name === 'h1') {
      return (
        <Heading as={'h1'} size={'2xl'} my={'16px'} key={index}>
          {processNodes(node.children, transform)}
        </Heading>
      )
    }

    if (node.type === 'tag' && node.name === 'h2') {
      return (
        <Heading as={'h2'} size={'xl'} my={'16px'} key={index}>
          {processNodes(node.children, transform)}
        </Heading>
      )
    }

    if (node.type === 'tag' && node.name === 'h3') {
      return (
        <Heading as={'h3'} size={'lg'} my={'16px'} key={index}>
          {processNodes(node.children, transform)}
        </Heading>
      )
    }

    if (node.type === 'tag' && node.name === 'h4') {
      return (
        <Heading as={'h4'} size={'md'} my={'8px'} key={index}>
          {processNodes(node.children, transform)}
        </Heading>
      )
    }

    if (node.type === 'tag' && node.name === 'h5') {
      return (
        <Heading as={'h5'} size={'sm'} my={'4px'} key={index}>
          {processNodes(node.children, transform)}
        </Heading>
      )
    }

    if (node.type === 'tag' && node.name === 'code') {
      if (node.parent.name === 'pre') {
        return convertNodeToElement(node, index, transform)
      } else {
        return (
          <Code mx={'4px'} colorScheme={'gray'} key={index}>
            {processNodes(node.children, transform)}
          </Code>
        )
      }
    }
  }

  return (
    <>
      {ReactHtmlParser(text, {
        transform,
      })}
    </>
  )
}

export default ParseContent
