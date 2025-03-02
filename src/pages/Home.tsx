import {
  Box,
  Typography,
  Button,
  IconButton,
  useTheme,
  useMediaQuery,
  Fab,
  Drawer,
} from '@mui/material'
import { useState, useEffect, useRef, useCallback } from 'react'
import FirstSigninFlow from '../components/FirstSigninFlow/FirstSigninFlow'
import { useUser } from '@clerk/clerk-react'
import { useSearchQuery } from '../hooks/useSearchQuery'
import { Page } from '../components/layout/Page'
import { ChevronLeft, Close } from '@mui/icons-material'
import Leaderboard from '../components/Leaderboard'
import BodyHome from '../components/BodyHome'
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
  const scrollContainerRef = useRef<HTMLDivElement | null>(null)
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

  const scroll = useCallback(
    (direction: 'left' | 'right') => {
      if (scrollContainerRef.current) {
        const scrollAmount = isMobile ? 150 : 320
        const currentScrollPosition = scrollContainerRef.current.scrollLeft
        const newScrollPosition =
          direction === 'left'
            ? currentScrollPosition - scrollAmount
            : currentScrollPosition + scrollAmount
        scrollContainerRef.current.scrollTo({
          left: newScrollPosition,
          behavior: 'smooth',
        })
      } else {
        console.error('scrollContainerRef is not attached')
      }
    },
    [isMobile, scrollContainerRef],
  )

  useEffect(() => {
    const autoScroll = setInterval(
      () => {
        scroll('right')
      },
      isMobile ? 5000 : 3000,
    )
    return () => clearInterval(autoScroll)
  }, [isMobile, scroll])

  return (
    <>
      {!openDrawer && (
        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Fab
            sx={{ position: 'fixed', top: 130, right: 30 }}
            variant="extended"
            size="medium"
            onClick={toggleDrawer(true)}
          >
            <ChevronLeft style={{ marginRight: 4 }} />
            Leaderboard
          </Fab>
        </Box>
      )}

      <Page sx={{ height: '100%', padding: 2 }}>
        <Box sx={{ width: '100%', height: '100%' }}>
           <Button onClick={handleTestClick} >
          Quickstart Test
        </Button>
          <BodyHome />
        </Box>
        <Box sx={{ mt: 4, paddingX: isMobile ? 1 : 4 }} />
        <FirstSigninFlow
          isFirstSignIn={isFirstSignIn}
          setIsFirstSignIn={setIsFirstSignIn}
        />
       

        {/* Masonry Insight Cards */}

        <InsightSection questions={questions} />

        {/* desktop mode Leaderboard */}
        {!isMobile && (
          <Drawer
            variant="persistent"
            sx={{ backgroundColor: 'primary.dark' }}
            open={openDrawer}
            onClose={toggleDrawer(false)}
            anchor="right"
          >
            <Box
              component="div"
              p={2}
              display="flex"
              justifyContent="space-between"
              sx={{ backgroundColor: 'primary.dark' }}
            >
              <IconButton onClick={toggleDrawer(false)} sx={{ color: 'white' }}>
                <Close />
              </IconButton>
              <Typography
                variant="h2"
                gutterBottom
                color="primary.contrastText"
              >
                Leaderboard
              </Typography>
            </Box>
            <Leaderboard />
          </Drawer>
        )}
      </Page>
    </>
  )
}

export default Home
