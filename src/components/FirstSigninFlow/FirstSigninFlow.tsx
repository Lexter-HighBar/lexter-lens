import React, { useEffect, useState } from 'react'
import {
  Box,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  Link,
  Typography,
} from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import { LogoImg } from '../LogoImg'
import Step1 from './Step1'
import Step2 from './Step2'
import Step3 from './Step3'
import { useFetchQuestionsFromAI } from '../../hooks/useQuestionsFromAI'

import { useUser } from '@clerk/clerk-react'

interface FirstSigninFlowProps {
  isFirstSignIn: boolean
  setIsFirstSignIn: (value: boolean) => void
}

const FirstSigninFlow: React.FC<FirstSigninFlowProps> = ({
  isFirstSignIn,
  setIsFirstSignIn,
}) => {
  const [step, setStep] = useState<number>(1)
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [confirmationNumber, setConfirmationNumber] = useState<number>()
  const { user } = useUser()

  // Local form state management
  const [formData, setFormData] = useState({
    isFirstSignIn: false,
    lawyerId: confirmationNumber,
    email: user?.primaryEmailAddress?.emailAddress as string,
    firstName: user?.firstName as string,
    userName: user?.unsafeMetadata.userName as string,
    phone: user?.unsafeMetadata.phone as string,
  })
  console.log('confirmationNumber:', confirmationNumber)
  console.log('formData:', formData)

  const { suggestedQuestions, loading, error } = useFetchQuestionsFromAI(
    confirmationNumber ?? 0,
  )
  console.log('suggestedQuestions:', suggestedQuestions)

  // Update lawyerId in formData when confirmationNumber changes
  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      lawyerId: formData.lawyerId,
    }))
  }, [formData.lawyerId])

  // Form data change handler
  const handleFormDataChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleClose = () => setIsFirstSignIn(false)

  // Next step logic, including user update on step 3
  const handleNextStep = async () => {
    if (step === 3) {
      if (user) {
        try {
          await user.update({
            unsafeMetadata: {
              ...user.unsafeMetadata,
              isFirstSignIn: false,
              firstName: formData.firstName,
              userName: formData.userName,
              phone: formData.phone,
              lawyerId: formData.lawyerId,
              email: formData.email,
              interestTags: selectedTags,
            },
          })
        } catch (error) {
          console.error('Error updating user information:', error)
        }
      }
      handleClose()
    } else {
      setStep((prevStep) => prevStep + 1)
    }
  }

  const handlePreviousStep = () => setStep((prevStep) => prevStep - 1)

  const renderNavigation = () => (
    <Box
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      mt={2}
    >
      {step > 1 ? (
        <Link onClick={handlePreviousStep} sx={{ cursor: 'pointer' }}>
          <Typography sx={{ fontWeight: 'light' }}>Step: {step}/3</Typography>
        </Link>
      ) : (
        <Typography sx={{ fontWeight: 'light' }}>Step: {step}/3</Typography>
      )}
      <Button
        disabled={confirmationNumber === undefined}
        sx={{ fontWeight: 'bold' }}
        onClick={handleNextStep}
      >
        {step === 3 ? 'Complete Sign-Up' : 'Next'}
      </Button>
    </Box>
  )

  return (
    <Dialog fullWidth open={isFirstSignIn} onClose={handleClose}>
      <Box
        component="section"
        sx={{
          p: 4,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '85px',
        }}
      >
        <LogoImg variant="Dark" Size={60} />
      </Box>
      <DialogTitle
        sx={{ fontSize: 20, fontWeight: 'bold', textAlign: 'center' }}
      >
        {step === 1
          ? 'Lexter Lens Quickstart'
          : step === 2
            ? "Let's Make Lexter Lens Relevant to You"
            : step === 3
              ? 'Make the Legal World More Transparent'
              : 'Completed'}
      </DialogTitle>
      <IconButton
        aria-label="close"
        onClick={handleClose}
        sx={{
          position: 'absolute',
          right: 8,
          top: 8,
          color: (theme) => theme.palette.grey[500],
        }}
      >
        <CloseIcon />
      </IconButton>
      <DialogContent
        sx={{ height: '100%', overflowY: 'auto', maxHeight: '80vh' }}
      >
        {step === 1 && (
          <>
            <Step1
              onChange={handleFormDataChange}
              onIdChange={(event) =>
                setConfirmationNumber(Number(event.target.value))
              }
            />{' '}
          </>
        )}
        {step === 2 && confirmationNumber && (
          <>
            <Step2
              lawyerId={confirmationNumber}
              selectedTags={selectedTags}
              setSelectedTags={setSelectedTags}
            />
          </>
        )}
        {step === 3 && suggestedQuestions && (
          <Step3
            tags={selectedTags || []}
            suggestedQuestions={suggestedQuestions}
            loading={loading}
            error={error}
            handleInputChange={handleFormDataChange}
          />
        )}
        {renderNavigation()}
      </DialogContent>
    </Dialog>
  )
}

export default FirstSigninFlow
