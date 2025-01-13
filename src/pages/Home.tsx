import { Page } from "../components/layout/Page";
import { Typography, 
        Button, 
        Paper, 
        Box } from "@mui/material";
import Grid from '@mui/material/Grid2';
import { Link } from "react-router-dom";
import FirstSigninFlow from "../components/FirstSigninFlow";
import { useState } from "react";


const Home: React.FC = () => {
  // State to track if it's the first sign-in
  const [isFirstSignIn, setIsFirstSignIn] = useState<boolean>(true);

  // Function to handle resetting first sign-in status
  const handleTestClick = () => {
    setIsFirstSignIn(true);
  };

  return (
    <Page sx={{ minHeight: '100vh', height: 'auto' }}>
    <FirstSigninFlow isFirstSignIn={isFirstSignIn} setIsFirstSignIn={setIsFirstSignIn} />
    <Button onClick={handleTestClick}>Test</Button>
      {/* Welcome message */}
      <Typography variant="h4" gutterBottom>
        Welcome to Lexter Lens, we are so glad to have you here.
      </Typography>

      {/* Relevant Insights section */}
      <Box sx={{ my: 4, maxWidth: '985px', width: '90dvw', margin: '0 auto' }}>
        <Grid container alignItems="center" justifyContent="space-between">
          <Typography variant="h5">Relevant Insights</Typography>
          <Button
            component={Link}
            to="/discussion"
            variant="outlined"
            color="primary"
          >
            See All Insights
          </Button>
        </Grid>
        <Paper sx={{ padding: 4, marginTop: 4, minHeight: '300px' }}>
          {/* Placeholder content for Relevant Insights */}
          <Typography>Placeholder for Relevant Insights content.</Typography>
        </Paper>
      </Box>

      {/* Trending Insights section */}
      <Box sx={{ my: 4, maxWidth: '985px', width: '90dvw', margin: '0 auto' }}>
        <Grid container alignItems="center" justifyContent="space-between">
          <Typography variant="h5">Trending Insights</Typography>
          <Button
            component={Link}
            to="/discussion"
            variant="outlined"
            color="primary"
          >
            See All Insights
          </Button>
        </Grid>
        <Paper sx={{ padding: 4, marginTop: 4, minHeight: '300px' }}>
          {/* Placeholder content for Trending Insights */}
          <Typography>Placeholder for Trending Insights content.</Typography>
        </Paper>
      </Box>
    </Page>
  );
};


export default Home;
