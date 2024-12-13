import RequireAuth from './components/RequireAuth';
import { SignIn, useAuth, UserButton } from '@clerk/clerk-react';
import { Route, Routes } from 'react-router-dom';
import { Flex, Grid, Spinner } from '@radix-ui/themes';
import { Lawyers } from './pages/Lawyers';
import { UnauthedDashboard } from './pages/UnauthedDashboard';
import { Example } from './pages/Example';
import { AppHeader } from './components/layout/AppHeader';
import { Link } from './components/Link';
import { Divider, Typography } from '@mui/material';

export const RootRouter = () => {
  const auth = useAuth();
  console.log(auth);

  if (!auth.isLoaded) {
    return (
      <Grid>
        <Spinner />
      </Grid>
    );
  }

  if (!auth.isSignedIn) {
    return (
      <Grid>
        <Typography variant="h6">You are not signed in. Please sign in to access the application.</Typography>
      </Grid>
    );
  }

  return (
    <Grid>
      <AppHeader>
        <Flex gap="3" align="end">
          <Typography variant="h5">Lexter Lens</Typography>
          <Link to="/">Dashboard</Link>
          <Link to="/lawyers">Lawyers</Link>
        </Flex>
        <UserButton />
      </AppHeader>
      <Divider />
      <Routes>
        <Route
          path="/lawyers"
          element={
            <RequireAuth>
              <Lawyers />
            </RequireAuth>
          }
        />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/*" element={<>Dashboard</>} />
      </Routes>
    </Grid>
  );
};
