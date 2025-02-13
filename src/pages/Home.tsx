import { Box, Typography, List, ListItem, ListItemText, Paper, Grid } from "@mui/material";
import { useEffect, useState } from "react";
import axios from "axios";
import { Page } from "../components/layout/Page";
import InsightsSection from "../components/InsightSection";
import FirstSigninFlow from "../components/FirstSigninFlow";

const Home: React.FC = () => {
  const [isFirstSignIn, setIsFirstSignIn] = useState<boolean>(true);
  const [topQuestioners, setTopQuestioners] = useState([]);

  useEffect(() => {
    const fetchTopQuestioners = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/questions/top-questioners");
        console.log("Top Questioners:", response.data);  // 檢查數據
        setTopQuestioners(response.data);
      } catch (error) {
        console.error("Failed to fetch top questioners:", error);
      }
    };
    fetchTopQuestioners();
  }, []);

  return (
    <Page sx={{ minHeight: "100vh", height: "auto", padding: 2 }}>
      <FirstSigninFlow isFirstSignIn={isFirstSignIn} setIsFirstSignIn={setIsFirstSignIn} />
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
              {topQuestioners.length > 0 ? (
                topQuestioners.map((user, index) => (
                  <ListItem key={index}>
                    <ListItemText primary={`${index + 1}. ${user._id} (${user.count} questions)`} />
                  </ListItem>
                ))
              ) : (
                <ListItem>
                  <ListItemText primary="No data available" />
                </ListItem>
              )}
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
