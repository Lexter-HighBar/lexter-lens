import { Box, Typography, Grid, Button, Drawer, Fab } from "@mui/material";
import { useState } from "react";
import { Page } from "../components/layout/Page";
import InsightsSection from "../components/InsightSection";
import FirstSigninFlow from "../components/FirstSigninFlow/FirstSigninFlow";
import Leaderboard from "../components/Leaderboard"; // import Leaderboard
import { FaChevronLeft } from "react-icons/fa";

const Home: React.FC = () => {
  const [isFirstSignIn, setIsFirstSignIn] = useState<boolean>(true);
  const handleTestClick = () => {
    setIsFirstSignIn(true);
  };
  const [openDrawer, setOpenDrawer] = useState(open !== null && open !== undefined); // initialize openDrawer to true if open is not null or undefined






  const toggleDrawer = (newOpen: boolean) => () => {
    setOpenDrawer(newOpen);
  };
  return (<>{ !openDrawer &&
    <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
    <Fab  sx={{ position: "fixed", bottom: 16, right: 16 }} size="medium" aria-label="add" onClick={toggleDrawer(true)}>
    <FaChevronLeft />
  </Fab> 
  </Box>}
  
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
        <Drawer open={openDrawer} onClose={toggleDrawer(false)} anchor="right">
   

      <Leaderboard />
    </Drawer>
        
      </Grid>
    </Page></>
  );
};

export default Home;

