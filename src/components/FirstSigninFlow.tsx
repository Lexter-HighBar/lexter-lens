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
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { LogoImg } from './LogoImg';
import { useLawyer } from '../lib/contexts/ClerkContext';
import TagsManager from './TagsManager'; // Import the new TagsManager component
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
const defaultAuthorityTags = [
    'Calgary',
    'Corporate & Commercial Law',
    'Litigation',
    'BDP - Calgary',
    'Ogilvie - Calgary',
    'Oil and Gas',
  ];
const [selectedDefaultTags, setSelectedDefaultTags] = useState<string[]>([]);
interface Tags {
  [key: string]: string[];
}

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
          </>
        )}
{step === 2 && (
          <TagsManager
            defaultTags={defaultAuthorityTags}
            selectedDefaultTags={selectedDefaultTags}
            onDefaultTagClick={handleDefaultTagClick}
            tags={tags}
            onTagRemove={handleTagRemove}
            onTagAdd={handleTagAdd}
          />
        )}
{step === 3 && (
  <>
  <Box
    sx={{
      border: '1px solid grey',
      borderRadius: '8px',
      padding: '16px',
      backgroundColor: 'rgba(0, 0, 0, 0.05)',
      mb: 2,
    }}
  >
    <Typography sx={{ fontSize: 16, fontWeight: 'bold' }}>
        This is your message box
      </Typography>
      <Typography sx={{ fontSize: 14, color: 'grey.700' }}>
        You can provide more details or instructions here.
      </Typography>
    </Box>
          <TextField
            fullWidth
            margin="normal"
            name="firstName"
            label="First Name "
            value={formData.firstName}
            onChange={handleChange}
          />
  </>
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
