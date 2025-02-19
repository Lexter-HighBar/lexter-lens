import { Typography, List, ListItem, ListItemText, Paper } from "@mui/material";
import { useEffect, useState } from "react";
import axios from "axios";

const Leaderboard: React.FC = () => {
  const [topQuestioners, setTopQuestioners] = useState([]);
  const [topCommenters, setTopCommenters] = useState([]);
  const [topRepliers, setTopRepliers] = useState([]);

  useEffect(() => {
    const fetchLeaderboardData = async () => {
      try {
        const questionersResponse = await axios.get("http://localhost:5000/api/questions/top-questioners");
        setTopQuestioners(questionersResponse.data);

        const commentsResponse = await axios.get("http://localhost:5000/api/comments/top-commenters-repliers");
        setTopCommenters(commentsResponse.data.topCommenters);
        setTopRepliers(commentsResponse.data.topRepliers);
      } catch (error) {
        console.error("Failed to fetch leaderboard data:", error);
      }
    };
    fetchLeaderboardData();
  }, []);

  return (
    <Paper sx={{ padding: 2 }}>
      <Typography variant="h4" gutterBottom sx={{ fontWeight: "bold", textAlign: "center" }}>
        Leaderboard
      </Typography>
      <List>
        <ListItem>
          <ListItemText
            primary="Top 3 Who Asked the Most Questions"
            primaryTypographyProps={{ variant: "h6", fontWeight: "bold" }}
          />
        </ListItem>
        {topQuestioners.map((user, index) => (
          <ListItem key={index}>
            <ListItemText primary={`${index + 1}. ${user._id} (${user.count} questions)`} />
          </ListItem>
        ))}
        <ListItem>
          <ListItemText
            primary="Top 3 Who Made the Most Comments"
            primaryTypographyProps={{ variant: "h6", fontWeight: "bold" }}
          />
        </ListItem>
        {topCommenters.map((user, index) => (
          <ListItem key={index}>
            <ListItemText primary={`${index + 1}. ${user._id} (${user.count} comments)`} />
          </ListItem>
        ))}
        <ListItem>
          <ListItemText
            primary="Top 3 Who Made the Most Replies"
            primaryTypographyProps={{ variant: "h6", fontWeight: "bold" }}
          />
        </ListItem>
        {topRepliers.map((user, index) => (
          <ListItem key={index}>
            <ListItemText primary={`${index + 1}. ${user._id} (${user.count} replies)`} />
          </ListItem>
        ))}
      </List>
    </Paper>
  );
};

export default Leaderboard;
