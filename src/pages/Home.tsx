import React, { useState } from 'react';
import { Page } from "../components/layout/Page";

const Home: React.FC = () => {
  // State to track if it's the first sign-in
  const [isFirstSignIn, setIsFirstSignIn] = useState<boolean>(true);

  // Function to handle resetting first sign-in status
  const handleTestClick = () => {
    setIsFirstSignIn(true);
  };

  return (
    <Page>
      
    </Page>
  );
};

export default Home;