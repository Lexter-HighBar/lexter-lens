import React, { useState, ChangeEvent } from 'react'
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  IconButton,
  Box,
  Divider,
  Link,
  Typography,
} from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import { LogoImg } from './LogoImg'

interface SignUpForm {
  email: string
  name: string
  verificationCode?: string
}

interface FirstSigninFlowProps {
  isFirstSignIn: boolean
  setIsFirstSignIn: (value: boolean) => void
}

const FirstSigninFlow: React.FC<FirstSigninFlowProps> = ({
  isFirstSignIn,
  setIsFirstSignIn,
}) => {
  const [step, setStep] = useState<number>(1)
  const [formData, setFormData] = useState<SignUpForm>({
    email: '',
    name: '',
    verificationCode: '',
  })

  const handleClose = () => {
    setIsFirstSignIn(false)
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }))
  }

  const handleNextStep = () => {
    setStep((prevStep) => prevStep + 1)
  }

  const handlePreviousStep = () => {
    setStep((prevStep) => prevStep - 1)
  }

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
        }}
      >
        <LogoImg Size={60} variant="Dark" />
      </Box>
      <DialogTitle
        sx={{ fontSize: 20, fontWeight: 'bold', textAlign: 'center' }}
      >
        {`${
          step === 1
            ? 'Lexter Lens Quickstart'
            : step === 2
              ? `Let's Make Lexter Lens Relevant to You`
              : step === 3
                ? 'Make the Legal World More Transparent'
                : 'Completed'
        }`}
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
      <DialogContent>
        {step === 1 && (
          <>
            <p>
              {' '}
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
          </>
        )}
        {step === 2 && (
          <>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
            <TextField
              fullWidth
              margin="normal"
              type="text"
              name="verificationCode"
              label="Verification Code"
              value={formData.verificationCode}
              onChange={handleChange}
            />
            <Divider />
              <TextField
              fullWidth
              margin="normal"
              type="text"
              name="verificationCode"
              label="Verification Code"
              value={formData.verificationCode}
              onChange={handleChange}
            />
          </>
        )}
        {step === 3 && (
          <TextField
            fullWidth
            margin="normal"
            type="text"
            name="name"
            label="Full Name"
            value={formData.name}
            onChange={handleChange}
          />
        )}
      </DialogContent>
      <DialogActions>
        {step > 1 && <Link onClick={handlePreviousStep} ><Typography sx={{fontWeight: 'light'}}>Step: {step-1}/3</Typography></Link>}
        {step < 4 && <Button sx={{fontWeight: 'bold'}} onClick={handleNextStep}>Next</Button>}
        {step === 4 && <Button  sx={{fontWeight: 'bold'}} onClick={handleClose}>Complete Sign-Up</Button>}
      </DialogActions>
    </Dialog>
  )
}

export default FirstSigninFlow
