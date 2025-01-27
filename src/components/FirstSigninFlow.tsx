import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Link,
  TextField,
  Typography,
  Checkbox,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { LogoImg } from './LogoImg';
import { useLawyer } from '../lib/contexts/LawyerContext';

interface FirstSigninFlowProps {
  isFirstSignIn: boolean;
  setIsFirstSignIn: (value: boolean) => void;
}

const FirstSigninFlow: React.FC<FirstSigninFlowProps> = ({
  isFirstSignIn,
  setIsFirstSignIn,
}) => {
  const { email, firstName, userName, phone, handleUpdateUser, handleChange } =
    useLawyer();

  const [step, setStep] = useState<number>(1);
  const [isPrivacyPolicyOpen, setIsPrivacyPolicyOpen] = useState(false); // New state for privacy policy dialog

  const [formData, setFormData] = useState({
    email,
    firstName,
    userName,
    phone,
  });

  useEffect(() => {
    setFormData({
      email,
      firstName: firstName || '',
      userName: userName || '',
      phone: phone || '',
    });
  }, [email, firstName, userName, phone]);

  const handleClose = () => setIsFirstSignIn(false);
  const handleNextStep = () => setStep((prevStep) => prevStep + 1);
  const handlePreviousStep = () => setStep((prevStep) => prevStep - 1);

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

            <Checkbox /> Privacy on Lexter
            <ul>
              <li>Line about privacy here, leave room for now (no profiles)</li>
              <li>Line about privacy here, leave room for now (privacy matters)</li>
              <li>
                Line about nobody seeing your tags, interests, followed threads
              </li>
              <li>
                <Link
                  onClick={() => setIsPrivacyPolicyOpen(true)} // Open the modal
                  sx={{
                    color: 'primary.main',
                    cursor: 'pointer',
                    textDecoration: 'underline',
                  }}
                >
                  Lawlink
                </Link>
              </li>
            </ul>
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
          <Button
            sx={{ fontWeight: 'bold' }}
            onClick={() => {
              handleUpdateUser();
              handleClose();
            }}
          >
            Complete Sign-Up
          </Button>
        )}
      </DialogActions>

      {/* Privacy Policy Dialog */}
      <Dialog
        open={isPrivacyPolicyOpen}
        onClose={() => setIsPrivacyPolicyOpen(false)}
        fullWidth
        maxWidth="md"
      >
        <DialogTitle>Privacy Policy</DialogTitle>
        <DialogContent>
          <Typography variant="body1">
            This is where you can place the full privacy policy content. Keep it
            detailed and user-friendly.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setIsPrivacyPolicyOpen(false)}
            sx={{ fontWeight: 'bold' }}
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Dialog>
  );
};

export default FirstSigninFlow;