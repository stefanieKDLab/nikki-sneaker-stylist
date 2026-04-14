export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const { query } = req.body
    const encoded = encodeURIComponent(`${query} site:nike.com`)
    const url = `https://serpapi.com/search.json?engine=google_shopping&q=${encoded}&api_key=${process.env.SERPAPI_KEY}&num=5`

    const response = await fetch(url)
    const data = await response.json()

    const results = data.shopping_results || []
    let image = null
    for (const result of results) {
      image = result?.thumbnail || result?.image || null
      if (image) break
    }

    return res.status(200).json({ image })
  } catch (error) {
    return res.status(500).json({ error: error.message, image: null })
  }
}
