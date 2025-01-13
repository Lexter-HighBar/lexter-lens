import { useState } from 'react';
import { Button } from '@mui/material';
import { Page } from '../components/layout/Page';
import FirmSearch from '../components/FirmSearch';
import FirstSigninFlow from '../components/FirstSigninFlow';

const Home: React.FC = () => {
  // State to track if it's the first sign-in
  const [isFirstSignIn, setIsFirstSignIn] = useState<boolean>(true);

  // Function to handle resetting first sign-in status
  const handleTestClick = () => {
    setIsFirstSignIn(true);
  };

  return (
    <Page>
      <div style={{ margin: '20px 0' }}>
        <FirmSearch />
      </div>
      <FirstSigninFlow isFirstSignIn={isFirstSignIn} setIsFirstSignIn={setIsFirstSignIn} />
      <Button onClick={handleTestClick}>Test</Button>
    </Page>
  );
};

export default Home;
