import { useTags } from './useTags'
import { useState } from 'react'
import OpenAI from 'openai'

const API_KEY=import.meta.env.VITE_CLERK_OPENAI_API_KEY

const openai = new OpenAI({ apiKey: API_KEY, dangerouslyAllowBrowser: true })

export const useFetchTagsFromAI = (text : string) => {
  const { tags, loading, error } = useTags()
  const [validTags, setValidTags] = useState(null)

  if (loading) return { fetchTags: () => {}, tags: null, loading: true, error: null, validTags: null }
  if (error) return { fetchTags: () => {}, tags: null, loading: false, error, validTags: null }

  const tagNames = Array.isArray(tags)
    ? tags.filter(tag => tag !== null).map(tag => tag.name)
    : [tags].filter(tag => tag !== null).map(tag => tag.name)

  const fetchTags = async () => {
    try {
      const response = await openai.chat.completions.create({
        model: 'o3-mini',
        messages: [
          {
            role: 'system',
            content: 'You are an AI that extracts relevant tags from a given list based on provided text. Only return tags that match exactly from the list.'
          },
          {
            role: 'user',
            content: `Given the text: "${text}", select only relevant tags from the following list:
            ${tagNames.join(', ')}
            Then return only the tags that are relevant to the text in this format:
            {"validTags": { "tagName1": true, "tagName2": true }}
            If no match is found, return {"validTags": {}}.`
          }
        ],
        response_format: { type: "text"  }

      })

      const parsedResponse = response.choices[0].message.content?.trim() && JSON.parse(response.choices[0].message.content);
      setValidTags(parsedResponse.validTags || {})
      console.log('Valid Tags:', parsedResponse.validTags)
    } catch (error) {
      console.error('Error fetching tags:', error)
      setValidTags(null)
    }
  }

  return { fetchTags, tags, validTags }
}
