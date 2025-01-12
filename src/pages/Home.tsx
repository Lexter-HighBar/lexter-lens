import { Page } from "../components/layout/Page";
import { Typography, Button, Card, Grid, Box } from "@mui/material";
import { Link } from "react-router-dom";
import FirmSearch from "../components/FirmSearch";

const Home = () => {
  return (
    <Page sx={{ minHeight: '100vh', height: 'auto' }}>
      {/* FirmSearch Component at the top */}
      <Box sx={{ margin: '20px auto', maxWidth: '100%', width: '50vw' }}>
        <FirmSearch />
      </Box>

      {/* Welcome message */}
      <Typography variant="h4" gutterBottom>
        Welcome to Lexter Lens, we are so glad to have you here.
      </Typography>

      {/* Relevant Insights section */}
      <Box mb={4} sx={{ margin: '0 auto', maxWidth: '100%', width: '50vw' }}>
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
        <Card sx={{ padding: 4, marginTop: 4, minHeight: '300px' }}>
          {/* Placeholder content for Relevant Insights */}
          <Typography>Placeholder for Relevant Insights content.</Typography>
        </Card>
      </Box>

      {/* Trending Insights section */}
      <Box mb={4} sx={{ margin: '0 auto', maxWidth: '100%', width: '50vw' }}>
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
        <Card sx={{ padding: 4, marginTop: 4, minHeight: '300px' }}>
          {/* Placeholder content for Trending Insights */}
          <Typography>Placeholder for Trending Insights content.</Typography>
        </Card>
      </Box>
    </Page>
  );
};

export default Home;
