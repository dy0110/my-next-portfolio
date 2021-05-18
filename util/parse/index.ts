import hljs from 'highlight.js'
import { JSDOM } from 'jsdom'

export const convertToHtml = (text: string) => {
  const dom = new JSDOM(text)

  dom.window.document.querySelectorAll('pre code').forEach((element) => {
    element.innerHTML = hljs.highlightAuto(element.textContent ?? '').value
    element.classList.add('hljs')
  })

  dom.window.document.querySelectorAll('ul').forEach((element) => {
    element.style.marginLeft = '36px'
    element.style.marginRight = '36px'
  })

  dom.window.document.querySelectorAll('ol').forEach((element) => {
    element.style.marginLeft = '36px'
    element.style.marginRight = '36px'
  })

  dom.window.document.querySelectorAll('img').forEach((element) => {
    element.style.margin = 'auto'
  })

  dom.window.document.querySelectorAll('span').forEach((element) => {
    element.removeAttribute('style')
  })

  return dom.window.document.body.innerHTML
}
