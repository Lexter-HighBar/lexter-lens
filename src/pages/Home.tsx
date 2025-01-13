import { Button } from "@mui/material";
import FirstSigninFlow from "../components/FirstSigninFlow";
import { Page } from "../components/layout/Page"
import { useState } from "react";


const Home: React.FC = () => {
  // State to track if it's the first sign-in
  const [isFirstSignIn, setIsFirstSignIn] = useState<boolean>(true);

  // Function to handle resetting first sign-in status
  const handleTestClick = () => {
    setIsFirstSignIn(true);
  };

  return (
    <Page>
      <FirstSigninFlow isFirstSignIn={isFirstSignIn} setIsFirstSignIn={setIsFirstSignIn} />
      <Button onClick={handleTestClick}>Test</Button>
    </Page>
  );
};

export default Home;
