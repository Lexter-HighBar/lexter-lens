import { Typography, List, ListItem, ListItemText, Paper, Box } from "@mui/material";
import { useEffect, useState } from "react";
import axios from "axios";

const medalIcons = [
  "🥇", // Gold
  "🥈", // Silver
  "🥉", // Bronze
];

const Leaderboard: React.FC = () => {
  interface User {
    _id: string;
    count: number;
  }

  const [topQuestioners, setTopQuestioners] = useState<User[]>([]);
  const [topCommenters, setTopCommenters] = useState<User[]>([]);
  const [topRepliers, setTopRepliers] = useState<User[]>([]);

  useEffect(() => {
    const fetchLeaderboardData = async () => {
      try {
        const questionersResponse = await axios.get("https://lexter-server.onrender.com/api/questions/top-questioners");
        setTopQuestioners(questionersResponse.data);

        const commentsResponse = await axios.get("https://lexter-server.onrender.com/api/comments/top-commenters-repliers");
        setTopCommenters(commentsResponse.data.topCommenters);
        setTopRepliers(commentsResponse.data.topRepliers);
      } catch (error) {
        console.error("Failed to fetch leaderboard data:", error);
      }
    };
    fetchLeaderboardData();
  }, []);

  const renderSection = (title: string, data: User[]) => (
    <Box sx={{ mb: 3, p: 2}}>
      <Typography variant="h6" >
        {title}
      </Typography>
      <List>
        {data.map((user, index) => (
          <ListItem key={index} sx={{ display: "flex", justifyContent: "space-between" }}>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              {index < 3 && (
                <Typography variant="h5" sx={{ marginRight: 2 }}>{medalIcons[index]}</Typography>
              )}
              <ListItemText primary={user._id} />
            </Box>
            <Typography variant="body1" >{user.count}</Typography>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <Paper sx={{ padding: 3 }}>
      {renderSection("Top 3 Who Made the Most Posts", topQuestioners)}
      {renderSection("Top 3 Who Made the Most Comments", topCommenters)}
      {renderSection("Top 3 Who Made the Most Replies", topRepliers)}
    </Paper>
  );
};

export default Leaderboard;