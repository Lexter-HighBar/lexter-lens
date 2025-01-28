import { useUser } from '@clerk/clerk-react';
import {
  TextField,
  Button,
  CircularProgress,
  Snackbar,
  Alert,
  Box,
  Typography,
  Card,
  MenuItem,
} from '@mui/material';
import { useState, useEffect } from 'react';
import Grid from '@mui/material/Grid2';
import { RiEdit2Fill } from 'react-icons/ri';
import { useLawyer } from '../lib/contexts/LawyerContext';

const firms = ['Firm A', 'Firm B', 'Firm C']; // Example firms
const cities = ['City A', 'City B', 'City C']; // Example cities
const provinces = ['Province A', 'Province B', 'Province C']; // Example provinces
const expertiseOptions = ['Option 1', 'Option 2', 'Option 3']; // Example expertise options

const UserProfile = () => {
  const { email, firstName, userName, phone } = useLawyer(); // Getting data from context
  const [loading, setLoading] = useState<boolean>(false);
  const [openSnackbar, setOpenSnackbar] = useState<boolean>(false);
  const [snackbarMessage, setSnackbarMessage] = useState<string>('');
  const [formData, setFormData] = useState({
    email,
    firstName,
    userName,
    phone,
    firm: '',
    city: '',
    province: '',
    country: 'Canada',
    expertise: '',
  });
  const { user } = useUser();

  // Set initial data when user context changes
  useEffect(() => {
    setFormData({
      email,
      firstName: firstName || '',
      userName: userName || '',
      phone: phone || '',
      firm: '',
      city: '',
      province: '',
      country: 'Canada',
      expertise: '',
    });
  }, [email, firstName, userName, phone]);

  const handleUpdateName = async () => {
    if (!formData.userName) {
      setSnackbarMessage('Name cannot be empty');
      setOpenSnackbar(true);
      return;
    }

    setLoading(true);
    try {
      if (user) {
        await user.update({
          unsafeMetadata: {
            ...user.unsafeMetadata,
            userName: formData.userName,
          },
        });
        setSnackbarMessage('Profile updated successfully');
      }
    } catch (error) {
      console.error('Error updating name:', error);
      setSnackbarMessage('Failed to update name');
    } finally {
      setLoading(false);
      setOpenSnackbar(true);
    }
  };

  if (!user) {
    return <CircularProgress />; // Show a loading spinner while the user is being fetched
  }

  return (
    <>
      <Card
        sx={{
          flexDirection: { xs: 'column', md: 'row' },
          display: 'flex',
          flexGrow: 1,
          justifyContent: 'center',
          alignItems: { xs: 'center', md: 'flex-start' },
          padding: '20px',
        }}
      >
        <Box sx={{ padding: '20px', width: '100%' }}>
          <Grid sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <img
              src={user?.imageUrl || ''}
              alt="Profile Picture"
              style={{ width: '100px', height: 'auto', borderRadius: '50%', marginBottom: '40px' }}
            />
            <Box sx={{ mt: '-25px' }}>
              <RiEdit2Fill />
            </Box>
            <Grid>
              <Typography variant="h6">{formData.userName}</Typography>
              <Typography variant="body2">{formData.email}</Typography>
            </Grid>
          </Grid>
        </Box>
        <Box
          sx={{
            borderLeft: { md: '0.5px solid rgb(239, 239, 255)' },
            padding: '20px',
            width: '100%',
            height: '90vh',
          }}
        >
          <Typography variant="h5">Your User Information</Typography>
          <Box
            sx={{ display: 'flex', flexDirection: 'column', marginTop: '10px' }}
          >
            <TextField
              size="small"
              label="User Name"
              value={formData.userName}
              onChange={(e) =>
                setFormData({ ...formData, userName: e.target.value })
              }
              margin="normal"
            />
            <TextField
              size="small"
              label="Phone Number"
              value={formData.phone}
              onChange={(e) =>
                setFormData({ ...formData, phone: e.target.value })
              }
              margin="normal"
            />
            <TextField
              label="Firm"
              select
              size="small"
              value={formData.firm}
              onChange={(e) => setFormData({ ...formData, firm: e.target.value })}
              margin="normal"
            >
              {firms.map((firm) => (
                <MenuItem key={firm} value={firm}>
                  {firm}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              label="City"
              select
              size="small"
              value={formData.city}
              onChange={(e) => setFormData({ ...formData, city: e.target.value })}
              margin="normal"
            >
              {cities.map((city) => (
                <MenuItem key={city} value={city}>
                  {city}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              label="Province"
              select
              size="small"
              value={formData.province}
              onChange={(e) =>
                setFormData({ ...formData, province: e.target.value })
              }
              margin="normal"
            >
              {provinces.map((province) => (
                <MenuItem key={province} value={province}>
                  {province}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              label="Country"
              size="small"
              value={formData.country}
              disabled
              margin="normal"
            />
            <TextField
              label="Expertise"
              select
              size="small"
              value={formData.expertise}
              onChange={(e) =>
                setFormData({ ...formData, expertise: e.target.value })
              }
              margin="normal"
            >
              {expertiseOptions.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </TextField>
          </Box>
          <Button
            size="small"
            variant="contained"
            color="primary"
            onClick={handleUpdateName}
            disabled={loading}
            startIcon={loading && <CircularProgress size={20} />}
            sx={{ marginTop: '20px' }}
          >
            {loading ? 'Updating...' : 'Update User Info'}
          </Button>
        </Box>
      </Card>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={() => setOpenSnackbar(false)}
      >
        <Alert
          onClose={() => setOpenSnackbar(false)}
          severity="info"
          sx={{ width: '100%' }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </>
  );
};

export default UserProfile;