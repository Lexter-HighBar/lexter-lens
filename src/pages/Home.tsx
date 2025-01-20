import { Page } from "../components/layout/Page";
import { Typography, 
         Button, 
         Paper, 
         Box } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { Link } from "react-router-dom";
import FirstSigninFlow from "../components/FirstSigninFlow";
import { useState } from "react";

// Shared InsightsSection component
const InsightsSection: React.FC<{ title: string; linkTo: string; placeholder: string }> = ({
  title,
  linkTo,
  placeholder,
}) => {
  return (
    <Box sx={{ my: 4, maxWidth: '985px', width: '90dvw', margin: '0 auto' }}>
      <Grid container alignItems="center" justifyContent="space-between">
        <Typography variant="h5">{title}</Typography>
        <Button
  component={Link}
  to={linkTo}
  variant="outlined"
  color="primary"
  sx={{
    backgroundColor: "#1d4171", 
    color: "white",             
    ":hover": {
      backgroundColor: "#1a1a1a", 
      color: "white",             
    },
  }}
>
  See All Insights
</Button>

      </Grid>
      <Paper sx={{ padding: 4, marginTop: 4, minHeight: '300px' }}>
        <Typography>{placeholder}</Typography>
      </Paper>
    </Box>
  );
};

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

      {/* Insights sections */}
      <InsightsSection
        title="Relevant Insights"
        linkTo="/discussion"
        placeholder="Placeholder for Relevant Insights content."
      />

      <InsightsSection
        title="Trending Insights"
        linkTo="/discussion"
        placeholder="Placeholder for Trending Insights content."
      />
    </Page>
  );
};

export default Home;