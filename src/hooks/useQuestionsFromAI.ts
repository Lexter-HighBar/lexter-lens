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
      generate one short, relevant question that other professionals in the same field would find valuable and relatable. 
      Focus on industry trends, work-life balance, challenges in the profession, or common experiences lawyers face. 
      Make sure the question is conversational and practical, similar to what you might see in professional forums or communities. 
      Here are some examples of the style and tone of questions to inspire the output:
      - "Anyone noticing changes in client expectations post-pandemic?"
      - "How are you managing work-life balance with remote court sessions?"
      - "What strategies are you using to stay updated with recent regulatory changes?"
      - "Is it just me, or has billing become more challenging lately?"
      - "Any tips on dealing with difficult partners or supervisors?"
      Avoid overly generic questions or personal inquiries. 
      Never includes brackets in the queastion like in this example question should be a conplete question without brackets:
      How are you all adapting your practice to the evolving landscape of [mention a relevant legal area if possible, otherwise omit] technology and client communication preferences?


      Format the output as follows:
      {
        "Questions": {
          "question1": "First question"
        }
      }`;
      

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
