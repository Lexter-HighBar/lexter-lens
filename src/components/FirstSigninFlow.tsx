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

// Import custom logo image component and custom hooks/components
import { LogoImg } from './LogoImg';
import { UseClerkStorage } from '../hooks/UseClerkStorage';
import TagsManager from './TagsManager';

// Define the props interface for the FirstSigninFlow component
interface FirstSigninFlowProps {
  isFirstSignIn: boolean;
  setIsFirstSignIn: (value: boolean) => void;
}

// Define the Tags interface to group tags under categories
interface Tags {
  [key: string]: string[];
}

// Main component for the first sign-in flow
const FirstSigninFlow: React.FC<FirstSigninFlowProps> = ({
  isFirstSignIn,
  setIsFirstSignIn,
}) => {
  // Retrieve user information and an update handler from the custom hook
  const { email, firstName, userName, phone, handleUpdateUser } = UseClerkStorage();

  // Local state to track the current step in the sign-in process (1 to 3)
  const [step, setStep] = useState<number>(1);

  // Local state for form data including user details and contributions/questions
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

  // List of default authority tags provided by the system
  const defaultAuthorityTags = [
    'Calgary',
    'Corporate & Commercial Law',
    'Litigation',
    'BDP - Calgary',
    'Ogilvie - Calgary',
    'Oil and Gas',
  ];

  // State to track which default tags have been selected by the user
  const [selectedDefaultTags, setSelectedDefaultTags] = useState<string[]>([]);

  // State to manage custom tags grouped by category (e.g., Cities, Expertise)
  const [tags, setTags] = useState<Tags>({
    Cities: ['Toronto', 'Vancouver'],
    Expertise: ['Corporate Law', 'Real Estate'],
    Industries: ['Technology', 'Healthcare'],
    'Firm Offices': ['Downtown', 'Uptown'],
  });

  // Handler for toggling selection of a default tag
  const handleDefaultTagClick = (tag: string) => {
    setSelectedDefaultTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  // Handler to remove a custom tag from a specific category
  const handleTagRemove = (category: string, tag: string) => {
    setTags((prev) => ({
      ...prev,
      [category]: prev[category].filter((t) => t !== tag),
    }));
  };

  // Handler to add a new custom tag to a specific category
  const handleTagAdd = (category: string, newTag: string) => {
    setTags((prev) => ({
      ...prev,
      [category]: [...prev[category], newTag],
    }));
  };

  // Handler to update form data when input fields change
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Update form data with values from the custom hook whenever they change
  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      email,
      firstName: firstName || '',
      userName: userName || '',
      phone: phone || '',
    }));
  }, [email, firstName, userName, phone]);

  // Handler to close the sign-in flow dialog
  const handleClose = () => setIsFirstSignIn(false);

  // Handler to move to the next step; on the final step, update the user info and close the dialog
  const handleNextStep = () => {
    if (step === 3) {
      handleUpdateUser();
      handleClose();
    } else {
      setStep((prevStep) => prevStep + 1);
    }
  };

  // Handler to move back to the previous step
  const handlePreviousStep = () => setStep((prevStep) => prevStep - 1);

  // Create a reference for the private questions section to enable smooth scrolling
  const questionsSectionRef = useRef<HTMLDivElement>(null);

  // Scroll down to the private questions section when the "Skip" button is clicked in contributions
  const handleSkipScrollDown = () => {
    questionsSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Render navigation controls including the step indicator and Next/Complete Sign-Up button
  const renderNavigation = () => (
    <Box display="flex" justifyContent="space-between" alignItems="center" mt={2}>
      {step > 1 ? (
        // Allow user to click the step indicator to go back if not on the first step
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
    // Main dialog container for the first sign-in flow
    <Dialog fullWidth open={isFirstSignIn} onClose={handleClose}>
      {/* Header section with the logo */}
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

      {/* Dynamic dialog title based on the current step */}
      <DialogTitle sx={{ fontSize: 20, fontWeight: 'bold', textAlign: 'center' }}>
        {step === 1
          ? 'Lexter Lens Quickstart'
          : step === 2
          ? "Let's Make Lexter Lens Relevant to You"
          : step === 3
          ? 'Make the Legal World More Transparent'
          : 'Completed'}
      </DialogTitle>

      {/* Close button for the dialog */}
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

      {/* Main content area of the dialog */}
      <DialogContent sx={{ minHeight: '200px' }}>
        {step === 1 && (
          <>
            {/* Step 1: Display user information and privacy policies */}
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
            {/* Step 2: Tag management for customizing content */}
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
            {/* Step 3: Contributions and private questions section */}
            <Typography>
              Based on your tags, you may be able to help other legal professionals.
            </Typography>

            {/* Contribution Section 1 */}
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

            {/* Contribution Section 2 */}
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

            {/* Contribution Section 3 */}
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

            {/* Buttons for posting a contribution or skipping to the questions section */}
            <Box sx={{ display: 'flex', gap: 2, my: 2 }}>
              <Button variant="outlined">Post</Button>
              <Button variant="outlined" onClick={handleSkipScrollDown}>
                Skip
              </Button>
            </Box>

            {/* Reference point for scrolling to the private questions section */}
            <div ref={questionsSectionRef} />

            <Typography
              sx={{ fontSize: 20, fontWeight: 'bold', textAlign: 'center', mt: 4 }}
            >
              Get answers to your private questions
            </Typography>
            <Typography>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </Typography>

            {/* Input fields for private questions */}
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

            {/* Buttons for posting a question or skipping */}
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


