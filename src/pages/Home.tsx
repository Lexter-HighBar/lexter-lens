import { Box, Typography, Button, IconButton, useTheme, useMediaQuery, Fab, Drawer } from '@mui/material';
import { useState, useEffect, useRef, useCallback } from 'react';
import FirstSigninFlow from '../components/FirstSigninFlow/FirstSigninFlow';
import { useUser } from '@clerk/clerk-react';
import { useSearchQuery } from '../hooks/useSearchQuery';
import { Page } from '../components/layout/Page';
import { ArrowBackIos, ArrowForwardIos } from '@mui/icons-material';
import { FaChevronLeft } from "react-icons/fa";
import Leaderboard from '../components/Leaderboard';
const Home: React.FC = () => {
  const user = useUser();
  const [isFirstSignIn, setIsFirstSignIn] = useState(
    Boolean(user.user?.unsafeMetadata.isFirstSignIn)
  );
  
  const handleTestClick = () => {
    setIsFirstSignIn(true);
  };

  const { questions, setParams } = useSearchQuery();
  const userTags = user.user?.unsafeMetadata.tags as string | undefined;
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);
  const [openDrawer, setOpenDrawer] = useState(open !== null && open !== undefined); // initialize openDrawer to true if open is not null or undefined
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm')); // Detect small screens
  const toggleDrawer = (newOpen: boolean) => () => {
    setOpenDrawer(newOpen);
  };
  useEffect(() => {
    setParams({ tags: userTags });
  }, []); // eslint-disable-line


  const scroll = useCallback((direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = isMobile ? 150 : 320;
      const currentScrollPosition = scrollContainerRef.current.scrollLeft;
      const newScrollPosition = direction === 'left' ? currentScrollPosition - scrollAmount : currentScrollPosition + scrollAmount;
      scrollContainerRef.current.scrollTo({ left: newScrollPosition, behavior: 'smooth' });
    } else {
      console.error('scrollContainerRef is not attached');
    }
  }, [isMobile, scrollContainerRef]);

  useEffect(() => {
    const autoScroll = setInterval(() => {
      scroll('right');
    }, isMobile ? 5000 : 3000);
    return () => clearInterval(autoScroll);
  }, [isMobile, scroll]);

  return (<>
    { !openDrawer &&
      <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
      <Fab  sx={{ position: "fixed", bottom: 16, right: 16 }} size="medium" aria-label="add" onClick={toggleDrawer(true)}>
      <FaChevronLeft />
    </Fab>
    </Box>}
    <Page sx={{ height: '100%', padding: 2 }}>
      <Box sx={{ marginTop: 4, paddingX: isMobile ? 1 : 4 }}>
        <FirstSigninFlow
          isFirstSignIn={isFirstSignIn}
          setIsFirstSignIn={setIsFirstSignIn}
        />
        <Button onClick={handleTestClick} sx={{ mb: 2 }}>Test</Button>
        
        <Typography variant="h6" gutterBottom>
          Questions Based on Your Interests
        </Typography>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          {!isMobile && (
            <IconButton onClick={() => scroll('left')}>
              <ArrowBackIos />
            </IconButton>
          )}

          <Box
            ref={scrollContainerRef}
            sx={{
              display: 'flex',
              overflowX: 'auto',
              scrollBehavior: 'smooth',
              gap: 2,
              padding: 2,
              width: '100%',
              maxWidth: isMobile ? '100%' : 750,
              '&::-webkit-scrollbar': { display: 'none' }, // Hide scrollbar
            }}
          >
            {questions.length > 0 ? (
              questions.map((q) => (
                <Box
                  key={q.QuestionId}
                  sx={{
                    minWidth: isMobile ? 100 : 400, // Adjust width for mobile
                    padding: 2,
                    backgroundColor: '#f9f9f9',
                    borderRadius: 2,
                    boxShadow: 1,
                  }}
                >
                  <Typography variant="h6">{q.userName}</Typography>
                  <Typography variant="body2" color="textSecondary">
                    {q.content}
                  </Typography>
                </Box>
              ))
            ) : (
              <Typography>No questions found based on your tags.</Typography>
            )}
          </Box>

          {!isMobile && (
            <IconButton onClick={() => scroll('right')}>
              <ArrowForwardIos />
            </IconButton>
          )}
        </Box>
      </Box> {/* desktop mode Leaderboard */}
        <Drawer open={openDrawer} onClose={toggleDrawer(false)} anchor="right">
      <Leaderboard />
    </Drawer>

    </Page></>
  );
};

export default Home;
