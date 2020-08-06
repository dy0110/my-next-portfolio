import parse from 'html-react-parser'

export const parseHtmlStringToReactElement = (Text: string) => {
  return parse(Text, {
    replace: (domNode) => {
      if (domNode.attribs && domNode.attribs.style === 'color:#5f6167') {
        domNode.attribs.style = ``
      }
    },
  })
}
