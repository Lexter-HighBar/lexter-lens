import { useState, ChangeEvent } from 'react';
import { useSignUp } from '@clerk/clerk-react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  IconButton,
  Box
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { LogoImg } from '../components/LogoImg';

interface SignUpForm {
  email: string;
  name: string;
  verificationCode?: string
}

// SignUpForm component for handling the multi-step sign-up process
function SignUpForm() {
  const { signUp, setActive } = useSignUp(); // Clerk's sign-up hook
  const [open, setOpen] = useState<boolean>(true); // Dialog open state
  const [step, setStep] = useState<number>(1); // Current step in the sign-up process
  const [formData, setFormData] = useState<SignUpForm>({
    email: '',
    name: '',
    verificationCode: '',
  });

  // Closes the dialog
  const handleClose = () => {
    setOpen(false);
  };

  // Handles changes in input fields
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handles the first step: creating a new sign-up request
  const handleSubmitStep1 = async () => {
    try {
      if (signUp) {
        await signUp.create({
          emailAddress: formData.email,
          password: (document.querySelector('input[name="password"]') as HTMLInputElement).value,
        });
        await signUp.prepareEmailAddressVerification();
        handleNextStep();
      }
    } catch (error) {
      console.error('Error during sign-up:', error);
    }
  };

  // Handles email verification
  const handleVerifyEmail = async () => {
    if (signUp && formData.verificationCode) {
      try {
        const code = formData.verificationCode;
        {
          await signUp.attemptEmailAddressVerification({ code });
        }
        if (signUp.status === 'complete') {
          handleNextStep()
        }
      } catch (error) {
        console.error('Error verifying email:', error);
      }
    }
  };

  // Placeholder for additional steps
  const handleSubmitStep2 = async () => {
    try {
      handleNextStep();
    } catch (error) {
      console.error('Error during step 2:', error);
    }
  };

  // Completes the sign-up process and sets the active session
  const handleCompleteSignUp = async () => {
    if (signUp && signUp.createdSessionId)
      try {
        setActive({ session: signUp.createdSessionId });
        setOpen(false);
      } catch (error) {
        console.error('Error setting active session:', error);
      }
  };

  // Advances to the next step
  const handleNextStep = () => {
    setStep(step + 1);
  };

  // Returns to the previous step
  const handlePreviousStep = () => {
    setStep(step - 1);
  };

  return (
    <Dialog fullWidth={true} open={open} onClose={() => { }}>
      <Box component="section" sx={{ p: 4, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
        <LogoImg Size={60} variant="Dark" />
      </Box>
      <DialogTitle sx={{ fontSize: 20, fontWeight: 'bold', textAlign: 'center' }}>
        {`Step ${step} / 4: ${step === 1 ? 'Enter your Email and Password' : step === 2 ? 'Verify your Email' : step === 3 ? 'Enter your Name' : 'Complete your Sign-Up'}`}
      </DialogTitle>
      <IconButton
        aria-label="close"
        onClick={handleClose}
        sx={{ position: 'absolute', right: 8, top: 8, color: (theme) => theme.palette.grey[500] }}
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
        {step === 1 && <Button onClick={handleSubmitStep1}>Next</Button>}
        {step === 2 && <Button onClick={handleVerifyEmail}>Verify Email</Button>}
        {step === 3 && <Button onClick={handleSubmitStep2}>Next</Button>}
        {step === 4 && <Button onClick={handleCompleteSignUp}>Complete Sign-Up</Button>}
      </DialogActions>
    </Dialog>
  );
}

export default SignUpForm;
