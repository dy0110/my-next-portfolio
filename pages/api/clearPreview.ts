import { NextApiHandler } from 'next'

const finishPreview: NextApiHandler = async (_, res) => {
  res.clearPreviewData()

  res.writeHead(307, { Location: `/` })
  res.end('Finish Preview mode')
}

export default finishPreview
