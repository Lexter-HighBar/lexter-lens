import { RedirectToSignIn, useAuth } from '@clerk/clerk-react';
import React from 'react';

const RequireAuth = ({ children }: { children: React.ReactNode }) => {
  const { isSignedIn, isLoaded } = useAuth();

  if (!isLoaded) return <div>Loading...</div>;
  if (!isSignedIn) return <RedirectToSignIn />;

  return <>{children}</>;
};

export default RequireAuth;