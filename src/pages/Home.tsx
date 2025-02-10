import { Box, Button, Typography } from "@mui/material";
import { Page } from "../components/layout/Page";
import InsightsSection from "../components/InsightSection";
import { useState } from "react";
import FirstSigninFlow from "../components/FirstSigninFlow";

const Home: React.FC = () => {
  const [isFirstSignIn, setIsFirstSignIn] = useState<boolean>(true);

  const handleTestClick = () => {
    setIsFirstSignIn(true);
  };

  return (
    <Page sx={{ minHeight: "100vh", height: "auto" }}>
      <FirstSigninFlow isFirstSignIn={isFirstSignIn} setIsFirstSignIn={setIsFirstSignIn} />

      <Button onClick={handleTestClick}>Test</Button>

      <Box>
        <Typography variant="h4" gutterBottom>
          Welcome to Lexter Lens!
        </Typography>
      </Box>

      <InsightsSection
        title="Relevant Insights"
        linkTo="/discussion"
        content={<Typography>Placeholder for Relevant Insights content.</Typography>}
      />

      <InsightsSection
        title="Trending Insights"
        linkTo="/discussion"
        content={<Typography>Placeholder for Trending Insights content.</Typography>}
      />
    </Page>
  );
};

export default Home;
