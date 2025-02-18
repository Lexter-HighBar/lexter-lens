import { useUser } from '@clerk/clerk-react'
import {
  Button,
  CircularProgress,
  Snackbar,
  Alert,
  Box,
  Typography,
} from '@mui/material'

import Grid from '@mui/material/Grid2'
import { useState, useEffect } from 'react'

import { Page } from './layout/Page'
import TagSelector from './tagsSelector'

const UserProfile = () => {
  const { user } = useUser()

  const [avatar, setAvatar] = useState(user?.imageUrl || '')
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [selectedCities, setSelectedCities] = useState<string[]>([])
  const [loading, setLoading] = useState(false)
  const [alert, setAlert] = useState({
    open: false,
    message: '',
    severity: 'info' as 'info' | 'success' | 'error',
  })

  const tagsArray = user?.unsafeMetadata?.tags as string[]
  useEffect(() => {
    if (tagsArray) {
      setSelectedTags(tagsArray)
    }
  }, [tagsArray])

  const citiesArray = user?.unsafeMetadata?.cities as string[]
  useEffect(() => {
    if (citiesArray) {
      setSelectedCities(citiesArray)
    }
  }, [citiesArray])

  const handleAvatarChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = async (e) => {
      setAvatar(e.target?.result as string)
      setLoading(true)

      try {
        await user?.setProfileImage({ file })
        setAlert({
          open: true,
          message: 'Profile picture updated successfully!',
          severity: 'success',
        })
      } catch (error) {
        console.error(error)
        setAlert({
          open: true,
          message: 'Failed to upload image.',
          severity: 'error',
        })
      } finally {
        setLoading(false)
      }
    }
    reader.readAsDataURL(file)
  }

  const handleUpdateTags = async () => {
    setLoading(true)
    try {
      if (user) {
        await user.update({
          unsafeMetadata: {
            ...user.unsafeMetadata,
            tags: selectedTags,
          },
        })
      }
      setAlert({
        open: true,
        message: 'Tags updated successfully',
        severity: 'success',
      })
    } catch (error) {
      console.error(error)
      setAlert({
        open: true,
        message: 'Failed to update tags',
        severity: 'error',
      })
    } finally {
      setLoading(false)
    }
  }

  const handleUpdateCities = async () => {
    setLoading(true)
    try {
      if (user) {
        await user.update({
          unsafeMetadata: {
            ...user.unsafeMetadata,
            cities: selectedCities,
          },
        })
      }
      setAlert({
        open: true,
        message: 'Tags updated successfully',
        severity: 'success',
      })
    } catch (error) {
      console.error(error)
      setAlert({
        open: true,
        message: 'Failed to update tags',
        severity: 'error',
      })
    } finally {
      setLoading(false)
    }
  }

  const handleCloseAlert = () => {
    setAlert((prev) => ({ ...prev, open: false }))
  }

  if (!user) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="200px"
      >
        <CircularProgress />
      </Box>
    )
  }

  return (
    <Page
      sx={{
        height: '100%',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          maxWidth: '100%',

          p: 3,
        }}
      >
        <Box
          sx={{
            width: { xs: '100%', md: '300px' },
            textAlign: 'center',
            borderRight: { md: '1px solid rgba(0, 0, 0, 0.12)' },
            p: 3,
          }}
        >
          <Grid container direction="column" alignItems="center" spacing={2}>
            <Grid>
              <img
                src={avatar}
                alt="Profile Picture"
                style={{
                  width: '100px',
                  height: '100px',
                  borderRadius: '50%',
                  objectFit: 'cover',
                }}
              />
            </Grid>
            <Grid>
              <Button
                variant="contained"
                component="label"
                sx={{ mt: 1 }}
                disabled={loading}
              >
                {loading ? (
                  <CircularProgress size={24} />
                ) : (
                  'Upload New Picture'
                )}
                <input
                  type="file"
                  hidden
                  accept="image/*"
                  onChange={handleAvatarChange}
                />
              </Button>
            </Grid>

            <Grid>
              <Typography variant="body1">
                Username: {(user?.unsafeMetadata?.userName as string) || 'N/A'}
              </Typography>
              <Typography variant="body1">
                First Name: {user.firstName || 'N/A'}
              </Typography>
              <Typography variant="body1">
                Last Name: {user.lastName || 'N/A'}
              </Typography>
              <Typography variant="body1">
                Email: {user.primaryEmailAddress?.emailAddress}
              </Typography>
            </Grid>
          </Grid>
        </Box>

        <Box sx={{ flex: 1, minWidth: 0, p: 3 }}>
          <Box sx={{ mb: 2 }}>
            <Typography variant="body1" gutterBottom>
              Select Expertise Tags
            </Typography>

            <TagSelector
              selectedTags={selectedTags}
              setSelectedTags={setSelectedTags}
            />

            <Button
              variant="contained"
              onClick={handleUpdateTags}
              disabled={loading}
            >
              {loading ? <CircularProgress size={24} /> : 'Update Tags'}
            </Button>
          </Box>
          <Box sx={{ mb: 2 }}>
            <Typography variant="body1" gutterBottom>
              Select City Tags
            </Typography>
            <TagSelector
              selectedTags={selectedCities}
              setSelectedTags={setSelectedCities}
              cityType
            />

            <Button
              variant="contained"
              onClick={handleUpdateCities}
              disabled={loading}
              sx={{ mt: 2 }}
            >
              {loading ? <CircularProgress size={24} /> : 'Update Tags'}
            </Button>
          </Box>
        </Box>

        <Snackbar
          open={alert.open}
          autoHideDuration={6000}
          onClose={handleCloseAlert}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        >
          <Alert
            onClose={handleCloseAlert}
            severity={alert.severity}
            sx={{ width: '100%' }}
          >
            {alert.message}
          </Alert>
        </Snackbar>
      </Box>
    </Page>
  )
}

export default UserProfile
