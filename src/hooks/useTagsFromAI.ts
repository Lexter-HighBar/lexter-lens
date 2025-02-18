import { useTags } from './useTags'
import { GoogleGenerativeAI } from '@google/generative-ai'
import { useState } from 'react'
import { Tag } from '../lib/types'

const API_KEY = 'AIzaSyAxbDQyrIZcR9fnjKQNGDGIgoMcgnswSCI'
const genAI = new GoogleGenerativeAI(API_KEY)
const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' })

export const useFetchTagsFromAI = (text: string) => {
  const { tags, loading, error } = useTags()
  const [validTags, setValidTags] = useState<{ [key: string]: boolean } | null>(
    null,
  )

  if (loading)
    return { tags: null, loading: true, error: null, validTags: null }

  if (error) return { tags: null, loading: false, error, validTags: null }

  const tagNames = Array.isArray(tags)
  ? (tags as { name: string }[]).filter((tag) => tag !== null).map((tag) => tag.name)
  : ([tags] as { name: string }[]).filter((tag) => tag !== null).map((tag) => tag.name)

  const fetchTags = async () => {
    try {
      const response = await model.generateContent({
        contents: [
          {
            role: 'user',
            parts: [
              {
                text: `Given the text: "${text}", select only relevant tags from the following list:
                      ${tagNames}. Then return only the tags that are relevant to the text in this format:
                      validTags: { tagName1: true, tagName2: true, ... }
                      Only include tags that match exactly from the list. Do not create new tags. If no match is found, return an empty object.
                      Never return the phrase "choose the topic" in any form. 
                      Ensure the response follows this structure: validTags: {}
              
                      Examples:
              
                      Example 1:
                      Text: "Canada's top court is considering offering mediation."
                      Tag list: ["Canada", "Supreme Court", "mediation", "law", "education"]
                      Response: validTags: { Canada: true, Supreme Court: true, mediation: true }
              
                      Example 2:
                      Text: "Midlife career crisis. Leave government job or study for LSAT"
                      Tag list: ["career", "government", "LSAT", "law", "Canada"]
                      Response: validTags: { career: true, government: true, LSAT: true }
              
                      Example 3:
                      Text: "Called Police on Dad for Domestic Violence"
                      Tag list: ["domestic violence", "police", "family", "law", "Canada"]
                      Response: validTags: { domestic violence: true, police: true }
              
                      Example 4:
                      Text: "Should I Stay in My LLB Program or Drop Out, Continue My Bachelor of Arts Degree, and Then Apply to Law School in Canada?"
                      Tag list: ["LLB", "law school", "Canada", "education", "career"]
                      Response: validTags: { LLB: true, law school: true, Canada: true }
              
                      Example 5:
                      Text: "Anyone with experience with MT Align, McCarthy Tetrault's independent contractor lawyer program?"
                      Tag list: ["MT Align", "McCarthy Tetrault", "lawyer", "contractor", "Canada"]
                      Response: validTags: { MT Align: true, McCarthy Tetrault: true, lawyer: true }
              
                      Question for the final user:
                      Based on the text provided, which tags are the most relevant? Only select from the available options and avoid using unrelated phrases.
                `,
              }
              
            ],
          },
        ],
      })
      const data = await response.response
      const textResponse = data.text()

      // Clean up the response by removing unwanted backticks or formatting
      const cleanedResponse = textResponse
        .replace(/```json\n/, '') // Remove backticks and code block formatting
        .replace(/```/, '') // Remove ending backticks
        .replace('validTags:', '') // Remove the prefix 'validTags:'
        .trim()

      // Try parsing the cleaned response
      const parsedResponse = JSON.parse(cleanedResponse)
      console.log('Parsed Response:', parsedResponse)

      const validTags = parsedResponse || {}
      setValidTags(validTags)
    } catch (error) {
      console.error('Error fetching tags:', error)
      setValidTags(null)
    }
  }

  return { fetchTags, tags, validTags }
}
