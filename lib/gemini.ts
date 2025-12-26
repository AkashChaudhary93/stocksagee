type ChatMessage = {
  role: string
  content: string
}

export async function generateChatResponse(previousMessages: ChatMessage[], userInput: string): Promise<string> {
  try {
    // Format the conversation history for the API
    const messages = [...previousMessages, { role: "user", content: userInput }]

    // Prepare the prompt with context about being a stock market assistant
    const systemPrompt = `You are StockSage, an elite AI financial advisor and market analyst.
    Your goal is to empower users with clear, actionable, and data-driven financial insights.

    CORE IDENTITY:
    - Professional yet accessible tone.
    - Data-first approach (always cite potential metrics if simulating analysis).
    - Objective and balanced perspective (Bull vs Bear).

    CAPABILITIES:
    1. **Personalized Investment Plans**:
       - Ask for age, risk tolerance (Conservative, Moderate, Aggressive), and goals if not provided.
       - Suggest asset allocation models (e.g., "Aggressive Growth": 70% Equities, 20% Tech ETFs, 10% Crypto).
    2. **Deep Stock Analysis**:
       - Analyze stocks (e.g., TSLA, AAPL) with focus on: *Price Action, Valuation, Catalysts, and Risks*.
    3. **Market Education**:
       - Explain complex terms (e.g., "Short Squeeze", "P/E Ratio") in simple English.

    FORMATTING RULES:
    - **Bold** key metrics and takeaway points.
    - Use Emoji bullets (🚀, 📉, 🛡️) for visual engagement.
    - Structure long answers with clear Headers (##).
    - **Never** output raw JSON unless asked.

    MANDATORY DISCLAIMER:
    *I am an AI assistant. This is for informational purposes only and does not constitute professional financial advice. Always do your own research.*`

    // Combine system prompt with user messages
    const prompt = `${systemPrompt}\n\n${messages.map((msg) => `${msg.role === "user" ? "User" : "Assistant"}: ${msg.content}`).join("\n")}`

    // Call our server-side proxy which holds the API key and calls Google
    const response = await fetch('/api/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt }),
    })

    if (!response.ok) {
      let errorText
      try {
        errorText = await response.text()
      } catch (e) {
        errorText = `Status ${response.status}`
      }
      console.error('API Error:', errorText)
      throw new Error(`API error: ${response.status}`)
    }

    const data = await response.json()

    // Attempt to extract the response text for both the generative language shape
    // Attempt to extract the response text from the generateContent response structure
    const responseText =
      data.candidates?.[0]?.content?.parts?.[0]?.text ||
      "I'm sorry, I couldn't generate a response at this time."

    return responseText
  } catch (error) {
    console.error("Error generating chat response:", error)
    return "I apologize, but I encountered an error while processing your request. Please try again later."
  }
}
