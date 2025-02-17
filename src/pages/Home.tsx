import { Box, Typography, Grid } from "@mui/material";
import { useState } from "react";
import axios from "axios";
import { Page } from "../components/layout/Page";
import InsightsSection from "../components/InsightSection";
import FirstSigninFlow from "../components/FirstSigninFlow";
import Leaderboard from "../components/Leaderboard"; // Import the Leaderboard component

const Home: React.FC = () => {
  const [isFirstSignIn, setIsFirstSignIn] = useState<boolean>(true);

  return (
    <Page sx={{ minHeight: "100vh", height: "auto", padding: 2 }}>
      <FirstSigninFlow isFirstSignIn={isFirstSignIn} setIsFirstSignIn={setIsFirstSignIn} />
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

        {/* Display the Leaderboard normally on larger screens */}
        <Grid item xs={12} md={4}>
          <Leaderboard />
        </Grid>
      </Grid>
    </Page>
  );
};

export default Home;

