import React, { useState, ChangeEvent } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  IconButton,
  Box,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { LogoImg } from './LogoImg';

interface SignUpForm {
  email: string;
  name: string;
  verificationCode?: string;
}

interface FirstSigninFlowProps {
  isFirstSignIn: boolean;
  setIsFirstSignIn: (value: boolean) => void;
}

const FirstSigninFlow: React.FC<FirstSigninFlowProps> = ({ isFirstSignIn, setIsFirstSignIn }) => {
  const [step, setStep] = useState<number>(1);
  const [formData, setFormData] = useState<SignUpForm>({
    email: '',
    name: '',
    verificationCode: '',
  });

  const handleClose = () => {
    setIsFirstSignIn(false);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prevFormData => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleNextStep = () => {
    setStep(prevStep => prevStep + 1);
  };

  const handlePreviousStep = () => {
    setStep(prevStep => prevStep - 1);
  };

  return (
    <Dialog fullWidth open={isFirstSignIn} onClose={handleClose}>
      <Box
        component="section"
        sx={{ p: 4, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}
      >
        <LogoImg Size={60} variant="Dark" />
      </Box>
      <DialogTitle
        sx={{ fontSize: 20, fontWeight: 'bold', textAlign: 'center' }}
      >
        {`Step ${step} / 4: ${step === 1 ? 'Enter your Email and Password' : step === 2 ? 'Verify your Email' : step === 3 ? 'Enter your Name' : 'Complete your Sign-Up'}`}
      </DialogTitle>
      <IconButton
        aria-label="close"
        onClick={handleClose}
        sx={{
          position: 'absolute',
          right: 8,
          top: 8,
          color: theme => theme.palette.grey[500],
        }}
      >
        <CloseIcon />
      </IconButton>
      <DialogContent>
        {step === 1 && (
          <>
            <TextField
              fullWidth
              margin="normal"
              type="email"
              name="email"
              label="Email"
              value={formData.email}
              onChange={handleChange}
            />
            <TextField
              fullWidth
              margin="normal"
              type="password"
              name="password"
              label="Password"
            />
          </>
        )}
        {step === 2 && (
          <TextField
            fullWidth
            margin="normal"
            type="text"
            name="verificationCode"
            label="Verification Code"
            value={formData.verificationCode}
            onChange={handleChange}
          />
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
        {step > 1 && <Button onClick={handlePreviousStep}>Back</Button>}
        {step < 4 && <Button onClick={handleNextStep}>Next</Button>}
        {step === 4 && <Button onClick={handleClose}>Complete Sign-Up</Button>}
      </DialogActions>
    </Dialog>
  );
};

export default FirstSigninFlow;
