import { useTags } from './useTags'
import { GoogleGenerativeAI } from '@google/generative-ai'
import { useState } from 'react'

const API_KEY = 'AIzaSyAxbDQyrIZcR9fnjKQNGDGIgoMcgnswSCI'
const genAI = new GoogleGenerativeAI(API_KEY)
const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' })

export const useFetchTagsFromAI = (text: string) => {
  const { tags, loading, error } = useTags()
  const [validTags, setValidTags] = useState<{ [key: string]: boolean } | null>(
    null
  )

  if (loading)
    return { tags: null, loading: true, error: null, validTags: null }

  if (error) return { tags: null, loading: false, error, validTags: null }

  const tagNames = Array.isArray(tags)
    ? tags.filter((tag) => tag !== null).map((tag) => tag.name)
    : [tags].filter((tag) => tag !== null).map((tag) => tag.name)


  const fetchTags = async () => {
    try {
      const response = await model.generateContent({
        contents: [
          {
            role: 'user',
            parts: [
              {
                text: `Given the text: "${text}", select only relevant tags from the following list:
                      ${tagNames} Then return only the tags that are relevant to the text in this format:
                      validTags: { tagName1: true, tagName2: true, ... }
                      Only include tags that match exactly from the list. Do not create new tags. If no match is found, return an empty object.
                      Ensure the response follows this structure: validTags: {}` ,
              },
            ],
          },
        ],
      })
      const data = await response.response
      const textResponse = data.text()
  
      // Clean up the response by removing unwanted backticks or formatting
      const cleanedResponse = textResponse
        .replace(/```json\n/, '')  // Remove backticks and code block formatting
        .replace(/```/, '')  // Remove ending backticks
        .replace('validTags:', '')  // Remove the prefix 'validTags:'
        .trim()
  
      console.log('Cleaned Response:', cleanedResponse)
  
      // Try parsing the cleaned response
      const parsedResponse = JSON.parse(cleanedResponse)
      console.log('Parsed Response:', parsedResponse)
  
      const validTags = parsedResponse || {}
      setValidTags(validTags)
      console.log('Valid Tags:', validTags)
    } catch (error) {
      console.error('Error fetching tags:', error)
      setValidTags(null)
    }
  }
  
  return { fetchTags, tags, validTags }
}
