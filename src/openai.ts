import { Configuration, OpenAIApi } from 'openai'

export default new OpenAIApi(new Configuration({
  organization: import.meta.env.VITE_OPENAI_ORG_ID,
  apiKey: import.meta.env.VITE_OPENAI_API_KEY
}))