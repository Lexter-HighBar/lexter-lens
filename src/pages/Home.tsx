import {
  Box,
  Typography,
  Button,
  useTheme,
  useMediaQuery,
  Fab,
  Drawer,
} from '@mui/material'
import { useState, useEffect } from 'react'
import FirstSigninFlow from '../components/FirstSigninFlow/FirstSigninFlow'
import { useUser } from '@clerk/clerk-react'
import { useSearchQuery } from '../hooks/useSearchQuery'
import { Page } from '../components/layout/Page'

import { FaChalkboardTeacher } from 'react-icons/fa'
import Leaderboard from '../components/Leaderboard'
import BodyHome from '../components/BodyHome'
import { X } from 'lucide-react'
import InsightSection from '../components/InsightSection'

const Home: React.FC = () => {
  const user = useUser()
  const [isFirstSignIn, setIsFirstSignIn] = useState(
    Boolean(user.user?.unsafeMetadata.isFirstSignIn),
  )

  const handleTestClick = () => {
    setIsFirstSignIn(true)
  }

  const { questions, setParams } = useSearchQuery()
  const userTags = user.user?.unsafeMetadata.tags as string | undefined
  const [openDrawer, setOpenDrawer] = useState(
    open !== null && open !== undefined,
  ) // initialize openDrawer to true if open is not null or undefined
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm')) // Detect small screens
  const toggleDrawer = (newOpen: boolean) => () => {
    setOpenDrawer(newOpen)
  }
  useEffect(() => {
    setParams({ tags: userTags })
  }, []) // eslint-disable-line

  return (
    <>
      {!openDrawer && (
        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Fab
            sx={{
              position: 'fixed',
              top: 130,
              right: 30,
              display: { xs: 'none', md: 'flex' },
            }} // to avoid overlap if the changes of the screen happens after rendering the component
            variant="extended"
            size="medium"
            onClick={toggleDrawer(true)}
          >
            <FaChalkboardTeacher size={20} style={{ marginRight: 4 }} />
            <Typography variant="caption">Leaderboard</Typography>
          </Fab>
        </Box>
      )}

      <Page sx={{ height: '100%', padding: 2 }}>
        <Box sx={{ width: '100%', height: '100%' }}>
          <BodyHome />
        </Box>
        <Box sx={{ mt: 4, paddingX: isMobile ? 1 : 4 }}>
          <FirstSigninFlow
            isFirstSignIn={isFirstSignIn}
            setIsFirstSignIn={setIsFirstSignIn}
          />
        </Box>
        <InsightSection questions={questions} />
        {/* desktop mode Leaderboard */}
        { !isMobile && (
        <Drawer open={openDrawer} onClose={toggleDrawer(false)} anchor="right">
          <Box p={2}>
            <X onClick={toggleDrawer(false)} />
          </Box>
          <Leaderboard />
        </Drawer>)}
        <Button onClick={handleTestClick} sx={{ mb: 4 }}>
          Quickstart Test
        </Button>
      </Page>
    </>
  )
}

export default Home
