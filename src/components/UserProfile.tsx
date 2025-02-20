import { useUser } from '@clerk/clerk-react'
import {
  Button,
  CircularProgress,
  Snackbar,
  Alert,
  Box,
  Typography,
  IconButton,
} from '@mui/material'
import { RiImageEditFill } from 'react-icons/ri'

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
          }
        })
        handleUpdateCities() //Out of time to blind the two functions call together for now // to fix later maybe split this function
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
  console.log('user', user)
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
          height: '80dvh',
          width: '100%',
          flexDirection: { xs: 'column', md: 'row' },
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
          <Grid container direction="column" alignItems="center" >
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
              <Box sx={{ transform: 'translate(40%, -100%)' }}>
                <IconButton
                  color="primary"
                  component="label"
                  htmlFor="avatar-input"
                >
                  <input
                    id="avatar-input"
                    type="file"
                    style={{ display: 'none' }}
                    onChange={handleAvatarChange}
                  />
                  <RiImageEditFill size={20} />
                </IconButton>
              </Box>
            </Grid>

            <Grid>
              <Typography variant="body1">
                Username: {(user?.unsafeMetadata?.userName as string) || 'not set yet'}
              </Typography>
              <Typography variant="body1">
                {user?.firstName && `First Name: ${user.firstName}`}
              </Typography>
              <Typography variant="body1">
                {user?.lastName && `Last Name: ${user.lastName}`}
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
              variant="standard"
              selectedTags={selectedTags}
              setSelectedTags={setSelectedTags}
            />

          </Box>
          <Box sx={{ mb: 2 }}>
            <Typography variant="body1" gutterBottom>
              Select City Tags
            </Typography>
            <TagSelector

              variant="standard"
              selectedTags={selectedCities}
              setSelectedTags={setSelectedCities}
              cityType
            />

            <Button
              variant="contained"
              onClick={handleUpdateTags}
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