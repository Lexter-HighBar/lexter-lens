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
  console.log(auth)
  if (!auth.isLoaded)
    return (
      <Grid>
        <Spinner />
      </Grid>
    );

  return auth.isSignedIn ? (
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
  ) : (
    <Grid>
      <AppHeader>
        <Flex gap="3" align="end">
          <Link to="/">
            <Typography variant="h5">Lexter Lens</Typography>
          </Link>
          <Link to="/example">Example</Link>
        </Flex>
        <Link to="/sign-in">Sign In</Link>
      </AppHeader>
      <Divider />
      <Routes>
        <Route path="/example" element={<Example />} />
        <Route
          path="/sign-in"
          element={            
              <SignIn />
          }
        />
        <Route path="/*" element={<UnauthedDashboard />} />
      </Routes>
    </Grid>
  );
};