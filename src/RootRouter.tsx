import { SignIn, SignUp, useAuth, UserButton } from '@clerk/clerk-react';
import { Route, Routes, Navigate } from 'react-router-dom';
import { Flex, Grid, Spinner } from '@radix-ui/themes';
import { Lawyers } from './pages/Lawyers';
import { UnauthedDashboard } from './pages/UnauthedDashboard';
import { Example } from './pages/Example';
import { AppHeader } from './components/layout/AppHeader';
import { Link } from './components/Link';
import { Divider, Typography } from '@mui/material';


// Dummy components for new pages
const Home = () => <div>Home</div>;
const QAContent = () => <div>QA + Discussion Page</div>;
const SingleQA = () => <div>Single QA + Discussion Page</div>;
const ErrorPage = () => <div>Error Page</div>;

const Registration = () => (
  <div>
    <h2>Register</h2>
    <SignUp />
  </div>
);

const Settings = () => <div>Settings Page</div>;

export const RootRouter = () => {
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
      <AppHeader>
        <Flex gap="3" align="end">
          <Typography variant="h5">Lexter Lens</Typography>
          <Link to="/home">Home</Link>
          <Link to="/lawyers">Lawyers</Link>
          <Link to="/content">Discussion</Link>
          <Link to="/qa">Q&A</Link>
          <Link to="/settings">Settings</Link>
        </Flex>
        <UserButton />
      </AppHeader>
      <Divider />
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/lawyers" element={<Lawyers />} />
        <Route path="/content" element={<QAContent />} />
        <Route path="/qa" element={<SingleQA />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/error" element={<ErrorPage />} />
        <Route path="*" element={<Navigate to="/error" replace />} />
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
        <Flex gap="3" align="end">
          <Link to="/sign-in">Sign In</Link>
          <Link to="/registration">Register</Link>
        </Flex>
      </AppHeader>
      <Divider />
      <Routes>
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/registration" element={<Registration />} />
        <Route path="/example" element={<Example />} />
        <Route path="/error" element={<ErrorPage />} />
        <Route path="*" element={<Navigate to="/error" replace />} />
      </Routes>
    </Grid>
  );
};


