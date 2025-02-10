import React, { useState, useEffect, useRef } from 'react';
import {
  Box,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  Link,
  TextField,
  Typography,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { LogoImg } from './LogoImg';
import { UseClerkStorage } from '../hooks/UseClerkStorage';
import TagsManager from './TagsManager';

interface FirstSigninFlowProps {
  isFirstSignIn: boolean;
  setIsFirstSignIn: (value: boolean) => void;
}

interface Tags {
  [key: string]: string[];
}

const FirstSigninFlow: React.FC<FirstSigninFlowProps> = ({
  isFirstSignIn,
  setIsFirstSignIn,
}) => {
  const { email, firstName, userName, phone, handleUpdateUser } = UseClerkStorage();
  const [step, setStep] = useState<number>(1);
  const [formData, setFormData] = useState({
    email,
    firstName,
    userName,
    phone,
    contribution1: '',
    contribution2: '',
    contribution3: '',
    question1: '',
    question2: '',
    question3: '',
  });

  const defaultAuthorityTags = [
    'Calgary',
    'Corporate & Commercial Law',
    'Litigation',
    'BDP - Calgary',
    'Ogilvie - Calgary',
    'Oil and Gas',
  ];
  const [selectedDefaultTags, setSelectedDefaultTags] = useState<string[]>([]);

  const [tags, setTags] = useState<Tags>({
    Cities: ['Toronto', 'Vancouver'],
    Expertise: ['Corporate Law', 'Real Estate'],
    Industries: ['Technology', 'Healthcare'],
    'Firm Offices': ['Downtown', 'Uptown'],
  });

  const handleDefaultTagClick = (tag: string) => {
    setSelectedDefaultTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

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

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Keep the original fields while updating email, firstName, userName, and phone
  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      email,
      firstName: firstName || '',
      userName: userName || '',
      phone: phone || '',
    }));
  }, [email, firstName, userName, phone]);

  const handleClose = () => setIsFirstSignIn(false);

  // Modify the step logic: When the step is 3, clicking Next will complete the registration process
  const handleNextStep = () => {
    if (step === 3) {
      handleUpdateUser();
      handleClose();
    } else {
      setStep((prevStep) => prevStep + 1);
    }
  };
  const handlePreviousStep = () => setStep((prevStep) => prevStep - 1);

  // Create a ref for the private questions section so we can scroll to it
  const questionsSectionRef = useRef<HTMLDivElement>(null);

  // Scroll down to the private questions section when the first skip is clicked
  const handleSkipScrollDown = () => {
    questionsSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Place the step instructions and the next-step button into the shared section of the popup content block
  const renderNavigation = () => (
    <Box display="flex" justifyContent="space-between" alignItems="center" mt={2}>
      {step > 1 ? (
        <Link onClick={handlePreviousStep} sx={{ cursor: 'pointer' }}>
          <Typography sx={{ fontWeight: 'light' }}>Step: {step}/3</Typography>
        </Link>
      ) : (
        <Typography sx={{ fontWeight: 'light' }}>Step: {step}/3</Typography>
      )}
      <Button sx={{ fontWeight: 'bold' }} onClick={handleNextStep}>
        {step === 3 ? 'Complete Sign-Up' : 'Next'}
      </Button>
    </Box>
  );

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
      <DialogTitle sx={{ fontSize: 20, fontWeight: 'bold', textAlign: 'center' }}>
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
      <DialogContent sx={{ minHeight: '200px' }}>
        {step === 1 && (
          <>
            <Typography>Welcome, {formData.firstName || ''}</Typography>
            <Typography>Create a first name and a user name:</Typography>
            <TextField
              fullWidth
              margin="normal"
              name="firstName"
              label="First Name"
              value={formData.firstName}
              onChange={handleInputChange}
            />
            <TextField
              fullWidth
              margin="normal"
              name="userName"
              label="User Name"
              value={formData.userName}
              onChange={handleInputChange}
            />
            <Typography>Privacy Policies</Typography>
            <ul>
              <li>Bullet point 1</li>
              <li>Bullet point 2</li>
              <li>Bullet point 3</li>
            </ul>
            {renderNavigation()}
          </>
        )}
        {step === 2 && (
          <>
            <TagsManager
              defaultTags={defaultAuthorityTags}
              selectedDefaultTags={selectedDefaultTags}
              onDefaultTagClick={handleDefaultTagClick}
              tags={tags}
              onTagRemove={handleTagRemove}
              onTagAdd={handleTagAdd}
            />
            {renderNavigation()}
          </>
        )}
        {step === 3 && (
          <>
            <Typography>
              Based on your tags, you may be able to help other legal professionals.
            </Typography>
            <Box
              sx={{
                border: '1px solid grey',
                borderRadius: '4px',
                padding: '16px',
                backgroundColor: 'rgba(0, 0, 0, 0.05)',
                mb: -1,
              }}
            >
              <Typography sx={{ fontSize: 16, fontWeight: 'bold' }}>
                What's the mat leave culture REALLY like at BDP in Calgary?
              </Typography>
            </Box>
            <TextField
              fullWidth
              margin="normal"
              placeholder="Have a contribution? Share it now."
              name="contribution1"
              value={formData.contribution1}
              onChange={handleInputChange}
            />
            <Box
              sx={{
                border: '1px solid grey',
                borderRadius: '4px',
                padding: '16px',
                backgroundColor: 'rgba(0, 0, 0, 0.05)',
                mb: -1,
              }}
            >
              <Typography sx={{ fontSize: 16, fontWeight: 'bold' }}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit
              </Typography>
            </Box>
            <TextField
              fullWidth
              margin="normal"
              placeholder="Have a contribution? Share it now."
              name="contribution2"
              value={formData.contribution2}
              onChange={handleInputChange}
            />
            <Box
              sx={{
                border: '1px solid grey',
                borderRadius: '4px',
                padding: '16px',
                backgroundColor: 'rgba(0, 0, 0, 0.05)',
                mb: -1,
              }}
            >
              <Typography sx={{ fontSize: 16, fontWeight: 'bold' }}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit
              </Typography>
            </Box>
            <TextField
              fullWidth
              margin="normal"
              placeholder="Have a contribution? Share it now."
              name="contribution3"
              value={formData.contribution3}
              onChange={handleInputChange}
            />
            <Box sx={{ display: 'flex', gap: 2, my: 2 }}>
              <Button variant="outlined">Post</Button>
              <Button variant="outlined" onClick={handleSkipScrollDown}>
                Skip
              </Button>
            </Box>
            {/* This serves as the starting reference point for the private questions section*/}
            <div ref={questionsSectionRef} />
            <Typography
              sx={{ fontSize: 20, fontWeight: 'bold', textAlign: 'center', mt: 4 }}
            >
              Get answers to your private questions
            </Typography>
            <Typography>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </Typography>
            <TextField
              fullWidth
              margin="normal"
              placeholder="Have a Question? Ask it now."
              name="question1"
              value={formData.question1}
              onChange={handleInputChange}
            />
            <TextField
              fullWidth
              margin="normal"
              placeholder="Have a Question? Ask it now."
              name="question2"
              value={formData.question2}
              onChange={handleInputChange}
            />
            <TextField
              fullWidth
              margin="normal"
              placeholder="Have a Question? Ask it now."
              name="question3"
              value={formData.question3}
              onChange={handleInputChange}
            />
            <Box sx={{ display: 'flex', gap: 2, my: 2 }}>
              <Button variant="outlined">Post</Button>
              <Button variant="outlined" onClick={handleNextStep}>
                Skip
              </Button>
            </Box>
            {renderNavigation()}
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default FirstSigninFlow;

