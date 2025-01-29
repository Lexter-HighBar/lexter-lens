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
  Tooltip,
  Checkbox,
  Chip,
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
  const { email, firstName, userName, phone, handleUpdateUser, handleChange } = useLawyer();

  const [step, setStep] = useState<number>(1);
  const [formData, setFormData] = useState({
    email,
    firstName,
    userName,
    phone,
  });

  const [tags, setTags] = useState({
    Cities: ['Toronto', 'Vancouver'],
    Expertise: ['Corporate Law', 'Real Estate'],
    Industries: ['Technology', 'Healthcare'],
    'Firm Offices': ['Downtown', 'Uptown'],
  });

  const handleTagRemove = (category: string, tag: string) => {
    setTags((prev) => ({
      ...prev,
      [category]: prev[category].filter((t) => t !== tag),
    }));
  };

  const handleTagAdd = (category: string, newTag: string) => {
    setTags((prev) => ({
      ...prev,
      [category]: [...prev[category], newTag],
    }));
  };

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
            <Typography>Privacy Policies</Typography>
            <ul>
              <li>Bullet point 1</li>
              <li>Bullet point 2</li>
              <li>Bullet point 3</li>
            </ul>
            <Checkbox /> I Accept the Privacy Policies
          </>
        )}
        {step === 2 && (
          <>
            <Typography variant="body1" sx={{ fontWeight: 'medium', mb: 1 }}>
              Authority Tags
            </Typography>
            <Typography variant="body1" sx={{ fontWeight: 'medium', mb: 1 }}>
              Suggested Tags
            </Typography>
            <Tooltip title="Authority Tags help identify the expertise, location, and industry of a legal professional.">
              <Button variant="text">Learn More</Button>
            </Tooltip>

            {Object.entries(tags).map(([category, tagList]) => (
              <Box key={category} sx={{ mb: 3 }}>
                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                  {category}
                </Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
                  {tagList.map((tag, index) => (
                    <Chip
                      key={index}
                      label={tag}
                      onDelete={() => handleTagRemove(category, tag)}
                    />
                  ))}
                </Box>
                <TextField
                  placeholder={`Add ${category.toLowerCase()}...`}
                  fullWidth
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      const newTag = (e.target as HTMLInputElement).value.trim();
                      if (newTag) {
                        handleTagAdd(category, newTag);
                        (e.target as HTMLInputElement).value = '';
                      }
                    }
                  }}
                />
              </Box>
            ))}
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
    </Dialog>
  );
};

export default FirstSigninFlow;

