import axios from 'axios'

// const OPENROUTER_URL = 'https://openrouter.ai/api/v1/chat/completions'
const OPENROUTER_URL = 'https://openrouter.ai/api/v1/chat/completions'



export const askAi = async (messages)=>{
  try{
    if(!messages || !Array.isArray(messages) || messages.length === 0){
      throw new Error('messages must be a non-empty array')
  }
  const response = await axios.post(OPENROUTER_URL, {
    model: process.env.OPENROUTER_MODEL || 'openai/gpt-4o-mini',
    messages : messages ,  }, 
    {
  headers: {
    Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
    'Content-Type': 'application/json',} })
  
  const content = response?.data?.choices?.[0]?.message?.content                      
  if(!content){
    throw new Error('OpenRouter returned an empty response')
  }
  return content;
  }
  catch(err){

    console.error('Error in askAi:', err.message)
    throw new Error('Failed to get response from OpenRouter: ' + err.message)
}
}
  // export async function chatCompletion({
//   messages,
//   model = process.env.OPENROUTER_MODEL || 'openai/gpt-4o-mini',
//   temperature = 0.4,
//   responseFormat,
// } = {}) {
//   const apiKey = process.env.OPENROUTER_API_KEY

//   if (!apiKey) {
//     throw new Error('OPENROUTER_API_KEY is not configured')
//   }

//   if (!Array.isArray(messages) || messages.length === 0) {
//     throw new Error('messages must be a non-empty array')
//   }

//   const payload = {
//     model,
//     messages,
//     temperature,
//   }

//   if (responseFormat) {
//     payload.response_format = responseFormat
//   }

//   const { data } = await axios.post(OPENROUTER_URL, payload, {
//     headers: {
//       Authorization: `Bearer ${apiKey}`,
//       'Content-Type': 'application/json',
//     },
//     timeout: 60000,
//   })

//   const content = data?.choices?.[0]?.message?.content
//   if (!content) {
//     throw new Error('OpenRouter returned an empty response')
//   }

//   return {
//     content,
//     model: data.model,
//     usage: data.usage,
//   }
// }

// export async function chatCompletionJson(options) {
//   const result = await chatCompletion({
//     ...options,
//     responseFormat: { type: 'json_object' },
//   })

//   try {
//     return {
//       ...result,
//       json: JSON.parse(result.content),
//     }
//   } catch {
//     throw new Error('OpenRouter did not return valid JSON')
//   }
// }
