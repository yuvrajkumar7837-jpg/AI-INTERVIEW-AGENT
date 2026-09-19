import axios from 'axios'

const OPENROUTER_URL = 'https://openrouter.ai/api/v1/chat/completions'

export async function chatCompletion({ messages, model = process.env.OPENROUTER_MODEL || 'openai/gpt-4o-mini', temperature = 0.4, responseFormat } = {}) {
  const apiKey = process.env.OPENROUTER_API_KEY
  if (!apiKey) throw new Error('OPENROUTER_API_KEY is not configured')
  if (!Array.isArray(messages) || messages.length === 0) throw new Error('messages must be a non-empty array')
  const payload = { model, messages, temperature }
  if (responseFormat) payload.response_format = responseFormat
  const { data } = await axios.post(OPENROUTER_URL, payload, {
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
      'HTTP-Referer': process.env.CLIENT_ORIGIN || 'http://localhost:5173',
      'X-Title': 'AI Interview Agent',
    },
    timeout: 60000,
  })
  const content = data?.choices?.[0]?.message?.content
  if (!content) throw new Error('OpenRouter returned an empty response')
  return { content, model: data.model, usage: data.usage }
}

export async function chatCompletionJson(options) {
  const result = await chatCompletion({ ...options, responseFormat: { type: 'json_object' } })
  try {
    return { ...result, json: JSON.parse(result.content) }
  } catch (error) {
    throw new Error(`OpenRouter did not return valid JSON: ${error.message}`)
  }
}
