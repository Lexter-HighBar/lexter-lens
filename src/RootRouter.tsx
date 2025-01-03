import RequireAuth from './components/RequireAuth';
import { SignUp, useAuth, UserButton } from '@clerk/clerk-react';
import { Route, Routes } from 'react-router-dom';
import {  Grid, Spinner } from '@radix-ui/themes';
import { Lawyers } from './pages/Lawyers';
import { UnauthedDashboard } from './pages/UnauthedDashboard';
import { Example } from './pages/Example';

import { Divider} from '@mui/material';
import ResponsiveAppBar from './components/layout/ResponsiveAppBar';
import Signin from './pages/Sign-in';

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
      <ResponsiveAppBar/>
      
     
      <Divider />
      <Routes>
        <Route path="/lawyers"  element={<RequireAuth><Lawyers /></RequireAuth> }
        />
        <Route path="/sign-in" element={<Signin/>} />
        <Route path="/*" element={<Example/>} />
      </Routes>
    </Grid>
  ) : (
    <Grid>
      <ResponsiveAppBar>
       <UserButton />
      </ResponsiveAppBar>
      <Divider />
      <Routes>
        <Route path="/example" element={<Example />} />
        <Route
          path="/sign-in"
          element={            
              <Signin />
          }
        />
        <Route
          path="/sign-up"
          element={            
              <SignUp />
          }
        />
        <Route path="/*" element={<UnauthedDashboard />} />
      </Routes>
    </Grid>
  );
};