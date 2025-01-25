import { Page } from "../components/layout/Page";
import { Typography, Button, Paper, Box } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { Link } from "react-router-dom";
import FirstSigninFlow from "../components/FirstSigninFlow";
import { useState } from "react";



// Shared InsightsSection component
const InsightsSection: React.FC<{ title: string; linkTo: string; placeholder: string }> = ({
  title, // Section title
  linkTo, // Path for the "See All Insights" button
  placeholder, // Placeholder text for the section content
}) => {
  return (
    <Box
      sx={{
        my: "4", // Vertical margin
        maxWidth: "985px", // Maximum width of the section
        width: "90%", // Responsive width relative to the parent container
        margin: "0 auto", // Center horizontally
        overflow: "hidden", // Prevent content overflow
        "@media (max-width: 600px)": {
          width: "100%", // Adjust to full width for smaller screens
          my: 2, // Reduce vertical margin for small screens
        },
      }}
    >
    
      {/* Grid layout for title and button alignment */}
      <Grid container alignItems="center" justifyContent="space-between">
        <Typography variant="h5">{title}</Typography>
        {/* Responsive button */}
        <Button
          component={Link}
          to={linkTo}
          variant="outlined"
          color="primary"
          sx={{
            backgroundColor: "#1d4171", // Primary background color
            color: "white", // Text color
            padding: "8px 16px", // Define padding for consistency
            ":hover": {
              backgroundColor: "#1a1a1a", // Hover background
              color: "white", // Hover text color
            },
            border: "1px solid transparent", // Remove default border
            width: "fit-content", // Ensure the button fits its content
            "@media (max-width: 600px)": {
              fontSize: "0.8rem", // Reduce font size for small screens
              padding: "6px 12px", // Adjust padding for small screens
            },
          }}
        >
          See All Insights
        </Button>
      </Grid>
      {/* Content container */}
      <Paper
        sx={{
          padding: 4, // Inner padding
          marginTop: 4, // Space above the container
          minHeight: "300px", // Minimum height of the section
          boxShadow: "none", // Remove shadow for a cleaner look
          border: "1px solid #ddd", // Add a light border
          maxWidth: "100%", // Prevent container from exceeding its parent width
          "@media (max-width: 600px)": {
            padding: 2, // Reduce padding for small screens
          },
        }}
      >
        <Typography>{placeholder}</Typography>
      </Paper>
    </Box>
  );
};

const Home: React.FC = () => {
  // State to track first sign-in status
  const [isFirstSignIn, setIsFirstSignIn] = useState<boolean>(true);

  return (
    <Page sx={{ minHeight: "100vh", height: "auto" }}>
      {/* First sign-in flow */}
      <FirstSigninFlow isFirstSignIn={isFirstSignIn} setIsFirstSignIn={setIsFirstSignIn} />
      
      {/* Welcome message */}
      <Box>
      <Typography variant="h4" gutterBottom>
        Welcome to Lexter Lens, we are so glad to have you here.
      </Typography>
      </Box>
      {/* Insights sections */}

      <Box sx={{ mb: 4 }} />
      <InsightsSection
        title="Relevant Insights"
        linkTo="/discussion"
        placeholder="Placeholder for Relevant Insights content."
      /> 

      <Box sx={{ mb: 4 }} />
      <InsightsSection
        title="Trending Insights"
        linkTo="/discussion"
        placeholder="Placeholder for Trending Insights content."
      />

    </Page>
  );
};

export default Home;
