import React, { useState, useEffect } from 'react'
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
import { LogoImg } from './LogoImg'
import { useLawyer } from '../lib/contexts/LawyerContext'
import Checkbox from '@mui/material/Checkbox';


interface FirstSigninFlowProps {
  isFirstSignIn: boolean
  setIsFirstSignIn: (value: boolean) => void
}

const FirstSigninFlow: React.FC<FirstSigninFlowProps> = ({
  isFirstSignIn,
  setIsFirstSignIn,
}) => {
  const { email, firstName, userName, phone, handleUpdateUser, handleChange } =
    useLawyer()

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
  const handleNextStep = () => setStep((prevStep) => prevStep + 1)
  const handlePreviousStep = () => setStep((prevStep) => prevStep - 1)

  return (
    <Dialog fullWidth open={isFirstSignIn} onClose={handleClose} >
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
        <LogoImg variant="Dark" Size={60}  />
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
      <DialogContent sx={{ minHeight: '200px' }}>
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
             
             <Checkbox/>Privacy on Lexter
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

          <Button sx={{ fontWeight: 'bold' }} onClick={() => {
            handleUpdateUser(); 
            handleClose(); 
          }}>
            Complete Sign-Up
          </Button>
        )}
      </DialogActions>
    </Dialog>
  )
}

export default FirstSigninFlow
