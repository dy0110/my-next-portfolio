import { NextApiHandler } from 'next'
import { getPreviewBlogPost } from '../../gateways/index'

const preview: NextApiHandler = async (req, res) => {
  if (
    req.query.secret !== process.env.SECRET_KEY ||
    !req.query.id ||
    !req.query.draftKey
  ) {
    return res
      .status(401)
      .json({ message: `Invalid query, ${process.env.MY_SECRET_APP_TOKEN}` })
  }

  const response = await getPreviewBlogPost(
    req.query.id as string,
    req.query.draftKey as string
  )

  if (!response) {
    return res.status(401).json({ message: 'Invalid draft key' })
  }

  res.setPreviewData({
    draftKey: req.query.draftKey,
    id: req.query.id,
  })

  res.writeHead(307, { Location: `/posts/${req.query.id}` })

  res.end('Preview mode enabled')
}

export default preview
