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
    if (!lawyerData?.lawyer) {
      console.warn('Missing required data, skipping AI call.')
      return
    }

    setLoading(true)
    setError(null)

    try {
      const lawyer = lawyerData.lawyer
      const prompt = `You are provided with a lawyer's profile: "${lawyer}". 
      Based on this profile and the related expertise tags: ${lawyer.tags}, generate one insightful question that other professionals in the same field would find relevant and valuable.  
      
      ### **Guidelines for the Question:**
      - The question should focus on **industry trends, work-life balance, and organizational culture**.
      - Avoid personal questions or inquiries about the lawyer’s individual experiences.
      - The question should be practical and discussion-worthy within the legal profession.
      - Ensure the question is **open-ended**, encouraging thoughtful responses.
      
      ### **Expected JSON Output Format:**
      \`\`\`json
      {
        "Questions": {
          "question1": "Generated question here."
        }
      }
      \`\`\`
      
      ### **Examples of Well-Structured Questions:**
      
      #### **Example 1: Corporate Law & M&A**
      **Input:**  
      _Lawyer profile with expertise in Corporate Law, Mergers & Acquisitions (M&A)._
      
      **Generated Question:**
      \`\`\`json
      {
        "Questions": {
          "question1": "How do corporate lawyers navigate the increasing regulatory scrutiny in M&A deals while ensuring efficiency and compliance for their clients?"
        }
      }
      \`\`\`
      
      #### **Example 2: Criminal Defense**
      **Input:**  
      _Lawyer profile with expertise in Criminal Defense._
      
      **Generated Question:**
      \`\`\`json
      {
        "Questions": {
          "question1": "With advancements in forensic technology, how should criminal defense attorneys adapt their strategies to challenge DNA evidence more effectively in court?"
        }
      }
      \`\`\`
      
      #### **Example 3: Employment Law**
      **Input:**  
      _Lawyer profile with expertise in Employment Law._
      
      **Generated Question:**
      \`\`\`json
      {
        "Questions": {
          "question1": "How should employment lawyers advise clients on remote work policies to mitigate legal risks while maintaining workforce flexibility?"
        }
      }
      \`\`\`
      
      These examples serve as references for generating insightful questions that align with the lawyer’s expertise. Generate a question following this structure.`;
      

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
