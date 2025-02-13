import { useState, useCallback, useEffect, useRef } from 'react'
import { OpenAI } from 'openai'
import { useFilterLawyersById } from './useFilterLawyersById'

const openai = new OpenAI({
  apiKey: `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`,
  //to remove exposed API key
  dangerouslyAllowBrowser: true,
})
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
      generate one insightful questions that other professionals in the same field would find relevant and valuable. 
      Focus on aspects such as industry trends, work-life balance, and organizational culture. 
      Avoid personal questions or inquiries about the lawyer's individual experiences. 
      try to generate a real life question that someone would ask.
      do not return [object] or [object Object] inside the question content.
      Format the output as follows:
      {
        "Questions": {
          "question1": "First question"
        }
      }`

      const response = await openai.chat.completions.create({
        messages: [
          {
            role: 'user',
            content: prompt,
          },
        ],
        model: 'gpt-3.5-turbo',
      })

      console.log('AI Response:', response)
      const textResponse = response.choices[0].message.content
      console.log('Raw AI Response:', textResponse)

      const cleanedResponse = textResponse
        ?.replace(/```json\n?|```/g, '')
        .trim()
      const parsedResponse = JSON.parse(cleanedResponse || '{}')
      console.log('Cleaned Response:', cleanedResponse)

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
