import {  useAuth } from '@clerk/clerk-react';
import { Grid2 } from '@mui/material';
import { Spinner } from '@radix-ui/themes';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router';

const RequireAuth = ({ children }: { children: React.ReactNode }) => {
  const { isSignedIn, isLoaded } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoaded && !isSignedIn) {
      navigate('/unauthed-dashboard'); // Redirect to UnauthedDashboard
    }
  }, [isLoaded, isSignedIn, navigate]);

  if (!isLoaded) return 
     <Grid2>
        <Spinner />
      </Grid2>

  if (!isSignedIn) return null; // Prevent rendering while redirecting

  return <>{children}</>;
};

export default RequireAuth;