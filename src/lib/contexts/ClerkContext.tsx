import {
    createContext,
    useContext,
    useState,
    useEffect,
    ReactNode,
  } from 'react';
  import { useUser } from '@clerk/clerk-react';
  
  interface LawyerContextType {
    email: string | undefined;
    firstName: string | undefined;
    userName: string | undefined;
    phone: string | undefined;
    isLoading: boolean;
    setLawyerData: React.Dispatch<React.SetStateAction<LawyerContextType>>;
    handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void; // Explicitly define the type here
    handleUpdateUser: () => void;
  }
  
  
  type Props = {
    children: ReactNode;
  };
  
  const LawyerContext = createContext<LawyerContextType | undefined>(undefined);
  
  export const LawyerProvider = ({ children }: Props) => {
    const { user, isLoaded } = useUser();

    const [lawyerData, setLawyerData] = useState<LawyerContextType>({
      email: '', // set initial empty string to display something while loading
      firstName: '', // set initial empty string or some placeholder value
      userName: '', // set initial empty string or placeholder
      phone: '', // set initial empty string or placeholder
      isLoading: true,
      setLawyerData: () => {}, // placeholder to initialize
      handleChange: () => {}, // placeholder for handleChange
      handleUpdateUser: () => {}, // placeholder for handleUpdateUser
    });
  
    useEffect(() => {
      if (isLoaded && user) {

        const firstName = user.unsafeMetadata.firstName as string | undefined;
        const userName = user.unsafeMetadata.userName as string | undefined;
        const phone = user.unsafeMetadata.phone as string | undefined;
  
        setLawyerData((prev) => ({
          ...prev,
          email: user.primaryEmailAddress?.emailAddress || '',
          firstName: firstName || '',
          userName: userName || '',
          phone: phone || '',
          isLoading: false,
        }));
      }
    }, [isLoaded, user]);
  
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = event.target;
      setLawyerData((prevFormData) => ({
        ...prevFormData,
        [name]: value,
      }));
    };
  
    const handleUpdateUser = async () => {
      if (user) {
        try {
          await user.update({
            unsafeMetadata: {
              ...user.unsafeMetadata,
              firstName: lawyerData.firstName,
              userName: lawyerData.userName,
              phone: lawyerData.phone,
            },
          });
        } catch (error) {
          console.error('Error updating user information:', error);
        }
      }
    };
  
    return (
      <LawyerContext.Provider
        value={{
          ...lawyerData,
          setLawyerData,
          handleChange,
          handleUpdateUser,
        }}
      >
        {children}
      </LawyerContext.Provider>
    );
  };
  
  export const useLawyer = (): LawyerContextType => {
    const context = useContext(LawyerContext);
    if (!context) {
      throw new Error('useLawyer must be used within a LawyerProvider');
    }
    return context;
  };