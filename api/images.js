export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const { query } = req.body
    const encoded = encodeURIComponent(`Nike ${query}`)
    const url = `https://serpapi.com/search.json?engine=google_shopping&q=${encoded}&api_key=${process.env.SERPAPI_KEY}&num=3`

    const response = await fetch(url)
    const data = await response.json()

    const results = data.shopping_results || []
    const image = results[0]?.thumbnail || null

    return res.status(200).json({ image })
  } catch (error) {
    return res.status(500).json({ error: 'Failed to fetch image', image: null })
  }
}
