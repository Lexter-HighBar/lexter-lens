import { Box, Button, Typography, Grid, Paper, List, ListItem, ListItemText } from "@mui/material";
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
    <Page sx={{ minHeight: "100vh", height: "auto", padding: 2 }}>
      <FirstSigninFlow isFirstSignIn={isFirstSignIn} setIsFirstSignIn={setIsFirstSignIn} />
      <Button onClick={handleTestClick}>Test</Button>

      <Box sx={{ marginBottom: 4 }}>
        <Typography variant="h4" gutterBottom>
          Welcome to Lexter Lens!
        </Typography>
      </Box>

      <Grid container spacing={2}>
        {/* Insights Section */}
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

        {/* Leaderboard Section */}
        <Grid item xs={12} md={4}>
          <Paper sx={{ padding: 2 }}>
            <Typography variant="h5" gutterBottom>
              Leaderboard
            </Typography>
            <List>
              <ListItem>
                <ListItemText primary="Top 3 Who Asked the Most Questions" />
              </ListItem>
              <ListItem>
                <ListItemText primary="1. User A (10 questions)" />
              </ListItem>
              <ListItem>
                <ListItemText primary="2. User B (8 questions)" />
              </ListItem>
              <ListItem>
                <ListItemText primary="3. User C (7 questions)" />
              </ListItem>
              <ListItem>
                <ListItemText primary="Top 3 Who Made the Most Comments" />
              </ListItem>
              <ListItem>
                <ListItemText primary="1. User D (15 comments)" />
              </ListItem>
              <ListItem>
                <ListItemText primary="2. User E (12 comments)" />
              </ListItem>
              <ListItem>
                <ListItemText primary="3. User F (10 comments)" />
              </ListItem>
              <ListItem>
                <ListItemText primary="Top 3 Who Made the Most Replies" />
              </ListItem>
              <ListItem>
                <ListItemText primary="1. User G (20 replies)" />
              </ListItem>
              <ListItem>
                <ListItemText primary="2. User H (18 replies)" />
              </ListItem>
              <ListItem>
                <ListItemText primary="3. User I (15 replies)" />
              </ListItem>
              <ListItem>
                <ListItemText primary="Top 3 Who Invited the Most Authorities" />
              </ListItem>
              <ListItem>
                <ListItemText primary="1. User J (5 invites)" />
              </ListItem>
              <ListItem>
                <ListItemText primary="2. User K (4 invites)" />
              </ListItem>
              <ListItem>
                <ListItemText primary="3. User L (3 invites)" />
              </ListItem>
            </List>
            <Typography variant="body1" sx={{ marginTop: 2 }}>
              Earn badges and leaderboard points by inviting relevant authorities to answer questions!
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </Page>
  );
};

export default Home;
