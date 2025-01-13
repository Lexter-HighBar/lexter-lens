import React, { useState } from 'react';
import { Page } from "../components/layout/Page";

const Home: React.FC = () => {
  const [isFirstSignIn, setIsFirstSignIn] = useState<boolean>(true);

  const handleTestClick = () => {
    setIsFirstSignIn(true);
  };

  return (
    <Page>
      
    </Page>
  );
};

export default Home;