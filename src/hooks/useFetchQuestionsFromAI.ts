import { useState, useCallback, useEffect, useRef } from 'react'
import { GoogleGenerativeAI } from '@google/generative-ai'
import { useFilterLawyersById } from './useFilterLawyersById'

// Google Generative AI Configuration
const API_KEY = 'AIzaSyAxbDQyrIZcR9fnjKQNGDGIgoMcgnswSCI' 
const genAI = new GoogleGenerativeAI(API_KEY)
const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' })

export const useFetchQuestionsFromAI = (id: number) => {
  const [suggestedQuestions, setSuggestedQuestions] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const lawyerData = useFilterLawyersById(id)
  const hasFetched = useRef(false)

  const fetchRelevantTags = useCallback(async () => {
    console.log('lawyerData:', lawyerData)
    if (!lawyerData?.lawyer) {
      console.warn('Missing required data, skipping AI call.')
      return
    }

    setLoading(true)
    setError(null)

    try {
      const lawyer = lawyerData.lawyer
      console.log('Lawyer Data:', lawyer)

      const prompt = `You are provided with a lawyer's profile: "${lawyer}". Based on this profile and the related expertise tags: ${lawyer.tags}, 
      generate one insightful question that other professionals in the same field would find relevant and valuable. 
      Focus on aspects such as industry trends, work-life balance, and organizational culture. 
      Avoid personal questions or inquiries about the lawyer's individual experiences. 
      Try to generate a real-life question that someone would ask.
      Format the output as follows:
      {
        "Questions": {
          "question1": "First question"
        }
      }`

      const response = await model.generateContent({
        contents: [
          {
            role: 'user',
            parts: [
              {
                text: prompt,
              },
            ],
          },
        ],
      })

      const data = await response.response
      const textResponse = await data.text()

      const cleanedResponse = textResponse
        ?.replace(/```json\n?|```/g, '') // Clean up formatting
        .trim()

      const parsedResponse = JSON.parse(cleanedResponse || '{}')
      console.log('Parsed Response:', parsedResponse)

      setSuggestedQuestions(parsedResponse?.Questions || {})
    } catch (err) {
      if (err instanceof Error) {
        console.error('Error fetching relevant tags:', err)
        setError(err.message)
      } else {
        console.error('Unknown error:', err)
        setError('An unknown error occurred')
      }
      setSuggestedQuestions(null)
    } finally {
      setLoading(false)
    }
  }, [lawyerData])

  useEffect(() => {
    if (lawyerData?.lawyer && !hasFetched.current) {
      fetchRelevantTags()
      hasFetched.current = true
    }
  }, [id, lawyerData, fetchRelevantTags])

  return { suggestedQuestions, loading, error }
}
