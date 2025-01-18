import { useUser } from '@clerk/clerk-react'
import {
  TextField,
  Button,
  CircularProgress,
  Snackbar,
  Alert,
  Box,
  Typography,
  Card,
} from '@mui/material'
import { useState, useEffect } from 'react'
import Grid from '@mui/material/Grid2'
import { RiEdit2Fill } from 'react-icons/ri'

const UpdateUserName = () => {
  const { user } = useUser()
  const [name, setName] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)
  const [openSnackbar, setOpenSnackbar] = useState<boolean>(false)
  const [snackbarMessage, setSnackbarMessage] = useState<string>('')
  const [initialName, setInitialName] = useState<string>('')
  const userEmail = user?.emailAddresses?.[0].emailAddress || 'Unknown'

  // Load the initial name from user metadata when the user object is ready
  useEffect(() => {
    if (user && typeof user.unsafeMetadata?.name === 'string') {
      setName(user.unsafeMetadata.name)
      setInitialName(user.unsafeMetadata.name)
    } else {
      setName('')
    }
  }, [user])

  const handleUpdateName = async () => {
    if (!name) {
      setSnackbarMessage('Name cannot be empty')
      // setSnackbarSeverity('error')
      setOpenSnackbar(true)
      return
    }

    setLoading(true)
    if (user)
      try {
        await user.update({
          unsafeMetadata: {
            ...user.unsafeMetadata,
            name,
          },
        })
        setSnackbarMessage('Name updated successfully')
        // setSnackbarSeverity('success')
      } catch (error) {
        console.error('Error updating name:', error)
        setSnackbarMessage('Failed to update name')
        // setSnackbarSeverity('error')
      } finally {
        setLoading(false)
        setOpenSnackbar(true)
      }
  }

  if (!user) {
    return <CircularProgress /> // Show a loading spinner while the user is being fetched
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
        <Box sx={{ padding: '20px', Width: '100%' }}>
          <Grid>
            <img
              src={user?.imageUrl || ''}
              alt="Profile Picture"
              style={{ width: '100px', height: 'auto', borderRadius: '50%' }}
            />
            <Box sx={{ mt: '-25px' }}>
              <RiEdit2Fill />
            </Box>
            <Grid>
              <Typography variant="h6"> {initialName}</Typography>
              <Typography variant="body2">{userEmail}</Typography>
            </Grid>
          </Grid>
        </Box>
        <Box
          sx={{
            borderLeft: { md: '0.5px solid rgb(239, 239, 255)' },
            padding: '20px',
            Width: '100%',
            height: '90dvh',
          }}
        >
          <Typography variant="h5">Personal Information</Typography>
          <Box
            sx={{ display: 'flex', flexDirection: 'column', marginTop: '10px' }}
          >
            <TextField
              size="small"
              sx={{ maxWidth: '200px' }}
              label="User Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              margin="normal"
            />
            <TextField
              size="small"
              sx={{ maxWidth: '200px' }}
              label="Phone Number"
              value="(587) 203-2014"
              margin="normal"
            />
          </Box>
          <Button
            size="small"
            variant="contained"
            color="primary"
            onClick={handleUpdateName}
            disabled={loading}
            startIcon={loading && <CircularProgress size={20} />}
          >
            {loading ? 'Updating...' : 'Update User Name'}
          </Button>
        </Box>
      </Card>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={() => setOpenSnackbar(false)}
      >
        <Alert onClose={() => setOpenSnackbar(false)} sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </>
  )
}

export default UpdateUserName
