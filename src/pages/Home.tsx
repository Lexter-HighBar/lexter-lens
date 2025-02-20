import { Box, Typography, Grid, Button } from "@mui/material";
import { useState } from "react";
import { Page } from "../components/layout/Page";
import InsightsSection from "../components/InsightSection";
import FirstSigninFlow from "../components/FirstSigninFlow/FirstSigninFlow";
import Leaderboard from "../components/Leaderboard"; // import Leaderboard
import { useUser } from "@clerk/clerk-react";

const Home: React.FC = () => {
  const user = useUser()
  const [isFirstSignIn, setIsFirstSignIn] = useState<boolean>(
    Boolean(user.user?.unsafeMetadata.isFirstSignIn) 
  )

  const handleTestClick = () => {
    setIsFirstSignIn(true);
  };

  return (
    <Page sx={{ minHeight: "100vh", height: "auto", padding: 2 }}>
      <FirstSigninFlow isFirstSignIn={isFirstSignIn} setIsFirstSignIn={setIsFirstSignIn} />
      <Button onClick={handleTestClick}>Test</Button>
      <Box sx={{ marginBottom: 4 }}>
        <Typography variant="h4" gutterBottom>
          Welcome to Lexter Lens!
        </Typography>
      </Box>

      <Grid container spacing={2}>
        <Grid item xs={12} md={8}>
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
        </Grid>

        {/* desktop mode Leaderboard */}
        <Grid item xs={12} md={4} sx={{ display: { xs: "none", md: "block" } }}>
          <Leaderboard />
        </Grid>
      </Grid>
    </Page>
  );
};

export default Home;

