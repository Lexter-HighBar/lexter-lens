import { useUser } from '@clerk/clerk-react'
import {
  Button,
  CircularProgress,
  Snackbar,
  Alert,
  Box,
  Typography,
  IconButton,
  TextField,
  Tooltip,
} from '@mui/material'
import { RiImageEditFill } from 'react-icons/ri'
import { UserRoundPen } from 'lucide-react'
import Grid from '@mui/material/Grid2'
import { useState, useEffect } from 'react'
import { Info } from 'lucide-react'

import { Page } from './layout/Page'
import TagSelector from './tagsSelector'
import TagsManager from './TagsManager'
import { useLawyers } from '../hooks/useLawyers'
import { Lawyer } from '../lib/types'

const UserProfile = () => {
  const { user } = useUser()
  const [lawyerTags, setLawyerTags] = useState<{ id: number; name: string }[]>(
    [],
  )
  const [avatar, setAvatar] = useState(user?.imageUrl || '')
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [selectedCities, setSelectedCities] = useState<string[]>([])
  const [selectedFirms, setSelectedFirms] = useState<string[]>([])
  const [loading, setLoading] = useState(false)
  const [alert, setAlert] = useState({
    open: false,
    message: '',
    severity: 'info' as 'info' | 'success' | 'error',
  })
  const lawyers = useLawyers({ page: 1, count: 200 })
  const [username, setUsername] = useState(user?.unsafeMetadata?.userName || '')
  const tagsArray = user?.unsafeMetadata?.tags as string[]
  const [loadingTags, setLoadingTags] = useState(true)
  console.log('lodaingTags', loadingTags)
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
  useEffect(() => {
    if (lawyers.data?.items) {
      setLoadingTags(true)
      const lawyer = lawyers.data.items.find(
        (lawyer: Lawyer) => lawyer.id === Number(user?.unsafeMetadata.lawyerId),
        setLoadingTags(false),
      )
      if (!lawyer) {
        console.error(
          `No lawyer found with id ${user?.unsafeMetadata.lawyerId}`,
        )
      }
      if (lawyer?.tags) {
        setLawyerTags(
          lawyer.tags.map((tag) => ({ id: tag.id, name: tag.name })),
        )
      }
    }
  }, [user?.unsafeMetadata.lawyerId, lawyers.data?.items])

  const firmsArray = user?.unsafeMetadata?.firms as string[]
  useEffect(() => {
    if (firmsArray) {
      setSelectedFirms(firmsArray)
    }
  }, [firmsArray])

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
          message: 'Image updated successfully.',
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
  const handleUserNameChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const newUserName = event.target.value
    setUsername(newUserName)
  }
  const handleUpdateTags = async () => {
    setLoading(true)
    try {
      if (user) {
        await user.update({
          unsafeMetadata: {
            ...user.unsafeMetadata,
            tags: selectedTags,
            userName: username,
          },
        })
        //Out of time to blend the three functions - call together for now
        handleUpdateCities()
        handleUpdateFirms()
      }
      setAlert({
        open: true,
        message: 'Updated successfully.',
        severity: 'success',
      })
    } catch (error) {
      console.error(error)
      setAlert({
        open: true,
        message: 'Failed to update.',
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
        message: 'Updated successfully.',
        severity: 'success',
      })
    } catch (error) {
      console.error(error)
      setAlert({
        open: true,
        message: 'Failed to update.',
        severity: 'error',
      })
    } finally {
      setLoading(false)
    }
  }

  const handleUpdateFirms = async () => {
    setLoading(true)
    try {
      if (user) {
        await user.update({
          unsafeMetadata: {
            ...user.unsafeMetadata,
            firms: selectedFirms,
          },
        })
      }
      setAlert({
        open: true,
        message: 'Updated successfully.',
        severity: 'success',
      })
    } catch (error) {
      console.error(error)
      setAlert({
        open: true,
        message: 'Failed to update.',
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
          <Grid container direction="column" alignItems="center">
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
              <Typography variant="h6">
                {(user?.unsafeMetadata?.userName as string) || 'Not set yet.'}
              </Typography>
              <Typography variant="body1">
                {user?.firstName && `First Name: ${user.firstName}`}
              </Typography>
              <Typography variant="body1">
                {user?.lastName && `Last Name: ${user.lastName}`}
              </Typography>
              <Typography variant="body2">
                {user.primaryEmailAddress?.emailAddress}
              </Typography>
            </Grid>
            <Grid sx={{ mt: 6 }}>
            <TagsManager
              loading={loadingTags}
              defaultTags={lawyerTags.map((tag) => tag.name)}
              title="Authority Tags"
              tooltip="Authority tags are assigned based on your expertise and experience and 
              are managed by the Lexter Lens admin. These tags help ensure you receive posts 
              most relevant to your knowledge and skills."
            />
            </Grid>
          </Grid>
        </Box>

        <Box sx={{ flex: 1, minWidth: 0, p: 3 }}>
          <Box sx={{ mb: 6 }}>
            <Typography variant="body1" gutterBottom>
              {' '}
              Update Your Username:
            </Typography>
            <TextField
              value={username}
              onChange={handleUserNameChange}
              variant="standard"
              InputProps={{
                startAdornment: (
                  <UserRoundPen size={20} style={{ marginRight: '8px' }} />
                ),
              }}
            />
          </Box>

          <Box sx={{ mb: 2, display: 'flex', alignItems: 'center' }}>
            <Typography variant="h6" gutterBottom sx={{ mr: 1, fontWeight: "bold" }}>
              Interest Tags
            </Typography>
            <Tooltip title="In addition to authority tags, interest tags help curate 
            posts most relevant to you. Please select your interest tags below.">
              <Info size={20} />
            </Tooltip>
          </Box>

          <Typography variant="body1" gutterBottom>
            Select Expertise Tags:
          </Typography>

          <TagSelector
            variant="standard"
            selectedTags={selectedTags}
            setSelectedTags={setSelectedTags}
          />
          <Box sx={{ mb: 2 }}>
          <Typography variant="body1" gutterBottom>
            Select City Tags:
          </Typography>
          <TagSelector
            variant="standard"
            selectedTags={selectedCities}
            setSelectedTags={setSelectedCities}
            cityType
          />
          </Box>

          <Box sx={{ mb: 2 }}>
            <Typography variant="body1" gutterBottom>
              Select Firm Tags:
            </Typography>
            <TagSelector
              variant="standard"
              selectedTags={selectedFirms}
              setSelectedTags={setSelectedFirms}
              firmType={true}
            />

            <Button
              variant="contained"
              onClick={handleUpdateTags}
              disabled={loading}
              sx={{ mt: 2 }}
            >
              {loading ? <CircularProgress size={24} /> : 'Update'}
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
