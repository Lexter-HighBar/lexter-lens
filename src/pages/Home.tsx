import { Page } from '../components/layout/Page'
import { Typography, Button, Box } from '@mui/material'

import FirstSigninFlow from '../components/FirstSigninFlow'
import { useState } from 'react'
import InsightsSection from '../components/InsightSection'

const Home: React.FC = () => {
  // State to track first sign-in status
  const [isFirstSignIn, setIsFirstSignIn] = useState<boolean>(true)

  // Function to reset first sign-in state
  const handleTestClick = () => {
    setIsFirstSignIn(true)
  }

  return (
    <Page sx={{ minHeight: '100vh', height: 'auto' }}>
      {/* First sign-in flow */}
      <FirstSigninFlow
        isFirstSignIn={isFirstSignIn}
        setIsFirstSignIn={setIsFirstSignIn}
      />

      {/* Test button */}
      <Button onClick={handleTestClick}>Test</Button>

      {/* Welcome message */}
      <Box>
        <Typography variant="h4" gutterBottom>
          Welcome to Lexter Lens!
        </Typography>
      </Box>
      {/* Insights sections */}

      <Box sx={{ mb: 4 }} />
      <InsightsSection
        title="Relevant Insights"
        linkTo="/discussion"
        placeholder="Placeholder for Relevant Insights content."
      />
      <Box sx={{ mb: 4 }} />
      <InsightsSection
        title="Trending Insights"
        linkTo="/discussion"
        placeholder="Placeholder for Trending Insights content."
      />
    </Page>
  )
}

export default Home
