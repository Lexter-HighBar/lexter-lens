import { Page } from '../components/layout/Page';
import QuestionsList from '../components/Discussion/QuestionsList';
import { Question } from '../lib/types';
import { useQuestions } from '../hooks/useQuestions';
import CreateQuestion from '../components/Discussion/CreateQuestion';
import FilterComponent from '../components/Discussion/FilterComponent';
import { Box, Fab, Drawer, IconButton, Typography } from '@mui/material';
import { ChevronLeft, Close } from '@mui/icons-material';
import { useState } from 'react';
import Leaderboard from '../components/Leaderboard';

// Discussion page component
export const Discussion = () => {
  // Fetch all questions
  const { questions } = useQuestions();
  
  // Manage selected filter state
  const [filter, setFilter] = useState('new');

  // Handle filter change from the dropdown menu
  const handleFilterChange = (newFilter: string) => {
    setFilter(newFilter);
  };

  // State for Leaderboard Drawer
  const [openDrawer, setOpenDrawer] = useState(false);
  
  const toggleDrawer = (newOpen: boolean) => () => {
    setOpenDrawer(newOpen);
  };

  return (
    <>
      {/* Leaderboard Button */}
      {!openDrawer && (
        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Fab
            sx={{ position: 'fixed', top: 130, right: 30 }}
            variant="extended"
            size="medium"
            onClick={toggleDrawer(true)}
          >
            <ChevronLeft style={{ marginRight: 4 }} />
            Leaderboard
          </Fab>
        </Box>
      )}

      {/* Leaderboard Drawer */}
      <Drawer
        variant="persistent"
        sx={{ backgroundColor: 'primary.dark' }}
        open={openDrawer}
        onClose={toggleDrawer(false)}
        anchor="right"
      >
        <Box component="div" p={2} display="flex" justifyContent="space-between" sx={{ backgroundColor: 'primary.dark' }}>
          <IconButton onClick={toggleDrawer(false)} sx={{ color: 'white' }}>
            <Close />
          </IconButton>
          <Typography variant="h2" gutterBottom color="primary.contrastText">
            Leaderboard
          </Typography>
        </Box>
        <Leaderboard />
      </Drawer>

      <Page sx={{ height: '100%', overflowY: 'auto', overflowX: 'hidden' }}>
        <Box>
          <CreateQuestion />
          {/* Filter dropdown component */}
          <FilterComponent onFilterChange={handleFilterChange} />
        </Box>

        {/* Pass filter state to the questions list */}
        <QuestionsList questions={questions as Question[]} filter={filter} />
      </Page>
    </>
  );
};

export default Discussion;

