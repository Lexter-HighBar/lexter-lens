import React from 'react';
import { Route, Routes } from 'react-router-dom';

import { Flex, Grid, Spinner } from '@radix-ui/themes';
import { Divider, Typography } from '@mui/material';

import { SignIn, SignUp, useAuth, UserButton } from '@clerk/clerk-react';

import RequireAuth from './components/RequireAuth';
import FirmSearch from './components/FirmSearch';
import { AppHeader } from './components/layout/AppHeader';
import { Link } from './components/Link';

import { Lawyers } from './pages/Lawyers';
import { UnauthedDashboard } from './pages/UnauthedDashboard';
import { Example } from './pages/Example';




export const RootRouter: React.FC = () => {
  const auth = useAuth();

  if (!auth.isLoaded) {
    return (
      <Grid>
        <Spinner />
      </Grid>
    );
  }

  return auth.isSignedIn ? (
    <Grid>
      {/* App Header */}
      <AppHeader>
        <Flex gap="3" align="end">
          <Typography variant="h5">Lexter Lens</Typography>
          <Link to="/">Dashboard</Link>
          <Link to="/lawyers">Lawyers</Link>
        </Flex>
        <UserButton />
      </AppHeader>
      <Divider />

      {/* FirmSearch Component */}
      <div style={{ margin: '20px 0' }}>
        <FirmSearch />
      </div>

      {/* Routes */}
      <Routes>
        <Route
          path="/lawyers"
          element={
            <RequireAuth>
              <Lawyers />
            </RequireAuth>
          }
        />
      </Routes>
    </Grid>
  ) : (
    <Grid>
      {/* App Header */}
      <AppHeader>
        <Flex gap="3" align="end">
          <Link to="/">
            <Typography variant="h5">Lexter Lens</Typography>
          </Link>
          <Link to="/example">Example</Link>
        </Flex>
        <Link to="/sign-in">Sign In</Link>
        <Link to="/sign-up">Sign Up</Link>
      </AppHeader>
      <Divider />

      {/* FirmSearch Component */}
      <div style={{ margin: '20px 0' }}>
        <FirmSearch />
      </div>

      {/* Routes */}
      <Routes>
        <Route path="/example" element={<Example />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/*" element={<UnauthedDashboard />} />
      </Routes>
    </Grid>
  );
};
