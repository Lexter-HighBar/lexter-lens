// External library imports
import { Route, Routes } from 'react-router-dom'
import { useAuth } from '@clerk/clerk-react'
import { Grid, Spinner } from '@radix-ui/themes'
import { Divider } from '@mui/material'

// Component imports
import ResponsiveAppBar from './components/layout/ResponsiveAppBar'
import RequireAuth from './components/RequireAuth'

// Page imports
import Home from './pages/Home'
import Signin from './pages/Sign-in'
import Discussion from './pages/Discussion'
import UserProfile from './components/UserProfile'
import { UnauthedDashboard } from './pages/UnauthedDashboard'

// RootRouter Component
export const RootRouter = () => {
  const auth = useAuth() // Access Clerk authentication state
  console.log(auth)

  // Show a loading spinner while authentication state is loading
  if (!auth.isLoaded)
    return (
      <Grid>
        <Spinner />
      </Grid>
    )

  return (
    // Authenticated user view
    <>
      <ResponsiveAppBar />
      <Divider />

      {/* Routes */}
      <Routes>
        {/* Protected rotes requiring authentication */}
        <Route
          path="/*"
          element={
            <RequireAuth>
              <Home />
            </RequireAuth>
          }
        />
   
          <Route
          path="/discussion"
          element={
            <RequireAuth>
              <Discussion />
            </RequireAuth>
          }
        />

        <Route
          path="/profile*"
          element={
            <RequireAuth>
              <UserProfile />{' '}
            </RequireAuth>
          }
        />
        {/* Public routes */}
        <Route path="/sign-in" element={<Signin />} />
        <Route path="/unauthed-dashboard" element={<UnauthedDashboard />} />
      </Routes>
    </>
  )
}
