import {
    createContext,
    useContext,
    useState,
    useEffect,
    ReactNode,
  } from 'react'
  import { useUser } from '@clerk/clerk-react'
  
  interface LawyerContextType {
    email: string | undefined
    firstName: string | undefined
    userName: string | undefined
    phone: string | undefined
    isLoading: boolean
    setLawyerData: React.Dispatch<React.SetStateAction<LawyerContextType>>
  }
  
  type Props = {
    children: ReactNode
  }
  
  const LawyerContext = createContext<LawyerContextType | undefined>(undefined)
  
  export const LawyerProvider = ({ children }: Props) => {
    const { user, isLoaded } = useUser()
    const [lawyerData, setLawyerData] = useState<LawyerContextType>({
      email: '', // set initial empty string to display something while loading
      firstName: '', // set initial empty string or some placeholder value
      userName: '', // set initial empty string or placeholder
      phone: '', // set initial empty string or placeholder
      isLoading: true,
      setLawyerData: () => {}, // placeholder to initialize
    })
  
    useEffect(() => {
      if (isLoaded && user) {
        // Initialize and set the data properly once the user is loaded
        const firstName = user.unsafeMetadata.firstName as string | undefined;
        const userName = user.unsafeMetadata.userName as string | undefined;
        const phone = user.unsafeMetadata.phone as string | undefined;
  
        setLawyerData(prev => ({
          ...prev,
          email: user.primaryEmailAddress?.emailAddress || '', // empty string if email is undefined
          firstName: firstName || '', // set default empty string if undefined
          userName: userName || '', // set default empty string if undefined
          phone: phone || '', // set default empty string if undefined
          isLoading: false,
        }))
      }
    }, [isLoaded, user])
  
    return (
      <LawyerContext.Provider value={{ ...lawyerData, setLawyerData }}>
        {children}
      </LawyerContext.Provider>
    )
  }
  
  export const useLawyer = (): LawyerContextType => {
    const context = useContext(LawyerContext)
    if (!context) {
      throw new Error('useLawyer must be used within a LawyerProvider')
    }
    return context
  }
  