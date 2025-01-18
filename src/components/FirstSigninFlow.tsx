import React, { useState, ChangeEvent, useEffect } from 'react'
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  IconButton,
  Box,
  Link,
  Typography,
} from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import { useUser } from '@clerk/clerk-react'

import { LogoImg } from './LogoImg'
import { useLawyer } from '../lib/contexts/LawyerContext'

interface FirstSigninFlowProps {
  isFirstSignIn: boolean
  setIsFirstSignIn: (value: boolean) => void
}

const FirstSigninFlow: React.FC<FirstSigninFlowProps> = ({
  isFirstSignIn,
  setIsFirstSignIn,
}) => {
  const { user } = useUser()
  const { email, firstName, userName, phone } = useLawyer()
  const [step, setStep] = useState<number>(1)
  const [formData, setFormData] = useState({
    email,
    firstName,
    userName,
    phone,
  })
  useEffect(() => {
    setFormData({
      email,
      firstName: firstName || '',
      userName: userName || '',
      phone: phone || '',
    })
  }, [email, firstName, userName, phone])
  console.log(formData)
  const handleClose = () => setIsFirstSignIn(false)

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }))
  }

  const handleNextStep = () => setStep((prevStep) => prevStep + 1)
  const handlePreviousStep = () => setStep((prevStep) => prevStep - 1)

  const handleUpdateUser = async () => {
    if (user) {
      try {
        await user.update({
          unsafeMetadata: {
            ...user.unsafeMetadata,
            firstName: formData.firstName,
            userName: formData.userName,
            phone: formData.phone,
          },
        })
      } catch (error) {
        console.error('Error updating user information:', error)
      }
      handleClose()
    }
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
        <LogoImg variant="Dark" />
      </Box>
      <DialogTitle
        sx={{ fontSize: 20, fontWeight: 'bold', textAlign: 'center' }}
      >
        {step === 1
          ? 'Lexter Lens Quickstart'
          : step === 2
            ? `Let's Make Lexter Lens Relevant to You`
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
      <DialogContent>
        {step === 1 && (
          <>
            <Typography>Welcome, {firstName ? firstName : ''}</Typography>
            <Typography>Create a first name and a user name:</Typography>
            <TextField
              fullWidth
              margin="normal"
              name="firstName"
              label="First Name"
              value={formData.firstName}
              onChange={handleChange}
            />
            <TextField
              fullWidth
              margin="normal"
              name="userName"
              label="User Name"
              value={formData.userName}
              onChange={handleChange}
            />
          </>
        )}
        {step === 2 && (
          <>
            <Typography>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </Typography>
            <TextField
              fullWidth
              margin="normal"
              name="phone"
              label="Phone"
              value={formData.phone}
              onChange={handleChange}
            />
          </>
        )}
        {step === 3 && (
          <TextField
            fullWidth
            margin="normal"
            name="firstName"
            label="First Name"
            value={formData.firstName}
            onChange={handleChange}
          />
        )}
      </DialogContent>
      <DialogActions>
        {step > 1 && (
          <Link onClick={handlePreviousStep}>
            <Typography sx={{ fontWeight: 'light' }}>
              Step: {step - 1}/3
            </Typography>
          </Link>
        )}
        {step < 4 && (
          <Button sx={{ fontWeight: 'bold' }} onClick={handleNextStep}>
            Next
          </Button>
        )}
        {step === 4 && (
          <Button sx={{ fontWeight: 'bold' }} onClick={handleUpdateUser}>
            Complete Sign-Up
          </Button>
        )}
      </DialogActions>
    </Dialog>
  )
}

export default FirstSigninFlow
