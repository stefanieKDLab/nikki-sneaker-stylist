export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const { query } = req.body
    const encoded = encodeURIComponent(`${query} nike.com official`)
    const url = `https://serpapi.com/search.json?engine=google_images&q=${encoded}&api_key=${process.env.SERPAPI_KEY}&num=5&safe=active`

    const response = await fetch(url)
    const data = await response.json()

    const results = data.images_results || []
    let image = null
    for (const result of results) {
      const src = result?.original || result?.thumbnail || null
      if (src) { image = src; break }
    }

    return res.status(200).json({ image })
  } catch (error) {
    return res.status(500).json({ error: error.message, image: null })
  }
}
