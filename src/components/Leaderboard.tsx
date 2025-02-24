import {
  Typography,
  List,
  ListItemText,
  Box,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  ListItem,
} from '@mui/material'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { ChevronsUpDown } from 'lucide-react'

const medalIcons = [
  '1.', // Gold
  '2.', // Silver
  '3.', // Bronze
]

const Leaderboard: React.FC = () => {
  interface User {
    _id: string
    count: number
  }

  const [topQuestioners, setTopQuestioners] = useState<User[]>([])
  const [topCommenters, setTopCommenters] = useState<User[]>([])
  const [topRepliers, setTopRepliers] = useState<User[]>([])

  useEffect(() => {
    const fetchLeaderboardData = async () => {
      try {
        const questionersResponse = await axios.get(
          'https://lexter-server.onrender.com/api/questions/top-questioners',
        )
        setTopQuestioners(questionersResponse.data)

        const commentsResponse = await axios.get(
          'https://lexter-server.onrender.com/api/comments/top-commenters-repliers',
        )
        setTopCommenters(commentsResponse.data.topCommenters)
        setTopRepliers(commentsResponse.data.topRepliers)
      } catch (error) {
        console.error('Failed to fetch leaderboard data:', error)
      }
    }
    fetchLeaderboardData()
  }, [])

  const renderSection = (title: string, data: User[]) => (
    <Accordion
      sx={{
        
        backgroundColor: 'primary.light',
        color: 'primary.contrastText',
        borderRadius: 0,
        boxShadow: 1,
      }}
    >
      <AccordionSummary expandIcon={<ChevronsUpDown />}>
        <Typography variant="subtitle1">{title}</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <List>
          {data.map((user, index) => (
            <ListItem
              key={index}
              sx={{ display: 'flex', justifyContent: 'space-between' }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                {index < 3 && (
                  <Typography variant="body1">{medalIcons[index]}</Typography>
                )}
                <ListItemText primary={user._id} />
              </Box>
              <Typography variant="body1">{user.count}</Typography>
            </ListItem>
          ))}
        </List>
      </AccordionDetails>
    </Accordion>
  )

  return (
    <Box sx={{pt: 4, px: 1  , backgroundColor: 'primary.dark', height: '100vh'}}>
  
      {renderSection('Most Questioners', topQuestioners)}
      {renderSection('Most Commenters', topCommenters)}
      {renderSection('Most Repliers', topRepliers)}
    </Box>
  )
}

export default Leaderboard
