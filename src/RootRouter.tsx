// External library imports
import { Route, Routes } from 'react-router-dom';
import {  useAuth, UserButton } from '@clerk/clerk-react';
import { Grid, Spinner } from '@radix-ui/themes';
import { Divider } from '@mui/material';

// Component imports
import ResponsiveAppBar from './components/layout/ResponsiveAppBar';
import RequireAuth from './components/RequireAuth';

// Page imports
import { Lawyers } from './pages/Lawyers';
import { UnauthedDashboard } from './pages/UnauthedDashboard';
import Home from './pages/Home';
import Signin from './pages/Sign-in';
import Discussion from './pages/Discussion';
import SignUpForm from './pages/SignUpForm';
import ProfilePage from './components/Profile';


// RootRouter Component
export const RootRouter = () => {
  const auth = useAuth(); // Access Clerk authentication state
  console.log(auth);

  // Show a loading spinner while authentication state is loading
  if (!auth.isLoaded)
    return (
      <Grid>
        <Spinner />
      </Grid>
    );

  return auth.isSignedIn ? (
    // Authenticated user view
    <>
      <ResponsiveAppBar />
      <Divider />

      {/* Routes */}
      <Routes>
        {/* Protected rotes requiring authentication */}
        <Route 
          path="/" 
          element={
            <RequireAuth>
              <Home />
            </RequireAuth>
          } 
        />
      <Route 
          path="/lawyers" 
          element={
            <RequireAuth>
              <Lawyers />
            </RequireAuth>
          } 
        />
        <Route path="/sign-in" element={<Signin />} />
        <Route path="/*" element={<Home />} />
        <Route path="/discussion" element={<Discussion />} />
        <Route path="/profile*" element={<ProfilePage />} />
      </Routes>
    </>
  ) : (
    // Unauthenticated user view
    <>
      <ResponsiveAppBar>
        <UserButton />
      </ResponsiveAppBar>
      <Divider />
    {/* Routes */}
      <Routes>
        {/* Public routes accessible without authentication */}
        <Route path="/sign-in" element={<Signin />} />
        <Route path="/sign-up" element={<SignUpForm />} />
        <Route path="/*" element={<UnauthedDashboard />} />
        
      </Routes>
    </>
  );
};