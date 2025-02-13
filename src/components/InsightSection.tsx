import { Box, Button, Paper, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { Link } from "react-router-dom";
import React from "react";

/**
 * InsightsSection Component
 * @param {string} title - The title of the section.
 * @param {string} linkTo - The path for the "See All Insights" button.
 * @param {React.ReactNode} content - The content to display within the section.
 */
const InsightsSection: React.FC<{ title: string; linkTo: string; content: React.ReactNode }> = ({
  title,
  linkTo,
  content,
}) => {
  return (
    <Box
      sx={{
        my: 4,
        maxWidth: "985px",
        width: "90%",
        margin: "0 auto",
        overflow: "hidden",
        "@media (max-width: 600px)": {
          width: "100%",
          my: 2,
        },
      }}
    >
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
            padding: "8px 16px",
            ":hover": {
              backgroundColor: "#1a1a1a",
              color: "white",
            },
            border: "1px solid transparent",
            width: "fit-content",
            "@media (max-width: 600px)": {
              fontSize: "0.8rem",
              padding: "6px 12px",
            },
          }}
        >
          See All Insights
        </Button>
      </Grid>
      <Paper
        sx={{
          padding: 4,
          marginTop: 4,
          minHeight: "300px",
          boxShadow: "none",
          border: "1px solid #ddd",
          maxWidth: "100%",
          "@media (max-width: 600px)": {
            padding: 2,
          },
        }}
      >
        {content}
      </Paper>
    </Box>
  );
};

export default InsightsSection;
