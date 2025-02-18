import { useUser } from '@clerk/clerk-react'
import {
  Button,
  CircularProgress,
  Snackbar,
  Alert,
  Box,
  Typography,
  Card,
  MenuItem,
  Chip,
  Select,
  SelectChangeEvent,
} from '@mui/material'

interface City {
  id: number
  city: string
}

import Grid from '@mui/material/Grid2'
import { useState, useEffect } from 'react'
import { useTags } from '../hooks/useTags'
import { useCities } from '../hooks/useCities'

const UserProfile = () => {
  const { user } = useUser()
  const { tags } = useTags()
  const { cities } = useCities()
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

  const handleTagChange = (event: SelectChangeEvent<string[]>) => {
    setSelectedTags(event.target.value as string[])
  }

  const handleRemoveTag = (tagToRemove: string) => {
    setSelectedTags((prevTags) => prevTags.filter((tag) => tag !== tagToRemove))
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

  const handleCityChange = (event: SelectChangeEvent<string[]>) => {
    setSelectedCities(event.target.value as string[])
  }

  const handleRemoveCity = (cityToRemove: string) => {
    setSelectedCities((prevCities) =>
      prevCities.filter((city) => city !== cityToRemove),
    )
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
    <Card
      sx={{
        display: 'flex',
        flexDirection: { xs: 'column', md: 'row' },
        maxWidth: '100%',
        overflow: 'hidden',
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
              {loading ? <CircularProgress size={24} /> : 'Upload New Picture'}
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
        <Grid container direction="column" spacing={3}>
          <Grid>
            <Typography variant="h5" gutterBottom>
              Select Expertise Tags
            </Typography>
            <Select
              label="Expertise Tags"
              fullWidth
              onChange={handleTagChange}
              margin="dense"
              value={selectedTags || []}
              multiple
              renderValue={(selected) => (selected as string[]).join(', ')}
            >
              {Array.isArray(tags) &&
                tags.map((tag) => (
                  <MenuItem key={tag.id} value={tag.name}>
                    {tag.name}
                  </MenuItem>
                ))}
            </Select>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 2 }}>
              {selectedTags?.map((tag) => (
                <Chip
                  key={tag}
                  label={tag}
                  onDelete={() => handleRemoveTag(tag)}
                />
              ))}
            </Box>
            <Button
              variant="contained"
              fullWidth
              onClick={handleUpdateTags}
              disabled={loading}
              sx={{ mt: 2 }}
            >
              {loading ? <CircularProgress size={24} /> : 'Update Tags'}
            </Button>
          </Grid>
          <Grid>
            <Typography variant="h5" gutterBottom>
              Select City Tags
            </Typography>
            <Select
              label="Cities"
              fullWidth
              onChange={handleCityChange}
              margin="dense"
              value={selectedCities || []}
              multiple
              renderValue={(selected) => (selected as string[]).join(', ')}
            >
              {Array.isArray(cities) &&
                cities.map((city: City) => (
                  <MenuItem key={city.id} value={city.city}>
                    {city.city}
                  </MenuItem>
                ))}
            </Select>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 2 }}>
              {selectedCities?.map((city) => (
                <Chip
                  key={city}
                  label={city}
                  onDelete={() => handleRemoveCity(city)}
                />
              ))}
            </Box>
            <Button
              variant="contained"
              fullWidth
              onClick={handleUpdateCities}
              disabled={loading}
              sx={{ mt: 2 }}
            >
              {loading ? <CircularProgress size={24} /> : 'Update Tags'}
            </Button>
          </Grid>
        </Grid>
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
    </Card>
  )
}

export default UserProfile