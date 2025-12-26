import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {
    const { prompt } = await req.json()

    // GOOGLE_API_KEY should be in .env.local
    const apiKey = process.env.GOOGLE_API_KEY
    if (!apiKey) {
      console.error("Missing GOOGLE_API_KEY environment variable")
      return new NextResponse(JSON.stringify({ error: 'Missing server-side configuration' }), { status: 500 })
    }

    // Use a valid model name. gemini-1.5-flash is fast and cost-effective.
    const model = 'gemini-1.5-flash'
    const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`

    const resp = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{
          parts: [{ text: prompt }]
        }],
        generationConfig: {
          temperature: 0.7,
          maxOutputTokens: 1024,
        }
      }),
    })

    const data = await resp.json()

    // Check for API errors
    if (!resp.ok) {
      console.error("Gemini API Error:", data)
      return new NextResponse(JSON.stringify({ error: "Upstream API Error", details: data }), { status: resp.status, headers: { 'Content-Type': 'application/json' } })
    }

    return new NextResponse(JSON.stringify(data), { status: 200, headers: { 'Content-Type': 'application/json' } })
  } catch (err) {
    console.error("Server Route Error:", err)
    return new NextResponse(JSON.stringify({ error: 'Internal Server Error' }), { status: 500 })
  }
}
